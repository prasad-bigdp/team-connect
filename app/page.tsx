'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Users, Brain, MapPin, Trophy, Gamepad, Book, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative h-[700px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902"
          alt="Young teens having fun"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-6xl font-bold mb-6 animate-fade-up">Your Wellness Journey Begins!</h1>
            <p className="text-2xl mb-8 animate-fade-up animation-delay-200">Discover a happier, healthier you with friends who understand and support you!</p>
            <div className="space-x-4">
              <Button size="lg" className="animate-fade-up animation-delay-300 bg-primary hover:bg-primary/90 text-lg" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="animate-fade-up animation-delay-400 text-lg" asChild>
                <Link href="/events">Join Activities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Activities Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Your Path to Wellness</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn healthy habits and make friends who support your journey!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-up">
            <Card className="p-6 group hover:scale-105 transition-transform duration-300">
              <Brain className="h-12 w-12 text-primary mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Mindful Gaming</h3>
              <p className="text-muted-foreground">Learn to balance gaming with other fun activities!</p>
            </Card>
            
            <Card className="p-6 group hover:scale-105 transition-transform duration-300">
              <Heart className="h-12 w-12 text-primary mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Emotional Wellness</h3>
              <p className="text-muted-foreground">Express yourself and learn to handle big feelings!</p>
            </Card>
            
            <Card className="p-6 group hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-primary mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Real Connections</h3>
              <p className="text-muted-foreground">Make real friends and have fun offline!</p>
            </Card>
            
            <Card className="p-6 group hover:scale-105 transition-transform duration-300">
              <Star className="h-12 w-12 text-primary mb-4 group-hover:animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Healthy Habits</h3>
              <p className="text-muted-foreground">Build positive routines that make you feel great!</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Wellness Community</h2>
            <p className="text-muted-foreground">See how other kids are growing and thriving!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74"
              alt="Kids practicing mindfulness"
              width={300}
              height={300}
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              alt="Kids doing yoga"
              width={300}
              height={300}
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2"
              alt="Kids enjoying outdoor activities"
              width={300}
              height={300}
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
              alt="Kids meditating together"
              width={300}
              height={300}
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Fun CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472162072942-cd5147eb3902')] bg-cover bg-center opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Feel Amazing?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join other kids who are learning to be their happiest, healthiest selves!
              </p>
              <Button size="lg" variant="secondary" className="text-lg animate-bounce" asChild>
                <Link href="/register">Start Your Wellness Journey!</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}