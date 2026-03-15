import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--nav-height) - 120px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-accent)',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
        }}
      >
        &gt; 404
      </p>
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          maxWidth: '440px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--color-bg)',
          background: 'var(--color-accent)',
          padding: '0.75rem 1.5rem',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'all 250ms ease',
        }}
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
