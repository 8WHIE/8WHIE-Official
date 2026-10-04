import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-xs sm:text-sm gap-2.5',
    lg: 'px-8 py-4 text-sm gap-3',
  };

  const variantStyles = {
    primary: 'text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_25px_rgba(183,255,0,0.3)]',
    secondary: 'text-[#F2F2F2] bg-[#141414] hover:bg-[#1E1E1E] border border-white/[0.12] hover:border-white/30',
    outline: 'text-[#F2F2F2] hover:text-[#070707] bg-transparent hover:bg-[#F2F2F2] border border-white/20 hover:border-[#F2F2F2]',
    ghost: 'text-[#929292] hover:text-[#B7FF00] bg-transparent hover:bg-white/[0.04]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
};
