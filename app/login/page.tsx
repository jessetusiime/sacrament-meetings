import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-start justify-center pt-16">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Sign In</h1>
        <p className="text-sm text-slate-600 mb-6">
          Bishopric access only. Members do not need to sign in to view meetings.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}