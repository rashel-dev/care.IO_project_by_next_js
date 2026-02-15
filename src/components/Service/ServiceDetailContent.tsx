"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaClock, FaTag, FaHeart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { Service } from '@/data/services';

const ServiceDetailContent = ({ service }: { service: Service }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleBookNow = () => {
        if (!session) {
            router.push(`/login?callbackUrl=/booking/${service.id}`);
        } else {
            router.push(`/booking/${service.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to All Services
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Image Section */}
                    <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl animate-fade-in">
                        <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold">
                                {service.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                {service.title}
                            </h1>
                            <div className="flex flex-wrap gap-6 pt-2">
                                <div className="flex items-center gap-2 text-cyan-400 font-semibold bg-cyan-500/5 px-4 py-2 rounded-2xl border border-cyan-500/10">
                                    <FaClock />
                                    <span>Available 24/7</span>
                                </div>
                                <div className="flex items-center gap-2 text-white font-semibold bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                                    <FaTag className="text-blue-500" />
                                    <span>${service.pricePerHour}/hour</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xl text-gray-400 leading-relaxed italic">
                            "{service.description}"
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                <FaHeart className="text-rose-500" />
                                Deep Care Overview
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {service.detailedDescription}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white">Service Highlights</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-all">
                                        <FaCheckCircle className="text-cyan-500 shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row gap-6">
                            <button 
                                onClick={handleBookNow}
                                className="px-12 py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-cyan-500/30 flex-1 text-center text-lg"
                            >
                                Book Service Now
                            </button>
                            <button className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all hover:scale-105 flex-1 text-center text-lg">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailContent;
