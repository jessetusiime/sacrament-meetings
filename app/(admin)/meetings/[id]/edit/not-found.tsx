import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Meeting Not Found</h1>
      <p className="mt-3 text-slate-600">
        The meeting you are looking for does not exist.
      </p>
      <div className="mt-6 flex items-center justify-center">
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}