import { services } from '@/data/services';
import { Metadata } from 'next';
import ServiceDetailContent from '@/components/Service/ServiceDetailContent';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    return {
      title: 'Service Not Found | Care.io',
    };
  }

  return {
    title: `${service.title} | Premium Caregiving by Care.io`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Care.io`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default function Page({ params }: Props) {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
}
