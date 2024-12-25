'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Heart, Brain, Smile, Users, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5"
          alt="Teens supporting each other"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-5xl font-bold mb-6 animate-fade-up">Our Mission</h1>
            <p className="text-xl mb-4 animate-fade-up animation-delay-200">
              Helping young minds thrive in the digital age
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold mb-6">Why MindfulMe Exists</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We created MindfulMe because we understand that being a teen today isn't always easy. 
            With social media, gaming, and online pressures, it's important to have a safe space 
            to learn, grow, and connect with others who understand what you're going through.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:scale-105 transition-transform duration-300">
              <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mental Wellness</h3>
              <p className="text-sm text-muted-foreground">Learn to understand and manage your feelings</p>
            </Card>
            <Card className="p-6 hover:scale-105 transition-transform duration-300">
              <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safe Space</h3>
              <p className="text-sm text-muted-foreground">A supportive community that understands you</p>
            </Card>
            <Card className="p-6 hover:scale-105 transition-transform duration-300">
              <Smile className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real Fun</h3>
              <p className="text-sm text-muted-foreground">Discover joy beyond screens</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Mental health professionals and youth advocates dedicated to your wellbeing
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Dr. Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Child Psychologist</p>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Michael Chen</h3>
              <p className="text-sm text-muted-foreground">Youth Counselor</p>
            </Card>
            <Card className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold">Emma Williams</h3>
              <p className="text-sm text-muted-foreground">Digital Wellness Expert</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your journey to better mental wellness today!
          </p>
          <Button size="lg" className="animate-bounce" asChild>
            <Link href="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}