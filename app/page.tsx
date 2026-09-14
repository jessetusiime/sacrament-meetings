import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4 font-display">
        Welcome to the Sacrament Meeting Planner
      </h1>
      <div className="relative w-full max-w-2xl mx-auto h-64 my-6">
        <Image
          src="/chapel.jpg"
          alt="A peaceful chapel interior"
          fill
          className="object-cover rounded-lg shadow-md"
          priority
        />
      </div>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        View and manage sacrament meeting agendas for your ward.
      </p>
      <Link
        href="/meetings"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View All Meetings
      </Link>
    </div>
  );
}