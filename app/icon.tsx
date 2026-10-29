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
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #059669 100%)',
          borderRadius: '42px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          HL
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 8,
            padding: '4px 12px',
            borderRadius: 999,
            background: 'rgba(15, 23, 42, 0.45)',
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '2px',
          }}
        >
          HY • EN
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
