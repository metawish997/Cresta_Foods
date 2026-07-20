import clsx from 'clsx';

const Container = ({ children, className = '', size = 'default' }) => {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    lg: 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div className={clsx('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
};

export default Container;
