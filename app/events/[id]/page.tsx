'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Calendar, MapPin, Users, Share2 } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendeeCount: number;
  imageUrl: string;
  organizer: string;
  details: string;
}

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'events', params.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() } as Event);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (!event) return null;

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="overflow-hidden">
          <div className="relative h-96">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-muted-foreground">
                  Organized by {event.organizer}
                </p>
              </div>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="font-medium">Attendees</p>
                  <p className="text-muted-foreground">
                    {event.attendeeCount} people going
                  </p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">About this event</h2>
              <p className="text-muted-foreground mb-6">{event.description}</p>
              
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: event.details }}
              />
            </div>

            <div className="mt-8">
              <Button size="lg" className="w-full md:w-auto">
                Register for Event
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}