export type WakeStatus = 'inactive' | 'requesting' | 'active' | 'hidden' | 'released' | 'denied' | 'unsupported';
export interface ScreenSentinel {
  released: boolean;
  release(): Promise<void>;
  addEventListener(type: 'release', listener: () => void): void;
}
export interface WakeEnvironment {
  request?: () => Promise<ScreenSentinel>;
  visible: () => boolean;
  subscribe: (listener: () => void) => () => void;
}

// One controller per study session. A pending request cannot survive disposal.
export function createWakeLock(environment: WakeEnvironment, onStatus: (status: WakeStatus) => void) {
  let disposed = false;
  let generation = 0;
  let sentinel: ScreenSentinel | null = null;
  let pending = false;
  const release = () => {
    generation++;
    const held = sentinel;
    sentinel = null;
    if (held && !held.released) void held.release().catch(() => {});
  };
  const acquire = async () => {
    if (disposed || pending || sentinel) return;
    if (!environment.request) { onStatus('unsupported'); return; }
    if (!environment.visible()) { onStatus('hidden'); return; }
    pending = true;
    const requestGeneration = generation;
    onStatus('requesting');
    try {
      const held = await environment.request();
      if (disposed || requestGeneration !== generation || !environment.visible()) {
        await held.release().catch(() => {});
      } else {
        sentinel = held;
        held.addEventListener('release', () => {
          if (sentinel !== held || disposed) return;
          sentinel = null;
          onStatus(environment.visible() ? 'released' : 'hidden');
        });
        if (held.released) { sentinel = null; onStatus('released'); }
        else onStatus('active');
      }
    } catch {
      if (!disposed && requestGeneration === generation) onStatus(environment.visible() ? 'denied' : 'hidden');
    } finally {
      pending = false;
      // A visibility round trip can finish while an older request is pending.
      if (!disposed && requestGeneration !== generation && environment.visible()) void acquire();
    }
  };
  const unsubscribe = environment.subscribe(() => {
    if (disposed) return;
    if (!environment.visible()) { release(); onStatus('hidden'); }
    else void acquire();
  });
  void acquire();
  return { retry: acquire, dispose: () => { disposed = true; unsubscribe(); release(); } };
}

export const WAKE_STATUS_AM: Record<WakeStatus, string> = {
  inactive: 'Էկրանի պահումը անջատված է։', requesting: 'Էկրանը միացված պահելու հարցում…',
  active: 'Էկրանը միացված պահելը ակտիվ է։', hidden: 'Էջը թաքնված է․ էկրանի պահումը կվերականգնվի վերադառնալիս։',
  released: 'Բրաուզերը կամ համակարգը դադարեցրել է էկրանի պահումը։',
  denied: 'Բրաուզերը կամ համակարգը չի թույլատրել էկրանը միացված պահել։',
  unsupported: 'Այս բրաուզերում էկրանը միացված պահելու հնարավորությունը հասանելի չէ։ Անհրաժեշտ է աջակցող բրաուզեր և HTTPS կապ։',
};
