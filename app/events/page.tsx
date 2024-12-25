'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendeeCount: number;
  imageUrl: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    if (!auth.currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create an event",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }
    router.push('/events/create');
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <Button onClick={handleCreateEvent}>
            Create Event
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendeeCount} attending</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  {event.description}
                </p>
                <Button 
                  className="w-full"
                  onClick={() => {
                    if (!auth.currentUser) {
                      toast({
                        title: "Authentication required",
                        description: "Please sign in to view event details",
                        variant: "destructive",
                      });
                      router.push('/login');
                      return;
                    }
                    router.push(`/events/${event.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}