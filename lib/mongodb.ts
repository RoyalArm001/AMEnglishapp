import { MongoClient, Db } from 'mongodb';
import * as crypto from 'node:crypto';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || 'haylingo';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export function isMongoConfigured(): boolean {
  return Boolean(uri && uri.trim().length > 0);
}

export function getMongoClientPromise(): Promise<MongoClient> {
  if (!isMongoConfigured()) {
    return Promise.reject(new Error('MONGODB_URI is not configured in environment variables.'));
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      });
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClientPromise();
  return client.db(dbName);
}

// Password hashing with PBKDF2
export function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const testHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(hash, 'hex'));
}

export function generateSessionToken(userId: string): string {
  const payload = `${userId}:${Date.now()}:${crypto.randomBytes(24).toString('hex')}`;
  return Buffer.from(payload).toString('base64url');
}

export function parseSessionToken(token: string): { userId: string; timestamp: number } | null {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf8');
    const [userId, tsStr] = raw.split(':');
    const timestamp = parseInt(tsStr, 10);
    if (!userId || isNaN(timestamp)) return null;
    return { userId, timestamp };
  } catch {
    return null;
  }
}
