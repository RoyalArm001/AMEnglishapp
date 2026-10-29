import { ImageResponse } from 'next/og';

export const alt = 'HayLingo — Interactive English Learning Web App';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 55%, #064e3b 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 900,
              }}
            >
              HL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px' }}>
                HayLingo
              </div>
              <div style={{ display: 'flex', fontSize: 16, color: '#a5b4fc', fontWeight: 600 }}>
                armeng.royalarm.uk • v1.1.1 PWA
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              color: '#6ee7b7',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            A1 – C2 • Interactive English Platform
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '980px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
            }}
          >
            Learn English with Armenian Explanations & Practice
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#cbd5e1',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            26 Interactive Lessons • 210+ Spaced Repetition Words • 108 Exercises • IT & Career English • Voice Recognition & Offline PWA
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(79, 70, 229, 0.3)',
              border: '1px solid rgba(129, 140, 248, 0.35)',
              fontSize: 20,
              fontWeight: 700,
              color: '#e0e7ff',
            }}
          >
            16 Lesson Modules
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(124, 58, 237, 0.3)',
              border: '1px solid rgba(167, 139, 250, 0.35)',
              fontSize: 20,
              fontWeight: 700,
              color: '#ede9fe',
            }}
          >
            15 Profession Tracks
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(5, 150, 105, 0.3)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              fontSize: 20,
              fontWeight: 700,
              color: '#d1fae5',
            }}
          >
            Guided Practice & Pronunciation
          </div>
          <div
            style={{
              display: 'flex',
              padding: '12px 24px',
              borderRadius: 16,
              background: 'rgba(245, 158, 11, 0.25)',
              border: '1px solid rgba(251, 191, 36, 0.35)',
              fontSize: 20,
              fontWeight: 700,
              color: '#fef3c7',
            }}
          >
            100% Offline-Ready PWA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
