import { ImageResponse } from 'next/og';

export const size = {
  width: 192,
  height: 192,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #062e24 100%)',
          borderRadius: '46px',
          border: '3px solid rgba(129, 140, 248, 0.45)',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '999px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* AI Learning Star (Geometric Diamond) */}
        <div
          style={{
            display: 'flex',
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
            transform: 'rotate(45deg)',
            marginBottom: '6px',
            boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)',
          }}
        />

        {/* Stylized H Emblem with Soundwave Bridge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '110px',
            height: '100px',
          }}
        >
          {/* Left Pillar (Armenian) */}
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '0px',
              width: '22px',
              height: '100px',
              borderRadius: '11px',
              background: 'linear-gradient(180deg, #a5b4fc 0%, #6366f1 50%, #4338ca 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}
          />

          {/* Right Pillar (English) */}
          <div
            style={{
              position: 'absolute',
              right: '14px',
              top: '0px',
              width: '22px',
              height: '100px',
              borderRadius: '11px',
              background: 'linear-gradient(180deg, #6ee7b7 0%, #10b981 50%, #047857 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}
          />

          {/* Center Bridge */}
          <div
            style={{
              position: 'absolute',
              left: '28px',
              top: '40px',
              width: '54px',
              height: '20px',
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 50%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            {/* Center Soundwave Frequency Bars */}
            <div
              style={{
                width: '4px',
                height: '32px',
                borderRadius: '2px',
                background: '#ffffff',
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              }}
            />
            <div
              style={{
                width: '5px',
                height: '44px',
                borderRadius: '2.5px',
                background: '#ffffff',
                boxShadow: '0 0 8px rgba(255,255,255,0.9)',
              }}
            />
            <div
              style={{
                width: '4px',
                height: '32px',
                borderRadius: '2px',
                background: '#ffffff',
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
