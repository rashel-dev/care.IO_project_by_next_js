import React from 'react';
import { FaBaby, FaBlind, FaUserNurse, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    title: "Baby Care",
    description: "Expert nurturing for your little ones. Our babysitters are trained in early childhood safety and creative engagement.",
    icon: <FaBaby />,
    image: "/baby_care.png",
    color: "from-pink-500/20 to-rose-500/20",
    textColor: "text-rose-400"
  },
  {
    title: "Elderly Service",
    description: "Dignified support for seniors. We assist with daily living, medication management, and provide valuable companionship.",
    icon: <FaBlind />,
    image: "/elderly_care.png",
    color: "from-cyan-500/20 to-blue-500/20",
    textColor: "text-cyan-400"
  },
  {
    title: "Sick People Service",
    description: "Specialized care for those recovering or managing illness. Our caregivers ensure a comfortable healing environment at home.",
    icon: <FaUserNurse />,
    image: "/hero_caregiver.png", // Reusing this for now
    color: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-400"
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase">What We Offer</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-white">Our Dedicated Services</h3>
          <p className="text-gray-400 text-lg">
            We provide specialized care solutions designed to bring peace of mind to your family, no matter the stage of life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-black/50"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60`} />
                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-2xl border border-white/10">
                  {service.icon}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <h4 className={`text-2xl font-bold ${service.textColor}`}>{service.title}</h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center gap-2 text-white font-semibold hover:text-cyan-400 transition-colors group/link"
                >
                  Learn More 
                  <FaArrowRight className="text-sm transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
