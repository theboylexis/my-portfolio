import styles from './page.module.css';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.greeting}>Hi, I&apos;m</p>
        <h1 className={styles.name}>Alex Marfo</h1>
        <p className={styles.role}>
          Junior backend engineer building production-grade APIs with Node.js, Express, and PostgreSQL. I care about clean architecture, real-world patterns, and shipping things that work.
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

      <About />

      <div className={styles.divider}>
        <hr className={styles.dividerLine} />
      </div>

      <Projects />

      <div className={styles.divider}>
        <hr className={styles.dividerLine} />
      </div>

      <Skills />

      <div className={styles.divider}>
        <hr className={styles.dividerLine} />
      </div>

      <Timeline />

      <div className={styles.divider}>
        <hr className={styles.dividerLine} />
      </div>

      <Contact />
    </div>
  );
}
