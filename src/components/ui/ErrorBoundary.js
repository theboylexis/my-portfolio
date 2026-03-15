'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '3rem 1.5rem',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
            &gt; error
          </p>
          <p style={{ marginBottom: '1rem' }}>
            {this.props.fallbackMessage || 'Something went wrong loading this section.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-accent)',
              background: 'transparent',
              border: '1px solid rgba(0, 255, 170, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
