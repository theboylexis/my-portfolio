'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Skills.module.css';

const skills = [
    {
        category: 'Languages & Runtime',
        items: [
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
            { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
            { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
            { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        ],
    },
    {
        category: 'Frameworks & Libraries',
        items: [
            { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
            { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invert: true },
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
            { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
            { name: 'Socket.io', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg', invert: true },
        ],
    },
    {
        category: 'Databases & Caching',
        items: [
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
            { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
            { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg', invert: true },
            { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
        ],
    },
    {
        category: 'Tools & DevOps',
        items: [
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
            { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
            { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
            { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invert: true },
        ],
    },
    {
        category: 'APIs & Integration',
        items: [
            { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg' },
            { name: 'OpenAI API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openal/openal-original.svg' },
            { name: 'JWT Auth', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
        ],
    },
];

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.03,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Skills() {
    let globalIndex = 0;

    return (
        <section id="skills" className={styles.skills}>
            <p className={styles.label}>
                <span className={styles.accent}>&gt;</span> skills
            </p>
            <h2 className={styles.heading}>Technologies I work with</h2>

            <div className={styles.categories}>
                {skills.map((group) => (
                    <div key={group.category} className={styles.category}>
                        <h3 className={styles.categoryTitle}>{group.category}</h3>
                        <div className={styles.badges}>
                            {group.items.map((item) => {
                                const idx = globalIndex++;
                                return (
                                    <motion.span
                                        key={item.name}
                                        className={`${styles.badge} ${item.invert ? 'invert-icon' : ''}`}
                                        custom={idx}
                                        variants={badgeVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        {item.icon && (
                                            <span className={styles.badgeIcon}>
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={20}
                                                    height={20}
                                                    unoptimized
                                                />
                                            </span>
                                        )}
                                        {item.name}
                                    </motion.span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
