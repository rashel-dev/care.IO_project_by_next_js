"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaUserCircle, FaEnvelope, FaIdCard, FaPhone, FaShieldAlt } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
    const { data: session, status, update } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<{
        name: string;
        email: string;
        image?: string;
        nid?: string;
        contact?: string;
        role?: string;
    } | null>(null);

    const initialForm = useMemo(() => ({
        name: profile?.name || session?.user?.name || "",
        image: profile?.image || session?.user?.image || "",
        nid: profile?.nid || "",
        contact: profile?.contact || "",
    }), [profile, session?.user]);

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        setForm(initialForm);
    }, [initialForm]);

    useEffect(() => {
        const load = async () => {
            if (status !== "authenticated") return;
            setIsLoading(true);
            try {
                const res = await fetch("/api/profile", { method: "GET" });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.message || "Failed to load profile");
                setProfile(data.user);
            } catch (e: any) {
                toast.error(e?.message || "Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [status]);

    if (status === "loading") return null;
    if (!session) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    image: form.image,
                    nid: form.nid,
                    contact: form.contact,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to update profile");
            setProfile(data.user);

            // Update next-auth session (name/image used across UI)
            await update({ name: data.user?.name, image: data.user?.image });

            toast.success("Profile updated!");
            setIsEditing(false);
        } catch (e: any) {
            toast.error(e?.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4">Account <span className="text-cyan-400">Settings</span></h1>
                    <p className="text-gray-400">Manage your personal information and preferences.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Panel - Avatar */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center space-y-6">
                            <div className="relative inline-block">
                                <img 
                                    src={profile?.image || session.user?.image || "https://i.pravatar.cc/150?u=me"} 
                                    className="w-32 h-32 rounded-full border-4 border-cyan-500/20 shadow-2xl shadow-cyan-500/10 object-cover mx-auto"
                                    alt="Avatar"
                                />
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs border-4 border-[#0a0a0a] cursor-pointer hover:scale-110 transition-transform">
                                    📸
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{profile?.name || session.user?.name}</h2>
                                <p className="text-cyan-500 text-sm font-bold uppercase tracking-widest mt-1">{profile?.role || (session.user as any).role || 'User'}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <FaShieldAlt className="text-cyan-500" /> Trust Status
                            </h3>
                            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                                ✅ Account Verified
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Details */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] shadow-2xl space-y-10">
                            <div className="grid sm:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaUserCircle /> Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        />
                                    ) : (
                                        <p className="text-white text-lg font-medium bg-white/5 p-4 rounded-xl border border-white/5">
                                            {profile?.name || session.user?.name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaEnvelope /> Email Address
                                    </label>
                                    <p className="text-white text-lg font-medium bg-white/5 p-4 rounded-xl border border-white/5">
                                        {profile?.email || session.user?.email}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaIdCard /> NID Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="nid"
                                            value={form.nid}
                                            onChange={handleChange}
                                            placeholder="Enter NID number"
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        />
                                    ) : (
                                        <p className={`${profile?.nid ? "text-white" : "text-gray-500 italic"} text-lg bg-white/5 p-4 rounded-xl border border-white/5`}>
                                            {profile?.nid || "Not provided"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaPhone /> Contact
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="contact"
                                            value={form.contact}
                                            onChange={handleChange}
                                            placeholder="Enter contact number"
                                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        />
                                    ) : (
                                        <p className={`${profile?.contact ? "text-white" : "text-gray-500 italic"} text-lg bg-white/5 p-4 rounded-xl border border-white/5`}>
                                            {profile?.contact || "Not provided"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex justify-end">
                                {isEditing ? (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => { setIsEditing(false); setForm(initialForm); }}
                                            disabled={isSaving}
                                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="px-10 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-xl shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                                        >
                                            {isSaving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        disabled={isLoading}
                                        className="px-10 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-xl shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                                    >
                                        Update Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" theme="dark" />
        </main>
    );
};

export default ProfilePage;
