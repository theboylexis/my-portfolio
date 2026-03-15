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
                        I&apos;m a <span className={styles.highlight}>backend engineer</span> based
                        in Kumasi, Ghana. I build APIs and server-side systems
                        with <span className={styles.highlight}>Node.js</span>,{' '}
                        <span className={styles.highlight}>Express</span>, and{' '}
                        <span className={styles.highlight}>PostgreSQL</span> — and
                        I&apos;ve been exploring <span className={styles.highlight}>Python</span> for
                        fintech tooling.
                    </p>
                    <p>
                        I care about clean architecture, writing code that other people can
                        actually read, and solving real problems — not just building demos.
                        My recent work includes an{' '}
                        <span className={styles.highlight}>AI-powered document analysis API</span>,
                        a <span className={styles.highlight}>personal finance app</span>, and
                        an <span className={styles.highlight}>open-source MoMo SMS parser</span> for
                        Ghana&apos;s mobile money ecosystem.
                    </p>
                    <p>
                        When I&apos;m not coding, I&apos;m probably reading about system design
                        patterns or figuring out how to make something I built yesterday a
                        little better.
                    </p>
                </div>
            </div>
        </section>
    );
}
