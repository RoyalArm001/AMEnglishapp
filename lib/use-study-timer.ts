'use client';
import { useEffect, useRef } from 'react';

// Count visible time only while the learner has interacted within the last minute.
// Consume once per recorded activity; background/idle time never earns minutes.
export function useStudyTimer(section: string) {
  const seconds = useRef(0);
  const lastInteraction = useRef(0);
  useEffect(() => {
    seconds.current = 0;
    lastInteraction.current = Date.now();
    const interact = () => { lastInteraction.current = Date.now(); };
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - lastInteraction.current < 60000) seconds.current += 1;
    }, 1000);
    window.addEventListener('pointerdown', interact);
    window.addEventListener('keydown', interact);
    return () => { clearInterval(timer); window.removeEventListener('pointerdown', interact); window.removeEventListener('keydown', interact); };
  }, [section]);
  return () => { const minutes = seconds.current / 60; seconds.current = 0; return minutes; };
}
