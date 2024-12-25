'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Users, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, 'groups'));
      const groupsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Group));
      setGroups(groupsData);
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interest Groups</h1>
          <Button asChild>
            <Link href="/groups/create">Create Group</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.category}</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <UserPlus className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">{group.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {group.memberCount} members
                </span>
                <Button variant="outline" asChild>
                  <Link href={`/groups/${group.id}`}>View Group</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}