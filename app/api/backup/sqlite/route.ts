import { NextRequest, NextResponse } from 'next/server';
import { createSqliteBackupBuffer, parseSqliteBackupBuffer } from '@/lib/sqlite-server';
import { UserProgressData } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST /api/backup/sqlite
 * Accepts JSON UserProgressData and returns a genuine SQLite 3 binary file (.db)
 */
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as UserProgressData;
    if (!data) {
      return NextResponse.json({ ok: false, errorAm: 'Տվյալները բացակայում են' }, { status: 400 });
    }

    const buffer = createSqliteBackupBuffer(data);
    const dateStr = new Date().toISOString().slice(0, 10);
    const fileName = `HayLingo_Backup_${dateStr}.db`;

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/x-sqlite3',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Error generating SQLite backup:', err);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `SQLite արտահանումը ձախողվեց: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/backup/sqlite
 * Accepts binary SQLite file (.db), validates format and PRAGMA integrity, and returns parsed JSON
 */
export async function PUT(req: NextRequest) {
  try {
    const arrayBuffer = await req.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength < 16) {
      return NextResponse.json(
        { ok: false, errorAm: 'Ֆայլը դատարկ է կամ անվավեր' },
        { status: 400 }
      );
    }

    const uint8 = new Uint8Array(arrayBuffer);
    const result = parseSqliteBackupBuffer(uint8);

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({ ok: true, data: result.data }, { status: 200 });
  } catch (err) {
    console.error('Error parsing SQLite backup:', err);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `SQLite ֆայլի ընթերցումը ձախողվեց: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 }
    );
  }
}

