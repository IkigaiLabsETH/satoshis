'use client';

import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  lg: 'h-32 w-32',
};

export function Loading({ size = 'md', className = '' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-t-2 border-b-2 border-yellow-400 rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear' as const,
        }}
      />
    </div>
  );
} 