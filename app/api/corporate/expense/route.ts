import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totals: {
      companyId: 'company_amaniclinic',
      monthlySpendTzs: 2840000,
      approvalQueue: 6,
      departmentBreakdown: {
        Operations: 920000,
        Clinical: 1180000,
        Sales: 420000,
      },
    },
    latestExpenses: [
      { id: 'EXP-2041', rider: 'Grace M.', amountTzs: 62000, approved: true },
      { id: 'EXP-2042', rider: 'Moses J.', amountTzs: 48000, approved: false },
      { id: 'EXP-2043', rider: 'Diana A.', amountTzs: 76000, approved: true },
    ],
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.amountTzs || !body?.employeeId) {
      return NextResponse.json(
        { error: 'amountTzs and employeeId are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      reportId: `expense_${Date.now()}`,
      amountTzs: Number(body.amountTzs),
      employeeId: body.employeeId,
      status: body.amountTzs > 50000 ? 'pending_manager_approval' : 'approved',
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit expense.' },
      { status: 500 }
    );
  }
}
