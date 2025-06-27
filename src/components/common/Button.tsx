import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'whileHover'> {
  variant?: 'gradient' | 'outline' | 'default';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-8 py-3 rounded-lg font-semibold transition-all duration-300';
  
  const variantClasses = {
    gradient: 'bg-gradient-to-r from-[#FF5A3C] to-[#FFB573] text-white hover:shadow-lg',
    outline: 'border-2 border-[#FF5A3C] text-[#FF5A3C] hover:bg-[#FF5A3C] hover:text-white',
    default: 'bg-[#FF5A3C] text-white hover:bg-[#FFB573]'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}; 