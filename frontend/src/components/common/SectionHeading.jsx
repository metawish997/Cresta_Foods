import clsx from 'clsx';
import { motion } from 'framer-motion';

const SectionHeading = ({
  subtitle,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={clsx(
        'mb-10 md:mb-16',
        align === 'center' && 'text-center mx-auto max-w-2xl',
        align === 'left' && 'text-left',
        className
      )}
    >
      {subtitle && (
        <span
          className={clsx(
            'inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3 font-body',
            theme === 'light' ? 'text-primary-600' : 'text-secondary-400'
          )}
        >
          {subtitle}
        </span>
      )}
      <div
        className={clsx(
          'flex flex-row items-center gap-2 sm:gap-3 mb-1.5 sm:mb-5',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        {align === 'center' && <div className="w-6 sm:w-8 h-0.5 bg-primary-500 rounded-full" />}
        <h2
          className={clsx(
            'font-heading font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight px-4 sm:px-0',
            theme === 'light' ? 'text-gray-900 dark:text-white' : 'text-white'
          )}
        >
          {title}
        </h2>
        {align === 'center' && <div className="w-6 sm:w-8 h-0.5 bg-primary-500 rounded-full" />}
      </div>
      {description && (
        <p
          className={clsx(
            'text-[11px] sm:text-sm md:text-base leading-relaxed sm:leading-loose font-body px-2 sm:px-0',
            theme === 'light' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-300'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
