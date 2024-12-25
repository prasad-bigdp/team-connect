import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Users, Brain, MapPin, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/react"
export default function Home() {
  return (
    <div className="min-h-screen">
       <link rel="icon" href="/favicon.ico" />
      <Analytics />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069"
          alt="Teens collaborating"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-5xl font-bold mb-6">Connect, Grow, and Thrive Together</h1>
            <p className="text-xl mb-8">Join our community of teens building meaningful real-world connections through workshops, summits, and local meetups.</p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-black" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Teen Connect?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're building a community focused on real-world connections and mental wellness.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-muted-foreground">Connect with like-minded teens in your area and build lasting friendships.</p>
            </Card>
            
            <Card className="p-6">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mental Wellness</h3>
              <p className="text-muted-foreground">Learn strategies for maintaining mental health and managing stress.</p>
            </Card>
            
            <Card className="p-6">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Events</h3>
              <p className="text-muted-foreground">Participate in workshops and meetups happening in your community.</p>
            </Card>
            
            <Card className="p-6">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
              <p className="text-muted-foreground">Develop life skills and build confidence through guided activities.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Change?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of teens who are taking control of their mental health and building meaningful connections.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}