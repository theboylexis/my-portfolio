import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
    {
        title: 'Smart Doc API',
        description:
            'A production-grade REST API that accepts documents, processes them with OpenAI GPT-4, and returns structured analysis. Features JWT auth, file uploads to Cloudinary, background job processing with BullMQ, Redis caching, and real-time updates via Socket.io.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'OpenAI API', 'Socket.io'],
        github: 'https://github.com/theboylexis/smart-doc-api',
        status: 'live',
        preview: '/images/smart-doc-preview.png',
    },
    {
        title: 'FinLens AI',
        description:
            'An AI-powered personal finance app with smart expense categorization, natural language queries, budget tracking, and financial goal management. Uses a hybrid regex + LLM categorization system with confidence scoring.',
        tags: ['Next.js', 'FastAPI', 'Python', 'SQLite', 'Gemini AI'],
        github: 'https://github.com/theboylexis/finlens',
        live: 'https://finlens-beta.vercel.app/',
        status: 'live',
        preview: '/images/finlens-preview.png',
    },
    {
        title: 'Portfolio Website',
        description:
            'This site — built with Next.js and vanilla CSS. Clean, minimalist design with dark/light theming, SEO optimization, and responsive layout. No templates, no UI libraries.',
        tags: ['Next.js', 'CSS Modules', 'Vercel'],
        github: 'https://github.com/theboylexis/my-portfolio',
        status: 'in-progress',
    },
];

function GithubIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function ExternalIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <p className={styles.label}>projects</p>
            <h2 className={styles.heading}>What I&apos;ve built</h2>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <article key={project.title} className={styles.card}>
                        {project.preview && (
                            <div className={styles.previewWrapper}>
                                <Image
                                    src={project.preview}
                                    alt={`${project.title} preview`}
                                    width={680}
                                    height={380}
                                    className={styles.previewImage}
                                />
                            </div>
                        )}
                        <div className={styles.cardBody}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                                <div className={styles.cardLinks}>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.cardLink}
                                            aria-label={`${project.title} GitHub`}
                                        >
                                            <GithubIcon />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.cardLink}
                                            aria-label={`${project.title} live demo`}
                                        >
                                            <ExternalIcon />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className={styles.cardDesc}>{project.description}</p>

                            <div className={styles.tags}>
                                {project.status === 'live' && (
                                    <span className={styles.statusLive}>● live</span>
                                )}
                                {project.status === 'in-progress' && (
                                    <span className={styles.statusProgress}>● in progress</span>
                                )}
                                {project.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
