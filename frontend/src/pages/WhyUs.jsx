import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiCheckBadge } from 'react-icons/hi2';
import {
  Search,
  FlaskConical,
  FileText,
  Package,
  ShieldCheck,
  Globe,
  MapPin,
  ArrowUpRight,
  Handshake
} from 'lucide-react';
import DynamicSections from '../components/DynamicSections';
import EditableText from '../components/EditableText';


const values = [
  { icon: '🔬', title: 'Quality First', desc: 'Every lot is tested at NABL-accredited labs. Full COA provided with every shipment.' },
  { icon: '🤝', title: 'Partnership Mindset', desc: 'We treat every buyer as a long-term partner not a transaction. We grow when you grow.' },
  { icon: '📋', title: 'Transparent Documentation', desc: 'Clear specs, honest COAs, and complete export documentation every time, no exceptions.' },
  { icon: '⚡', title: 'Responsive & Reliable', desc: 'Sample and quote within 24 hours. Real-time updates on production and dispatch status.' },
  { icon: '🌍', title: 'Global Standard', desc: 'Our products meet the standards of USA, EU, Australia, Middle East, and South East Asian markets.' },
  { icon: '🌿', title: 'Natural Integrity', desc: 'We source natural, minimally processed ingredients with clear origin traceability.' },
];

const keyDifferentiators = [
  {
    title: 'Specification-Based Sourcing',
    desc: 'We source against defined technical specs viscosity, mesh, moisture, microbiological limits. No compromises.',
    icon: '📐',
  },
  {
    title: 'Audited Supply Chain',
    desc: 'Our manufacturers hold FSSC 22000, ISO 22000, and FSSAI certifications. We conduct supplier audits annually.',
    icon: '🏭',
  },
  {
    title: 'Grade-Specific Options',
    desc: 'Food grade, industrial grade, 100/200/300 mesh guar gum. White, red, pink onion in 5 cut types. We match your spec exactly.',
    icon: '🎯',
  },
  {
    title: 'Full Traceability',
    desc: 'Batch number, manufacturing date, lot code, and NABL COA all archived for 12 months.',
    icon: '🔍',
  },
];

const stats = [
  { value: '5+', label: 'Years of Export Experience' },
  { value: '40+', label: 'Countries Served' },
  { value: '6', label: 'Core Product Lines' },
  { value: '9+', label: 'Certifications' },
];

const WhyUs = () => {
  return (
    <>
      <title>Why Us | Cresta Foods — Premium Guar Gum & Dehydrated Onion Exporters</title>

      {/* Hero */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
          alt="Why Cresta Foods"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <EditableText id="whyus_breadcrumb" defaultText="Why Us" className="text-white block" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Cresta Foods */}
      <section className="relative overflow-hidden py-8 sm:py-10 bg-gray-50 dark:bg-gray-900">
        {/* Background glow effects for dark mode */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none hidden dark:block" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8">

          {/* Header Area */}
          <div className="mb-0">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
                <EditableText id="whyus_hero_label" defaultText="About Us" as="p" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body block" />
              </div>
              <EditableText id="whyus_hero_title" defaultText="Why Cresta Foods" as="h1" className="font-heading text-4xl sm:text-5xl md:text-5xl text-gray-900 dark:text-white leading-[1.1] mb-6" />
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className=" mx-auto mt-4 sm:mt-8 mb-16 rounded-2xl border border-transparent dark:border-gray-700">

            {/* About Us */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
              <EditableText id="whyus_subtitle" defaultText="Sourcing Excellence Delivered Globally." as="p" className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium mb-6" />
              <EditableText 
                id="whyus_intro" 
                defaultText="From the guar fields of Rajasthan to onion-processing belts of Gujarat and Madhya Pradesh, Cresta Foods brings India's finest food ingredients and agricultural products to buyers across the world with the precision, documentation, and consistency that global trade demands." 
                as="p"
                className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[15px] leading-relaxed" 
              />
            </motion.div>

            <DynamicSections slotId="about-1" />
            <hr className="border-gray-100 dark:border-gray-700 my-10" />

            {/* Who we are */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
              <EditableText id="whyus_who_title" defaultText="Who we are" as="h3" className="font-heading text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-6" />
              <div className="space-y-5 text-gray-600 dark:text-gray-400 text-[13px] md:text-[15px] leading-relaxed">
                <EditableText id="whyus_who_p1" defaultText="Cresta Foods is an international trade and sourcing company headquartered in Indore, Madhya Pradesh central India's commercial capital, and one of the country's most strategically positioned trade hubs." as="p" />
                <EditableText id="whyus_who_p2" defaultText="We specialise in sourcing, quality-assuring, and exporting two high-demand categories: Hydrocolloids & Thickeners Guar Gum Powder (food and industrial grade) and Guar Meal and Dehydrated Onions White, Red, and Pink varieties each sourced from India's most capable production regions." as="p" />
                <EditableText id="whyus_who_p3" defaultText="Our strength lies in our sourcing rigour. We work directly with carefully selected, audited production facilities ensuring that every consignment leaving India under the Cresta Foods name meets the exact specification, safety standard, and quality expectation of the most demanding international buyers." as="p" />
              </div>
            </motion.div>

            <DynamicSections slotId="about-2" />
            <hr className="border-gray-100 dark:border-gray-700 my-10" />

            {/* Our sourcing philosophy */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
              <EditableText id="whyus_phil_title" defaultText="Our sourcing philosophy" as="h3" className="font-heading text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-6" />
              <div className="space-y-5 text-gray-600 dark:text-gray-400 text-[13px] md:text-[15px] leading-relaxed mb-8">
                <EditableText id="whyus_phil_p1" defaultText="India produces over 80% of the world's guar and is among the largest onion producers globally. The advantage is not just volume it is the unmatched quality, diversity, and price competitiveness that Indian agricultural production offers to the world." as="p" />
                <EditableText id="whyus_phil_p2" defaultText="At Cresta Foods, we act as your eyes and ears on the ground. Before a production facility enters our supply chain, we evaluate their process, hygiene standards, quality controls, and documentation practices. Only those who clear our benchmarks become our partners." as="p" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="group relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                  <Search className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-3" />
                  <EditableText id="whyus_audit_title" defaultText="Facility audit" as="h4" className="font-bold text-gray-900 dark:text-white text-[12px] md:text-[13px] mb-2" />
                  <EditableText id="whyus_audit_desc" defaultText="On-site visits and process review before onboarding any supply partner." as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[12px] leading-relaxed block" />
                </div>
                <div className="group relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                  <FlaskConical className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-3" />
                  <EditableText id="whyus_test_title" defaultText="Pre-shipment testing" as="h4" className="font-bold text-gray-900 dark:text-white text-[12px] md:text-[13px] mb-2" />
                  <EditableText id="whyus_test_desc" defaultText="Every lot tested for physical, chemical, and microbiological compliance before dispatch." as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[12px] leading-relaxed block" />
                </div>
                <div className="group relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                  <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-3" />
                  <EditableText id="whyus_doc_title" defaultText="Full documentation" as="h4" className="font-bold text-gray-900 dark:text-white text-[12px] md:text-[13px] mb-2" />
                  <EditableText id="whyus_doc_desc" defaultText="COA, COO, phytosanitary, MSDS, invoice complete and export-ready for every order." as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[12px] leading-relaxed block" />
                </div>
                <div className="group relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
                  <Package className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-3" />
                  <EditableText id="whyus_pack_title" defaultText="Custom packaging" as="h4" className="font-bold text-gray-900 dark:text-white text-[12px] md:text-[13px] mb-2" />
                  <EditableText id="whyus_pack_desc" defaultText="Private labelling and market-specific packaging on request." as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[12px] leading-relaxed block" />
                </div>
              </div>
            </motion.div>

            <DynamicSections slotId="about-3" />
            <hr className="border-gray-100 dark:border-gray-700 my-10" />

            {/* The Cresta Foods difference */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-16">
              <EditableText id="whyus_diff_title" defaultText="The Cresta Foods difference" as="h3" className="font-heading text-2xl md:text-3xl lg:text-4xl text-gray-500 dark:text-gray-400 mb-4" />
              <EditableText id="whyus_diff_subtitle" defaultText="There are many exporters in India. What separates Cresta Foods is not just what we export, but how we do it." as="p" className="text-gray-800 dark:text-gray-200 text-[13px] md:text-[15px] font-medium mb-8 block" />

              <div className="space-y-4 ">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex gap-4 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="mt-0.5"><ShieldCheck className="w-[18px] h-[18px] text-primary-600 dark:text-primary-400" /></div>
                  <div>
                    <EditableText id="whyus_transparency_title" defaultText="Transparency over shortcuts" as="h4" className="font-bold text-gray-900 dark:text-white text-[13px] md:text-[14px] mb-1.5" />
                    <EditableText id="whyus_transparency_desc" defaultText="We are fully accountable for every product we ship. You always know its origin, its test results, and the facility it came from. No ambiguity, no middlemen gaps." as="p" className="text-gray-600 dark:text-gray-400 text-[12px] md:text-[13px] leading-relaxed block" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex gap-4 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="mt-0.5"><Globe className="w-[18px] h-[18px] text-primary-600 dark:text-primary-400" /></div>
                  <div>
                    <EditableText id="whyus_trade_title" defaultText="Built for international trade" as="h4" className="font-bold text-gray-900 dark:text-white text-[13px] md:text-[14px] mb-1.5" />
                    <EditableText id="whyus_trade_desc" defaultText="From the first inquiry to delivery at your port, we manage logistics, documentation, and compliance to standards expected in the US, EU, Middle East, Southeast Asia, and beyond." as="p" className="text-gray-600 dark:text-gray-400 text-[12px] md:text-[13px] leading-relaxed block" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex gap-4 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="mt-0.5"><Handshake className="w-[18px] h-[18px] text-primary-600 dark:text-primary-400" /></div>
                  <div>
                    <EditableText id="whyus_partner_title" defaultText="Partnership, not transactions" as="h4" className="font-bold text-gray-900 dark:text-white text-[13px] md:text-[14px] mb-1.5" />
                    <EditableText id="whyus_partner_desc" defaultText="We work to become a long-term ingredient partner understanding your specifications, anticipating your supply needs, and delivering consistently without surprises." as="p" className="text-gray-600 dark:text-gray-400 text-[12px] md:text-[13px] leading-relaxed block" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex gap-4 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <div className="mt-0.5"><MapPin className="w-[18px] h-[18px] text-primary-600 dark:text-primary-400" /></div>
                  <div>
                    <EditableText id="whyus_location_title" defaultText="Strategic location, wide reach" as="h4" className="font-bold text-gray-900 dark:text-white text-[13px] md:text-[14px] mb-1.5" />
                    <EditableText id="whyus_location_desc" defaultText="Based in Indore in close proximity to Rajasthan's guar belt and Gujarat's onion-processing zones we hold a sourcing advantage that translates directly into better pricing, faster lead times, and consistent availability." as="p" className="text-gray-600 dark:text-gray-400 text-[12px] md:text-[13px] leading-relaxed block" />
                  </div>
                </div>
              </div>
            </motion.div>

            <DynamicSections slotId="about-4" />
            <hr className="border-gray-100 dark:border-gray-700 my-10" />

            {/* Our commitment to you */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <EditableText id="whyus_commit_title" defaultText="Our commitment to you" as="h3" className="font-heading text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white mb-6" />
              <div className="space-y-5 text-gray-600 dark:text-gray-400 text-[13px] md:text-[15px] leading-relaxed mb-10">
                <EditableText id="whyus_commit_p1" defaultText="Every order placed with Cresta Foods carries a simple promise: the product you receive will match the specification you approved, arrive with complete documentation, and be backed by a team that remains reachable and responsive throughout the process." as="p" />
                <EditableText id="whyus_commit_p2" defaultText="We offer samples before commitment, flexible Incoterms, and the kind of service that makes repeat orders the natural outcome of every first shipment." as="p" />
              </div>

              <hr className="border-gray-100 dark:border-gray-700 my-8" />

              <div>
                <EditableText id="whyus_footer_title" defaultText="Based in India. Built for the world." as="h4" className="font-heading text-lg md:text-xl text-gray-900 dark:text-white font-bold mb-3" />
                <EditableText id="whyus_footer_location" defaultText="Indore, Madhya Pradesh, India" as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] mb-1 block" />
                <EditableText id="whyus_footer_contact" defaultText="exports@crestafoods.com • +91 XXXXX XXXXX" as="p" className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] mb-8 block" />

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-[12px] md:text-[13px] font-bold tracking-widest transition-colors shadow-sm"
                >
                  Get in touch <ArrowUpRight className="w-[14px] h-[14px]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <DynamicSections slotId="about" />


    </>
  );
};

export default WhyUs;
