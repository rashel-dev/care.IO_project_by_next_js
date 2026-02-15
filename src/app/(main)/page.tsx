import React from 'react';
import Hero from '@/components/Home/Hero';
import About from '@/components/Home/About';
import Services from '@/components/Home/Services';
import Testimonials from '@/components/Home/Testimonials';
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care.io | Premium Caregiving Services",
  description: "Experience exceptional care for your loved ones. We provide verified experts for baby care, elderly support, and specialized medical assistance.",
  keywords: ["caregiving", "baby care", "elderly care", "home nursing", "medical support"],
};

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <About />

            {/* Services Section */}
            <Services />

            {/* Testimonials & Stats Section */}
            <Testimonials />

            {/* Final CTA Section */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-6">
                    <div className="relative rounded-[40px] overflow-hidden bg-white/5 border border-white/10 p-12 lg:p-20 text-center space-y-8">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
                        
                        <h2 className="text-4xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
                            Ready to Give Your Family the <span className="text-cyan-400">Care They Deserve?</span>
                        </h2>
                        
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Join thousands of families who trust care.IO for safe, professional, and heart-centered caregiving.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button className="px-10 py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-xl shadow-cyan-500/20">
                                Get Started Now
                            </button>
                            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all hover:scale-105">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
