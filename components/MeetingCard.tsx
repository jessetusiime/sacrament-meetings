import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

interface Props {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: Props) {
  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

  return (
    <div className="border rounded-lg p-4 shadow bg-white flex flex-col gap-3">
      <Link href={`/meetings/${meeting.id}`} className="block">
        <h2 className="text-xl font-semibold text-blue-800">
          {new Date(meeting.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h2>
        <p className="text-gray-600">
          {meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1)}
        </p>
        <p className="text-sm text-gray-500">Conducting: {meeting.conducting}</p>
      </Link>
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="text-sm px-3 py-1 rounded border border-slate-300 hover:bg-slate-50"
        >
          Edit
        </Link>
        <form action={deleteMeetingWithId}>
          <button
            type="submit"
            className="text-sm px-3 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}