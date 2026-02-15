import React from 'react';
import About from '@/components/Home/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Care.io",
  description: "Learn more about Care.io's mission to provide compassionate and professional caregiving services for families.",
};

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="py-20 text-center container mx-auto px-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">Our <span className="text-cyan-400">Story</span></h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">We're on a mission to redefine caregiving for the modern world, combining technology with human heart.</p>
      </div>
      <About />
      
      {/* Additional Team/Mission Sections can be added here */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 text-center">
                <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white">Trust</h3>
                    <p className="text-gray-400">Built on years of verified excellence and family satisfaction.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white">Safety</h3>
                    <p className="text-gray-400">Your security is our priority, with 100% background-checked staff.</p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white">Love</h3>
                    <p className="text-gray-400">Going beyond professional duty to provide real emotional support.</p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
