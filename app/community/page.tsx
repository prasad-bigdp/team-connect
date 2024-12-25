'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Users } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export default function CommunityPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCommunities = async () => {
      const querySnapshot = await getDocs(collection(db, 'communities'));
      const communitiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Community));
      setCommunities(communitiesData);
    };

    fetchCommunities();
  }, []);

  const handleCreateCommunity = () => {
    if (!auth.currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a community",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }
    router.push('/community/create');
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Communities</h1>
          <Button onClick={handleCreateCommunity}>
            Create Community
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">{community.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {community.memberCount} members
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{community.description}</p>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  if (!auth.currentUser) {
                    toast({
                      title: "Authentication required",
                      description: "Please sign in to join communities",
                      variant: "destructive",
                    });
                    router.push('/login');
                    return;
                  }
                  router.push(`/community/${community.id}`);
                }}
              >
                View Community
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}