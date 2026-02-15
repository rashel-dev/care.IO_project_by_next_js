import React from 'react';
import { FaHeart, FaShieldAlt, FaUsers } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500 border border-white/5">
                <img src="/baby_care.png" alt="Baby Care" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500 border border-white/5">
                <img src="/elderly_care.png" alt="Elderly Care" className="w-full h-48 object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500 border border-white/5">
                <div className="w-full h-48 bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center p-8 text-center">
                    <p className="text-white font-medium text-lg italic">"Dedicated to restoring peace and comfort to your home."</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 duration-500 border border-white/5">
                <img src="/hero_caregiver.png" alt="Professional Care" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase">Our Mission</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Empowering Families Through <span className="text-cyan-400">Exceptional Care</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                At care.IO, we believe that everyone deserves to live with dignity and receive care that respects their individuality. Our journey started with a simple vision: to bridge the gap between quality caregiving and the families who need it most.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <FaHeart />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Full Compassion</h4>
                  <p className="text-gray-400">We treat every client like family, ensuring emotional and physical well-being is always prioritized.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Verified Experts</h4>
                  <p className="text-gray-400">Every caregiver undergoes rigorous background checks and continuous professional training.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <FaUsers />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Community Driven</h4>
                  <p className="text-gray-400">We foster a community of support, connecting caregivers and families for lasting bonds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
