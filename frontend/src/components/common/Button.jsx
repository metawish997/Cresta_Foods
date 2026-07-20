import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
  primary:
    'bg-primary-700 text-white hover:bg-primary-800 shadow-md shadow-primary-700/30 hover:shadow-xl hover:shadow-primary-700/40',
  secondary:
    'bg-transparent text-primary-700 border-2 border-primary-700 hover:bg-primary-700 hover:text-white',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-md shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40',
  white:
    'bg-white text-primary-800 hover:bg-gray-100 shadow-md hover:shadow-lg',
  ghost:
    'bg-transparent text-gray-700 hover:text-primary-700 hover:bg-green-50',
  dark:
    'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-4 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      to,
      href,
      className = '',
      icon,
      iconPosition = 'right',
      loading = false,
      disabled = false,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      'inline-flex items-center justify-center gap-2 font-semibold font-body rounded-xl',
      'transition-all duration-300 select-none whitespace-nowrap',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      variants[variant],
      sizes[size],
      (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    );

    const content = (
      <>
        {loading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !loading && <span>{icon}</span>}
      </>
    );

    if (to) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to={to} ref={ref} className={baseClasses} {...props}>
            {content}
          </Link>
        </motion.div>
      );
    }

    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <a href={href} ref={ref} className={baseClasses} target="_blank" rel="noopener noreferrer" {...props}>
            {content}
          </a>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        className={baseClasses}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
