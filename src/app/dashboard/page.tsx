"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/my-bookings');
      }
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></span>
        <p className="text-gray-400 font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
