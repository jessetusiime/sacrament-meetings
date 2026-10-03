import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);
  if (isNaN(id)) return { title: 'Meeting Not Found' };

  const meeting = await getMeetingById(id);
  if (!meeting) return { title: 'Meeting Not Found' };

  const dateStr = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `Meeting - ${dateStr}`,
    description: `Sacrament meeting agenda for ${dateStr}. Conducting: ${meeting.conducting}.`,
  };
}

export default async function MeetingPage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}