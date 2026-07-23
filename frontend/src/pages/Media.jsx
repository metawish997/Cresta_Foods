import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import SeoHead from '../components/SeoHead';
import api from '../utils/api';

/* Each card hides itself until image loads. Broken images never show. */
const MediaCard = ({ img, delay, onOpen }) => {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.3 }}
      onClick={visible ? onOpen : undefined}
      className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ${
        visible ? '' : 'hidden'
      }`}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onLoad={() => setVisible(true)}
        onError={() => setVisible(false)}
      />
      <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-all duration-300" />
    </motion.div>
  );
};

const Media = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const navigate = useNavigate();
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double-fetch in StrictMode / HMR
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const loadPage = async () => {
      try {
        const { data } = await api.get('/page-content/global');
        if (data.isMediaPageActive !== 'true') {
          navigate('/', { replace: true });
          return;
        }
        const mediaRes = await api.get('/media/public');
        setGalleryImages(
          mediaRes.data.map((m) => ({
            id: m._id,
            src: m.url,
            alt: (m.originalName || m.filename)
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]/g, ' '),
          }))
        );
      } catch {
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []); // empty deps — runs once on mount

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        {/* Hero skeleton */}
        <div className="relative h-48 sm:h-[40vh] min-h-[250px] bg-gray-200 dark:bg-gray-800 animate-pulse" />

        {/* Grid skeleton */}
        <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 flex-1">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SeoHead slug="media" />

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src="/images/media-banner.png"
          alt="Media Gallery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap mb-3 sm:mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <span className="text-white">Media</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-widest leading-snug">
              Media Gallery
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 flex-1">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {galleryImages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {galleryImages.map((img, i) => (
                <MediaCard key={img.id} img={img} delay={i * 0.02} onOpen={() => setLightbox(img)} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 dark:text-gray-500 font-heading tracking-widest uppercase text-sm">
                No media available yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-full mt-4 shadow-xl border border-gray-100 dark:border-gray-700">
                <p className="text-gray-800 dark:text-gray-200 font-heading font-bold uppercase tracking-widest text-[10px] sm:text-[11px]">
                  {lightbox.alt}
                </p>
              </div>
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <HiXMark className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Media;
