
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Home, Building, Info, Phone, LogIn, UserPlus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

// Navigation items
const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Workspaces",
    url: "/workspaces",
    icon: Building,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Phone,
  },
];

const authItems = [
  {
    title: "Log In",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Sign Up",
    url: "/signup",
    icon: UserPlus,
  },
];

function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-brand-600">BookMyWorkspace</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/dashboard'}>
                    <Link to="/dashboard">
                      <User />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/profile'}>
                    <Link to="/profile">
                      <User />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      {!user && (
        <SidebarFooter className="p-4">
          <SidebarMenu>
            {authItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="w-full">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Mobile Sidebar Trigger */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-600">BookMyWorkspace</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/workspaces" className="text-gray-700 hover:text-brand-600 transition-colors">
            Workspaces
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button variant="outline" className="hover:text-brand-600">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" className="hover:text-brand-600">
                <Link to="/profile">Profile</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="hover:text-brand-600">
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-brand-600 hover:bg-brand-700">
                <Link to="/signup" className="text-white">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

// Export both components
export default Navbar;
export { AppSidebar };
