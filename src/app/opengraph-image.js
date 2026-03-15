import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Alex Marfo Appiah — Backend Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#050505',
          color: '#e8e8e8',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#00ffaa',
              boxShadow: '0 0 20px rgba(0, 255, 170, 0.4)',
            }}
          />
          <span style={{ fontSize: '24px', color: '#00ffaa' }}>&gt; alex.marfo</span>
        </div>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          I build things that
          <br />
          <span style={{ color: '#00ffaa' }}>live on servers.</span>
        </h1>
        <p
          style={{
            fontSize: '28px',
            color: '#888888',
            marginTop: '24px',
            lineHeight: 1.4,
          }}
        >
          Backend Engineer &middot; Node.js &middot; Express &middot; PostgreSQL
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '20px',
            color: '#555555',
            fontFamily: 'monospace',
          }}
        >
          alexmarfo.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
