'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'This Sunday' }
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex space-x-4">
            {links.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === href
                            ? 'bg-blue-700 text-white'
                            : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                        }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}