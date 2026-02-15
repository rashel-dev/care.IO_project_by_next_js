import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Working Mother",
    text: "The baby care service was a lifesaver for our family. Our caregiver Sarah was not only professional but genuinely loved playing with our son. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Michael Chen",
    role: "Devoted Son",
    text: "Finding elderly care for my father was stressful until we found care.IO. Their compassion and medical attention gave us the peace of mind we desperately needed.",
    avatar: "https://i.pravatar.cc/150?u=michael"
  },
  {
    name: "Emily Davis",
    role: "Recovering Patient",
    text: "The post-surgery care I received was exceptional. My caregiver was attentive, kind, and helped me through a very difficult recovery period. I'm forever grateful.",
    avatar: "https://i.pravatar.cc/150?u=emily"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase">Testimonials</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-white">Families Love <span className="text-cyan-400">care.IO</span></h3>
          <p className="text-gray-400 text-lg">
            Hear from the families we've had the privilege to serve and support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300 relative group"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                <FaQuoteLeft className="text-sm" />
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-1 text-yellow-500">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                
                <p className="text-gray-300 text-lg italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30"
                  />
                  <div>
                    <h5 className="font-bold text-white">{testimonial.name}</h5>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 p-12 rounded-[40px] bg-linear-to-r from-cyan-600 to-blue-700 shadow-2xl shadow-cyan-500/20">
            <div className="text-center space-y-2 border-r border-white/20 last:border-none">
                <h4 className="text-4xl lg:text-6xl font-extrabold text-white">98%</h4>
                <p className="text-white/80 font-medium">Customer satisfaction</p>
            </div>
            <div className="text-center space-y-2 border-r border-white/20 last:border-none">
                <h4 className="text-4xl lg:text-6xl font-extrabold text-white">2.5k+</h4>
                <p className="text-white/80 font-medium">Services provides</p>
            </div>
            <div className="text-center space-y-2 border-r border-white/20 last:border-none">
                <h4 className="text-4xl lg:text-6xl font-extrabold text-white">100+</h4>
                <p className="text-white/80 font-medium">Expert caregivers</p>
            </div>
            <div className="text-center space-y-2 border-r border-white/20 last:border-none">
                <h4 className="text-4xl lg:text-6xl font-extrabold text-white">5.0</h4>
                <p className="text-white/80 font-medium">Review on Google</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
