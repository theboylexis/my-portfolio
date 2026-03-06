import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <p className={styles.label}>
                <span className={styles.accent}>&gt;</span> about
            </p>
            <h2 className={styles.heading}>A bit about me</h2>
            <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.terminalTitle}>about.md</span>
                </div>
                <div className={styles.terminalBody}>
                    <p>
                        <span className={styles.highlight}>Junior backend engineer</span> who
                        recently transitioned into backend development. I build server-side
                        applications with <span className={styles.highlight}>Node.js</span> and{' '}
                        <span className={styles.highlight}>Express</span> — focused on
                        clean architecture, scalable APIs, and production-ready code.
                    </p>
                    <p>
                        Recently shipped a document analysis API with JWT auth, Redis caching,
                        background jobs, and OpenAI integration. I write code that is
                        maintainable, well-structured, and ready for review.
                    </p>
                </div>
            </div>
        </section>
    );
}
