import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, reportedBy, type, description, evidenceUrls } = body || {};

    if (!bookingId || !reportedBy || !type || !description) {
      return NextResponse.json({ error: 'Missing incident fields' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      incident: {
        id: crypto.randomUUID(),
        bookingId,
        reportedBy,
        type,
        description,
        evidenceUrls: Array.isArray(evidenceUrls) ? evidenceUrls.slice(0, 5) : [],
        status: 'open',
        createdAt: new Date().toISOString(),
        responseWindow: 'within 30 minutes in Dar es Salaam or Arusha'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid incident payload' }, { status: 400 });
  }
}
