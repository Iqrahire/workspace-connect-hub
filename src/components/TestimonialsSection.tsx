
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Freelance Designer',
    avatar: 'https://i.pravatar.cc/100?img=1',
    content: 'BookMyWorkspace helped me find a perfect coworking space near my home. The booking was easy and seamless. I love the flexibility of being able to book by day or month!',
    rating: 5
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Tech Startup Founder',
    avatar: 'https://i.pravatar.cc/100?img=3',
    content: 'As a startup founder, I needed a professional environment to meet clients. This platform helped me find modern workspaces with great amenities at reasonable prices.',
    rating: 5
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Remote Worker',
    avatar: 'https://i.pravatar.cc/100?img=5',
    content: 'I travel across India while working remotely. This app is a lifesaver for finding reliable workspaces in new cities with accurate reviews and ratings.',
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from professionals and businesses who have found their perfect workspace through our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-500 stroke-yellow-500' : 'stroke-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
