import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../common/SectionHeading';
import { Link } from 'react-router-dom';

const advantages = [
 {
 icon: '🔬',
 title: 'Specification-Based Sourcing',
 desc: 'Every product is sourced against defined specifications. Viscosity, mesh, moisture, and microbiological parameters all verified before dispatch.',
 },
 {
 icon: '🏭',
 title: 'FSSC 22000 Certified Partners',
 desc: 'We source exclusively from audited manufacturers holding FSSC 22000, ISO 22000, and FSSAI certifications no compromises on food safety compliance.',
 },
 {
 icon: '📋',
 title: 'Full Export Documentation',
 desc: 'COA, TDS, phytosanitary certificate, COO, invoice, packing list every shipment comes with complete documentation ready for customs clearance.',
 },
 {
 icon: '🧪',
 title: 'Third-Party Lab Verified',
 desc: 'Pre-shipment samples available. NABL-accredited lab testing for every lot viscosity, purity, microbiological analysis, and aflatoxin screening.',
 },
 {
 icon: '🚢',
 title: 'Flexible Incoterms',
 desc: 'FOB, CIF, CFR flexible incoterms from Mundra Port, India. APEDA registered exporter with global logistics network.',
 },
 {
 icon: '⚡',
 title: 'Fast Response',
 desc: 'Sample and quote within 24 hours. Tell us your application we match the grade, the micro spec, and the paperwork.',
 },
];

const CrestaFoodsGroup = () => {
 const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

 return (
 <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
 {/* Background texture */}
 <div className="absolute inset-0 opacity-40">
 <div className="absolute inset-0" style={{
 backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0)',
 backgroundSize: '40px 40px',
 }} />
 </div>

 <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
 <SectionHeading
 subtitle="The Cresta Advantage"
 title="Why Partner with Cresta Foods"
 description="We don't just supply ingredients we supply consistency, compliance, and confidence in every shipment."
 theme="light"
 />

 <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
 {/* Text */}
 <motion.div
 initial={{ opacity: 0, x: -40 }}
 animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.7 }}
 >
 <p className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed sm:leading-loose mb-5 sm:mb-6 font-body">
 At Cresta Foods, we understand that sourcing food ingredients internationally requires more than just a good product.
 It requires a supplier who understands your compliance requirements, speaks your technical language,
 and delivers consistently shipment after shipment.
 </p>
 <p className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm md:text-base leading-relaxed sm:leading-loose mb-6 sm:mb-8 font-body">
 We work closely with importers, distributors, processors, and manufacturers to provide products
 that align with their operational, regulatory, and market requirements. Our sourcing network spans
 Rajasthan (Guar Gum) and Mahuva, Gujarat (Dehydrated Onions) India's premier production belts.
 </p>

 <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
 <h3 className="font-heading text-sm sm:text-lg text-gray-900 dark:text-white mb-1.5 sm:mb-2">
 Tell us your end-use.
 </h3>
 <p className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm leading-relaxed font-body">
 We match the grade, the micro spec, and the paperwork. Sample and quote available usually within 24 hours.
 </p>
 </div>

 <Link
 to="/about"
 className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-[10px] sm:text-xs uppercase tracking-widest w-full sm:w-auto"
 >
 Learn More About Us
 </Link>
 </motion.div>

 {/* Advantages Grid */}
 <motion.div
 initial={{ opacity: 0, x: 40 }}
 animate={inView ? { opacity: 1, x: 0 } : {}}
 transition={{ duration: 0.7, delay: 0.15 }}
 className="grid grid-cols-2 gap-2 sm:gap-4"
 >
 {advantages.map((adv, i) => (
 <motion.div
 key={adv.title}
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ delay: 0.2 + i * 0.08 }}
 className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 sm:p-5 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group flex flex-col h-full"
 >
 <div className="text-xl sm:text-2xl mb-2 sm:mb-3 opacity-80">{adv.icon}</div>
 <h4 className="font-heading text-gray-900 dark:text-white text-[13px] sm:text-sm mb-1.5 sm:mb-2 leading-tight">{adv.title}</h4>
 <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-xs font-body leading-relaxed flex-grow">{adv.desc}</p>
 </motion.div>
 ))}
 </motion.div>
 </div>

 {/* Trust strip — image gallery of products */}
 {/* <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ delay: 0.4 }}
 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
 >
 {[
 { img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&q=80', title: 'Farm Fresh' },
 { img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80', title: 'Raw Sourcing' },
 { img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80', title: 'Agriculture' },
 { img: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=200&q=80', title: 'Processing' },
 { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=80', title: 'Origin Farms' },
 { img: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=200&q=80', title: 'Lab Tested' },
 ].map((item, i) => (
 <div key={i} className="relative rounded-xl overflow-hidden h-24 sm:h-28 group cursor-default">
 <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center p-2">
 <span className="text-white font-heading text-[10px] sm:text-xs text-center uppercase tracking-wider drop-shadow-md">
 {item.title}
 </span>
 </div>
 </div>
 ))}
 </motion.div> */}
 </div>
 </section>
 );
};

export default CrestaFoodsGroup;
