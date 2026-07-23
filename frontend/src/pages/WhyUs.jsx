import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiCheckBadge } from 'react-icons/hi2';
import { PiPlantThin } from 'react-icons/pi';
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
import SeoHead from '../components/SeoHead';


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
      <SeoHead slug="about" />

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

            {/* Our Sourcing Network */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 md:mb-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 sm:w-16 h-[2px] bg-[#c48d3c]"></div>
                <EditableText id="whyus_sourcing_label" defaultText="SOURCING NETWORK" as="p" className="text-[#c48d3c] text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase font-body block" />
              </div>
              <EditableText id="whyus_sourcing_title" defaultText="Our Sourcing Network" as="h3" className="font-heading text-3xl md:text-4xl lg:text-[44px] text-[#0b1b36] dark:text-white mb-12" />
              
              <div className="flex flex-col gap-10 lg:gap-14">
                {/* Guar Gum Item */}
                <div className="flex items-start gap-6 lg:gap-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#f1faef] dark:bg-[#1a2f20] flex items-center justify-center flex-shrink-0">
                    <PiPlantThin size={44} color="#2a902f" />
                  </div>
                  <div className="pt-2 flex-1">
                    <EditableText id="whyus_sourcing_p1" defaultText="Guar Gum: Sourcing network" as="h4" className="text-[#2a902f] font-bold text-xl md:text-[22px] mb-3 font-heading" />
                    <EditableText id="whyus_sourcing_p2" defaultText="Guar gum:souced directly from jodhpur, barmer & bikaner - Rajasthan's prime gaur belt, ensuring superior quality and consistent supply." as="p" className="text-gray-600 dark:text-gray-400 text-[15px] md:text-[17px] leading-[1.7] block" />
                  </div>
                </div>

                {/* Dehydrated Onion Item */}
                <div className="flex items-start gap-6 lg:gap-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#f1faef] dark:bg-[#1a2f20] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#2a902f" height="46px" width="46px" viewBox="0 0 58 58">
                      <path d="M58,33.17c0-4.632-3.572-9.017-9.801-12.032C35.417,14.288,33.003,3.085,32.98,2.973L32.817,2.17H25.18L25.02,2.974  c-0.022,0.112-2.393,11.3-15.2,18.155C3.579,24.145,0,28.533,0,33.17c0,7.981,10.249,14.341,24.924,15.465  c0.582,0.045,1.107,0.079,1.612,0.108l-4.701,0.783c-0.544,0.091-0.913,0.606-0.822,1.151c0.082,0.489,0.505,0.835,0.985,0.835  c0.054,0,0.11-0.004,0.166-0.014l3.782-0.63l-1.854,1.854c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293  s0.512-0.098,0.707-0.293L28,51.644v3.186c0,0.552,0.448,1,1,1s1-0.448,1-1v-3.186l2.493,2.493c0.195,0.195,0.451,0.293,0.707,0.293  s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-1.865-1.865l3.762,0.752c0.066,0.013,0.132,0.02,0.197,0.02  c0.467,0,0.885-0.329,0.979-0.804c0.108-0.542-0.243-1.068-0.784-1.177l-4.406-0.881c0.401-0.018,0.816-0.039,1.266-0.064  C47.743,47.865,58,41.478,58,33.17z M28.97,10.424c0.364,1.868,0.875,4.164,1.601,6.898c0.463,1.742,0.978,3.313,1.531,4.668  c0.338,0.828,0.471,1.131,0.704,1.663c0.2,0.457,0.474,1.083,1.023,2.375c0.845,1.986,1.246,4.641,1.159,7.676  c-0.208,7.253-3.131,12.322-5.879,13.123c-0.094,0-0.19-0.001-0.284-0.002c-2.746-0.807-5.665-5.874-5.873-13.121  c-0.087-3.035,0.313-5.689,1.159-7.676c0.547-1.286,0.821-1.913,1.021-2.369c0.234-0.535,0.367-0.838,0.706-1.669  c0.554-1.359,1.069-2.93,1.531-4.668C28.095,14.588,28.606,12.292,28.97,10.424z M36.987,33.762c0.096-3.37-0.347-6.235-1.317-8.517  c-0.554-1.302-0.831-1.934-1.032-2.394c-0.226-0.516-0.355-0.812-0.684-1.616c-0.521-1.277-1.008-2.767-1.45-4.427  c-0.691-2.603-1.175-4.776-1.53-6.575c1.307,3.028,3.554,7.159,7.149,10.754c0.822,0.822,1.144,1.122,1.713,1.652  c0.483,0.45,1.148,1.069,2.472,2.338c1.99,1.908,2.896,4.333,2.694,7.208c-0.424,6.027-5.614,11.033-11.412,13.459  C35.555,42.866,36.849,38.583,36.987,33.762z M25.437,16.809c-0.44,1.657-0.928,3.146-1.45,4.426  c-0.33,0.808-0.458,1.103-0.686,1.622c-0.201,0.46-0.478,1.092-1.03,2.388c-0.971,2.283-1.415,5.148-1.317,8.517  c0.137,4.797,1.42,9.063,3.369,11.843c-5.763-2.44-10.903-7.424-11.325-13.42c-0.202-2.875,0.705-5.3,2.694-7.208  c1.324-1.269,1.989-1.888,2.472-2.338c0.569-0.53,0.891-0.83,1.713-1.652c3.494-3.494,5.718-7.498,7.04-10.5  C26.567,12.235,26.094,14.331,25.437,16.809z M47.273,22.911l0.036,0.019C52.833,25.599,56,29.331,56,33.17  c0,6.407-7.94,11.676-19.347,13.187c5.43-2.979,9.923-8.043,10.344-14.031c0.243-3.446-0.9-6.487-3.305-8.792  c-1.334-1.28-2.005-1.904-2.493-2.358c-0.552-0.514-0.864-0.805-1.662-1.603c-4.365-4.365-6.631-9.604-7.594-12.338  C31.47,5.89,31.087,4.891,30.705,4.17h0.515C32.016,7.012,35.489,16.604,47.273,22.911z M2,33.17c0-3.839,3.167-7.572,8.726-10.259  C22.511,16.604,25.984,7.012,26.781,4.17h0.515c-0.383,0.721-0.765,1.72-1.239,3.064c-0.962,2.734-3.229,7.972-7.594,12.338  c-0.798,0.798-1.11,1.088-1.662,1.603c-0.487,0.454-1.158,1.079-2.493,2.358c-2.405,2.305-3.548,5.346-3.306,8.792  c0.412,5.858,4.719,10.838,9.99,13.84C9.776,44.411,2,39.239,2,33.17z"/>
                    </svg>
                  </div>
                  <div className="pt-2 flex-1">
                    <EditableText id="whyus_sourcing_onion_title" defaultText="Dehydrated Onion" as="h4" className="text-[#2a902f] font-bold text-xl md:text-[22px] mb-3 font-heading" />
                    <EditableText id="whyus_sourcing_p3" defaultText="Souced from mahuva, Ahmedabad- India's Largest dehydrated Onion processing Cluster." as="p" className="text-gray-600 dark:text-gray-400 text-[15px] md:text-[17px] leading-[1.7] block" />
                  </div>
                </div>
              </div>
            </motion.div>

            <DynamicSections slotId="about-5" />
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
