import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { usePageContent } from '../../context/PageContentContext';

const HeroSlider = () => {
 const [activeIndex, setActiveIndex] = useState(0);
 const { heroSlides } = usePageContent();

 if (!heroSlides || heroSlides.length === 0) return null;

 return (
 <section className="relative w-full h-auto md:h-[100vh] lg:min-h-[600px] overflow-hidden bg-gray-100">
 <Swiper
 modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
 effect="coverflow"
 speed={1500}
 loop={true}
 coverflowEffect={{
 rotate: 50,
 stretch: 0,
 depth: 500,
 modifier: 1,
 slideShadows: true,
 }}
 autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
 pagination={{
 clickable: true,
 el: '.hero-pagination',
 }}
 navigation={{
 prevEl: '.hero-prev',
 nextEl: '.hero-next',
 }}
 onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
 className="w-full h-full"
 >
 {heroSlides.map((slide, idx) => (
 <SwiperSlide key={slide._id || idx}>
 <div className="relative w-full h-full">
 <picture className="w-full h-full">
 <img
 src={slide.image_path ? (slide.image_path.startsWith('http') ? slide.image_path : `/uploads/${slide.image_path}`) : ''}
 alt={slide.alt_text || `Slide ${idx}`}
 className="w-full h-auto md:h-full object-cover"
 />
 </picture>
 </div>
 </SwiperSlide>
 ))}
 </Swiper>

 {/* Vertical pagination bullets */}
 <div className="hero-pagination absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3" />

 {/* Navigation buttons */}
 <button
 className="hero-prev hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/30 border border-white/30 dark:border-gray-700 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
 aria-label="Previous slide"
 >
 <HiChevronLeft className="w-5 h-5" />
 </button>
 <button
 className="hero-next hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/30 border border-white/30 dark:border-gray-700 text-white rounded-full items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110"
 aria-label="Next slide"
 >
 <HiChevronRight className="w-5 h-5" />
 </button>

 {/* Slide counter */}
 <div className="hidden md:block absolute bottom-8 right-8 z-20 text-white/60 text-sm font-mono">
 <span className="text-white text-lg">{String(activeIndex + 1).padStart(2, '0')}</span>
 <span className="mx-1">/</span>
 <span>{String(heroSlides.length).padStart(2, '0')}</span>
 </div>

 {/* Scroll indicator */}
 <motion.div
 animate={{ y: [0, 10, 0] }}
 transition={{ duration: 2, repeat: Infinity }}
 className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
 >
 <span className="text-[10px] tracking-widest uppercase font-body">Scroll</span>
 <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
 </motion.div>
 </section>
 );
};

export default HeroSlider;
