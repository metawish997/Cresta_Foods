import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiMapPin } from 'react-icons/hi2';
import SectionHeading from '../common/SectionHeading';
import EditableText from '../EditableText';
import EditableImage from '../EditableImage';

// Sourcing images
import freshGuarImg from '../../assets/images/sourcing/fresh-guar.png';
import onionImg from '../../assets/images/sourcing/onion.png';
import exportImg from '../../assets/images/sourcing/export.png';
import guarKormaChuriImg from '../../assets/images/sourcing/guar-korma-churi.png';

const sourcingRegions = [
 {
 id: 1,
 name: 'Rajasthan, India',
 subtitle: 'Guar Gum Sourcing Hub',
 description: 'India accounts for over 80% of global guar production. We source exclusively from FSSC 22000 certified mills across Rajasthan — the world\'s primary guar belt.',
 image: freshGuarImg,
 capacity: 'Viscosity: 3500–7000+ CPS',
 features: ['Food Grade', 'Industrial Grade', '100/200/300 Mesh', 'COA Verified'],
 },
 {
 id: 2,
 name: 'Mahuva, Gujarat',
 subtitle: 'Dehydrated Onion Processing',
 description: 'Mahuva, Gujarat is India\'s premier onion processing belt. We source from trusted dehydration units with strict moisture and quality controls for export compliance.',
 image: onionImg,
 capacity: 'Moisture: Max 6%',
 features: ['White Onion', 'Red Onion', 'Pink Onion', 'Sortex Grade'],
 },
 {
 id: 3,
 name: 'Mundra Port, Gujarat',
 subtitle: 'Primary Export Gateway',
 description: 'All shipments dispatch from Mundra Port — one of India\'s largest and most efficient container ports. FOB, CIF, CFR Incoterms available for global buyers.',
 image: exportImg,
 capacity: 'APEDA Registered',
 features: ['Export Ready', 'Full Docs', 'Global Reach', 'Fast Transit'],
 },
 {
 id: 4,
 name: 'Animal Feed Processors',
 subtitle: 'Guar Meal — Korma & Churi',
 description: 'Guar Korma and Guar Churi are sourced from certified processors across India\'s guar belt. High-protein animal feed ingredients for cattle, poultry, and aquaculture.',
 image: guarKormaChuriImg,
 capacity: 'Protein: 40–55%',
 features: ['Guar Korma', 'Guar Churi', '50kg PP Bags', 'Export Grade'],
 },
];

const RegionCard = ({ region, index, inView }) => (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
 >
 <div className="relative h-32 sm:h-48 overflow-hidden flex-shrink-0">
 <EditableImage
   id={`home_plants_image_${region.id}`}
   defaultSrc={region.image}
   alt={region.name}
   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
   wrapperClassName="w-full h-full block"
 />
 <div className="absolute inset-0 bg-gray-900/40 pointer-events-none" />
 <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white text-[10px] sm:text-[11px] uppercase tracking-widest px-2 py-1 sm:px-3 sm:py-1.5 rounded border border-gray-200 dark:border-gray-700">
 {region.capacity}
 </div>
 </div>

 <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
 <div className="flex items-start gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
 <HiMapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600 mt-0.5 flex-shrink-0" />
 <EditableText id={`home_plants_region_${region.id}`} defaultText={region.name} as="span" className="text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider" />
 </div>

 <EditableText id={`home_plants_subtitle_${region.id}`} defaultText={region.subtitle} as="h3" className="font-heading text-gray-900 dark:text-white text-sm sm:text-lg mb-1.5 sm:mb-2 line-clamp-1" />
 <EditableText id={`home_plants_desc_${region.id}`} defaultText={region.description} as="p" className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 font-body leading-relaxed sm:leading-loose mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3" />

 <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4 mt-auto">
 {region.features.map((feat) => (
 <span
 key={feat}
 className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-body"
 >
 {feat}
 </span>
 ))}
 </div>

 <Link
 to="/global-exports"
 className="inline-flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-[13px] uppercase tracking-widest text-primary-700 hover:text-primary-900 transition-colors group/link mt-auto"
 >
 View Export Details
 <HiArrowLongRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
 </Link>
 </div>
 </motion.div>
);

const ManufacturingPlants = () => {
 const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

 return (
 <section ref={ref} className="pt-12 md:pt-16 pb-8 md:pb-12 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
 {/* Side-wise glowing orbs for Dark Mode (Left side only for alternating layout) */}
 <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />
 
 <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
 <div className="text-center mx-auto max-w-2xl mb-10 md:mb-16">
   <EditableText id="home_plants_eyebrow" defaultText="Our Sourcing Network" as="span" className="text-primary-600 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body mb-2 sm:mb-3 inline-block" />
   <div className="flex flex-row items-center gap-2 sm:gap-3 mb-1.5 sm:mb-5 justify-center">
     <div className="w-6 sm:w-8 h-0.5 bg-primary-500 rounded-full" />
     <EditableText id="home_plants_title" defaultText="Sourcing Regions & Logistics" as="h2" className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight px-4 sm:px-0 text-gray-900 dark:text-white" />
     <div className="w-6 sm:w-8 h-0.5 bg-primary-500 rounded-full" />
   </div>
   <EditableText id="home_plants_desc" defaultText="Strategically sourced from India's premier guar and onion production belts — with direct port access for efficient global export." as="p" className="text-[11px] sm:text-sm md:text-base leading-relaxed sm:leading-loose font-body px-2 sm:px-0 text-gray-500 dark:text-gray-400" />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
 {sourcingRegions.map((region, i) => (
 <RegionCard key={region.id} region={region} index={i} inView={inView} />
 ))}
 </div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ delay: 0.6 }}
 className="text-center mt-8"
 >
 <Link
 to="/global-exports"
 className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs uppercase tracking-widest rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto"
 >
 Explore Global Exports
 <HiArrowLongRight className="w-4 h-4" />
 </Link>
 </motion.div>
 </div>
 </section>
 );
};

export default ManufacturingPlants;
