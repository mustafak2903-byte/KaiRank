import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/marketing/service-page";
import { getService, services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: `${service.navLabel} for private clinics`,
    description: service.description,
    path: `/${service.slug}/`,
  });
}

export default async function ServiceRoute({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
