import { PageMemoryState } from './types';

const PAGE_MEMORY_STORAGE_KEY = 'haylingo_page_memory_state';

/**
 * Parses page memory state from current window.location.search URL query parameters
 */
export function getPageMemoryFromURL(): Partial<PageMemoryState> {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || undefined;
    const subId = params.get('subId') || undefined;
    const stepStr = params.get('step');
    const step = stepStr !== null && !isNaN(Number(stepStr)) ? Number(stepStr) : undefined;
    const mode = params.get('mode') || undefined;

    return {
      tab,
      subId,
      step,
      mode,
      updatedAt: Date.now(),
    };
  } catch {
    return {};
  }
}

/**
 * Gets saved page memory from LocalStorage
 */
export function getPageMemoryFromStorage(): Partial<PageMemoryState> {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(PAGE_MEMORY_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Updates both the browser URL (via history.replaceState) and LocalStorage
 * without causing a page reload.
 */
export function setPageMemory(state: Partial<PageMemoryState>): void {
  if (typeof window === 'undefined') return;

  try {
    const fullState: PageMemoryState = {
      tab: state.tab || 'dashboard',
      subId: state.subId,
      step: state.step,
      mode: state.mode,
      updatedAt: Date.now(),
    };

    // 1. Save to LocalStorage
    try {
      window.localStorage.setItem(PAGE_MEMORY_STORAGE_KEY, JSON.stringify(fullState));
    } catch {}

    // 2. Sync URL Search Params
    const url = new URL(window.location.href);
    if (fullState.tab && fullState.tab !== 'dashboard') {
      url.searchParams.set('tab', fullState.tab);
    } else {
      url.searchParams.delete('tab');
    }

    if (fullState.subId) {
      url.searchParams.set('subId', fullState.subId);
    } else {
      url.searchParams.delete('subId');
    }

    if (typeof fullState.step === 'number' && fullState.step >= 0) {
      url.searchParams.set('step', fullState.step.toString());
    } else {
      url.searchParams.delete('step');
    }

    if (fullState.mode) {
      url.searchParams.set('mode', fullState.mode);
    } else {
      url.searchParams.delete('mode');
    }

    window.history.replaceState({ haylingo: fullState }, '', url.toString());
  } catch {
    // Ignore history API restriction errors
  }
}

/**
 * Resolves initial tab and sub-navigation on initial mount.
 * Prioritizes URL query parameters first, then saved storage.
 */
export function resolveInitialPageMemory(defaultTab: string = 'dashboard'): PageMemoryState {
  const fromUrl = getPageMemoryFromURL();
  if (fromUrl.tab) {
    return {
      tab: fromUrl.tab,
      subId: fromUrl.subId,
      step: fromUrl.step,
      mode: fromUrl.mode,
      updatedAt: fromUrl.updatedAt || Date.now(),
    };
  }

  const fromStorage = getPageMemoryFromStorage();
  if (fromStorage.tab) {
    return {
      tab: fromStorage.tab,
      subId: fromStorage.subId,
      step: fromStorage.step,
      mode: fromStorage.mode,
      updatedAt: fromStorage.updatedAt || Date.now(),
    };
  }

  return {
    tab: defaultTab,
    updatedAt: Date.now(),
  };
}

