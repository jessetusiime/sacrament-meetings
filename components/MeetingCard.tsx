import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface Props {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: Props) {
    return (
        <Link href={`/meetings/${meeting.id}`}>
            <div className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer bg-white">
                <h2 className="text-xl font-semibold text-blue-800">
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>
                <p className="text-gray-600">
                    {meeting.meetingType.charAt(0).toUpperCase() + meeting.meetingType.slice(1)}
                </p>
                <p className="text-sm text-gray-500">Conducting: {meeting.conducting}</p>
            </div>
        </Link>
    );
}