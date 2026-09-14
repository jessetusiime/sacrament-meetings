import { getMeetings } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

export default async function MeetingsPage() {
    const meetings = await getMeetings(); // in-memory, synchronous but we can treat as async

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Meetings</h1>
            {meetings.length === 0 ? (
                <p className="text-gray-500">No meetings found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}
        </div>
    );
}