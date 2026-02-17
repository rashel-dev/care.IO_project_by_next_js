"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaCalculator, FaCheckCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const BookingPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const service = services.find(s => s.id === id);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    durationValue: 1,
    durationType: 'hours' as 'hours' | 'days',
    division: '',
    district: '',
    city: '',
    area: '',
    address: '',
  });

  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?callbackUrl=/booking/${id}`);
    }
  }, [status, router, id]);

  useEffect(() => {
    if (service) {
      const hourlyRate = service.pricePerHour;
      const rate = formData.durationType === 'days' ? hourlyRate * 24 : hourlyRate;
      setTotalCost(rate * formData.durationValue);
    }
  }, [formData.durationValue, formData.durationType, service]);

  if (status === 'loading') return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><span className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></span></div>;
  if (!service) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Service Not Found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!formData.division || !formData.district || !formData.city || !formData.area || !formData.address) {
        toast.error("Please fill in all location details");
        return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.title,
          duration: {
            type: formData.durationType,
            value: formData.durationValue,
          },
          location: {
            division: formData.division,
            district: formData.district,
            city: formData.city,
            area: formData.area,
            address: formData.address,
          },
          totalCost: totalCost,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking confirmed and marked as paid!");
        setTimeout(() => {
          router.push('/my-bookings');
        }, 1500);
      } else {
        toast.error(data.message || "Failed to confirm booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during booking confirmation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Book {service.title}</h1>
            <p className="text-gray-400">Complete the steps below to schedule your care service.</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                        step >= s ? 'bg-cyan-500 border-cyan-500 text-white' : 'bg-transparent border-gray-700 text-gray-700'
                    }`}>
                        {step > s ? <FaCheckCircle /> : s}
                    </div>
                    {s < 3 && <div className={`w-16 h-1 transition-all ${step > s ? 'bg-cyan-500' : 'bg-gray-800'}`} />}
                </React.Fragment>
            ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
            {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                    <div className="flex items-center gap-3 text-white text-2xl font-bold mb-6">
                        <FaCalendarAlt className="text-cyan-500" />
                        Select Duration
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Duration Type</label>
                            <select 
                                name="durationType"
                                value={formData.durationType}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            >
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Value ({formData.durationType})</label>
                            <input 
                                type="number" 
                                name="durationValue"
                                min="1"
                                value={formData.durationValue}
                                onChange={handleChange}
                                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-8">
                        <button onClick={nextStep} className="flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all">
                            Next Step <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                    <div className="flex items-center gap-3 text-white text-2xl font-bold mb-6">
                        <FaMapMarkerAlt className="text-cyan-500" />
                        Service Location
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input name="division" placeholder="Division" value={formData.division} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white" />
                        <input name="district" placeholder="District" value={formData.district} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white" />
                        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white" />
                        <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white" />
                    </div>
                    <input name="address" placeholder="Detailed Address" value={formData.address} onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white" />
                    
                    <div className="flex justify-between pt-8">
                        <button onClick={prevStep} className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10">
                            <FaChevronLeft /> Back
                        </button>
                        <button onClick={nextStep} className="flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all">
                            Review Details <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                    <div className="flex items-center gap-3 text-white text-2xl font-bold mb-6">
                        <FaCalculator className="text-cyan-500" />
                        Confirm Booking
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/5 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Service</span>
                            <span className="text-white font-bold">{service.title}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-4">
                            <span className="text-gray-400">Duration</span>
                            <span className="text-white font-bold">{formData.durationValue} {formData.durationType}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-4">
                            <span className="text-gray-400">Location</span>
                            <span className="text-white font-bold text-right">{formData.area}, {formData.city}</span>
                        </div>
                        <div className="flex justify-between border-t-2 border-cyan-500/20 pt-4 mt-4">
                            <span className="text-xl text-white font-bold">Total Cost</span>
                            <span className="text-3xl text-cyan-500 font-extrabold">${totalCost}</span>
                        </div>
                    </div>

                    <div className="flex justify-between pt-8">
                        <button onClick={prevStep} className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10">
                            <FaChevronLeft /> Edit
                        </button>
                        <button 
                            onClick={handleSubmit} 
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-3 px-12 py-4 bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] text-white font-extrabold rounded-xl transition-all shadow-xl shadow-cyan-500/20 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Payment & Book'}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default BookingPage;
