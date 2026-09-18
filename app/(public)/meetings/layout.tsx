import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex flex-wrap items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-800">Meeting Planner</h2>
                <NavLinks />
            </div>
            {children}
        </div>
    );
}