"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img src="/care_logo.png" alt="Care.io Logo" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
                        <span className="text-2xl font-bold text-white tracking-tight">care.<span className="text-cyan-500">IO</span></span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/about" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">About</Link>
                        <Link href="/services" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Services</Link>
                        <Link href="/caregivers" className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">Find Help</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link 
                                href={session.user?.role === 'admin' ? '/admin' : '/my-bookings'} 
                                className="hidden md:block text-gray-300 hover:text-white font-medium"
                            >
                                Dashboard
                            </Link>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-white/10 hover:border-cyan-500/50 transition-all">
                                    <div className="w-10 rounded-full">
                                        <img alt="User profile" src={session.user?.image || "https://i.pravatar.cc/150?u=default"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-[#1a1a1a] border border-white/10 rounded-2xl w-52 space-y-2">
                                    <li className="px-4 py-2 text-xs text-gray-400 border-b border-white/5 pb-2 mb-2">
                                        Hi, {session.user?.name?.split(' ')[0]}
                                    </li>
                                    <li><Link href="/profile" className="text-gray-300 hover:text-cyan-400 py-2">My Profile</Link></li>
                                    <li><Link href="/my-bookings" className="text-gray-300 hover:text-cyan-400 py-2">My Bookings</Link></li>
                                    <li>
                                        <button 
                                            onClick={() => signOut()}
                                            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 py-2"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="px-6 py-2.5 text-gray-300 hover:text-white font-semibold transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
