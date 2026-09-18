import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    return new Response(JSON.stringify({ error: 'Meeting not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return Response.json(meeting);
}