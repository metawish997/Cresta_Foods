import React, { useRef, useEffect, useState } from 'react';
import { motion, scale } from 'framer-motion';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';
import {
  CheckCircle2,
  Droplets,
  Wrench,
  Pill,
  Wheat,
  Dog,
  UtensilsCrossed,
  ChefHat,
  Coffee,
  Baby,
  ArrowUpRight,
  Plus,
  X
} from 'lucide-react';
// Import local Application Platform images
import animalFeed from '../assets/images/application-platform/animal-feed.png';
import babyFood from '../assets/images/application-platform/baby-food.png';
import foodBeverage from '../assets/images/application-platform/food-beverage.png';
import foodCatering from '../assets/images/application-platform/food-catering.png';
import foodOnion from '../assets/images/application-platform/food-onion.png';
import oilGasIndustrial from '../assets/images/application-platform/oil-gas-industrial.png';
import petFood from '../assets/images/application-platform/pet-food.png';
import pharmaceuticals from '../assets/images/application-platform/pharmaceuticals.png';
import seasoningSpices from '../assets/images/application-platform/seasoning-spices.png';
import EditableText from '../components/EditableText';
import DynamicSections from '../components/DynamicSections';
import { useAuth } from '../context/AuthContext';
import SeoHead from '../components/SeoHead';

const defaultSupportItems = [
  { id: 1, text: 'Certificate of Analysis (COA) provided with every shipment' },
  { id: 2, text: 'Pre-shipment samples available before you commit to an order' },
  { id: 3, text: 'Custom packaging, private labelling, and specific mesh sizes on request' },
  { id: 4, text: 'Full export documents - phytosanitary, COO, invoice, packing list' },
  { id: 5, text: 'FSSAI, ISO 22000, HACCP, and Halal-certified supply partners' },
  { id: 6, text: 'Flexible Incoterms - FOB, CIF, CFR - from Mundra Port, India' },
];


const ApplicationPlatforms = () => {
  const contentRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { user } = useAuth();
  const isEdit = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  // ── Support checklist state ───────────────────────────────────────────────
  const [supportItems, setSupportItems] = useState(defaultSupportItems);

  const updateSupportItem = (id, val) =>
    setSupportItems(prev => prev.map(s => s.id === id ? { ...s, text: val } : s));

  const addSupportItem = () =>
    setSupportItems(prev => [...prev, { id: Date.now(), text: 'New support item' }]);

  const removeSupportItem = (id) =>
    setSupportItems(prev => prev.filter(s => s.id !== id));

  useEffect(() => {
    if (searchParams.get('download') === 'true') {
      const generatePdf = async () => {
        try {
          if (!contentRef.current) return;
          const element = contentRef.current;

          // Use dom-to-image-more to bypass modern CSS parsing issues (like oklab)
          const dataUrl = await domtoimage.toPng(element, {
            quality: 0.95,
            bgcolor: '#ffffff'
          });

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [element.offsetWidth, element.offsetHeight]
          });

          pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
          pdf.save('Application_Platforms.pdf');

          // clear search params
          setSearchParams({});
        } catch (error) {
          console.error('Error generating PDF:', error);
          alert('Could not generate PDF.');
        }
      };

      // Slight delay to allow full render and images to load
      const timer = setTimeout(() => {
        generatePdf();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <SeoHead slug="application-platforms" />

      {/* Content wrapper for PDF */}
      <div ref={contentRef} className="bg-white dark:bg-gray-900 pb-10">

        {/* Hero */}
        <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1920&q=80"
            alt="Application Platforms"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-gray-500">/</span>
                <EditableText id="appplatforms_breadcrumb" defaultText="Application Platforms" as="span" className="text-white" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Intro */}
        <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-accent"></div>
                <EditableText id="appplatforms_eyebrow" defaultText="Application Platforms" as="p" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body block" />
              </div>
              <EditableText
                id="appplatforms_hero_title"
                defaultText="From Functional Specification to Finished Formulation"
                as="h1"
                className="font-heading text-4xl sm:text-5xl md:text-6xl text-gray-900 dark:text-white leading-[1.1] mb-8"
              />
              <EditableText
                id="appplatforms_hero_sub1"
                defaultText="We don't sell commodities. We supply documented ingredients engineered for specific performance in food, industrial, and feed systems. Select your platform below to see critical parameters, compliance needs, and documentation packs."
                as="p"
                className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium mb-6 block"
              />
              <EditableText
                id="appplatforms_hero_sub2"
                defaultText="Understanding the end application is essential to selecting the right product, specification, and packaging format. Our team works closely with importers, distributors, processors, and manufacturers to provide products that align with their operational and market requirements."
                as="p"
                className="text-gray-600 dark:text-gray-400 text-[14px] md:text-[15px] leading-relaxed mb-6 block"
              />
              <EditableText
                id="appplatforms_hero_cta_text"
                defaultText="Tell us your end-use. We match the grade, the micro spec, and the paperwork."
                as="p"
                className="text-primary-600 dark:text-primary-400 font-bold text-[15px] tracking-wide block"
              />
            </motion.div>
          </div>
        </section>

        <DynamicSections slotId="appplatforms-intro" />

        {/* Guar Products Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <EditableText id="appplatforms_guar_title" defaultText="GUAR PRODUCTS" as="h2" className="font-heading text-4xl md:text-5xl text-[#0b1b36] dark:text-white mb-4 tracking-wide font-normal" />
              <EditableText
                id="appplatforms_guar_subtitle"
                defaultText="GUAR GUM POWDER (FOOD & INDUSTRIAL) · GUAR MEAL KORMA · GUAR MEAL CHURI"
                as="p"
                className="text-[#64748b] dark:text-gray-400 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] block"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md md:shadow-none hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={foodBeverage} alt="Food &amp; Beverage Manufacturing" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Droplets className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-5" />
                  <EditableText id="appplatforms_card1_title" defaultText="Food & Beverage Manufacturing" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_card1_desc"
                    defaultText="Dairy products, sauces, dressings, baked goods, soups, ice cream, and gluten-free foods - guar gum is used as a thickener, stabiliser, and binder. It improves texture, extends shelf life, and can replace fat in lower-calorie formulations."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 mt-auto">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">Product:</span>
                    <EditableText id="appplatforms_card1_product" defaultText="Food Grade Guar Gum Powder" as="span" />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md md:shadow-none hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={oilGasIndustrial} alt="Oil &amp; Gas / Industrial" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Wrench className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-5" />
                  <EditableText id="appplatforms_card2_title" defaultText="Oil & Gas / Industrial" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_card2_desc"
                    defaultText="Used in oil drilling fluids and hydraulic fracturing to thicken, stabilise, and control fluid loss. Also widely used in paper manufacturing, textile printing, and mining operations."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 mt-auto">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">Product:</span>
                    <EditableText id="appplatforms_card2_product" defaultText="Industrial Grade Guar Gum Powder" as="span" />
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md md:shadow-none hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={pharmaceuticals} alt="Pharmaceuticals &amp; Nutraceuticals" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Pill className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-5" />
                  <EditableText id="appplatforms_card3_title" defaultText="Pharmaceuticals & Nutraceuticals" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_card3_desc"
                    defaultText="Guar gum acts as a tablet binder and helps control the release of active ingredients. Also used in dietary supplements and fibre-enriched products due to its high soluble fibre content."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 mt-auto">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">Product:</span>
                    <EditableText id="appplatforms_card3_product" defaultText="Food Grade Guar Gum Powder" as="span" />
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={animalFeed} alt="Animal Feed &amp; Livestock Nutrition" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Wheat className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-5" />
                  <EditableText id="appplatforms_card4_title" defaultText="Animal Feed & Livestock Nutrition" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_card4_desc"
                    defaultText="Guar Meal is a high-protein feed ingredient used by poultry, dairy, swine, and aquaculture producers. Korma (roasted) offers higher protein and better digestibility. Churi (unroasted) provides a balanced energy-protein option for blended feeds."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 mt-auto">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">Products:</span>
                    <EditableText id="appplatforms_card4_product" defaultText="Guar Meal Korma · Guar Meal Churi" as="span" />
                  </div>
                </div>
              </div>

              {/* Card 5 - Full Width */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md md:shadow-none hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col md:col-span-2">
                <div className="h-56 md:h-64 w-full overflow-hidden relative">
                  <img src={petFood} alt="Pet Food Manufacturing" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Dog className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-5" />
                  <EditableText id="appplatforms_card5_title" defaultText="Pet Food Manufacturing" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_card5_desc"
                    defaultText="Guar gum is used in wet and dry pet food as a natural thickener and binder. Guar Meal provides a high-protein, high-fibre ingredient for dry pet food formulations."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 mt-auto self-start">
                    <span className="text-primary-600 dark:text-primary-400 font-bold mr-2">Products:</span>
                    <EditableText id="appplatforms_card5_product" defaultText="Food Grade Guar Gum Powder · Guar Meal" as="span" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DynamicSections slotId="appplatforms-guar" />

        {/* Onion Products Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <EditableText id="appplatforms_onion_title" defaultText="DEHYDRATED ONIONS" as="h2" className="font-heading text-4xl md:text-5xl text-[#0b1b36] dark:text-white mb-4 tracking-wide font-normal" />
              <EditableText
                id="appplatforms_onion_subtitle"
                defaultText="WHITE ONION · RED ONION · PINK ONION - FLAKES, MINCED, GRANULES, POWDER"
                as="p"
                className="text-[#64748b] dark:text-gray-400 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] block"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Onion Card 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 shadow-md md:shadow-sm group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={foodOnion} alt="Processed Food &amp; Ready Meals" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <UtensilsCrossed className="w-8 h-8 text-amber-500 mb-5" />
                  <EditableText id="appplatforms_onion1_title" defaultText="Processed Food & Ready Meals" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_onion1_desc"
                    defaultText="Dehydrated onions go into soups, sauces, pasta, ready meals, frozen foods, and canned products. They deliver consistent flavour, long shelf life, and reduced preparation cost compared to fresh onion."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">Products:</span>
                    <EditableText id="appplatforms_onion1_product" defaultText="White Onion Flakes, Minced, Granules · Red Onion Powder" as="span" />
                  </div>
                </div>
              </div>

              {/* Onion Card 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 shadow-md md:shadow-sm group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={seasoningSpices} alt="Seasonings, Spice Blends &amp; Snacks" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Coffee className="w-8 h-8 text-amber-500 mb-5" />
                  <EditableText id="appplatforms_onion2_title" defaultText="Seasonings, Spice Blends & Snacks" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_onion2_desc"
                    defaultText="Onion powder and granules are core ingredients in dry seasoning mixes, spice blends, and snack coatings. Used extensively by seasoning houses, crisp manufacturers, and flavour companies worldwide."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">Products:</span>
                    <EditableText id="appplatforms_onion2_product" defaultText="White & Pink Onion Powder · Red Onion Granules" as="span" />
                  </div>
                </div>
              </div>

              {/* Onion Card 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 shadow-md md:shadow-sm group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={foodCatering} alt="Foodservice &amp; Catering" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <ChefHat className="w-8 h-8 text-amber-500 mb-5" />
                  <EditableText id="appplatforms_onion3_title" defaultText="Foodservice & Catering" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_onion3_desc"
                    defaultText="Large-scale catering, restaurant chains, and institutional kitchens use dehydrated onions for consistent flavour delivery and ease of storage. No chopping, no waste, no variation in strength."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">Products:</span>
                    <EditableText id="appplatforms_onion3_product" defaultText="White Onion Minced & Flakes · Red Onion Slices" as="span" />
                  </div>
                </div>
              </div>

              {/* Onion Card 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-all duration-300 shadow-md md:shadow-sm group overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={babyFood} alt="Baby Food &amp; Health Food" className="w-full h-full object-contain p-2 sm:p-0 sm:object-cover sm:scale-105 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <Baby className="w-8 h-8 text-amber-500 mb-5" />
                  <EditableText id="appplatforms_onion4_title" defaultText="Baby Food & Health Food" as="h3" className="font-heading text-xl md:text-2xl text-gray-900 dark:text-white mb-3" />
                  <EditableText
                    id="appplatforms_onion4_desc"
                    defaultText="Mild white onion powder is used in baby food and health food products where natural flavouring with low microbial content is required. Available with full microbiological testing per batch."
                    as="p"
                    className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[14px] leading-relaxed mb-5 flex-1 block"
                  />
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg text-[12px] md:text-[13px] font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 mt-auto">
                    <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">Product:</span>
                    <EditableText id="appplatforms_onion4_product" defaultText="White Onion Powder (fine grade)" as="span" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DynamicSections slotId="appplatforms-onion" />

        {/* Support Checklist */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <EditableText
                id="appplatforms_support_eyebrow"
                defaultText="SUPPORT & LOGISTICS"
                as="p"
                className="text-primary-600 dark:text-primary-400 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body mb-4 block"
              />
              <EditableText
                id="appplatforms_support_title"
                defaultText="CAN WE SUPPORT YOUR REQUIREMENTS?"
                as="h2"
                className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#0b1b36] dark:text-white font-normal tracking-wide uppercase"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 lg:gap-x-20 max-w-5xl mx-auto">
              {supportItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start group/item">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                  <span
                    contentEditable={isEdit}
                    suppressContentEditableWarning
                    onBlur={(e) => isEdit && updateSupportItem(item.id, e.target.innerText)}
                    className={`flex-1 text-gray-700 dark:text-gray-300 text-[14px] md:text-[15px] leading-relaxed ${
                      isEdit
                        ? 'outline-none border-b border-dashed border-primary-400 focus:border-primary-600 cursor-text'
                        : ''
                    }`}
                  >
                    {item.text}
                  </span>
                  {isEdit && (
                    <button
                      onClick={() => removeSupportItem(item.id)}
                      className="opacity-0 group-hover/item:opacity-100 transition-opacity text-red-400 hover:text-red-600 flex-shrink-0 mt-0.5 p-0.5 rounded"
                      title="Remove item"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}

              {/* Add new item — full width row */}
              {isEdit && (
                <div className="md:col-span-2 flex justify-center pt-4">
                  <button
                    onClick={addSupportItem}
                    className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-primary-300 hover:border-primary-500 text-primary-600 hover:text-primary-700 rounded-xl transition-all text-[12px] sm:text-[13px] font-bold uppercase tracking-widest"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <DynamicSections slotId="appplatforms-support" />

        {/* CTA */}
        <section className="relative overflow-hidden py-10 sm:py-16 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
          {/* Background glow effects for dark mode */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none rounded-xl p-8 sm:p-12"
            >
              <EditableText
                id="appplatforms_cta_title"
                defaultText="Not sure which product fits your application?"
                as="h2"
                className="font-heading text-2xl md:text-3xl text-gray-900 dark:text-white mb-4"
              />
              <EditableText
                id="appplatforms_cta_desc"
                defaultText="Tell us what you make. We'll tell you exactly which product and grade suits you - with a sample and a quote, usually within 24 hours."
                as="p"
                className="text-gray-600 dark:text-gray-400 text-[13px] md:text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto block"
              />
              <div className="flex justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-700 text-white font-bold rounded-lg hover:bg-primary-800 transition-all shadow-md shadow-primary-700/20 text-[12px] md:text-[13px] uppercase tracking-widest"
                >
                  <EditableText id="appplatforms_cta_btn" defaultText="Tell us your application" as="span" /> <ArrowUpRight className="w-[14px] h-[14px]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <DynamicSections slotId="appplatforms-cta" />

      </div>
    </>
  );
};

export default ApplicationPlatforms;