'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' } : {}}
            className={`bg-white rounded-xl shadow-md p-6 transition-all ${className}`}
        >
            {children}
        </motion.div>
    );
}
