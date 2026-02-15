"use client";

import React from 'react';
import { FaChartBar, FaWallet, FaUserShield, FaArrowUp } from 'react-icons/fa';

const AdminOverview = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight uppercase">Dashboard <span className="text-cyan-500">Overview</span></h1>
        <p className="text-gray-400 mt-2">Welcome back to the command center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <FaWallet className="text-xl" />
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Net Revenue</p>
            <div className="flex items-end gap-3 mt-2">
                <p className="text-3xl font-extrabold text-white">$12,450</p>
                <p className="text-emerald-500 text-sm font-bold flex items-center gap-1 mb-1">
                    <FaArrowUp /> 12%
                </p>
            </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <FaChartBar className="text-xl" />
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Active Services</p>
            <p className="text-3xl font-extrabold text-white mt-2">48</p>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <FaUserShield className="text-xl" />
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Verified Caregivers</p>
            <p className="text-3xl font-extrabold text-white mt-2">156</p>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-orange-500/30 transition-all group">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <FaLayout className="text-xl" />
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Support Tickets</p>
            <p className="text-3xl font-extrabold text-white mt-2">3</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">System Performance</h3>
            <div className="h-64 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
                <p className="text-gray-600 font-bold uppercase tracking-[0.2em]">Usage Analytics Graph</p>
            </div>
        </div>
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tight">Recent Activity</h3>
            <div className="space-y-6">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 shrink-0 border border-cyan-500/20" />
                        <div>
                            <p className="text-white text-sm font-bold">New Booking Confirmed</p>
                            <p className="text-gray-500 text-xs">2 minutes ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// Using icons that weren't imported but used in mock UI
const FaLayout = ({ className }: { className?: string }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80zm400 352H48V80h352v352zm-32-288H80v224h288V144z"></path>
    </svg>
);

export default AdminOverview;
