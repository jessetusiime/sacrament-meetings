import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-05-03',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Ward temple night: May 10', 'Combined YM/YW activity Friday'],
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: '', type: 'musical-number' },
            { name: 'Brother Taylor', topic: 'The Atonement', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis'
    },
    {
        id: 2,
        date: '2026-05-10',
        meetingType: 'testimony',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Ward temple night cancelled'],
        openingHymn: { number: 4, title: 'How Great Thou Art' },
        openingPrayer: 'Sister Clark',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Adams', topic: 'Testimony', type: 'speaker' },
            { name: 'Sister Martinez', topic: 'Testimony', type: 'speaker' },
            { name: 'Young Women', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 34, title: 'Oh, May My Soul Commune with Thee' },
        closingPrayer: 'Sister Lee'
    },
    {
        id: 3,
        date: '2026-05-17',
        meetingType: 'stake',
        presiding: 'Stake President Johnson',
        conducting: 'Stake Executive Secretary Clark',
        announcements: ['Stake conference next week'],
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Evans',
        wardBusiness: [{ description: 'Approval of new stake budget' }],
        stakeBusiness: true,
        sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
        speakers: [
            { name: 'President Johnson', topic: 'The Gathering of Israel', type: 'speaker' },
            { name: 'Stake Choir', topic: '', type: 'musical-number' }
        ],
        closingHymn: { number: 5, title: 'High on the Mountain Top' },
        closingPrayer: 'Brother Hansen'
    },
    {
        id: 4,
        date: '2026-05-24',
        meetingType: 'regular',
        presiding: 'Bishop Smith',
        conducting: 'Brother Jones',
        announcements: ['Baptismal service at 7pm Saturday'],
        openingHymn: { number: 6, title: 'Redeemer of Israel' },
        openingPrayer: 'Sister Ortiz',
        wardBusiness: [{ description: 'Calling of new Young Men president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Kim', topic: 'Sacrifice', type: 'speaker' },
            { name: 'Sister Patel', topic: 'Service', type: 'speaker' }
        ],
        closingHymn: { number: 15, title: 'I Stand All Amazed' },
        closingPrayer: 'Brother Wilson'
    },
    {
        id: 5,
        date: '2026-05-31',
        meetingType: 'general',
        presiding: 'President Nelson',
        conducting: 'Bishop Smith',
        announcements: ['General Conference weekend'],
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Thompson',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [
            { name: 'Elder Uchtdorf', topic: 'Hope', type: 'speaker' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Anderson'
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) {
        return meetings.filter(m => m.date === date);
    }
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}