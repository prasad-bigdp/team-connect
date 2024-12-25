'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Bell, Calendar, Users, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Notification {
  id: string;
  type: 'event' | 'group' | 'message';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
      setNotifications(notificationsData);
    };

    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="h-5 w-5" />;
      case 'group':
        return <Users className="h-5 w-5" />;
      case 'message':
        return <MessageCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button variant="outline">Mark all as read</Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${
                notification.read ? 'bg-background' : 'bg-muted'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-primary">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{notification.title}</h3>
                  <p className="text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}