'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Calendar, Users, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface DashboardData {
  upcomingEvents: number;
  joinedCommunities: number;
  unreadNotifications: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    upcomingEvents: 0,
    joinedCommunities: 0,
    unreadNotifications: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!auth.currentUser) {
        router.push('/login');
        return;
      }

      const userId = auth.currentUser.uid;

      // Fetch user's events
      const eventsQuery = query(
        collection(db, 'eventRegistrations'),
        where('userId', '==', userId)
      );
      const eventsSnapshot = await getDocs(eventsQuery);

      // Fetch user's communities
      const communitiesQuery = query(
        collection(db, 'communityMembers'),
        where('userId', '==', userId)
      );
      const communitiesSnapshot = await getDocs(communitiesQuery);

      // Fetch unread notifications
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false)
      );
      const notificationsSnapshot = await getDocs(notificationsQuery);

      setData({
        upcomingEvents: eventsSnapshot.size,
        joinedCommunities: communitiesSnapshot.size,
        unreadNotifications: notificationsSnapshot.size,
      });
    };

    fetchDashboardData();
  }, [router]);

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">{data.upcomingEvents}</span>
            </div>
            <h3 className="font-semibold">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground">Events you've registered for</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">{data.joinedCommunities}</span>
            </div>
            <h3 className="font-semibold">Communities</h3>
            <p className="text-sm text-muted-foreground">Communities you're part of</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Bell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">{data.unreadNotifications}</span>
            </div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">Unread notifications</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Button 
            className="h-32 text-lg"
            onClick={() => router.push('/events')}
          >
            Browse Events
          </Button>
          <Button 
            className="h-32 text-lg"
            onClick={() => router.push('/community')}
          >
            Explore Communities
          </Button>
        </div>
      </main>
    </div>
  );
}