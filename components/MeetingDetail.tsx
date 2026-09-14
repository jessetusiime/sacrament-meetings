import type { SacramentMeeting } from '@/lib/types';
import PrintButton from './PrintButton';

interface Props {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: Props) {
    return (
        <article className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto print:shadow-none print:p-0">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-1">
                Sacrament Meeting
            </h1>
            <p className="text-center text-gray-600 mb-4">
                {new Date(meeting.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
            <div className="border-t border-b py-4 space-y-2">
                <p><span className="font-semibold">Meeting Type:</span> {meeting.meetingType}</p>
                <p><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
                <p><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
                {meeting.announcements && meeting.announcements.length > 0 && (
                    <div>
                        <span className="font-semibold">Announcements:</span>
                        <ul className="list-disc ml-6">
                            {meeting.announcements.map((ann, i) => <li key={i}>{ann}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            <div className="space-y-4 mt-4">
                <div>
                    <h2 className="font-semibold">Opening Hymn</h2>
                    <p>{meeting.openingHymn.number} – {meeting.openingHymn.title}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Opening Prayer</h2>
                    <p>{meeting.openingPrayer}</p>
                </div>
                {meeting.wardBusiness.length > 0 && (
                    <div>
                        <h2 className="font-semibold">Ward Business</h2>
                        <ul className="list-disc ml-6">
                            {meeting.wardBusiness.map((item, i) => <li key={i}>{item.description}</li>)}
                        </ul>
                    </div>
                )}
                {meeting.stakeBusiness && (
                    <div>
                        <h2 className="font-semibold">Stake Business</h2>
                        <p>There will be stake business.</p>
                    </div>
                )}
                <div>
                    <h2 className="font-semibold">Sacrament Hymn</h2>
                    <p>{meeting.sacramentHymn.number} – {meeting.sacramentHymn.title}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Speakers / Musical Numbers</h2>
                    <ul className="list-disc ml-6">
                        {meeting.speakers.map((item, i) => (
                            <li key={i}>
                                {item.name} – {item.type === 'musical-number' ? 'Musical Number' : `Topic: ${item.topic}`}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold">Closing Hymn</h2>
                    <p>{meeting.closingHymn.number} – {meeting.closingHymn.title}</p>
                </div>
                <div>
                    <h2 className="font-semibold">Closing Prayer</h2>
                    <p>{meeting.closingPrayer}</p>
                </div>
            </div>

                  <div className="mt-6 text-center">
        <PrintButton />
      </div>
        </article>
    );
}