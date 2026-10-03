import Link from 'next/link';
import { auth } from '@/auth';
import SignOutButton from './sign-out-button';

export default async function Header() {
  const session = await auth();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-blue-900 text-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center gap-4 flex-wrap">
        <Link href="/" className="text-2xl font-bold hover:underline">
          Sacrament Meeting Planner
        </Link>
        <div className="text-sm text-right">
          <div className="mb-1">
            <span className="block">Cambridge Ward</span>
            <span className="block text-xs opacity-75">{dateStr}</span>
          </div>
          {session?.user ? (
            <div className="text-xs flex items-center justify-end gap-2">
              <span className="opacity-90">{session.user.email}</span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs text-blue-100 hover:text-white underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}