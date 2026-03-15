'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ApiPlayground.module.css';

const SAMPLE_TEXT = `Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting. The ability to run JavaScript code on the server is often used to generate dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.`;

export default function ApiPlayground() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);

  const charCount = text.length;
  const isValid = charCount >= 50 && charCount <= 5000;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }

      setResult(data);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } catch {
      setError('Network error. Please try again.');
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadSample() {
    setText(SAMPLE_TEXT);
    setResult(null);
    setError(null);
  }

  return (
    <section id="playground" className={styles.playground}>
      <p className={styles.label}>
        <span className={styles.accent}>&gt;</span> playground
      </p>
      <h2 className={styles.heading}>Try my API</h2>
      <p className={styles.subtext}>
        A live text summarizer powered by OpenAI — paste any text and get a
        concise summary. Built with the same backend patterns from{' '}
        <span className={styles.highlight}>Smart Doc AI</span>.
      </p>

      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.dot} data-color="red" />
          <span className={styles.dot} data-color="yellow" />
          <span className={styles.dot} data-color="green" />
          <span className={styles.terminalTitle}>POST /api/playground</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.terminalBody}>
          <div className={styles.inputSection}>
            <div className={styles.inputLabel}>
              <span className={styles.prompt}>$</span> request.body.text
              <button
                type="button"
                className={styles.sampleBtn}
                onClick={handleLoadSample}
              >
                Load sample
              </button>
            </div>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste text here to summarize (min 50 characters)..."
              rows={6}
              maxLength={5000}
            />
            <div className={styles.charCount}>
              <span className={charCount < 50 ? styles.charWarn : ''}>
                {charCount}
              </span>{' '}
              / 5,000
            </div>
          </div>

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={!isValid || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                Processing<span>.</span><span>.</span><span>.</span>
              </span>
            ) : (
              <>
                <span className={styles.btnIcon}>▶</span> Summarize
              </>
            )}
          </motion.button>
        </form>

        {(result || error) && (
          <motion.div
            ref={outputRef}
            className={styles.outputSection}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.outputLabel}>
              <span className={styles.prompt}>←</span> response
              {result && (
                <span className={styles.statusOk}>200 OK</span>
              )}
              {error && (
                <span className={styles.statusErr}>ERROR</span>
              )}
            </div>
            <div className={`${styles.output} ${error ? styles.outputError : ''}`}>
              {error ? (
                <p className={styles.errorText}>{error}</p>
              ) : (
                <>
                  <p className={styles.summaryText}>{result.summary}</p>
                  <div className={styles.meta}>
                    <span>Model: {result.model}</span>
                    <span>Input: {result.inputLength} chars</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
