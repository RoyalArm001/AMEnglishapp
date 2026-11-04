import { NextResponse } from 'next/server';
import { isMongoConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    isConfigured: isMongoConfigured(),
    provider: 'MongoDB Atlas',
  });
}

