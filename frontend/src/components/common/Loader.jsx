import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary-100 border-t-primary-700 rounded-full"
        />
        <div className="text-center">
          <div className="font-heading font-bold text-2xl text-primary-800">Cresta Foods</div>
          <div className="font-body text-xs text-accent-500 tracking-widest uppercase mt-0.5">Premium Indian Exports</div>
        </div>
        {/* Progress bar */}
        <motion.div
          className="w-48 h-0.5 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-primary-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
