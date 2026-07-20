import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import EditableText from '../EditableText';

// Import local images
import foodGuarImg from '../../assets/images/food-guar.png';
import guarMealImg from '../../assets/images/guar-meal.png';
import industryGuarImg from '../../assets/images/industry-guar.png';
import onionImg from '../../assets/images/onion.png';

const productCategories = [
 {
 tag: 'Hydrocolloids & Thickeners',
 title: 'Food Grade Guar Gum Powder',
 desc: 'Derived from the endosperm of guar beans grown in Rajasthan, this natural, plant-based hydrocolloid delivers outstanding performance as a thickener, stabiliser, emulsifier, and fat replacer. Rich in soluble dietary fibre and used in both standard and gluten-free food formulations.',
 applications: ['BAKERY & CONFECTIONERY', 'DAIRY & ICE CREAM', 'SAUCES & DRESSINGS', 'BEVERAGES', 'GLUTEN-FREE PRODUCTS', 'PET FOOD'],
 specs: [
 { label: 'VISCOSITY', value: '2,500–6,000 cps' },
 { label: 'MOISTURE', value: '≤ 12%' },
 { label: 'MESH SIZE', value: '200 mesh / custom' },
 { label: 'ORIGIN', value: 'Rajasthan, India' },
 ],
 image: foodGuarImg,
 to: '/products/food-grade-guar-gum',
 },
 {
 tag: 'Hydrocolloids & Thickeners',
 title: 'Industrial Grade Guar Gum Powder',
 desc: 'One of the most versatile natural polymers available today. India accounts for over 80% of global guar production — our industrial grade is sourced from the country\'s premier processors. 100% plant-derived, fully biodegradable, and a cost-effective alternative to synthetic thickeners across critical industries.',
 applications: ['OIL & GAS DRILLING', 'PAPER MANUFACTURING', 'TEXTILES', 'MINING', 'PHARMACEUTICALS', 'WASTEWATER TREATMENT'],
 specs: [
 { label: 'VISCOSITY', value: '3,000–7,000 cps' },
 { label: 'MOISTURE', value: '≤ 12%' },
 { label: 'MESH SIZE', value: '100/200 mesh / custom' },
 { label: 'PH', value: '5.5–7.0' },
 ],
 image: industryGuarImg,
 to: '/products/industrial-grade-guar-gum',
 },
 {
 tag: 'Hydrocolloids & Thickeners',
 title: 'Guar Meal Korma & Churi',
 desc: 'Nutrient-rich byproducts of the guar gum extraction process. Korma (roasted, 45–50% protein) offers enhanced digestibility and is ideal for premium livestock feed. Churi (unroasted, ~40% protein, ~45% carbohydrates) provides a balanced, cost-effective energy-protein source for blended feed formulations.',
 applications: ['CATTLE & DAIRY', 'POULTRY', 'SWINE', 'AQUACULTURE', 'PET FOOD'],
 specs: [
 { label: 'KORMA PROTEIN', value: '45–50%' },
 { label: 'CHURI PROTEIN', value: '~40%' },
 { label: 'PACKAGING', value: '25/50 kg PP bags' },
 { label: 'SHELF LIFE', value: '24 months' },
 ],
 image: guarMealImg,
 to: '/products/guar-korma',
 },
 {
 tag: 'Dehydrated Onions',
 title: 'Dehydrated Onions White · Red · Pink',
 desc: 'Sourced from India\'s premier onion-processing regions in Gujarat and Madhya Pradesh. Processed using advanced dehydration technology to preserve natural flavour, colour, pungency, and nutritional value. Available as flakes, minced, granules, or powder in custom packaging for all market requirements.',
 applications: ['SOUPS & SAUCES', 'READY MEALS', 'SPICE BLENDS', 'SNACK SEASONING', 'FOODSERVICE', 'PROCESSED FOODS'],
 specs: [
 { label: 'MOISTURE', value: '≤ 5–7%' },
 { label: 'SHELF LIFE', value: '18–24 months' },
 { label: 'FORMS', value: 'Flakes / Minced / Powder' },
 { label: 'VARIETIES', value: 'White · Red · Pink' },
 ],
 image: onionImg,
 to: '/products/dehydrated-white-onion',
 },
];

const AlternativeSection = () => {
 const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

 return (
 <section ref={ref} className="relative bg-[#faf9f8] dark:bg-gray-900 overflow-hidden" style={{ padding: '100px 6%' }}>
 {/* Background accents */}
 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white dark:bg-primary-500/20 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white dark:bg-primary-500/20 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

 <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#c8922a]"></div>
              <EditableText id="home_alt_eyebrow" defaultText="Product Intelligence" as="span" className="text-[#c8922a] text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body" />
            </div>
            <EditableText 
              id="home_alt_title" 
              defaultText="Two Core Platforms. Six Engineered Specifications" 
              as="h2" 
              className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1a2332] dark:text-white leading-[1.15]" 
            />
          </div>
          <div className="lg:max-w-md lg:pb-2">
            <EditableText 
              id="home_alt_desc" 
              defaultText="Every product is sourced from audited Indian facilities, independently tested for purity and specification compliance, and exported with complete traceability documentation." 
              as="p" 
              className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm font-body leading-relaxed" 
            />
          </div>
        </motion.div>

 {/* Product Cards Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
 {productCategories.map((cat, i) => (
 <motion.div
 key={cat.title}
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300"
 >
 {/* Left Image Container */}
 <div className="relative w-full sm:w-[45%] xl:w-[40%] shrink-0 h-56 sm:h-auto">
 <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
 <div className="absolute inset-0 bg-black/10"></div>
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
 <div className="absolute top-4 left-4">
 <span className="bg-[#42954a] text-white text-[9px] tracking-wider px-2.5 py-1.5 uppercase rounded-sm shadow-sm">
 {cat.tag}
 </span>
 </div>
 <div className="absolute bottom-5 left-4 right-4">
 <h3 className="font-heading text-xl text-white">
 {cat.title}
 </h3>
 </div>
 </div>

 {/* Right Content */}
 <div className="w-full sm:w-[55%] xl:w-[60%] p-5 xl:p-6 flex flex-col">
 <p className="text-gray-500 dark:text-gray-400 text-[11px] xl:text-xs leading-relaxed mb-4">
 {cat.desc}
 </p>

 {/* Applications / Varieties Tags */}
 <div className="flex flex-wrap gap-1.5 mb-4">
 {cat.applications.map((app, idx) => (
 <span key={idx} className="bg-[#c8922a] text-white text-[10px] sm:text-[11px] tracking-wider px-2.5 py-1 rounded shadow-sm uppercase">
 {app}
 </span>
 ))}
 </div>

 {/* Specs Grid */}
 <div className="grid grid-cols-2 gap-2 mb-4">
 {cat.specs.map((spec, idx) => (
 <div key={idx} className="bg-[#fcfcfc] dark:bg-gray-700/40 p-2 xl:p-2.5 rounded-lg border border-gray-50 dark:border-gray-600">
 <p className="text-[8.5px] text-gray-400 dark:text-gray-400 uppercase tracking-widest mb-0.5">
 {spec.label}
 </p>
 <p className="text-[10px] xl:text-[11px] text-gray-800 dark:text-gray-200">
 {spec.value}
 </p>
 </div>
 ))}
 </div>

 {/* Footer Link */}
 <div className="mt-auto">
 <Link to="/products" className="inline-flex items-center gap-1.5 text-[#42954a] dark:text-green-500 text-[10px] xl:text-[11px] uppercase tracking-widest hover:text-green-800 transition-colors group">
 View Details
 <HiArrowLongRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
 </Link>
 </div>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Bottom CTA */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.3 }}
 className="text-center mt-12"
 >
 <Link
 to="/products"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 text-xs uppercase tracking-widest w-full sm:w-auto shadow-sm"
 >
 View All Products <HiArrowLongRight className="w-4 h-4" />
 </Link>
 </motion.div>
 </div>
 </section>
 );
};

export default AlternativeSection;
