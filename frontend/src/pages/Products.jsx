import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SeoHead from '../components/SeoHead';

// Images removed because we fetch from API

const CATEGORIES = [
  { id: 'white-onions', label: 'White Onions', color: 'text-slate-800', borderColor: 'border-slate-300', accent: 'bg-slate-100 border-slate-300 text-slate-800' },
  { id: 'red-pink-onions', label: 'Red & Pink Onions', color: 'text-rose-600', borderColor: 'border-rose-300', accent: 'bg-rose-50 border-rose-300 text-rose-700' },
  { id: 'guar-gum', label: 'Guar Gum Powders', color: 'text-emerald-600', borderColor: 'border-emerald-300', accent: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
  { id: 'guar-meal', label: 'Guar Meal Feeds', color: 'text-amber-600', borderColor: 'border-amber-300', accent: 'bg-amber-50 border-amber-300 text-amber-700' }
];

// Static PRODUCTS array removed; now fetched from PageContentContext

const getCategoryBadgeText = (categoryId) => {
  switch (categoryId) {
    case 'white-onions':
    case 'red-pink-onions':
      return 'DEHYDRATED ONIONS';
    case 'guar-gum':
      return 'HYDROCOLLOIDS & THICKENERS';
    case 'guar-meal':
      return 'ANIMAL FEEDS';
    default:
      return 'CRESTA FOODS';
  }
};

import { usePageContent } from '../context/PageContentContext';

export default function Products() {
  const { products: PRODUCTS } = usePageContent();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentId = CATEGORIES[0].id;
      CATEGORIES.forEach(cat => {
        const el = document.getElementById(cat.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            currentId = cat.id;
          }
        }
      });
      setActiveCategory(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 text-slate-700 dark:text-gray-200 font-sans">
      <SeoHead slug="products" />
      {/* Header Banner with Image */}
      <div className="relative pt-24 pb-12 md:pt-32 md:pb-20 border-b border-slate-200 overflow-hidden">
        {/* Background Image Placeholder */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620574387995-0160967f52f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFJlZCUyMCUyNiUyMFBpbmslMjBPbmlvbnN8ZW58MHx8MHx8fDA%3D')" }}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-slate-50/85 dark:bg-gray-900/85 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 tracking-tight"
          >
            Cresta Foods Master Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm md:text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto font-medium"
          >
            Export-grade dehydrated onions, high-performance guar gum powders, and nutrient-rich animal feeds. Processed hygienically and certified globally.
          </motion.p>
        </div>
      </div>

      {/* Tabs Navigation Menu */}
      <div className="sticky top-[81px] md:top-22 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex space-x-2 md:space-x-8 overflow-x-auto py-2.5 md:py-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`whitespace-nowrap px-2.5 py-1 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold transition-all duration-300 border ${activeCategory === cat.id
                  ? `border-${cat.borderColor.split('-')[1]}-400 ${cat.color} ${cat.accent} shadow-sm`
                  : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {CATEGORIES.map(category => (
          <div key={category.id} id={category.id} className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h2 className={`text-3xl font-bold ${category.color} mb-4 flex items-center gap-4`}>
                  <span className="w-8 h-px bg-current opacity-30"></span>
                  {category.label}
                  <span className="w-full h-px bg-current opacity-10 flex-1"></span>
                </h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {PRODUCTS.filter(p => {
                  let catId = '';
                  if (p.category === 'Onions' && p.subCategory === 'White Onion') catId = 'white-onions';
                  else if (p.category === 'Onions' && p.subCategory?.includes('Red')) catId = 'red-pink-onions';
                  else if (p.category === 'Guar' && p.subCategory === 'Hydrocolloids') catId = 'guar-gum';
                  else if (p.category === 'Guar' && p.subCategory === 'Animal Feed') catId = 'guar-meal';
                  
                  return catId === category.id;
                }).map(product => {
                  let displaySpecs = [];
                  if (product.specificationTable?.rows?.length > 0) {
                    const headers = product.specificationTable.headers || [];
                    displaySpecs = product.specificationTable.rows.slice(0, 4).map(row => {
                      const label = row[0];
                      let value = '';
                      if (headers.length > 2) {
                        value = headers.slice(1).map((h, i) => `${h}: ${row[i+1]}`).join(', ');
                      } else {
                        value = row[1] || '';
                      }
                      return { label, value };
                    });
                  } else if (product.specifications?.length > 0) {
                    displaySpecs = product.specifications.slice(0, 4);
                  }
                  const displayApps = product.applications || [];
                  return (
                    <a
                      key={product._id}
                      href={`/products/${product.slug}`}
                      className="bg-white dark:bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col md:flex-row group"
                    >
                      {/* Left Side: Image Container */}
                      <div className="relative w-full md:w-[42%] min-h-[180px] sm:min-h-[220px] md:min-h-full overflow-hidden flex flex-col justify-end">
                        <img
                          src={product.image ? (product.image.startsWith('http') ? product.image : `/uploads/${product.image}`) : ''}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Dark Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

                        {/* Category Badge */}
                        <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#3f9b53] text-white text-[8px] md:text-[9px] font-extrabold tracking-wider uppercase px-2 md:px-2.5 py-0.5 md:py-1 rounded-sm shadow-sm">
                          {getCategoryBadgeText(category.id)}
                        </span>

                        {/* Product Name Overlay */}
                        <h3 className="relative z-10 p-4 md:p-6 text-white text-lg md:text-xl font-extrabold leading-tight drop-shadow-md">
                          {product.name}
                        </h3>
                      </div>

                      {/* Right Side: Content Area */}
                      <div className="w-full md:w-[58%] p-4 md:p-8 flex flex-col justify-between flex-grow">
                        <div>
                          {/* Description */}
                          <p className="text-slate-500 dark:text-gray-400 text-[11px] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-4">
                            {product.description || product.shortDesc}
                          </p>

                          {/* Applications (Golden/Amber Badges) */}
                          <div className="flex flex-wrap gap-1 md:gap-1.5 mb-4 md:mb-5">
                            {displayApps.map((app, idx) => (
                              <span
                                key={idx}
                                className="bg-[#c28424] text-white text-[8px] md:text-[9px] font-bold tracking-wider uppercase px-1.5 md:px-2 py-0.5 rounded-sm"
                              >
                                {app}
                              </span>
                            ))}
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                            {displaySpecs.map((s, idx) => (
                              <div key={idx} className="bg-[#f8fafc] dark:bg-gray-700 border border-slate-100 dark:border-gray-600 p-2 md:p-2.5 rounded-lg flex flex-col justify-center">
                                <span className="text-[8px] md:text-[9px] font-bold text-slate-400 dark:text-gray-400 tracking-wider uppercase mb-0.5 truncate">{s.label}</span>
                                <span className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-gray-200 line-clamp-1">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Inquire Action */}
                        <div className="pt-3 md:pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center">
                          <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-extrabold text-green-700 tracking-wider uppercase">
                            KNOW MORE <span className="text-xs md:text-sm">→</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Footer Details */}
      <div className="py-12 border-t border-slate-200 dark:border-gray-700 bg-slate-100 dark:bg-gray-800 text-center px-6">
        <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 text-sm">
          🌟 <strong className="text-slate-900 dark:text-white">Special Note:</strong> Specifications may vary as per buyer requirements. ETO Treated / Steam Sterilized products and complete Certificate of Analysis (COA) are provided upon request.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-gray-400">
          <span className="px-3 py-1 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-full shadow-sm">25 Kg PP/Paper Bags</span>
          <span className="px-3 py-1 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-full shadow-sm">50 Kg Bulk Feed Packs</span>
          <span className="px-3 py-1 bg-white dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-full shadow-sm">Private Labeling Available</span>
        </div>
      </div>
    </div>
  );
}
