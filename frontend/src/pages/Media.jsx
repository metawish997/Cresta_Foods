import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiPlay } from 'react-icons/hi2';
import SeoHead from '../components/SeoHead';
import api from '../utils/api';

// Gallery images will be fetched dynamically from the backend
const videos = [
  {
    id: 1,
    title: 'Cresta Foods - Group Overview',
    thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    youtubeId: 'iQDZJ98zO78',
  },
  {
    id: 2,
    title: 'Manufacturing Process Tour',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    youtubeId: 'iQDZJ98zO78',
  },
  {
    id: 3,
    title: 'Quality Control Process',
    thumbnail: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
    youtubeId: 'iQDZJ98zO78',
  },
];

const tabs = ['All', 'Products', 'Lab & Facilities', 'Videos'];

const Media = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [tab, setTab] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data } = await api.get('/page-content/global');
        if (data.isMediaPageActive !== 'true') {
          navigate('/', { replace: true });
        } else {
          setIsAllowed(true);
          // Fetch dynamic media
          const mediaRes = await api.get('/media/public');
          setGalleryImages(mediaRes.data.map(m => ({
            id: m._id,
            src: m.url,
            alt: (m.originalName || m.filename).replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
            category: 'Products' // all dynamically fetched default to 'Products' for now
          })));
        }
      } catch (err) {
        navigate('/', { replace: true });
      }
    };
    checkAccess();
  }, [navigate]);

  // Filter images based on tab
  const filteredImages = tab === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === tab);

  if (!isAllowed) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <SeoHead slug="media" />
      {/* Hero Banner */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&q=80"
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
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-widest leading-snug">Media Gallery</h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 flex-1">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          
          {/* Tab switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  tab === t
                    ? 'bg-primary-700 text-white shadow-[0_2px_15px_-3px_rgba(46,125,50,0.4)] border border-primary-700'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Photo Gallery (All, Products, Lab) */}
          {tab !== 'Videos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
                {filteredImages.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    onClick={() => setLightbox(img)}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 transition-all duration-300 flex items-center justify-center">
                      {/* Name removed per user request */}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}

          {/* Video Gallery */}
          {tab === 'Videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {videos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setVideoModal(video)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer bg-white dark:bg-gray-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 flex flex-col"
                >
                  <div className="relative h-48 sm:h-56">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/50 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary-600 transition-all duration-300">
                        <HiPlay className="w-6 h-6 text-primary-700 group-hover:text-white ml-0.5 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-6 py-5 grow flex items-center">
                    <h3 className="font-heading font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 text-[11px] sm:text-[12px] leading-snug">{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredImages.length === 0 && tab !== 'Videos' && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 font-heading tracking-widest uppercase text-sm">No images found for this category.</p>
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
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

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-8"
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                title={videoModal.title}
                src={`https://www.youtube.com/embed/${videoModal.youtubeId}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            <button
              onClick={() => setVideoModal(null)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close video"
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
