'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './GitHubStats.module.css';

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function RepoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function GitHubStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Could not load GitHub stats.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section id="github" className={styles.github}>
      <p className={styles.label}>
        <span className={styles.accent}>&gt;</span> github
      </p>
      <h2 className={styles.heading}>Open source activity</h2>

      {loading && (
        <div className={styles.skeletonGrid}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      )}

      {error && (
        <div className={styles.errorState}>
          <p>{error}</p>
          <button onClick={fetchStats} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {data && (
        <>
          {/* Stat Cards */}
          <div className={styles.statGrid}>
            <motion.div
              className={styles.statCard}
              custom={0}
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={styles.statIcon}>
                <RepoIcon />
              </div>
              <div className={styles.statValue}>{data.publicRepos}</div>
              <div className={styles.statLabel}>Public Repos</div>
            </motion.div>
          </div>

          {/* Top Languages */}
          {data.topLanguages.length > 0 && (
            <motion.div
              className={styles.languagesCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className={styles.cardTitle}>Top Languages</h3>
              <div className={styles.languageBar}>
                {data.topLanguages.map((lang) => {
                  const total = data.topLanguages.reduce(
                    (s, l) => s + l.count,
                    0
                  );
                  const pct = ((lang.count / total) * 100).toFixed(1);
                  return (
                    <div
                      key={lang.name}
                      className={styles.languageSegment}
                      style={{
                        width: `${pct}%`,
                        backgroundColor:
                          LANGUAGE_COLORS[lang.name] || '#666',
                      }}
                      title={`${lang.name}: ${pct}%`}
                    />
                  );
                })}
              </div>
              <div className={styles.languageLabels}>
                {data.topLanguages.map((lang) => (
                  <span key={lang.name} className={styles.languageLabel}>
                    <span
                      className={styles.languageDot}
                      style={{
                        backgroundColor:
                          LANGUAGE_COLORS[lang.name] || '#666',
                      }}
                    />
                    {lang.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recent Repos */}
          {data.recentRepos.length > 0 && (
            <div className={styles.repoGrid}>
              {data.recentRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoCard}
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={styles.repoHeader}>
                    <RepoIcon />
                    <span className={styles.repoName}>{repo.name}</span>
                  </div>
                  {repo.description && (
                    <p className={styles.repoDesc}>{repo.description}</p>
                  )}
                  <div className={styles.repoMeta}>
                    {repo.language && (
                      <span className={styles.repoLang}>
                        <span
                          className={styles.languageDot}
                          style={{
                            backgroundColor:
                              LANGUAGE_COLORS[repo.language] || '#666',
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className={styles.repoStars}>
                        <StarIcon /> {repo.stars}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <div className={styles.profileLink}>
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewProfile}
            >
              <GithubIcon />
              View full profile →
            </a>
          </div>
        </>
      )}
    </section>
  );
}
