import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img src="/care_logo.png" alt="Care.io Logo" className="w-10 h-10 object-contain" />
                            <span className="text-2xl font-bold text-cyan-500">care.IO</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Providing compassionate, professional caregiving services for families. Our mission is to ensure every loved one receives the dignity and care they deserve.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-cyan-400 transition-colors">Our Services</Link></li>
                            <li><Link href="/caregivers" className="text-gray-400 hover:text-cyan-400 transition-colors">Find Caregivers</Link></li>
                            <li><Link href="/register?type=caregiver" className="text-gray-400 hover:text-cyan-400 transition-colors">Join as Caregiver</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Latest News</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="/services#baby-care" className="text-gray-400 hover:text-cyan-400 transition-colors">Baby Care</Link></li>
                            <li><Link href="/services#elderly-care" className="text-gray-400 hover:text-cyan-400 transition-colors">Elderly Service</Link></li>
                            <li><Link href="/services#sick-care" className="text-gray-400 hover:text-cyan-400 transition-colors">Sick Person Care</Link></li>
                            <li><Link href="/services#physical-therapy" className="text-gray-400 hover:text-cyan-400 transition-colors">Companion Care</Link></li>
                            <li><Link href="/services#physical-therapy" className="text-gray-400 hover:text-cyan-400 transition-colors">Support Care</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <FaMapMarkerAlt className="mt-1 text-cyan-500" />
                                <span>123 Care Street, Heart City,<br />HC 45678, USA</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaPhone className="text-cyan-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaEnvelope className="text-cyan-500" />
                                <span>support@care.io</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} care.IO Healthcare Services. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
