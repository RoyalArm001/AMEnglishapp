import { NextResponse } from 'next/server';
import { getDatabase, hashPassword, generateSessionToken, isMongoConfigured } from '@/lib/mongodb';

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
    const initialProgress = body.progressData;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, errorAm: 'Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե։' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { ok: false, errorAm: 'Գաղտնաբառը պետք է պարունակի առնվազն 6 նիշ։' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCol = db.collection('users');

    // Check existing
    const existing = await usersCol.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { ok: false, errorAm: 'Այս էլ. հասցեով օգտատեր արդեն գոյություն ունի։ Խնդրում ենք մուտք գործել։' },
        { status: 409 }
      );
    }

    // Hash password
    const { salt, hash } = hashPassword(password);
    const now = Date.now();
    const insertRes = await usersCol.insertOne({
      email,
      salt,
      hash,
      createdAt: now,
      lastLoginAt: now,
    });

    const userId = insertRes.insertedId.toString();
    const token = generateSessionToken(userId);

    // Save initial progress if provided
    if (initialProgress && typeof initialProgress === 'object') {
      const progressCol = db.collection('progress');
      await progressCol.updateOne(
        { userId },
        {
          $set: {
            userId,
            email,
            progressData: initialProgress,
            updatedAt: now,
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: userId,
        email,
      },
      token,
      messageAm: 'Գրանցումը հաջողությամբ ավարտվեց։ Ձեր առաջընթացը միացված է առցանց բազային։',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        ok: false,
        errorAm: `Գրանցման սխալ: ${error instanceof Error ? error.message : 'Սերվերային անհայտ սխալ'}`,
      },
      { status: 500 }
    );
  }
}

