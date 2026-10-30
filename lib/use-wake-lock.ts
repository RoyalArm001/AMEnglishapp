'use client';
import { useEffect, useRef, useState } from 'react';
import { createWakeLock, WakeStatus } from './wake-lock';

export function useWakeLock(active: boolean, sessionKey = '') {
  const [status, setStatus] = useState<WakeStatus>('inactive');
  const controller = useRef<ReturnType<typeof createWakeLock> | null>(null);
  useEffect(() => {
    let suspended = false;
    controller.current = createWakeLock({
      request: window.isSecureContext && navigator.wakeLock?.request ? () => navigator.wakeLock.request('screen') : undefined,
      visible: () => !suspended && document.visibilityState === 'visible',
      subscribe: callback => {
        document.addEventListener('visibilitychange', callback);
        const show = () => { suspended = false; callback(); };
        const hide = () => { suspended = true; callback(); };
        window.addEventListener('pageshow', show);
        window.addEventListener('pagehide', hide);
        return () => { document.removeEventListener('visibilitychange', callback); window.removeEventListener('pageshow', show); window.removeEventListener('pagehide', hide); };
      },
    }, setStatus, false);
    return () => { controller.current?.dispose(); controller.current = null; };
  }, []);
  useEffect(() => {
    controller.current?.setActive(false);
    controller.current?.setActive(active);
  }, [active, sessionKey]);
  return { status, retry: () => controller.current?.retry() };
}
