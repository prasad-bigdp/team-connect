'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { MessageCircle, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Message));
      setMessages(messagesData.reverse());
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    // Add message logic here
    setNewMessage('');
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Community Chat</h1>
          </div>

          <div className="h-[600px] flex flex-col">
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