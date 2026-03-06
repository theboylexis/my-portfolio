'use client';

import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function SectionReveal({ children, className, delay = 0 }) {
    return (
        <motion.div
            className={className}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
