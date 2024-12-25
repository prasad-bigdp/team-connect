import { Button } from '@/components/ui/button';
import { Users, Activity, Calendar, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Teen Connect</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/community" className="text-muted-foreground hover:text-primary">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Button>
            </Link>
            <Link href="/events" className="text-muted-foreground hover:text-primary">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="default" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}