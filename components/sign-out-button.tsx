import { signOut } from '@/auth';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="text-sm text-blue-100 hover:text-white underline"
      >
        Sign Out
      </button>
    </form>
  );
}