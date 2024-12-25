"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Activity, Calendar, LogIn, LogOut, Bell } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            <Link href="/community">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Button>
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
                <Link href="/notifications">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="flex items-center space-x-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}