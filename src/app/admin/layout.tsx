"use client";

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaThLarge, FaClipboardList, FaUsers, FaCog, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <span className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden lg:flex flex-col">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/care_logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-white">care.<span className="text-cyan-500">ADMIN</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <FaThLarge /> Dashboard
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 text-cyan-400 bg-cyan-500/10 rounded-xl transition-all font-bold">
            <FaClipboardList /> All Bookings
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <FaUsers /> Clients
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <FaChartLine /> Reports
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
            <h2 className="text-xl font-bold text-white">Admin Control Panel</h2>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-white text-sm font-bold">{session?.user?.name}</p>
                    <p className="text-cyan-500 text-xs uppercase tracking-widest">{session?.user?.role}</p>
                </div>
                <img src={session?.user?.image || "https://i.pravatar.cc/150"} className="w-10 h-10 rounded-full border border-white/10" alt="avatar" />
            </div>
        </header>

        <div className="p-8 lg:p-12">
            {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
