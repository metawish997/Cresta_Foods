import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import SectionHeading from '../common/SectionHeading';
import { usePageContent } from '../../context/PageContentContext';

const certData = [
 {
 id: 1,
 name: 'FSSAI',
 description: 'Food Safety & Standards Authority of India',
 color: '#E65100',
 initials: 'FSSAI',
 image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/FSSAI_logo.svg/800px-FSSAI_logo.svg.png',
 },
 {
 id: 2,
 name: 'HACCP',
 description: 'Hazard Analysis Critical Control Points',
 color: '#1565C0',
 initials: 'HACCP',
 image: null,
 },
 {
 id: 3,
 name: 'ISO 22000',
 description: 'Food Safety Management System',
 color: '#2E7D32',
 initials: 'ISO',
 image: null,
 },
 {
 id: 4,
 name: 'FSSC 22000',
 description: 'Food Safety System Certification',
 color: '#0277BD',
 initials: 'FSSC',
 image: null,
 },
 {
 id: 5,
 name: 'APEDA',
 description: 'Agricultural & Processed Food Products Export Development Authority',
 color: '#6A1B9A',
 initials: 'APEDA',
 image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Agricultural_and_Processed_Food_Products_Export_Development_Authority_logo.svg/1200px-Agricultural_and_Processed_Food_Products_Export_Development_Authority_logo.svg.png',
 },
 {
 id: 6,
 name: 'Halal',
 description: 'Halal Certified Supply Chain',
 color: '#00695C',
 initials: 'HALAL',
 image: null,
 },
 {
 id: 7,
 name: 'Kosher',
 description: 'Kosher Certified Products',
 color: '#0D47A1',
 initials: 'KOSHER',
 image: null,
 },
 {
 id: 8,
 name: 'GMP',
 description: 'Good Manufacturing Practice',
 color: '#33691E',
 initials: 'GMP',
 image: null,
 },
 {
 id: 9,
 name: 'BRCGS',
 description: 'British Retail Consortium Global Standards',
 color: '#BF360C',
 initials: 'BRC',
 image: null,
 },
];

 const CertCard = ({ cert }) => {
  const imageSrc = cert.image_path ? (cert.image_path.startsWith('http') ? cert.image_path : `/uploads/${cert.image_path}`) : cert.image;
  return (
 <div className="group w-full flex flex-col items-center justify-center text-center px-1">
 <div className="w-14 h-14 sm:w-20 sm:h-20 mb-2 sm:mb-4 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-primary-300">
 {imageSrc ? (
 <img
 src={imageSrc}
 alt={cert.name}
 className="h-6 sm:h-10 w-auto object-contain"
 onError={(e) => {
 e.target.style.display = 'none';
 if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
 }}
 />
 ) : null}
 <div
 className="w-full h-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-[13px] sm:text-sm font-heading"
 style={{
 display: imageSrc ? 'none' : 'flex',
 }}
 >
 {cert.initials || cert.name.substring(0, 5)}
 </div>
 </div>
 <h3 className="font-heading text-gray-900 dark:text-white text-[10px] sm:text-sm uppercase tracking-wider mb-1 line-clamp-1 w-full">{cert.name}</h3>
 <div className="w-full h-8 sm:h-12 overflow-y-auto custom-scrollbar px-1">
 <p className="text-[8px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-body leading-tight">{cert.description}</p>
 </div>
 </div>
  );
};

const Certifications = () => {
  const { certifications } = usePageContent();
  const displayCerts = certifications?.length > 0 ? certifications : certData;

 return (
 <section className="relative py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden border-t border-gray-50 dark:border-gray-800">
 {/* Side-wise glowing orbs for Dark Mode (Right side only for alternating layout) */}
 <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />

 <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
 <SectionHeading
 subtitle="Trust & Compliance"
 title="Certifications & Standards"
 description="Our supply chain partners maintain internationally recognised quality management, food safety, and export certifications — ensuring every product meets your market requirements."
 />

 <style>
 {`
 .marquee-swiper .swiper-wrapper {
 transition-timing-function: linear !important;
 }
 .custom-scrollbar::-webkit-scrollbar {
 width: 2px;
 }
 .custom-scrollbar::-webkit-scrollbar-track {
 background: transparent;
 }
 .custom-scrollbar::-webkit-scrollbar-thumb {
 background: #9ca3af;
 border-radius: 4px;
 }
 `}
 </style>
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="mt-8 sm:mt-16 overflow-hidden"
 >
 <Swiper
 modules={[Autoplay]}
 slidesPerView={3}
 spaceBetween={10}
 loop={true}
 speed={5000}
 autoplay={{
 delay: 0,
 disableOnInteraction: false,
 pauseOnMouseEnter: true
 }}
 allowTouchMove={true}
 className="marquee-swiper w-full"
 breakpoints={{
 480: { slidesPerView: 4, spaceBetween: 15 },
 768: { slidesPerView: 5, spaceBetween: 20 },
 1024: { slidesPerView: 6, spaceBetween: 30 },
 1280: { slidesPerView: 7, spaceBetween: 40 },
 }}
 >
 {displayCerts.map((cert) => (
 <SwiperSlide key={cert._id || cert.id}>
 <CertCard cert={cert} />
 </SwiperSlide>
 ))}
 </Swiper>
 </motion.div>
 </div>
 </section>
 );
};

export default Certifications;
