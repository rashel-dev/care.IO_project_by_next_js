"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { services } from '@/data/services';
import ServiceDetailContent from '@/components/Service/ServiceDetailContent';
import { notFound } from 'next/navigation';

const ServiceDetailPage = () => {
  const { id } = useParams();
  
  const service = services.find((s) => s.id === id);

  if (!service) {
    // Return a simple message instead of notFound() to avoid infinite loops or other issues in some environments
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
            Service Not Found
        </div>
    );
  }

  return <ServiceDetailContent service={service} />;
}

export default ServiceDetailPage;
