import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <p className={styles.label}>about</p>
            <h2 className={styles.heading}>A bit about me</h2>
            <div className={styles.body}>
                <p>
                    I&apos;m a <span className={styles.highlight}>junior backend engineer</span> based
                    in Kumasi, Ghana. I specialize in designing and building server-side
                    applications with <span className={styles.highlight}>Node.js</span>,{' '}
                    <span className={styles.highlight}>Express</span>, and{' '}
                    <span className={styles.highlight}>PostgreSQL</span>.
                </p>
                <p>
                    My interest in software engineering stems from a desire to understand
                    how systems operate at a fundamental level — the data flow, the
                    architectural decisions, and the trade-offs that determine whether
                    software scales or breaks under pressure.
                </p>
                <p>
                    I recently built a production-grade document analysis API featuring
                    JWT authentication, cloud file storage, background job processing with
                    Redis and BullMQ, and LLM integration via the OpenAI API. I
                    hold myself to the standard of writing code that is maintainable,
                    well-structured, and ready for code review.
                </p>
            </div>
        </section>
    );
}
