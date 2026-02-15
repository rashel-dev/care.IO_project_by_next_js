"use client";

import React, { useEffect, useState } from 'react';
import { FaSearch, FaFilter, FaDownload, FaEllipsisV, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Booking {
  _id: string;
  serviceName: string;
  totalCost: number;
  status: string;
  createdAt: string;
  location: {
    city: string;
    area: string;
  };
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        toast.error("Failed to fetch admin bookings");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const statusStyles: any = {
    Pending: 'bg-yellow-500/10 text-yellow-500',
    Confirmed: 'bg-cyan-500/10 text-cyan-500',
    Cancelled: 'bg-rose-500/10 text-rose-500',
    Completed: 'bg-emerald-500/10 text-emerald-500',
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]"><span className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></span></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Booking History</h1>
          <p className="text-gray-400">View and manage all system transactions</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all font-bold uppercase text-sm tracking-widest">
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Bookings</p>
          <p className="text-4xl font-extrabold text-white mt-1">{bookings.length}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Revenue</p>
          <p className="text-4xl font-extrabold text-cyan-500 mt-1">${bookings.reduce((sum, b) => sum + b.totalCost, 0)}</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Active Orders</p>
          <p className="text-4xl font-extrabold text-white mt-1">{bookings.filter(b => b.status === 'Confirmed').length}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
                type="text" 
                placeholder="Search bookings..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all" 
            />
          </div>
          <div className="flex gap-4">
            <button className="px-5 py-3 bg-gray-900 border border-gray-700/50 rounded-xl text-gray-400 hover:text-white flex items-center gap-2 transition-all">
                <FaFilter /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Service</th>
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Location</th>
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Date</th>
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Amount</th>
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Status</th>
                <th className="px-8 py-5 text-gray-400 font-bold uppercase text-xs tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-white font-bold">{booking.serviceName}</p>
                    <p className="text-gray-500 text-xs mt-1">ID: {booking._id}</p>
                  </td>
                  <td className="px-8 py-6 text-gray-300">
                    {booking.location.area}, {booking.location.city}
                  </td>
                  <td className="px-8 py-6 text-gray-300">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-white font-extrabold">${booking.totalCost}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-gray-500 hover:text-white transition-all">
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
