import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Trusted by 10,000+ Families
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
              Compassionate Care for Your <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Loved Ones</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Experience professional, heart-centered caregiving tailored to your family's unique needs. From newborns to seniors, we're here to provide comfort and support.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/services" 
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
              >
                Explore Services
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Join Our Team
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <h3 className="text-3xl font-bold text-white">24/7</h3>
                <p className="text-sm text-gray-500">Available Support</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">5k+</h3>
                <p className="text-sm text-gray-500">Active Caregivers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">99%</h3>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
              <img 
                src="/hero_caregiver.png" 
                alt="Compassionate Caregiver" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/60 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-pulse delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
