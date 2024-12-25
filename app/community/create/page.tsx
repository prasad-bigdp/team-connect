'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

export default function CreateCommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast({
        title: 'Error',
        description: 'You must be signed in to create a community',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'communities'), {
        ...formData,
        creatorId: auth.currentUser.uid,
        memberCount: 1,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: 'Success',
        description: 'Community created successfully',
      });
      router.push('/community');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create community',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Create New Community</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Community Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>

            <div>
              <Textarea
                placeholder="Community Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
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
                {loading ? 'Creating...' : 'Create Community'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}