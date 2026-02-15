"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt, FaTimesCircle, FaCheckCircle, FaHourglassHalf, FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';

interface Booking {
  _id: string;
  serviceName: string;
  duration: {
    type: 'hours' | 'days';
    value: number;
  };
  location: {
    area: string;
    city: string;
    address: string;
  };
  totalCost: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const MyBookings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/my-bookings');
    } else if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status, router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully");
        fetchBookings(); // Refresh the list
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to cancel booking");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const statusIcons = {
    Pending: <FaHourglassHalf className="text-yellow-500" />,
    Confirmed: <FaCheckCircle className="text-cyan-500" />,
    Completed: <FaCheckCircle className="text-emerald-500" />,
    Cancelled: <FaTimesCircle className="text-rose-500" />
  };

  const statusColors = {
    Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Confirmed: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    Completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Cancelled: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
  };

  if (isLoading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><span className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></span></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white tracking-tight">My Bookings</h1>
                <p className="text-gray-400">Manage and track your caregiving requests</p>
            </div>
            <Link href="/" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all">
                Book New Service
            </Link>
        </div>

        {bookings.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-20 text-center space-y-6">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto text-gray-700 text-4xl">
                    <FaFileAlt />
                </div>
                <h2 className="text-2xl font-bold text-white">No bookings found</h2>
                <p className="text-gray-400 max-w-md mx-auto">You haven't made any caregiving requests yet. Explore our services to get started.</p>
                <Link href="/" className="inline-block px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-500/20">
                    Explore Services
                </Link>
            </div>
        ) : (
            <div className="grid gap-6">
                {bookings.map((booking) => (
                    <div 
                        key={booking._id} 
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${statusColors[booking.status]}`}>
                                {statusIcons[booking.status]}
                                {booking.status}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-4 gap-8 items-center">
                            {/* Service Info */}
                            <div className="col-span-1 space-y-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                                    {booking.serviceName}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Booking Details */}
                            <div className="col-span-2 grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <FaCalendarAlt className="text-cyan-500" />
                                        <span>{booking.duration.value} {booking.duration.type}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-300">
                                        <FaMapMarkerAlt className="text-rose-500 mt-1" />
                                        <span className="text-sm leading-relaxed">
                                            {booking.location.area}, {booking.location.city}<br/>
                                            <span className="text-gray-500">{booking.location.address}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-bold">Total Cost</p>
                                    <p className="text-3xl font-extrabold text-white">${booking.totalCost}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="col-span-1 flex lg:flex-col gap-3 justify-end lg:justify-center">
                                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-cyan-500/20 text-white font-bold rounded-xl border border-white/10 transition-all hover:border-cyan-500/50">
                                    <FaInfoCircle /> Details
                                </button>
                                {booking.status === 'Pending' && (
                                    <button 
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold rounded-xl border border-rose-500/20 transition-all"
                                    >
                                        <FaTimesCircle /> Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default MyBookings;
