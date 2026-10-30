'use client';
import { useEffect } from 'react';
import type { UserSettingsRecord } from './types';

export function useDisplaySettings(settings: UserSettingsRecord) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.displayMode = settings.displayMode;
    const query = window.matchMedia('(min-width: 1024px)');
    const apply = () => {
      if (settings.displayMode === 'desktop') {
        root.dataset.layout = 'desktop';
      } else if (settings.displayMode === 'mobile') {
        root.dataset.layout = 'mobile';
      } else {
        root.dataset.layout = query.matches ? 'desktop' : 'mobile';
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [settings.displayMode]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${settings.fontSizes.interface}px`;
    for (const key of ['english','pronunciation','armenian'] as const) root.style.setProperty(`--font-${key}`, `${settings.fontSizes[key]}px`);
    root.dataset.largeText = settings.fontSizes.interface >= 22 ? 'true' : 'false';
  }, [settings.fontSizes]);
  useEffect(() => () => {
    const root = document.documentElement;
    root.style.removeProperty('font-size');
    for (const key of ['english','pronunciation','armenian']) root.style.removeProperty(`--font-${key}`);
    delete root.dataset.displayMode; delete root.dataset.layout; delete root.dataset.largeText;
  }, []);
}
