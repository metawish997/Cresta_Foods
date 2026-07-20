import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
 HiArrowLongRight,
 HiOutlineMapPin,
 HiOutlineClipboardDocumentCheck,
 HiOutlineQrCode,
 HiOutlineBeaker,
 HiOutlineTruck,
 HiOutlineDocumentText,
 HiOutlineShieldCheck
} from 'react-icons/hi2';
import bgImage from '../../assets/images/secondorybanner.png';
import EditableText from '../EditableText';
import EditableList from '../EditableList';

const VideoSection = () => {
 return (
 <section className="relative py-0 overflow-hidden">
 <div className="relative h-auto min-h-[60vh] py-12 sm:py-16">
 {/* Background — guar field / onion harvest scene */}
 <img
 src={bgImage}
 alt="Cresta Foods — Quality Indian Ingredients"
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/80 sm:bg-gray-900/70" />

 {/* Content */}
 <div className="relative z-10 h-full min-h-full flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3"
            >
              <EditableText id="home_vid_eyebrow" defaultText="Chain of Custody" as="span" className="text-secondary-400 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-5 max-w-5xl xl:max-w-6xl mx-auto w-full"
            >
              <EditableText id="home_vid_title" defaultText="From Farm Lot to Bill of Lading: Documented Chain of Custody" as="h2" className="font-heading text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8 sm:mb-10 max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-0 w-full"
            >
              <EditableText id="home_vid_desc" defaultText="Every consignment carries an unbroken audit trail from the approved farm cluster where raw material originates, to post-landing support at your port. Seven checkpoints. Zero undocumented handoffs. We assign a unique Cresta Lot Code to every consignment at the mill. That code ties together farm origin, lab results, container number, and shipping documents all retrievable for 12 months." as="p" className="text-gray-300 text-[13px] sm:text-sm font-body leading-relaxed sm:leading-loose" />
            </motion.div>

 <motion.div
 initial={{ opacity: 0, scale: 0.9 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 0.3 }}
 className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full px-4 sm:px-0 max-w-xs sm:max-w-none mx-auto"
 >
 
 </motion.div>

 {/* Key specs strip */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.4 }}
 className="mt-10 sm:mt-12 flex flex-wrap lg:flex-nowrap items-start justify-start lg:justify-between gap-y-12 lg:gap-y-0 w-full max-w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24"
 >
 <EditableList 
 id="home_vid_steps_list"
 listContainerClass="mt-10 sm:mt-12 flex flex-wrap lg:flex-nowrap items-start justify-start lg:justify-between gap-y-12 lg:gap-y-0 w-full max-w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24"
 defaultItems={[
 { id: '01', num: '01', emoji: '🌾', label: 'Approved Farm Clusters', desc: 'Raw material sourced only from pre-approved, geo-mapped farm clusters in Rajasthan (guar) and Gujarat/MP (onion).' },
 { id: '02', num: '02', emoji: '🏭', label: 'QA at Partner Mill', desc: 'Incoming raw material tested at partner mill for moisture, aflatoxin, and physical parameters before processing begins.' },
 { id: '03', num: '03', emoji: '🏷️', label: 'Cresta Lot Coding', desc: 'Each production lot is assigned a unique Cresta Lot Code linking farm origin, processing date, mill ID, and batch parameters.' },
 { id: '04', num: '04', emoji: '🔬', label: 'NABL Lab Testing', desc: 'Finished product tested at NABL-accredited third-party laboratory. COA issued against your specification.' },
 { id: '05', num: '05', emoji: '📦', label: 'Container Stuffing Under Supervision', desc: 'Container loading is supervised and documented. Stuffing photographs are recorded and shared with the buyer before sailing.' },
 { id: '06', num: '06', emoji: '⚓', label: 'Port Clearance — Mundra', desc: 'Export cleared through Mundra Port with full documentation: Commercial Invoice, Packing List, Bill of Lading, COO, etc.' },
 { id: '07', num: '07', emoji: '🤝', label: 'Post-Landing Support', desc: 'We remain available after the container lands — for customs documentation, import queries, and quality feedback.' }
 ]}
 newItemTemplate={{ num: 'XX', emoji: '⭐', label: 'New Step', desc: 'Description of the new step.' }}
 renderItem={(item, idx) => {
 return (
 <div 
 key={item.id} 
 className="flex-1 min-w-[240px] lg:min-w-0 flex flex-col text-left pr-4 lg:pr-6"
 >
 {/* Top row: Box and Line */}
 <div className="flex items-center mb-6">
 <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 border border-[#c8922a]/60 flex items-center justify-center text-[#c8922a] text-[13px] sm:text-[15px] font-heading font-medium tracking-wider">
 <EditableText id={`home_vid_step_num_${item.id}`} defaultText={item.num} as="span" />
 </div>
 {/* Connecting Line */}
 <div className="flex-1 h-[1px] bg-gradient-to-r from-[#c8922a]/50 to-transparent ml-0 hidden lg:block" />
 </div>
 
 {/* Emoji */}
 <div className="text-xl sm:text-2xl mb-4 opacity-90">
   <EditableText id={`home_vid_step_emoji_${item.id}`} defaultText={item.emoji} as="span" />
 </div>
 
 {/* Title */}
 <EditableText id={`home_vid_step_title_${item.id}`} defaultText={item.label} as="h3" className="font-heading font-medium text-[#c8922a] text-[13px] sm:text-[15px] mb-3 leading-snug pr-2" />
 
 {/* Description */}
 <EditableText id={`home_vid_step_desc_${item.id}`} defaultText={item.desc} as="p" className="text-white text-[12px] sm:text-[13px] leading-relaxed font-body pr-2 lg:pr-4" />
 </div>
 );
 }}
 />
 </motion.div>
 </div>
 </div>
 </section>
 );
};

export default VideoSection;
