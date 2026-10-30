import type { UserSettingsRecord } from './types';

export const DEFAULT_FONT_SIZES: UserSettingsRecord['fontSizes'] = {
  interface: 16, english: 16, pronunciation: 16, armenian: 16,
};
export const FONT_LABELS = {
  interface: 'Ընդհանուր ինտերֆեյս', english: 'Անգլերեն տեքստ',
  pronunciation: 'Հայերեն արտասանություն', armenian: 'Հայերեն թարգմանություն',
} as const;
export function normalizeDisplaySettings(settings: Partial<UserSettingsRecord>, userId: string) {
  const fontSizes = { ...DEFAULT_FONT_SIZES };
  for (const key of Object.keys(fontSizes) as (keyof typeof fontSizes)[]) {
    const value = settings.fontSizes?.[key];
    if (typeof value === 'number' && Number.isFinite(value)) fontSizes[key] = Math.max(14, Math.min(30, Math.round(value)));
  }
  return {
    userId,
    keepScreenAwake: typeof settings.keepScreenAwake === 'boolean' ? settings.keepScreenAwake : true,
    displayMode: (['auto','desktop','mobile'].includes(settings.displayMode || '') ? settings.displayMode : 'auto') as UserSettingsRecord['displayMode'],
    fontSizes,
  };
}
