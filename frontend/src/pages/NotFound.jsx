import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiArrowLongRight } from 'react-icons/hi2';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto"
      >
        {/* Decorative */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🥔
        </motion.div>

        <div className="font-heading font-bold text-8xl text-gray-200 mb-4 select-none">404</div>

        <h1 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 font-body text-base leading-relaxed mb-8">
          It looks like this page has gone missing just like a lost potato flake! Let's get you back
          on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors text-sm shadow-[0_4px_16px_rgba(46,125,50,0.3)]"
          >
            <HiHome className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-700 transition-colors text-sm"
          >
            Browse Products <HiArrowLongRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-400 font-body">
          Or try using the navigation above to find what you're looking for.
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
