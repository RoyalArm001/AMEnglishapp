import { NextResponse } from 'next/server';
import { APP_VERSION } from '../../../lib/pwa';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      version: APP_VERSION,
      cacheVersion: `haylingo-pwa-${APP_VERSION}`,
      timestamp: Date.now(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}

