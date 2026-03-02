import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.greeting}>Hi, I&apos;m</p>
        <h1 className={styles.name}>Alex Marfo</h1>
        <p className={styles.role}>
          Backend developer building production-grade APIs with Node.js, Express, and PostgreSQL. I care about clean architecture, real-world patterns, and shipping things that work.
        </p>
        <div className={styles.ctas}>
          <a href="#projects" className={styles.btnPrimary}>
            View Projects
          </a>
          <a href="#contact" className={styles.btnSecondary}>
            Get in Touch
          </a>
        </div>
      </section>

      <div className={styles.divider}>
        <hr className={styles.dividerLine} />
      </div>

      {/* Phase 2 sections will be added here */}
    </div>
  );
}
