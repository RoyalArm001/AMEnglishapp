import { NextResponse } from 'next/server';
import { getDatabase, parseSessionToken, isMongoConfigured } from '@/lib/mongodb';
import { mergeProgressData } from '@/lib/cloud-sync';
import { ObjectId } from 'mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST: Save/update user progress to MongoDB with lossless cross-device merge
export async function POST(request: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        { ok: false, errorAm: 'Առցանց բազան (MongoDB) կարգավորված չէ սերվերում։' },
        { status: 503 }
      );
    }

    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    const body = await request.json();
    const tokenToUse = token || body.token;
    const session = tokenToUse ? parseSessionToken(tokenToUse) : null;

    if (!session || !session.userId) {
      return NextResponse.json(
        { ok: false, errorAm: 'Անվավեր կամ ժամկետանց նստաշրջան։ Խնդրում ենք կրկին մուտք գործել։' },
        { status: 401 }
      );
    }

    const incomingProgress = body.progressData;
    if (!incomingProgress || typeof incomingProgress !== 'object') {
      return NextResponse.json(
        { ok: false, errorAm: 'Բացակայում են պահպանվող տվյալները։' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCol = db.collection('users');
    let userObjectId: ObjectId;
    try {
      userObjectId = new ObjectId(session.userId);
    } catch {
      return NextResponse.json({ ok: false, errorAm: 'Անվավեր օգտատիրոջ ID' }, { status: 400 });
    }

    const user = await usersCol.findOne({ _id: userObjectId });
    if (!user) {
      return NextResponse.json(
        { ok: false, errorAm: 'Օգտատերը չի գտնվել բազայում։' },
        { status: 404 }
      );
    }

    const now = Date.now();
    const progressCol = db.collection('progress');

    let finalProgress = incomingProgress;
    if (body.forceOverwrite !== true) {
      const existing = await progressCol.findOne({ userId: session.userId });
      if (existing && existing.progressData) {
        finalProgress = mergeProgressData(incomingProgress, existing.progressData);
      }
    }

    await progressCol.updateOne(
      { userId: session.userId },
      {
        $set: {
          userId: session.userId,
          email: user.email,
          progressData: finalProgress,
          updatedAt: now,
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        ok: true,
        lastSyncedAt: now,
        progressData: finalProgress,
        messageAm: 'Տվյալները հաջողությամբ պահպանվեցին առցանց բազայում (MongoDB Atlas)։',
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Cloud sync push error:', error);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `Համաժամեցման սխալ: ${error instanceof Error ? error.message : 'Սերվերային անհայտ սխալ'}`,
      },
      { status: 500 }
    );
  }
}

// GET: Fetch latest cloud progress
export async function GET(request: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        { ok: false, errorAm: 'Առցանց բազան (MongoDB) կարգավորված չէ սերվերում։' },
        { status: 503 }
      );
    }

    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const session = token ? parseSessionToken(token) : null;

    if (!session || !session.userId) {
      return NextResponse.json(
        { ok: false, errorAm: 'Անվավեր նստաշրջան։' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const progressCol = db.collection('progress');
    const record = await progressCol.findOne({ userId: session.userId });

    if (!record || !record.progressData) {
      return NextResponse.json(
        {
          ok: true,
          progressData: null,
          lastSyncedAt: null,
        },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        progressData: record.progressData,
        lastSyncedAt: record.updatedAt || Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Cloud sync pull error:', error);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `Տվյալների բեռնման սխալ: ${error instanceof Error ? error.message : 'Սերվերային անհայտ սխալ'}`,
      },
      { status: 500 }
    );
  }
}
