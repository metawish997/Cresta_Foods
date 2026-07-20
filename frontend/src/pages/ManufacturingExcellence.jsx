import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EditableText from '../components/EditableText';
import DynamicSections from '../components/DynamicSections';

const certsBadges = [
  { name: 'HACCP', color: '#2E7D32' },
  { name: 'ISO 22000', color: '#1565C0' },
  { name: 'Halal', color: '#6A1B9A' },
  { name: 'Halal Indonesia', color: '#00695C' },
  { name: 'Export House', color: '#B71C1C' },
  { name: 'FSSAI', color: '#E65100' },
  { name: 'Kosher', color: '#0D47A1' },
  { name: 'GMP', color: '#33691E' },
];

const defaultTimeline = [
  { id: 1, phase: 'Phase 1', title: 'Land & Infrastructure', desc: 'Selection of premium land with access to best-quality potato belts in Haryana.' },
  { id: 2, phase: 'Phase 2', title: 'Machinery Installation', desc: 'Import and installation of European-standard processing and packaging equipment.' },
  { id: 3, phase: 'Phase 3', title: 'Quality Systems', desc: 'Implementation of HACCP, GMP, and ISO 22000 quality management systems.' },
  { id: 4, phase: 'Phase 4', title: 'Testing & Validation', desc: 'Rigorous product testing, process validation, and regulatory approvals.' },
  { id: 5, phase: 'Phase 5', title: 'Production & Export', desc: 'Full-scale production commenced with exports to 40+ global markets.' },
];

const defaultFacilities = [
  { id: 1, icon: '🏭', title: 'Production Plant', desc: '50,000 MT/year capacity drum drying facility with automated conveyor systems.' },
  { id: 2, icon: '❄️', title: 'IQF Tunnel', desc: 'Individual Quick Freezing at -35°C for vegetables and french fries.' },
  { id: 3, icon: '🔬', title: 'Quality Lab', desc: 'NABL-accredited in-house lab with microbiological and chemical testing capabilities.' },
  { id: 4, icon: '📦', title: 'Packaging Unit', desc: 'Automated nitrogen-flushing packaging for extended shelf life.' },
  { id: 5, icon: '🌡️', title: 'Cold Storage', desc: '10,000 MT controlled atmosphere cold storage at -18°C.' },
  { id: 6, icon: '🚛', title: 'Logistics Hub', desc: 'Dedicated dispatch area with reefer truck access and export documentation support.' },
];

const defaultStats = [
  { id: 1, value: '50,000 MT/yr', label: 'Production Capacity' },
  { id: 2, value: '10+', label: 'Certifications' },
  { id: 3, value: '500/day', label: 'Lab Samples Tested' },
  { id: 4, value: '99.8%', label: 'Quality Pass Rate' },
];

// ── Editable inline field helper ─────────────────────────────────────────────
const InlineEdit = ({ value, onChange, className = '', multiline = false, isEdit }) => {
  if (!isEdit) {
    return multiline
      ? <span className={className}>{value}</span>
      : <span className={className}>{value}</span>;
  }
  if (multiline) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange(e.target.innerText)}
        className={`${className} outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text min-h-[1em]`}
      >
        {value}
      </div>
    );
  }
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

const ManufacturingExcellence = () => {
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const location = useLocation();
  const { user } = useAuth();
  const isEdit = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  // ── Local state for all editable sections ─────────────────────────────────
  const [heroTitle, setHeroTitle] = useState('Manufacturing Excellence');
  const [heroSub, setHeroSub] = useState('World-Class Infrastructure & Quality Standards');

  const [introSub, setIntroSub] = useState('Our Standards');
  const [introTitle, setIntroTitle] = useState('European-Standard Manufacturing');
  const [introP1, setIntroP1] = useState('Our manufacturing facility in Karnal, Haryana is designed and operated to the highest European food safety and manufacturing standards. Every aspect of our production process from raw material intake to final packaging is tightly controlled and documented.');
  const [introP2, setIntroP2] = useState('With state-of-the-art drum dryers, IQF tunnels, and automated packaging lines, we maintain consistent product quality across every batch we produce. Our HACCP and ISO 22000 certifications are testaments to our unwavering commitment to food safety.');

  const [stats, setStats] = useState(defaultStats);
  const [timeline, setTimeline] = useState(defaultTimeline);
  const [facilities, setFacilities] = useState(defaultFacilities);

  const [timelineSectionSub, setTimelineSectionSub] = useState('How We Built It');
  const [timelineSectionTitle, setTimelineSectionTitle] = useState('Our Manufacturing Journey');
  const [facilitiesSectionSub, setFacilitiesSectionSub] = useState('Infrastructure');
  const [facilitiesSectionTitle, setFacilitiesSectionTitle] = useState('World-Class Facilities');
  const [certsTitle, setCertsTitle] = useState('Our Certifications');

  // ── Stat helpers ──────────────────────────────────────────────────────────
  const updateStat = (id, field, val) => setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  const addStat = () => setStats(prev => [...prev, { id: Date.now(), value: 'New Stat', label: 'Label' }]);
  const removeStat = (id) => setStats(prev => prev.filter(s => s.id !== id));

  // ── Timeline helpers ──────────────────────────────────────────────────────
  const updateTimeline = (id, field, val) => setTimeline(prev => prev.map(t => t.id === id ? { ...t, [field]: val } : t));
  const addTimelineStep = () => setTimeline(prev => [...prev, { id: Date.now(), phase: `Phase ${prev.length + 1}`, title: 'New Step', desc: 'Description here.' }]);
  const removeTimelineStep = (id) => setTimeline(prev => prev.filter(t => t.id !== id));

  // ── Facility helpers ──────────────────────────────────────────────────────
  const updateFacility = (id, field, val) => setFacilities(prev => prev.map(f => f.id === id ? { ...f, [field]: val } : f));
  const addFacility = () => setFacilities(prev => [...prev, { id: Date.now(), icon: '🏢', title: 'New Facility', desc: 'Description here.' }]);
  const removeFacility = (id) => setFacilities(prev => prev.filter(f => f.id !== id));

  return (
    <>
      <SeoHead slug="manufacturing-excellence" />
      {/* Hero */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <img
          src="https://media.istockphoto.com/id/176012507/photo/single-potato.webp?a=1&b=1&s=612x612&w=0&k=20&c=zz_Zpoyp4F-B6rjkrHXpSOtsS0BO4OJRL_KmUwKGPQc="
          alt="Manufacturing Excellence"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/70" />
        <div className="relative z-10 h-full flex items-center max-w-[1280px] mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Manufacturing Excellence</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              <InlineEdit value={heroTitle} onChange={setHeroTitle} isEdit={isEdit} />
            </h1>
            <p className="text-secondary-400 text-base mt-2 font-body">
              <InlineEdit value={heroSub} onChange={setHeroSub} isEdit={isEdit} />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-6">
                <p className="text-primary-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                  <InlineEdit value={introSub} onChange={setIntroSub} isEdit={isEdit} />
                </p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
                  <InlineEdit value={introTitle} onChange={setIntroTitle} isEdit={isEdit} />
                </h2>
              </div>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                <InlineEdit value={introP1} onChange={setIntroP1} isEdit={isEdit} multiline />
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                <InlineEdit value={introP2} onChange={setIntroP2} isEdit={isEdit} multiline />
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <img
                src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80"
                alt="Manufacturing"
                className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <DynamicSections slotId="mfg-intro" />

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-primary-800">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className={`grid gap-8 text-center text-white ${stats.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {isEdit && (
                  <button
                    onClick={() => removeStat(stat.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Remove stat"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
                <div className="font-heading font-bold text-4xl text-white mb-1">
                  <InlineEdit value={stat.value} onChange={(v) => updateStat(stat.id, 'value', v)} isEdit={isEdit} className="text-white" />
                </div>
                <div className="text-green-200 text-sm font-body">
                  <InlineEdit value={stat.label} onChange={(v) => updateStat(stat.id, 'label', v)} isEdit={isEdit} className="text-green-200" />
                </div>
              </motion.div>
            ))}
            {isEdit && (
              <div className="flex items-center justify-center">
                <button
                  onClick={addStat}
                  className="border-2 border-dashed border-white/40 hover:border-white/80 text-white/60 hover:text-white rounded-xl p-4 transition-all flex flex-col items-center gap-2"
                  title="Add stat"
                >
                  <Plus size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add Stat</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <DynamicSections slotId="mfg-stats" />

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              <InlineEdit value={timelineSectionSub} onChange={setTimelineSectionSub} isEdit={isEdit} />
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              <InlineEdit value={timelineSectionTitle} onChange={setTimelineSectionTitle} isEdit={isEdit} />
            </h2>
          </div>
          <div className="space-y-0">
            {timeline.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-8 mb-8 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 relative group">
                  {isEdit && (
                    <button
                      onClick={() => removeTimelineStep(step.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="Remove step"
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                  <span className="text-xs font-bold text-primary-600 tracking-widest uppercase">
                    <InlineEdit value={step.phase} onChange={(v) => updateTimeline(step.id, 'phase', v)} isEdit={isEdit} />
                  </span>
                  <h3 className="font-heading font-bold text-gray-900 text-base mt-1 mb-2">
                    <InlineEdit value={step.title} onChange={(v) => updateTimeline(step.id, 'title', v)} isEdit={isEdit} />
                  </h3>
                  <p className="text-sm text-gray-500 font-body">
                    <InlineEdit value={step.desc} onChange={(v) => updateTimeline(step.id, 'desc', v)} isEdit={isEdit} multiline />
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-[0_4px_16px_rgba(46,125,50,0.3)]">
                  {i + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
            {isEdit && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={addTimelineStep}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-primary-300 hover:border-primary-500 text-primary-600 hover:text-primary-700 rounded-xl transition-all text-sm font-bold"
                >
                  <Plus size={16} /> Add Phase
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <DynamicSections slotId="mfg-timeline" />

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              <InlineEdit value={facilitiesSectionSub} onChange={setFacilitiesSectionSub} isEdit={isEdit} />
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              <InlineEdit value={facilitiesSectionTitle} onChange={setFacilitiesSectionTitle} isEdit={isEdit} />
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-primary-100 transition-all duration-300 relative group"
              >
                {isEdit && (
                  <button
                    onClick={() => removeFacility(fac.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Remove facility"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
                <div className="text-4xl mb-4">
                  <InlineEdit value={fac.icon} onChange={(v) => updateFacility(fac.id, 'icon', v)} isEdit={isEdit} />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-base mb-2">
                  <InlineEdit value={fac.title} onChange={(v) => updateFacility(fac.id, 'title', v)} isEdit={isEdit} />
                </h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">
                  <InlineEdit value={fac.desc} onChange={(v) => updateFacility(fac.id, 'desc', v)} isEdit={isEdit} multiline />
                </p>
              </motion.div>
            ))}
            {isEdit && (
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-primary-200 hover:border-primary-400 flex flex-col items-center justify-center cursor-pointer transition-all" onClick={addFacility}>
                <Plus size={24} className="text-primary-400 mb-2" />
                <span className="text-sm font-bold text-primary-400 uppercase tracking-widest">Add Facility</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <DynamicSections slotId="mfg-facilities" />

      {/* Certifications — heading editable, badge data NOT editable */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-white mb-8">
            <InlineEdit value={certsTitle} onChange={setCertsTitle} isEdit={isEdit} className="text-white" />
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {certsBadges.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="px-5 py-2.5 rounded-full text-white text-sm font-semibold font-body"
                style={{ backgroundColor: cert.color }}
              >
                {cert.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DynamicSections slotId="mfg-certs" />
    </>
  );
};

export default ManufacturingExcellence;
