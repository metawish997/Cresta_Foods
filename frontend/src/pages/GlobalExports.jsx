import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { HiArrowLongRight, HiCheckBadge } from 'react-icons/hi2';
import { Plus, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EditableText from '../components/EditableText';
import DynamicSections from '../components/DynamicSections';
import SeoHead from '../components/SeoHead';

// ─── Quality Assurance Default Data ──────────────────────────────────────────
const defaultQualitySteps = [
  {
    id: 1,
    step: '01',
    title: 'Supplier Qualification & Audit',
    desc: 'We source only from manufacturers holding FSSC 22000, ISO 22000, or FSSAI certifications. Before onboarding, we conduct facility audits and review third-party lab accreditation status.',
    icon: '🏭',
    bullets: [],
  },
  {
    id: 2,
    step: '02',
    title: 'Pre-Production Specification Alignment',
    desc: 'Every lot is produced against a pre-agreed specification sheet covering particle size, viscosity, moisture, microbiological limits, heavy metals, and residual pesticides.',
    icon: '📋',
    bullets: [],
  },
  {
    id: 3,
    step: '03',
    title: 'In-Process & Batch Testing',
    desc: 'Manufacturers conduct in-process testing at multiple points. For Guar Gum: viscosity, moisture, pH, ash. For Onions: moisture, color, Aw, total microbial count, and yeast & mold.',
    icon: '🔬',
    bullets: [],
  },
  {
    id: 4,
    step: '04',
    title: 'Pre-Shipment Inspection & COA',
    desc: 'Every shipment includes a full Certificate of Analysis (COA) from a NABL-accredited lab. Retention samples are held for 12 months. Pre-shipment inspection by third-party (SGS/Intertek) available on request.',
    icon: '✅',
    bullets: [],
  },
  {
    id: 5,
    step: '05',
    title: 'Traceability & Transparency',
    desc: 'We understand the importance of product traceability in international supply chains. Our documentation process is designed to support:',
    icon: '📊',
    bullets: ['Batch Identification', 'Shipment Traceability', 'Product Specification Records', 'Quality Documentation Review', 'Consistent Supply Management'],
  },
];

const qualityCerts = [
  { name: 'FSSAI', desc: 'Food Safety & Standards Authority of India' },
  { name: 'FSSC 22000', desc: 'Food Safety System Certification' },
  { name: 'ISO 22000', desc: 'Food Safety Management System' },
  { name: 'HACCP', desc: 'Hazard Analysis Critical Control Points' },
  { name: 'APEDA', desc: 'Agricultural & Processed Food Products Export Development Authority' },
  { name: 'Halal', desc: 'Halal Certified' },
  { name: 'Kosher', desc: 'Kosher Certified' },
  { name: 'BRCGS', desc: 'British Retail Consortium Global Standards' },
];

// ─── Default packaging card data ──────────────────────────────────────────────
const defaultPackagingCards = [
  {
    id: 1,
    title: 'Standard Export Packaging',
    icon: '📦',
    desc: '25 kg multi-wall paper bags with polythene liner (Guar Gum / Onion Products). 50 kg PP bags for Guar Meal. Palletised and stretch-wrapped for container loading.',
    features: ['25 kg paper bags (Guar Gum / Onions)', '50 kg PP bags (Guar Meal)', 'Palletised & stretch-wrapped', 'Container-load quantities'],
  },
  {
    id: 2,
    title: 'Custom & Private Label',
    icon: '🏷️',
    desc: "Custom bag printing with buyer's brand name and logo. Variable pack sizes from 1 kg retail bags to 25 kg bulk bags. MOQ applies for custom printing.",
    features: ['Buyer brand printing', '1 kg – 25 kg pack sizes', 'Custom label design', 'MOQ: 1 container (20ft)'],
  },
  {
    id: 3,
    title: 'Moisture-Controlled Storage',
    icon: '🌡️',
    desc: 'All products stored in dry, cool warehouses with humidity and temperature monitoring. First-in-first-out (FIFO) stock rotation ensures freshness and shelf life compliance.',
    features: ['Dry, cool warehousing', 'Humidity monitoring', 'FIFO stock rotation', 'Shelf life tracking'],
  },
  {
    id: 4,
    title: 'Shipping & Incoterms',
    icon: '🚢',
    desc: 'All shipments from Mundra Port, Gujarat, India. FOB Mundra, CIF, and CFR Incoterms available. Full container load (FCL) and groupage (LCL) options. Transit time estimates on request.',
    features: ['FOB / CIF / CFR available', 'FCL & LCL options', 'Mundra Port, Gujarat', 'Estimated transit times provided'],
  },
];

// ─── Default shipping table rows ──────────────────────────────────────────────
const defaultShippingRows = [
  { id: 1, param: 'Port of Loading', val: 'Mundra Port, Gujarat, India' },
  { id: 2, param: 'Incoterms', val: 'FOB, CFR, CIF (on request)' },
  { id: 3, param: 'Container Options', val: '20ft FCL, 40ft FCL, LCL available' },
  { id: 4, param: 'Minimum Order', val: '1 container (FCL) / Negotiable for first order' },
  { id: 5, param: 'Payment Terms', val: 'LC at sight / TT advance / Negotiable' },
  { id: 6, param: 'Lead Time', val: '2–4 weeks from order confirmation' },
  { id: 7, param: 'Documents Provided', val: 'COA, TDS, COO, Phytosanitary, Invoice, Packing List, Bill of Lading' },
  { id: 8, param: 'APEDA', val: 'Registered Exporter' },
];

// ─── Default packaging option list items ──────────────────────────────────────
const defaultPkgOptions = [
  'Paper Bags', 'Poly Bags', 'HDPE Bags with Liners',
  'Multi-Layer Export Packaging', 'Bulk Packaging Solutions', 'Customized Formats',
];

const defaultPrivateLabelItems = [
  'Private Label Packaging', 'White Label Solutions', 'Custom Brand Labels',
  'Custom Packaging Design', 'Product Identification Labels', 'Market-Specific Packaging Requirements',
];

// ─── Inline editable cell ─────────────────────────────────────────────────────
const EditCell = ({ value, onChange, className = '', isEdit }) => {
  if (!isEdit) return <span className={className}>{value}</span>;
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.target.innerText)}
      className={`${className} outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text`}
    >
      {value}
    </span>
  );
};

const GlobalExports = () => {
  const [activeTab, setActiveTab] = useState('quality');
  const location = useLocation();
  const { user } = useAuth();
  const isEdit = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  // ── Quality Steps state ───────────────────────────────────────────────────
  const [qualitySteps, setQualitySteps] = useState(defaultQualitySteps);

  const updateStep = (id, field, val) =>
    setQualitySteps(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));

  const updateStepBullet = (stepId, idx, val) =>
    setQualitySteps(prev => prev.map(s => {
      if (s.id !== stepId) return s;
      const bullets = [...s.bullets]; bullets[idx] = val;
      return { ...s, bullets };
    }));

  const addStepBullet = (stepId) =>
    setQualitySteps(prev => prev.map(s =>
      s.id === stepId ? { ...s, bullets: [...s.bullets, 'New item'] } : s
    ));

  const removeStepBullet = (stepId, idx) =>
    setQualitySteps(prev => prev.map(s => {
      if (s.id !== stepId) return s;
      return { ...s, bullets: s.bullets.filter((_, i) => i !== idx) };
    }));

  const addQualityStep = () =>
    setQualitySteps(prev => [...prev, {
      id: Date.now(),
      step: String(prev.length + 1).padStart(2, '0'),
      title: 'New Step',
      desc: 'Describe this step here.',
      icon: '📌',
      bullets: [],
    }]);

  const removeQualityStep = (id) =>
    setQualitySteps(prev => prev.filter(s => s.id !== id));

  // ── Packaging cards state ─────────────────────────────────────────────────
  const [pkgCards, setPkgCards] = useState(defaultPackagingCards);

  const updateCard = (id, field, val) =>
    setPkgCards(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));

  const updateCardFeature = (cardId, idx, val) =>
    setPkgCards(prev => prev.map(c => {
      if (c.id !== cardId) return c;
      const features = [...c.features];
      features[idx] = val;
      return { ...c, features };
    }));

  const addCardFeature = (cardId) =>
    setPkgCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, features: [...c.features, 'New feature'] } : c
    ));

  const removeCardFeature = (cardId, idx) =>
    setPkgCards(prev => prev.map(c => {
      if (c.id !== cardId) return c;
      const features = c.features.filter((_, i) => i !== idx);
      return { ...c, features };
    }));

  const addCard = () =>
    setPkgCards(prev => [...prev, { id: Date.now(), title: 'New Option', icon: '📋', desc: 'Description here.', features: ['Feature one'] }]);

  const removeCard = (id) => setPkgCards(prev => prev.filter(c => c.id !== id));

  // ── Shipping table state ──────────────────────────────────────────────────
  const [shippingRows, setShippingRows] = useState(defaultShippingRows);

  const updateShippingRow = (id, field, val) =>
    setShippingRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));

  const addShippingRow = () =>
    setShippingRows(prev => [...prev, { id: Date.now(), param: 'New Parameter', val: 'Details here' }]);

  const removeShippingRow = (id) =>
    setShippingRows(prev => prev.filter(r => r.id !== id));

  // ── Packaging options list state ──────────────────────────────────────────
  const [pkgOptions, setPkgOptions] = useState(defaultPkgOptions);
  const updatePkgOption = (idx, val) => setPkgOptions(prev => { const n = [...prev]; n[idx] = val; return n; });
  const addPkgOption = () => setPkgOptions(prev => [...prev, 'New option']);
  const removePkgOption = (idx) => setPkgOptions(prev => prev.filter((_, i) => i !== idx));

  // ── Private label list state ──────────────────────────────────────────────
  const [privateLabelItems, setPrivateLabelItems] = useState(defaultPrivateLabelItems);
  const updatePrivateLabel = (idx, val) => setPrivateLabelItems(prev => { const n = [...prev]; n[idx] = val; return n; });
  const addPrivateLabel = () => setPrivateLabelItems(prev => [...prev, 'New item']);
  const removePrivateLabel = (idx) => setPrivateLabelItems(prev => prev.filter((_, i) => i !== idx));

  return (
    <>
      <SeoHead slug="global-exports" />

      {/* Hero */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt="Cresta Foods Global Exports"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <EditableText id="globalexports_breadcrumb" defaultText="Global Exports" as="span" className="text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="sticky md:top-22 top-20 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm" id="quality">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: 'quality', label: '🔬 Quality Assurance' },
              { id: 'packaging', label: '📦 Packaging & Shipping' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[50%] sm:min-w-max px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] font-bold border-b-2 uppercase tracking-widest transition-all duration-200 whitespace-nowrap text-center ${activeTab === tab.id
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={activeTab !== tab.id ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {tab.label}
                  </motion.span>
                  {activeTab !== tab.id && (
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 h-1.5 bg-primary-500 rounded-full"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          QUALITY ASSURANCE TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'quality' && (
        <section className="relative overflow-hidden py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none hidden dark:block" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-16">
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
                  <EditableText id="globalexports_qa_eyebrow" defaultText="Quality Assurance" as="p" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body block" />
                </div>
                <EditableText id="globalexports_qa_title" defaultText="Quality You Can Verify" as="h1" className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-[1.1]" />
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
                <div className="flex-1">
                  <div className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed space-y-5 max-w-xl">
                    <EditableText id="globalexports_qa_body1" defaultText="At Cresta Foods, we believe quality is not defined by claims, but by consistency, transparency, and compliance." as="p" />
                    <EditableText id="globalexports_qa_priorities_label" defaultText="Our quality approach is built around three priorities:" as="p" className="pt-2 text-gray-900 dark:text-white font-medium block" />
                    <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest text-[11px] sm:text-[12px] pt-1">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <EditableText id="globalexports_qa_p1" defaultText="Product Consistency" as="span" />
                      </li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <EditableText id="globalexports_qa_p2" defaultText="Food Safety & Compliance" as="span" />
                      </li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                        <EditableText id="globalexports_qa_p3" defaultText="Documentation Accuracy" as="span" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="lg:w-[45%]">
                  <div className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed border-l border-primary-500/20 pl-6 lg:pl-8">
                    <EditableText id="globalexports_qa_body2" defaultText="As an exporter of Hydrocolloids, Thickeners, and Dehydrated Onion Products, our focus is on sourcing from qualified manufacturing partners, verifying product specifications, and ensuring that every shipment is supported by the documentation required for international trade." as="p" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5-step process — fully editable in edit mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
              {qualitySteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none flex items-start gap-4 sm:gap-6 hover:-translate-y-1 transition-all duration-300 group relative ${
                    i === qualitySteps.length - 1 && qualitySteps.length % 2 !== 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Delete step button */}
                  {isEdit && (
                    <button
                      onClick={() => removeQualityStep(step.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
                      title="Remove step"
                    >
                      <X size={12} />
                    </button>
                  )}

                  <div className="flex-shrink-0">
                    {/* Step number badge */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold border border-gray-100 dark:border-gray-700 uppercase tracking-widest text-[11px] sm:text-[12px] shadow-sm">
                      <span
                        contentEditable={isEdit}
                        suppressContentEditableWarning
                        onBlur={(e) => isEdit && updateStep(step.id, 'step', e.target.innerText)}
                        className={isEdit ? 'outline-none cursor-text' : ''}
                      >
                        {step.step}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="text-2xl sm:text-3xl mt-3 text-center opacity-80">
                      <span
                        contentEditable={isEdit}
                        suppressContentEditableWarning
                        onBlur={(e) => isEdit && updateStep(step.id, 'icon', e.target.innerText)}
                        className={isEdit ? 'outline-none cursor-text border-b border-dashed border-primary-400' : ''}
                      >
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white uppercase tracking-widest text-[14px] sm:text-[15px] mb-2">
                      <span
                        contentEditable={isEdit}
                        suppressContentEditableWarning
                        onBlur={(e) => isEdit && updateStep(step.id, 'title', e.target.innerText)}
                        className={isEdit ? 'outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text' : ''}
                      >
                        {step.title}
                      </span>
                    </h3>

                    {/* Description */}
                    <div className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] leading-relaxed">
                      <span
                        contentEditable={isEdit}
                        suppressContentEditableWarning
                        onBlur={(e) => isEdit && updateStep(step.id, 'desc', e.target.innerText)}
                        className={`block ${isEdit ? 'outline-none border-b border-dashed border-primary-300 focus:border-primary-500 cursor-text mb-2' : ''}`}
                      >
                        {step.desc}
                      </span>

                      {/* Bullet list (editable) */}
                      {(step.bullets && step.bullets.length > 0) && (
                        <ul className="list-disc ml-4 mt-2 space-y-1">
                          {step.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex items-start gap-1 group/bullet list-none">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                              <span
                                contentEditable={isEdit}
                                suppressContentEditableWarning
                                onBlur={(e) => isEdit && updateStepBullet(step.id, bi, e.target.innerText)}
                                className={`flex-1 ${isEdit ? 'outline-none border-b border-dashed border-primary-300 focus:border-primary-500 cursor-text' : ''}`}
                              >
                                {bullet}
                              </span>
                              {isEdit && (
                                <button
                                  onClick={() => removeStepBullet(step.id, bi)}
                                  className="opacity-0 group-hover/bullet:opacity-100 text-red-400 hover:text-red-600 transition-opacity flex-shrink-0 ml-1"
                                  title="Remove bullet"
                                >
                                  <X size={11} />
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Add bullet button */}
                      {isEdit && (
                        <button
                          onClick={() => addStepBullet(step.id)}
                          className="mt-2 flex items-center gap-1 text-primary-500 hover:text-primary-700 text-[11px] font-bold uppercase tracking-widest border border-dashed border-primary-300 rounded px-2 py-0.5 transition-colors"
                        >
                          <Plus size={10} /> Add bullet
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add new step card */}
              {isEdit && (
                <div
                  onClick={addQualityStep}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-primary-200 hover:border-primary-400 flex flex-col items-center justify-center p-8 cursor-pointer transition-all group/add min-h-[120px]"
                >
                  <Plus size={24} className="text-primary-300 group-hover/add:text-primary-500 transition-colors mb-2" />
                  <span className="text-sm font-bold text-primary-300 group-hover/add:text-primary-500 uppercase tracking-widest transition-colors">Add Step</span>
                </div>
              )}
            </div>

            <DynamicSections slotId="globalexports-qa-steps" />

            {/* Certifications grid */}
            <div className="text-center mb-6 sm:mb-8">
              <EditableText id="globalexports_certs_title" defaultText="Certifications & Compliance" as="h2" className="font-heading font-bold text-xl sm:text-2xl text-gray-800 dark:text-white uppercase tracking-widest mb-2 sm:mb-3" />
              <EditableText id="globalexports_certs_desc" defaultText="Our supply chain partners hold the following certifications" as="p" className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] block" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16">
              {qualityCerts.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none text-center hover:-translate-y-1 transition-all duration-300"
                >
                  <HiCheckBadge className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mx-auto mb-2 sm:mb-3" />
                  <div className="font-heading font-bold text-gray-900 dark:text-white text-[12px] sm:text-[13px] uppercase tracking-widest">{cert.name}</div>
                  <div className="text-[11px] sm:text-[12px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{cert.desc}</div>
                </motion.div>
              ))}
            </div>

            <DynamicSections slotId="globalexports-qa-certs" />

            {/* Traceability stats box */}
            <div className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none rounded-xl p-3 sm:p-8">
              <div className="grid grid-cols-3 gap-1 sm:gap-6 items-center">
                <div className="text-center px-1 sm:px-0">
                  <EditableText id="globalexports_stat1_val" defaultText="100%" as="div" className="text-lg sm:text-3xl md:text-4xl font-heading font-bold text-primary-700 dark:text-primary-400 mb-1 sm:mb-2" />
                  <EditableText id="globalexports_stat1_label" defaultText="COA with every shipment" as="div" className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold" />
                </div>
                <div className="text-center border-x border-gray-100 dark:border-gray-700 px-1 sm:px-4">
                  <EditableText id="globalexports_stat2_val" defaultText="12mo" as="div" className="text-lg sm:text-3xl md:text-4xl font-heading font-bold text-primary-700 dark:text-primary-400 mb-1 sm:mb-2" />
                  <EditableText id="globalexports_stat2_label" defaultText="Retention sample archive" as="div" className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold" />
                </div>
                <div className="text-center px-1 sm:px-4">
                  <EditableText id="globalexports_stat3_val" defaultText="NABL" as="div" className="text-lg sm:text-3xl md:text-4xl font-heading font-bold text-primary-700 dark:text-primary-400 mb-1 sm:mb-2" />
                  <EditableText id="globalexports_stat3_label" defaultText="Accredited lab testing" as="div" className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold" />
                </div>
              </div>
            </div>

            <DynamicSections slotId="globalexports-qa-stats" />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          PACKAGING & SHIPPING TAB
      ══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'packaging' && (
        <section className="relative overflow-hidden py-8 sm:py-12 bg-gray-50 dark:bg-gray-900" id="packaging">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 pt-6 sm:pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-16">

              {/* Eyebrow and Heading */}
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-8 sm:w-12 h-[1px] bg-accent"></div>
                  <EditableText id="globalexports_pkg_eyebrow" defaultText="Packaging & Customization" as="p" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body block" />
                </div>
                <EditableText id="globalexports_pkg_title" defaultText="Packaging Solutions Tailored to Your Requirements" as="h1" className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-[1.1]" />
              </div>

              {/* 2 Columns */}
              <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
                {/* Left Side */}
                <div className="flex-1">
                  <div className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed space-y-6 max-w-xl">
                    <EditableText id="globalexports_pkg_body1" defaultText="At Cresta Foods, we understand that packaging requirements vary across industries, markets, and applications. We offer flexible packaging solutions designed to meet the specific needs of international importers, distributors, food manufacturers, and industrial users." as="p" />

                    {/* ── Available Packaging Options (fully editable list) ─── */}
                    <div>
                      <EditableText id="globalexports_pkg_options_label" defaultText="Available Packaging Options:" as="p" className="text-gray-900 dark:text-white font-medium mb-3 block" />
                      <ul className="flex flex-wrap gap-3">
                        {pkgOptions.map((opt, i) => (
                          <li key={i} className="flex items-center gap-1 group/item">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                            <span
                              contentEditable={isEdit}
                              suppressContentEditableWarning
                              onBlur={(e) => isEdit && updatePkgOption(i, e.target.innerText)}
                              className={`font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest text-[11px] sm:text-[12px] ${isEdit ? 'outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text' : ''}`}
                            >
                              {opt}
                            </span>
                            {isEdit && (
                              <button onClick={() => removePkgOption(i)} className="opacity-0 group-hover/item:opacity-100 ml-1 text-red-400 hover:text-red-600 transition-opacity" title="Remove">
                                <X size={12} />
                              </button>
                            )}
                          </li>
                        ))}
                        {isEdit && (
                          <li>
                            <button onClick={addPkgOption} className="flex items-center gap-1 text-primary-500 hover:text-primary-700 text-[11px] font-bold uppercase tracking-widest border border-dashed border-primary-300 rounded px-2 py-0.5 transition-colors">
                              <Plus size={10} /> Add
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <EditableText id="globalexports_pkg_sizes_label" defaultText="Flexible Pack Sizes" as="p" className="text-gray-900 dark:text-white font-medium mb-2 block" />
                      <EditableText id="globalexports_pkg_sizes_desc" defaultText="Products can be supplied in a wide range of packaging sizes based on your requirements, from small retail packs to large industrial bulk packs." as="p" />
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="lg:w-[45%]">
                  <div className="text-gray-600 dark:text-gray-400 text-[14px] sm:text-[15px] leading-relaxed border-l border-primary-500/20 pl-6 lg:pl-8 space-y-6">
                    <EditableText id="globalexports_pkg_body2" defaultText="Whether you require bulk industrial packaging or customized retail-ready solutions, we work closely with our supply partners to provide packaging that aligns with your product, market, and logistics requirements." as="p" />

                    {/* ── Private Label & White Label (fully editable list) ── */}
                    <div>
                      <EditableText id="globalexports_pkg_private_label" defaultText="Private Label & White Label Solutions" as="p" className="text-gray-900 dark:text-white font-medium mb-2 block" />
                      <EditableText id="globalexports_pkg_private_intro" defaultText="We also support:" as="p" className="mb-3 block" />
                      <ul className="flex flex-col gap-2">
                        {privateLabelItems.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 group/item">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                            <span
                              contentEditable={isEdit}
                              suppressContentEditableWarning
                              onBlur={(e) => isEdit && updatePrivateLabel(i, e.target.innerText)}
                              className={`font-bold text-gray-800 dark:text-gray-200 uppercase tracking-widest text-[11px] sm:text-[12px] ${isEdit ? 'outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text' : ''}`}
                            >
                              {item}
                            </span>
                            {isEdit && (
                              <button onClick={() => removePrivateLabel(i)} className="opacity-0 group-hover/item:opacity-100 ml-1 text-red-400 hover:text-red-600 transition-opacity" title="Remove">
                                <X size={12} />
                              </button>
                            )}
                          </li>
                        ))}
                        {isEdit && (
                          <li>
                            <button onClick={addPrivateLabel} className="flex items-center gap-1 text-primary-500 hover:text-primary-700 text-[11px] font-bold uppercase tracking-widest border border-dashed border-primary-300 rounded px-2 py-0.5 transition-colors">
                              <Plus size={10} /> Add Item
                            </button>
                          </li>
                        )}
                      </ul>
                      <EditableText id="globalexports_pkg_private_desc" defaultText="At Cresta Foods, our goal is to provide packaging solutions that not only protect product quality during transit but also support your branding and market requirements." as="p" className="mt-4 block" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Note */}
              <div className="mt-8 sm:mt-12 bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 sm:p-5 text-center">
                <EditableText id="globalexports_pkg_note" defaultText="Custom Pack Sizes | Private & White Label | Export Ready Packaging" as="p" className="text-primary-700 dark:text-primary-400 font-bold uppercase tracking-[0.2em] text-[12px] sm:text-[13px] block" />
              </div>
            </motion.div>

            <DynamicSections slotId="globalexports-pkg-intro" />

            {/* ── 4 Packaging Cards (fully editable + add/remove) ──────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
              {pkgCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 group relative"
                >
                  {/* Delete card button */}
                  {isEdit && (
                    <button
                      onClick={() => removeCard(card.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
                      title="Remove card"
                    >
                      <X size={12} />
                    </button>
                  )}

                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl mb-4 sm:mb-5 opacity-80">
                    <span
                      contentEditable={isEdit}
                      suppressContentEditableWarning
                      onBlur={(e) => isEdit && updateCard(card.id, 'icon', e.target.innerText)}
                      className={isEdit ? 'outline-none border-b border-dashed border-primary-400 cursor-text' : ''}
                    >
                      {card.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white uppercase tracking-widest text-[14px] sm:text-[15px] mb-2 sm:mb-3">
                    <EditCell value={card.title} onChange={(v) => updateCard(card.id, 'title', v)} isEdit={isEdit} />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] leading-relaxed mb-4 sm:mb-6">
                    <EditCell value={card.desc} onChange={(v) => updateCard(card.id, 'desc', v)} isEdit={isEdit} />
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 sm:space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4 sm:pt-6">
                    {card.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-2 sm:gap-3 text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 font-bold group/feat">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        <span
                          contentEditable={isEdit}
                          suppressContentEditableWarning
                          onBlur={(e) => isEdit && updateCardFeature(card.id, fi, e.target.innerText)}
                          className={`flex-1 ${isEdit ? 'outline-none border-b border-dashed border-primary-300 focus:border-primary-500 cursor-text' : ''}`}
                        >
                          {feat}
                        </span>
                        {isEdit && (
                          <button onClick={() => removeCardFeature(card.id, fi)} className="opacity-0 group-hover/feat:opacity-100 text-red-400 hover:text-red-600 transition-opacity flex-shrink-0" title="Remove feature">
                            <X size={12} />
                          </button>
                        )}
                      </li>
                    ))}
                    {isEdit && (
                      <li>
                        <button onClick={() => addCardFeature(card.id)} className="flex items-center gap-1 text-primary-500 hover:text-primary-700 text-[11px] font-bold uppercase tracking-widest border border-dashed border-primary-300 rounded px-2 py-0.5 transition-colors mt-1">
                          <Plus size={10} /> Add feature
                        </button>
                      </li>
                    )}
                  </ul>
                </motion.div>
              ))}

              {/* Add new card button */}
              {isEdit && (
                <div
                  onClick={addCard}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-primary-200 hover:border-primary-400 flex flex-col items-center justify-center p-8 cursor-pointer transition-all group min-h-[200px]"
                >
                  <Plus size={28} className="text-primary-300 group-hover:text-primary-500 transition-colors mb-2" />
                  <span className="text-sm font-bold text-primary-300 group-hover:text-primary-500 uppercase tracking-widest transition-colors">Add Card</span>
                </div>
              )}
            </div>

            <DynamicSections slotId="globalexports-pkg-options" />

            {/* ── Shipping Details Table (editable + add/delete rows) ──────── */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden mb-10 sm:mb-12">
              <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
                <EditableText id="globalexports_shipping_title" defaultText="Shipping Details" as="h3" className="font-heading font-bold text-gray-900 dark:text-white uppercase tracking-widest text-[14px] sm:text-[15px]" />
                {isEdit && (
                  <button
                    onClick={addShippingRow}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold text-[11px] uppercase tracking-widest rounded-lg border border-primary-200 transition-colors"
                  >
                    <Plus size={12} /> Add Row
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] sm:text-[14px]">
                  <thead className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="text-left px-5 sm:px-8 py-3 sm:py-4 text-[11px] sm:text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Parameter</th>
                      <th className="text-left px-5 sm:px-8 py-3 sm:py-4 text-[11px] sm:text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Details</th>
                      {isEdit && <th className="w-10 px-3"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRows.map((row, i) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-50 dark:border-gray-700 group/row ${i % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/30' : 'bg-white dark:bg-gray-800'}`}
                      >
                        <td className="px-5 sm:px-8 py-3 sm:py-4 font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px] sm:text-[12px] whitespace-nowrap">
                          <EditCell
                            value={row.param}
                            onChange={(v) => updateShippingRow(row.id, 'param', v)}
                            isEdit={isEdit}
                            className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px] sm:text-[12px]"
                          />
                        </td>
                        <td className="px-5 sm:px-8 py-3 sm:py-4 text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px]">
                          <EditCell
                            value={row.val}
                            onChange={(v) => updateShippingRow(row.id, 'val', v)}
                            isEdit={isEdit}
                            className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px]"
                          />
                        </td>
                        {isEdit && (
                          <td className="px-3 py-3 sm:py-4">
                            <button
                              onClick={() => removeShippingRow(row.id)}
                              className="opacity-0 group-hover/row:opacity-100 transition-opacity text-red-400 hover:text-red-600 p-1 rounded"
                              title="Delete row"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isEdit && (
                  <div className="px-5 sm:px-8 py-3 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={addShippingRow}
                      className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-[12px] font-bold uppercase tracking-widest transition-colors"
                    >
                      <Plus size={14} /> Add Row
                    </button>
                  </div>
                )}
              </div>
            </div>

            <DynamicSections slotId="globalexports-pkg-shipping" />

            {/* CTA */}
            <div className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none rounded-xl p-8 sm:p-12 text-center">
              <EditableText id="globalexports_cta_title" defaultText="Ready to Place Your First Order?" as="h3" className="font-heading font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xl sm:text-2xl mb-3 sm:mb-4" />
              <EditableText id="globalexports_cta_desc" defaultText="We'll walk you through specs, sampling, packaging options, and logistics step by step." as="p" className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto block" />
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 py-3 bg-primary-700 text-white font-bold text-[12px] sm:text-[13px] uppercase tracking-widest rounded-full hover:bg-primary-800 transition-all shadow-md shadow-primary-700/20"
              >
                <EditableText id="globalexports_cta_btn" defaultText="Start the Conversation" as="span" /> <HiArrowLongRight className="w-4 h-4" />
              </Link>
            </div>

            <DynamicSections slotId="globalexports-pkg-cta" />
          </div>
        </section>
      )}
    </>
  );
};

export default GlobalExports;
