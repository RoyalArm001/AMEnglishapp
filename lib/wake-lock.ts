export type WakeStatus = 'inactive' | 'requesting' | 'active' | 'hidden' | 'released' | 'denied' | 'unsupported';
export interface ScreenSentinel {
  released: boolean;
  release(): Promise<void>;
  addEventListener(type: 'release', listener: () => void): void;
  removeEventListener(type: 'release', listener: () => void): void;
}
export interface WakeEnvironment {
  request?: () => Promise<ScreenSentinel>;
  visible: () => boolean;
  subscribe: (listener: () => void) => () => void;
}

// Serialize acquisition and release across controller lifetimes (including Strict Mode).
let operations: Promise<void> = Promise.resolve();
function serialize(work: () => Promise<void>) {
  const result = operations.then(work);
  operations = result.catch(() => {});
  return result;
}
export function createWakeLock(environment: WakeEnvironment, onStatus: (status: WakeStatus) => void, initiallyActive = true) {
  let disposed = false, active = initiallyActive, pending = false, generation = 0;
  let sentinel: ScreenSentinel | null = null;
  let detach = () => {};
  const eligible = () => !disposed && active && environment.visible();
  const release = () => {
    generation++;
    detach(); detach = () => {};
    const held = sentinel; sentinel = null;
    if (held && !held.released) {
      // Start release immediately; subsequent requests wait for its settlement.
      const released = Promise.resolve().then(() => held.release()).catch(() => {});
      void serialize(() => released);
    }
  };
  const acquire = (): Promise<void> => {
    if (!eligible() || pending || sentinel) return Promise.resolve();
    if (!environment.request) { onStatus('unsupported'); return Promise.resolve(); }
    pending = true;
    const requestedGeneration = generation;
    onStatus('requesting');
    return serialize(async () => {
      try {
        if (!eligible() || requestedGeneration !== generation) return;
        const held = await environment.request!();
        if (!eligible() || requestedGeneration !== generation) {
          await held.release().catch(() => {});
          return;
        }
        sentinel = held;
        const onRelease = () => {
          if (sentinel !== held || disposed) return;
          detach(); detach = () => {}; sentinel = null;
          onStatus(environment.visible() ? 'released' : 'hidden');
        };
        held.addEventListener('release', onRelease);
        detach = () => held.removeEventListener('release', onRelease);
        if (held.released) onRelease();
        else onStatus('active');
      } catch {
        if (!disposed && requestedGeneration === generation) onStatus(environment.visible() ? 'denied' : 'hidden');
      } finally {
        pending = false;
        // Only an intervening lifecycle event authorizes another request, never a denial/release.
        if (eligible() && requestedGeneration !== generation) void acquire();
      }
    });
  };
  const refresh = () => {
    if (disposed) return;
    if (!active || !environment.visible()) {
      release(); onStatus(active ? 'hidden' : 'inactive');
    } else void acquire();
  };
  const unsubscribe = environment.subscribe(refresh);
  refresh();
  return {
    retry: acquire,
    setActive(value: boolean) { if (disposed || active === value) return; active = value; refresh(); },
    dispose() { if (disposed) return; disposed = true; unsubscribe(); release(); },
  };
}

export const WAKE_STATUS_AM: Record<WakeStatus, string> = {
  inactive: '⚪ Էկրանի պահպանումն անջատված է',
  requesting: '⚪ Էկրանի պահպանման հարցումն ընթացքի մեջ է…',
  active: '🟢 Էկրանի պահպանումն ակտիվ է',
  hidden: '⚪ Էկրանի պահպանումն անջատված է․ էջը թաքնված է։',
  released: '🟠 Էկրանի պահպանումն անհասանելի է․ բրաուզերը կամ համակարգը դադարեցրել է այն։',
  denied: '🟠 Էկրանի պահպանումն անհասանելի է․ բրաուզերը կամ համակարգը մերժել է հարցումը։',
  unsupported: '🟠 Էկրանի պահպանումն անհասանելի է․ անհրաժեշտ է աջակցող բրաուզեր և HTTPS կապ։ Դասը կարող եք շարունակել։',
};
