'use client';

import { useEffect } from 'react';
import styles from './page.module.css';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Timeline from '@/components/sections/Timeline';
import Contact from '@/components/sections/Contact';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.name}>Alex Marfo</h1>
        <p className={styles.role}>
          Junior backend engineer building production-grade APIs with Node.js, Express, and PostgreSQL. I care about clean architecture, real-world patterns, and shipping things that work.
        </p>
        <p className={styles.location}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Kumasi, Ghana
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

      <div className="fade-in">
        <About />
      </div>

      <div className="fade-in">
        <Projects />
      </div>

      <div className="fade-in">
        <Skills />
      </div>

      <div className="fade-in">
        <Timeline />
      </div>

      <div className="fade-in">
        <Contact />
      </div>
    </div>
  );
}
