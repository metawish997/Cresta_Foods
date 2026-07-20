import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EditableText from '../EditableText';
import EditableList from '../EditableList';

const steps = [
 { num: '01', title: 'Inquiry & Requirements', desc: 'Share your product, grade, quantity, packaging preference, destination port, and any specific requirements.' },
 { num: '02', title: 'Quotation', desc: 'We provide a detailed, competitive quote with full product specs, Incoterms, lead time, and payment terms.' },
 { num: '03', title: 'Sample Dispatch', desc: 'On request, trial samples are dispatched for your independent quality testing and approval before commitment.' },
 { num: '04', title: 'Order Confirmation', desc: 'Purchase order received, proforma invoice issued, and payment terms confirmed and agreed in writing.' },
 { num: '05', title: 'Sourcing & QC', desc: 'We source, pack, and independently test the consignment at the production facility against your specification.' },
 { num: '06', title: 'Shipment & Documents', desc: 'Full shipment dispatched. All documents — BL, COA, COO, Phytosanitary, Invoice — provided promptly.' },
];

const StatisticsSection = () => {
 const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

 return (
 <section ref={ref} className="py-8 md:py-10 lg:py-12 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
 {/* Minimal background pattern */}
 <div className="absolute inset-0 opacity-40">
 <div className="absolute inset-0" style={{
 backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e7eb 1px, transparent 0)',
 backgroundSize: '30px 30px',
 }} />
 </div>

 <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6 }}
 className="text-center mb-8 lg:mb-10"
 >
 <EditableText id="home_stats_eyebrow" defaultText="Step by Step" as="p" className="text-primary-600 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body mb-3" />
 <EditableText id="home_stats_main_title" defaultText="From Your Inquiry to Your Port" as="h2" className="font-heading text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white mb-4" />
 <EditableText id="home_stats_desc" defaultText="A transparent, six-step process built entirely around your import requirements — with no surprises at any stage." as="p" className="text-gray-500 text-sm sm:text-base font-body max-w-2xl mx-auto" />
 </motion.div>

 <div className="relative">
 {/* Horizontal Line connecting steps on large screens */}
 <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-gray-200 dark:bg-gray-700 z-0" />

 <EditableList
 id="home_stats_steps_list"
 listContainerClass="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 relative z-10"
 defaultItems={[
 { id: '01', num: '01', title: 'Inquiry & Requirements', desc: 'Share your product, grade, quantity, packaging preference, destination port, and any specific requirements.' },
 { id: '02', num: '02', title: 'Quotation', desc: 'We provide a detailed, competitive quote with full product specs, Incoterms, lead time, and payment terms.' },
 { id: '03', num: '03', title: 'Sample Dispatch', desc: 'On request, trial samples are dispatched for your independent quality testing and approval before commitment.' },
 { id: '04', num: '04', title: 'Order Confirmation', desc: 'Purchase order received, proforma invoice issued, and payment terms confirmed and agreed in writing.' },
 { id: '05', num: '05', title: 'Sourcing & QC', desc: 'We source, pack, and independently test the consignment at the production facility against your specification.' },
 { id: '06', num: '06', title: 'Shipment & Documents', desc: 'Full shipment dispatched. All documents — BL, COA, COO, Phytosanitary, Invoice — provided promptly.' }
 ]}
 newItemTemplate={{ num: 'XX', title: 'New Step', desc: 'Description of the step.' }}
 renderItem={(step, i) => (
 <motion.div
 key={step.id}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.08, duration: 0.5 }}
 className="text-center group flex flex-col items-center w-full"
 >
 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-lg sm:text-xl font-heading text-gray-900 dark:text-white mb-5 group-hover:border-primary-600 group-hover:text-primary-600 transition-colors shadow-sm rounded-xl">
 <EditableText id={`home_stats_step_num_${step.id}`} defaultText={step.num} as="span" />
 </div>
 <EditableText id={`home_stats_title_${step.id}`} defaultText={step.title} as="h3" className="font-heading text-[13px] sm:text-[14px] text-gray-900 dark:text-white mb-2 leading-snug" />
 <EditableText id={`home_stats_desc_${step.id}`} defaultText={step.desc} as="p" className="text-gray-500 dark:text-gray-400 text-[12px] sm:text-[13px] leading-relaxed font-body" />
 </motion.div>
 )}
 />
 </div>
 </div>
 </section>
 );
};

export default StatisticsSection;
