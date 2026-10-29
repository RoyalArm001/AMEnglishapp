import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '42px',
          border: '3px solid rgba(129, 140, 248, 0.45)',
          position: 'relative',
        }}
      >
        {/* AI Learning Star (Geometric Diamond) */}
        <div
          style={{
            display: 'flex',
            width: '10px',
            height: '10px',
            background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
            transform: 'rotate(45deg)',
            marginBottom: '6px',
            boxShadow: '0 0 6px rgba(245, 158, 11, 0.8)',
          }}
        />

        {/* Stylized H Emblem with Soundwave Bridge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100px',
            height: '92px',
          }}
        >
          {/* Left Pillar (Armenian) */}
          <div
            style={{
              position: 'absolute',
              left: '12px',
              top: '0px',
              width: '20px',
              height: '92px',
              borderRadius: '10px',
              background: 'linear-gradient(180deg, #a5b4fc 0%, #6366f1 50%, #4338ca 100%)',
            }}
          />

          {/* Right Pillar (English) */}
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: '0px',
              width: '20px',
              height: '92px',
              borderRadius: '10px',
              background: 'linear-gradient(180deg, #6ee7b7 0%, #10b981 50%, #047857 100%)',
            }}
          />

          {/* Center Bridge */}
          <div
            style={{
              position: 'absolute',
              left: '26px',
              top: '37px',
              width: '48px',
              height: '18px',
              borderRadius: '9px',
              background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 50%, #10b981 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3.5px',
            }}
          >
            <div
              style={{
                width: '3.5px',
                height: '28px',
                borderRadius: '1.75px',
                background: '#ffffff',
              }}
            />
            <div
              style={{
                width: '4.5px',
                height: '38px',
                borderRadius: '2.25px',
                background: '#ffffff',
              }}
            />
            <div
              style={{
                width: '3.5px',
                height: '28px',
                borderRadius: '1.75px',
                background: '#ffffff',
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
