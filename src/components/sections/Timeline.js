'use client';

import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const timelineItems = [
    {
        date: '2026 — Present',
        title: 'Building portfolio projects',
        description:
            'Developing production-grade applications to demonstrate backend engineering skills. Currently building Smart Doc API and this portfolio site.',
        current: true,
    },
    {
        date: 'Feb 2026',
        title: 'Smart Doc API — Complete',
        description:
            'Built a full REST API with JWT auth, file uploads, background job processing, Redis caching, and OpenAI GPT-4 integration. Set up CI/CD with GitHub Actions.',
    },
    {
        date: 'Jan 2026',
        title: 'Node.js & Express deep dive',
        description:
            'Completed comprehensive training on Node.js, Express, REST APIs, authentication patterns, and database integration with PostgreSQL and MongoDB.',
    },
    {
        date: 'Dec 2025',
        title: 'FinLens AI — Complete',
        description:
            'Built an AI-powered personal finance app with smart expense categorization, natural language queries, and budget tracking using FastAPI, Next.js, and Google Gemini.',
    },
    {
        date: '2025',
        title: 'JavaScript fundamentals',
        description:
            'Mastered core JavaScript — async/await, closures, prototypes, ES6+ features. Built small projects to solidify understanding.',
    },
];

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Timeline() {
    return (
        <section className={styles.timeline}>
            <p className={styles.label}>
                <span className={styles.accent}>&gt;</span> journey
            </p>
            <h2 className={styles.heading}>How I got here</h2>

            <div className={styles.items}>
                {timelineItems.map((item, i) => (
                    <motion.div
                        key={i}
                        className={`${styles.item} ${item.current ? styles.itemCurrent : ''}`}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-30px' }}
                    >
                        <div className={styles.dotWrapper}>
                            <div className={styles.dot} />
                            {item.current && <div className={styles.dotPulse} />}
                        </div>
                        <div className={styles.content}>
                            <p className={styles.date}>{item.date}</p>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.desc}>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
