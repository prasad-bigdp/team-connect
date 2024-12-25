'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';
import { Users, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  const [community, setCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchCommunity = async () => {
      const docRef = doc(db, 'communities', params.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCommunity({ id: docSnap.id, ...docSnap.data() } as Community);
      }
    };

    const fetchMessages = async () => {
      const q = query(
        collection(db, `communities/${params.id}/messages`),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setMessages(messagesData.reverse());
    };

    fetchCommunity();
    fetchMessages();
  }, [params.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) {
      return;
    }

    try {
      await addDoc(collection(db, `communities/${params.id}/messages`), {
        text: newMessage,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        timestamp: new Date().toISOString(),
      });

      setNewMessage('');
      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  if (!community) return null;

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <div>
              <h1 className="text-2xl font-bold">{community.name}</h1>
              <p className="text-sm text-muted-foreground">{community.category}</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{community.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{community.memberCount} members</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-xl font-semibold">Community Chat</h2>
          </div>

          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.userId === auth.currentUser?.uid
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.userId === auth.currentUser?.uid
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.userName}</p>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}