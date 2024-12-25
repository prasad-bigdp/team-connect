'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, updateDoc, increment } from 'firebase/firestore';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function EventRegistrationPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !event) return;

    setLoading(true);
    try {
      // Create registration
      await addDoc(collection(db, 'eventRegistrations'), {
        eventId: params.id,
        userId: auth.currentUser.uid,
        ...formData,
        registeredAt: new Date().toISOString(),
      });

      // Update attendee count
      await updateDoc(doc(db, 'events', params.id), {
        attendeeCount: increment(1),
      });

      toast({
        title: 'Success',
        description: 'Successfully registered for the event',
      });
      router.push(`/events/${params.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register for the event',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Register for Event</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <div className="text-muted-foreground">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Textarea
                placeholder="Special Requirements or Notes"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="h-32"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register for Event'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}