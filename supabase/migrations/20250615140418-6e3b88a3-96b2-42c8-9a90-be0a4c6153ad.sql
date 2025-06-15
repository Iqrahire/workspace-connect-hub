
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workspaces table for real data
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  area TEXT NOT NULL,
  address TEXT,
  price_per_day INTEGER NOT NULL,
  price_per_week INTEGER,
  price_per_month INTEGER,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  has_video_tour BOOLEAN DEFAULT FALSE,
  capacity INTEGER,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE NOT NULL,
  booking_type TEXT CHECK (booking_type IN ('daily', 'weekly', 'monthly')) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for workspaces (public read access)
CREATE POLICY "Anyone can view workspaces" 
  ON public.workspaces FOR SELECT 
  TO public USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample workspace data
INSERT INTO public.workspaces (name, description, city, area, address, price_per_day, price_per_week, price_per_month, amenities, images, rating, review_count, is_premium, has_video_tour, capacity, contact_email, contact_phone) VALUES
('WeWork BKC', 'Premium coworking space in Mumbai''s business district', 'Mumbai', 'Bandra Kurla Complex', 'Platina, G Block, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051', 1500, 9000, 35000, '{"wifi", "coffee", "ac", "parking", "meeting"}', '{"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"}', 4.5, 128, true, true, 200, 'info@wework-bkc.com', '+91 9876543210'),
('91springboard Koramangala', 'Vibrant startup hub in Bangalore''s tech corridor', 'Bangalore', 'Koramangala', '3rd Floor, 143, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025', 800, 4800, 18000, '{"wifi", "coffee", "ac", "meeting"}', '{"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"}', 4.2, 95, false, false, 150, 'info@91springboard.com', '+91 9876543211'),
('Innov8 Connaught Place', 'Modern workspace in the heart of Delhi', 'Delhi', 'Connaught Place', 'N-8, Middle Circle, Connaught Place, New Delhi, Delhi 110001', 1200, 7200, 28000, '{"wifi", "coffee", "ac", "parking"}', '{"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"}', 4.3, 76, true, false, 120, 'info@innov8.work', '+91 9876543212');
