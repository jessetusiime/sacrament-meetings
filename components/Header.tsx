import Link from 'next/link';

export default function Header() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-blue-900 text-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:underline">
                    Sacrament Meeting Planner
                </Link>
                <div className="text-sm">
                    <span className="block">Cambridge Ward</span>
                    <span className="block text-xs opacity-75">{dateStr}</span>
                </div>
            </div>
        </header>
    );
}