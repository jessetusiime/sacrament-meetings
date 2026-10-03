import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import MeetingSearch from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query ?? '';
  const currentPage = Number(params?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-blue-900">All Meetings</h1>
        <MeetingSearch />
        <Link
      href="/admin/meetings/new"
      className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
    >
      + New Meeting
    </Link>
      </div>

      {meetings.length === 0 ? (
        <p className="text-gray-500">No meetings match your search.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}