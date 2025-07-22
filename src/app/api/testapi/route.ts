import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  return NextResponse.json({ 
    message: 'Test API endpoint working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      message: 'POST request received',
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
