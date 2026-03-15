'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Prefix hash links with "/" when not on the home page
    const resolveHref = (href) => {
        if (href.startsWith('#') && !isHome) return '/' + href;
        return href;
    };

    useEffect(() => {
        const sectionIds = navLinks.map((link) => link.href.slice(1));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.navInner}>
                <a href={isHome ? '#' : '/'} className={styles.logo}>
                    <span className={styles.logoAccent}>&gt;</span> alex.marfo
                </a>

                <ul className={styles.links}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={resolveHref(link.href)}
                                className={`${styles.link} ${activeSection === link.href.slice(1) ? styles.linkActive : ''
                                    }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={styles.actions}>
                    <a href={resolveHref('#contact')} className={styles.navCta}>
                        Let&apos;s talk
                    </a>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="4" y1="8" x2="20" y2="8" />
                                <line x1="4" y1="16" x2="20" y2="16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <motion.div
                    className={styles.mobileMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={resolveHref(link.href)}
                            className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.mobileLinkActive : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
}
