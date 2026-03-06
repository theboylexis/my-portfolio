'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import SectionReveal from '@/components/ui/SectionReveal';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <AnimatedBackground />
        <motion.div
          className={styles.heroContent}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.heroText}>
            <motion.p className={styles.greeting} variants={fadeUp}>
              <span className={styles.accentChar}>&gt;</span> Hey, I&apos;m Alex
            </motion.p>
            <motion.h1 className={styles.name} variants={fadeUp}>
              I build things that
              <br />
              <span className={styles.accentText}>live on servers.</span>
            </motion.h1>
            <motion.p className={styles.role} variants={fadeUp}>
              Backend engineer crafting production-grade APIs with Node.js,
              Express, and PostgreSQL. Obsessed with clean architecture,
              real-world patterns, and shipping things that work.
            </motion.p>
            <motion.p className={styles.location} variants={fadeUp}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Kumasi, Ghana
            </motion.p>
            <motion.div className={styles.ctas} variants={fadeUp}>
              <a href="#projects" className={styles.btnPrimary}>
                <span className={styles.btnIcon}>◆</span>
                View Projects
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                Get in Touch
              </a>
            </motion.div>
          </div>
          <motion.div className={styles.avatarWrapper} variants={fadeUp}>
            <div className={styles.avatarGlow} />
            <Image
              src="/images/avatar.jpeg"
              alt="Alex Marfo Appiah"
              width={280}
              height={280}
              className={styles.avatar}
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Sections */}
      <SectionReveal>
        <About />
      </SectionReveal>

      <SectionReveal>
        <Projects />
      </SectionReveal>

      <SectionReveal>
        <Skills />
      </SectionReveal>

      <SectionReveal>
        <Timeline />
      </SectionReveal>

      <SectionReveal>
        <Contact />
      </SectionReveal>
    </div>
  );
}
