import React from 'react';
import { Metadata } from 'next';
import { FaSearch, FaUserCheck, FaAward, FaShieldAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: "Find a Caregiver | Care.io",
  description: "Browse our directory of verified, professional caregivers for your specific needs.",
};

const CaregiversPage = () => {
    // Mock data for caregivers
    const caregivers = [
        { name: "Sarah Johnson", roles: ["Pediatric Specialist", "Newborn Care"], experience: "8 years", rating: 4.9, img: "https://i.pravatar.cc/150?u=sarah" },
        { name: "Michael Chen", roles: ["Senior Care", "Medication Management"], experience: "12 years", rating: 5.0, img: "https://i.pravatar.cc/150?u=michael" },
        { name: "Elena Rodriguez", roles: ["Post-Op Care", "Nurse Assistant"], experience: "5 years", rating: 4.8, img: "https://i.pravatar.cc/150?u=elena" },
    ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white">Find Your <span className="text-cyan-400">Perfect Match</span></h1>
                <p className="text-gray-400 text-xl">Browse our community of highly skilled and verified care professionals.</p>
            </div>
            <div className="relative w-full lg:w-96 group">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by role or expertise..." 
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caregivers.map((cg, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 hover:border-cyan-500/30 transition-all group hover:-translate-y-2">
                    <div className="flex items-center gap-6 mb-8">
                        <img src={cg.img} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10 group-hover:border-cyan-500/50 transition-all" alt={cg.name} />
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{cg.name}</h3>
                            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                                <FaAward /> {cg.experience} Exp.
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {cg.roles.map((r, ri) => (
                                <span key={ri} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-400 border border-white/10">{r}</span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between py-4 border-y border-white/5">
                            <span className="text-gray-500">Perfect Rating</span>
                            <span className="text-white font-black">⭐ {cg.rating}</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                        View Profile
                    </button>
                </div>
            ))}
        </div>

        {/* Verification Banner */}
        <div className="mt-20 p-10 bg-linear-to-r from-cyan-500/5 to-transparent border-l-4 border-cyan-500 rounded-r-3xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 text-3xl shrink-0">
                <FaShieldAlt />
            </div>
            <div>
                <h4 className="text-xl font-bold text-white mb-2 underline decoration-cyan-500/30 underline-offset-4">Highest Vetting Standards</h4>
                <p className="text-gray-400">All caregivers listed on care.IO pass a rigorous 12-point background check, medical screening, and empathy test before joining our community.</p>
            </div>
        </div>
      </div>
    </main>
  );
};

export default CaregiversPage;
