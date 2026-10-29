'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  badgeText?: string;
}

const SIZE_MAP = {
  sm: { box: 'w-8 h-8', icon: 32, text: 'text-base', sub: 'text-[9px]' },
  md: { box: 'w-10 h-10', icon: 40, text: 'text-lg', sub: 'text-[11px]' },
  lg: { box: 'w-12 h-12', icon: 48, text: 'text-xl', sub: 'text-xs' },
  xl: { box: 'w-16 h-16', icon: 64, text: 'text-2xl', sub: 'text-sm' },
};

/**
 * HayLingo AI Official Brand Logo
 * Symbolism:
 * - Two ascending pillars: Left pillar (Armenian roots / Indigo-Violet) and Right pillar (English mastery / Emerald-Cyan).
 * - Central bridge: An interactive AI voice soundwave connecting Armenian speakers to fluent English.
 * - Central star: The AI intelligence spark guiding the learner.
 */
export function LogoIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="HayLingo AI Logo"
    >
      <defs>
        {/* Background rounded squircle gradient */}
        <linearGradient id={`${idPrefix}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#062e24" />
        </linearGradient>

        {/* Squircle glowing border */}
        <linearGradient id={`${idPrefix}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
        </linearGradient>

        {/* Left Pillar: Armenian roots (Indigo/Violet) */}
        <linearGradient id={`${idPrefix}-left`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>

        {/* Right Pillar: English mastery (Emerald/Teal) */}
        <linearGradient id={`${idPrefix}-right`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Central Bridge: AI Voice & Soundwave */}
        <linearGradient id={`${idPrefix}-wave`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* AI Spark Star Gradient */}
        <linearGradient id={`${idPrefix}-star`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Inner ambient glow */}
        <radialGradient id={`${idPrefix}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Drop shadow for 3D depth */}
        <filter id={`${idPrefix}-shadow`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Outer base container with rounded squircle */}
      <rect
        x="3"
        y="3"
        width="114"
        height="114"
        rx="30"
        fill={`url(#${idPrefix}-bg)`}
        stroke={`url(#${idPrefix}-border)`}
        strokeWidth="2.5"
      />

      {/* Soft inner radial glow */}
      <circle cx="60" cy="60" r="48" fill={`url(#${idPrefix}-glow)`} />

      {/* Decorative subtle soundwave backdrop lines */}
      <path
        d="M20 60 Q 60 48, 100 60"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        fill="none"
      />
      <path
        d="M20 60 Q 60 72, 100 60"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
        strokeDasharray="2 3"
        fill="none"
      />

      {/* Main Stylized H Monogram */}
      <g filter={`url(#${idPrefix}-shadow)`}>
        {/* Left Pillar (Armenian foundation) - with top bevel and bottom curve */}
        <path
          d="M32 26 C32 23.8 33.8 22 36 22 L44 22 C46.2 22 48 23.8 48 26 L48 94 C48 96.2 46.2 98 44 98 L36 98 C33.8 98 32 96.2 32 94 Z"
          fill={`url(#${idPrefix}-left)`}
        />
        {/* Left Pillar Top Highlight */}
        <circle cx="40" cy="28" r="2.5" fill="#ffffff" fillOpacity="0.8" />

        {/* Right Pillar (English fluency) - with top bevel and bottom curve */}
        <path
          d="M72 26 C72 23.8 73.8 22 76 22 L84 22 C86.2 22 88 23.8 88 26 L88 94 C88 96.2 86.2 98 84 98 L76 98 C73.8 98 72 96.2 72 94 Z"
          fill={`url(#${idPrefix}-right)`}
        />
        {/* Right Pillar Top Highlight */}
        <circle cx="80" cy="28" r="2.5" fill="#ffffff" fillOpacity="0.8" />

        {/* Central Speech Soundwave Bridge */}
        {/* Main horizontal bridge */}
        <rect
          x="44"
          y="54"
          width="32"
          height="12"
          rx="6"
          fill={`url(#${idPrefix}-wave)`}
        />

        {/* Interactive soundwave frequency bars in center bridge */}
        <rect x="52" y="46" width="3.5" height="28" rx="1.75" fill="#ffffff" fillOpacity="0.95" />
        <rect x="58.25" y="40" width="3.5" height="40" rx="1.75" fill="#ffffff" />
        <rect x="64.5" y="46" width="3.5" height="28" rx="1.75" fill="#ffffff" fillOpacity="0.95" />

        {/* AI Learning Spark Star (Floating above center) */}
        <path
          d="M60 21 L62 27 L68 29 L62 31 L60 37 L58 31 L52 29 L58 27 Z"
          fill={`url(#${idPrefix}-star)`}
        />
        <circle cx="60" cy="29" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  );
}

export default function Logo({
  size = 'md',
  showText = true,
  className = '',
  badgeText = 'v1.1.2',
}: LogoProps) {
  const cfg = SIZE_MAP[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${cfg.box} flex items-center justify-center transition-transform hover:scale-105`}>
        <LogoIcon size={cfg.icon} />
      </div>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black ${cfg.text} tracking-tight`}>
              Hay<span className="text-emerald-500 dark:text-emerald-400">Lingo</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-500/15 to-emerald-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 font-extrabold text-[10px] tracking-wide">
              {badgeText}
            </span>
          </div>
          <span className={`${cfg.sub} font-semibold text-slate-400 tracking-normal truncate mt-0.5`}>
            Անգլերենի ինտերակտիվ ուսուցում
          </span>
        </div>
      )}
    </div>
  );
}

