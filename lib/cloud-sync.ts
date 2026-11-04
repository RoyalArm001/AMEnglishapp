'use client';

import type { UserProgressData } from './types';

export interface CloudSession {
  userId: string;
  email: string;
  token: string;
  lastSyncedAt?: number;
}

const CLOUD_SESSION_KEY = 'haylingo_cloud_session_v1';

export function getStoredCloudSession(): CloudSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CLOUD_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && typeof parsed.token === 'string') {
      return parsed as CloudSession;
    }
  } catch {}
  return null;
}

export function setStoredCloudSession(session: CloudSession | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!session) {
      localStorage.removeItem(CLOUD_SESSION_KEY);
    } else {
      localStorage.setItem(CLOUD_SESSION_KEY, JSON.stringify(session));
    }
  } catch {}
}

export async function cloudRegister(
  email: string,
  password: string,
  localProgress?: UserProgressData
): Promise<{ ok: boolean; session?: CloudSession; errorAm?: string; messageAm?: string }> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, progressData: localProgress }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Գրանցումը ձախողվեց։' };
    }

    const session: CloudSession = {
      userId: data.user.id,
      email: data.user.email,
      token: data.token,
      lastSyncedAt: Date.now(),
    };
    setStoredCloudSession(session);

    return {
      ok: true,
      session,
      messageAm: data.messageAm || 'Գրանցումը հաջողվեց։',
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Չհաջողվեց կապվել սերվերի հետ։'}`,
    };
  }
}

export async function cloudLogin(
  email: string,
  password: string
): Promise<{
  ok: boolean;
  session?: CloudSession;
  progressData?: UserProgressData | null;
  errorAm?: string;
  messageAm?: string;
}> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Մուտքը ձախողվեց։' };
    }

    const session: CloudSession = {
      userId: data.user.id,
      email: data.user.email,
      token: data.token,
      lastSyncedAt: data.lastSyncedAt || Date.now(),
    };
    setStoredCloudSession(session);

    return {
      ok: true,
      session,
      progressData: data.progressData || null,
      messageAm: data.messageAm || 'Մուտքը հաջողվեց։',
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Չհաջողվեց կապվել սերվերի հետ։'}`,
    };
  }
}

export function cloudLogout(): void {
  setStoredCloudSession(null);
}

export async function cloudSyncPush(
  progressData: UserProgressData
): Promise<{ ok: boolean; lastSyncedAt?: number; errorAm?: string }> {
  const session = getStoredCloudSession();
  if (!session || !session.token) {
    return { ok: false, errorAm: 'Մուտք չեք գործել առցանց բազա։' };
  }

  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({ progressData }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Համաժամեցումը ձախողվեց։' };
    }

    session.lastSyncedAt = data.lastSyncedAt || Date.now();
    setStoredCloudSession(session);

    return { ok: true, lastSyncedAt: session.lastSyncedAt };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Անցանց ռեժիմ'}`,
    };
  }
}

export async function cloudSyncPull(): Promise<{
  ok: boolean;
  progressData?: UserProgressData | null;
  lastSyncedAt?: number;
  errorAm?: string;
}> {
  const session = getStoredCloudSession();
  if (!session || !session.token) {
    return { ok: false, errorAm: 'Մուտք չեք գործել առցանց բազա։' };
  }

  try {
    const res = await fetch('/api/sync', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { ok: false, errorAm: data.errorAm || 'Տվյալների բեռնումը ձախողվեց։' };
    }

    if (data.lastSyncedAt) {
      session.lastSyncedAt = data.lastSyncedAt;
      setStoredCloudSession(session);
    }

    return {
      ok: true,
      progressData: data.progressData || null,
      lastSyncedAt: data.lastSyncedAt,
    };
  } catch (err) {
    return {
      ok: false,
      errorAm: `Կապի սխալ: ${err instanceof Error ? err.message : 'Անցանց ռեժիմ'}`,
    };
  }
}

export async function checkCloudStatus(): Promise<{ isConfigured: boolean }> {
  try {
    const res = await fetch('/api/auth/status');
    const data = await res.json();
    return { isConfigured: Boolean(data?.isConfigured) };
  } catch {
    return { isConfigured: false };
  }
}

