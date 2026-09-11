import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { participants = [], splitMode = 'equal', autoDepartWhenFullyFunded = true } = body || {};

    if (!Array.isArray(participants) || participants.length === 0) {
      return NextResponse.json({ error: 'Participants are required' }, { status: 400 });
    }

    const total = participants.reduce((sum: number, participant: any) => sum + Number(participant.amount || 0), 0);

    return NextResponse.json({
      ok: true,
      bookingId: params.id,
      splitMode,
      autoDepartWhenFullyFunded,
      total,
      participants: participants.map((participant: any, index: number) => ({
        id: `split_${index + 1}`,
        name: participant.name || `Guest ${index + 1}`,
        amountTzs: Number(participant.amount || 0),
        methodPriority: ['wallet', 'mpesa', 'card', 'cash'],
        status: 'pending'
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: 'Split booking could not be created' }, { status: 500 });
  }
}
