import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function TeamCard({ name, role, blurb, image }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const cardVariants = {
        rest: { y: 0 },
        hover: { y: shouldReduceMotion ? 0 : -8 }
    };

    return (
        <motion.article
            className="team-card"
            initial="rest"
            whileHover="hover"
            variants={cardVariants}
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
            tabIndex={0}
            role="button"
            aria-expanded={isExpanded}
        >
            {/* Avatar Circle */}
            <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-semibold"
                style={{
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-warm))',
                    color: 'white'
                }}
                aria-hidden="true"
            >
                {name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Name */}
            <h3 className="headline-md text-center mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {name}
            </h3>

            {/* Role */}
            <p className="body-md text-center mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {role}
            </p>

            {/* Expandable Blurb */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                        className="overflow-hidden"
                    >
                        <p
                            className="body-md text-center pt-3 border-t"
                            style={{
                                color: 'var(--color-text-secondary)',
                                borderColor: 'rgba(0,0,0,0.1)'
                            }}
                        >
                            {blurb}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expand Indicator */}
            <motion.div
                className="flex justify-center mt-3"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: 'var(--color-text-secondary)' }}
                    />
                </svg>
            </motion.div>
        </motion.article>
    );
}
