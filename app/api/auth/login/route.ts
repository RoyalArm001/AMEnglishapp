import { NextResponse } from 'next/server';
import { getDatabase, verifyPassword, generateSessionToken, isMongoConfigured } from '@/lib/mongodb';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json(
        { ok: false, errorAm: 'Առցանց բազան (MongoDB) կարգավորված չէ սերվերում։' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, errorAm: 'Խնդրում ենք մուտքագրել էլ. փոստը և գաղտնաբառը։' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCol = db.collection('users');

    const user = await usersCol.findOne({ email });
    if (!user || !user.salt || !user.hash) {
      return NextResponse.json(
        { ok: false, errorAm: 'Սխալ էլ. փոստ կամ գաղտնաբառ։' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.salt, user.hash);
    if (!isValid) {
      return NextResponse.json(
        { ok: false, errorAm: 'Սխալ էլ. փոստ կամ գաղտնաբառ։' },
        { status: 401 }
      );
    }

    const userId = user._id.toString();
    const token = generateSessionToken(userId);
    const now = Date.now();

    // Update last login
    await usersCol.updateOne({ _id: user._id }, { $set: { lastLoginAt: now } });

    // Fetch cloud progress
    const progressCol = db.collection('progress');
    const cloudProgressRecord = await progressCol.findOne({ userId });

    return NextResponse.json({
      ok: true,
      user: {
        id: userId,
        email,
      },
      token,
      progressData: cloudProgressRecord?.progressData || null,
      lastSyncedAt: cloudProgressRecord?.updatedAt || null,
      messageAm: 'Մուտքը հաջողվեց։ Առցանց բազայից տվյալները բեռնվեցին։',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `Մուտքի սխալ: ${error instanceof Error ? error.message : 'Սերվերային անհայտ սխալ'}`,
      },
      { status: 500 }
    );
  }
}

