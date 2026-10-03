import CreateMeetingForm from './create-form';

export default function NewMeetingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">New Meeting</h1>
      <CreateMeetingForm />
    </div>
  );
}