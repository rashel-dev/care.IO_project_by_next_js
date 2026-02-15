import React from 'react';
import { services } from '@/data/services';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, FaStar } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Services | Care.io",
  description: "Explore our wide range of professional caregiving services including baby care, elderly support, and specialized medical assistance.",
};

const ServicesPage = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold uppercase tracking-widest animate-fade-in">
            <FaStar className="text-xs" />
            Our Expertise
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Care Solutions</span>
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            Discover our range of heart-centered services designed to support your family through every stage and challenge of life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col h-full rounded-[40px] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-3 shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
            >
              {/* Image Section */}
              <div className="h-72 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="px-4 py-1.5 rounded-full bg-cyan-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h2>
                  <div className="text-right">
                    <p className="text-cyan-400 text-2xl font-black">${service.pricePerHour}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Per Hour</p>
                  </div>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Performance Markers */}
                <div className="space-y-3 mb-10 mt-auto">
                    {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-gray-300 text-sm">
                            <FaCheckCircle className="text-cyan-500 shrink-0" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <Link 
                  href={`/service/${service.id}`}
                  className="w-full py-5 bg-white/5 hover:bg-cyan-500 text-white font-bold rounded-2xl border border-white/10 hover:border-cyan-500 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                >
                  View Full Details
                  <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-24 p-12 lg:p-16 rounded-[48px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Need a <span className="text-cyan-400">Custom Care Plan?</span></h2>
                    <p className="text-gray-400 text-lg">We understand every family is unique. Contact our care coordinators for a personalized consultation today.</p>
                </div>
                <button className="px-12 py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl transition-all hover:scale-105 shadow-[0_20px_50px_rgba(6,182,212,0.3)] active:scale-95 whitespace-nowrap">
                    Talk to an Expert
                </button>
            </div>
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
