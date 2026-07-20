import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiArrowLongRight,
  HiCheckBadge,
  HiInformationCircle,
  HiOutlineBeaker,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineCube,
  HiOutlineDocumentText,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import { usePageContent } from '../context/PageContentContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const { products: PRODUCTS } = usePageContent();
  const rawProduct = PRODUCTS.find((p) => p.slug === slug);
  const relatedProducts = rawProduct ? PRODUCTS.filter(p => {
    if (p._id === rawProduct._id) return false;
    return p.category === rawProduct.category;
  }) : [];

  const product = rawProduct ? {
    name: rawProduct.name,
    slug: rawProduct.slug,
    image: rawProduct.image ? (rawProduct.image.startsWith('http') ? rawProduct.image : `/uploads/${rawProduct.image}`) : '',
    gallery: rawProduct.gallery && rawProduct.gallery.length > 0 ? rawProduct.gallery : (rawProduct.image ? [rawProduct.image.startsWith('http') ? rawProduct.image : `/uploads/${rawProduct.image}`] : []),
    badge: rawProduct.badge || '',
    subCategory: rawProduct.subCategory || rawProduct.category?.toUpperCase() || '',
    shortDesc: rawProduct.shortDesc || '',
    description: rawProduct.description || '',
    certifications: rawProduct.certifications || [],
    specifications: rawProduct.specifications || [],
    keyProperties: rawProduct.keyProperties && rawProduct.keyProperties.length > 0 ? rawProduct.keyProperties.map(k => `${k.title}: ${k.desc}`) : [],
    applications: rawProduct.applications || [],
    packaging: rawProduct.packaging || 'Custom packaging on request',
    packagingAndStorage: rawProduct.storageGuidelines ? {
      packaging: rawProduct.packaging || 'Custom packaging on request',
      storageGuidelines: rawProduct.storageGuidelines
    } : null,
    whySource: rawProduct.whyChoose && rawProduct.whyChoose.length > 0 ? rawProduct.whyChoose.map(w => `${w.title} - ${w.desc}`) : null,
    techSpecDesc: rawProduct.technicalSpecText || null,
    whyPartner: rawProduct.whyChoose && rawProduct.whyChoose.length > 0 ? rawProduct.whyChoose.map(w => `${w.title}: ${w.desc}`) : null,
    specificationTable: rawProduct.specificationTable || { headers: [], rows: [] },
    subProducts: rawProduct.subProducts || []
  } : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <Link to="/products" className="text-primary-700 dark:text-primary-400 hover:underline font-semibold">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Define new feature cards for the "Why Choose Our Products" section
  const features = [
    { title: "Premium Grade", desc: "Highest quality standards with rigorous selection process", icon: <HiCheckBadge className="w-5 h-5" /> },
    { title: "Quality Assured", desc: "Multiple quality checks and laboratory testing protocols", icon: <HiOutlineShieldCheck className="w-5 h-5" /> },
    { title: "Safe Packaging", desc: "Hygienic processing with food-grade packaging materials", icon: <HiOutlineCube className="w-5 h-5" /> },
    { title: "Reliable Supply", desc: "Consistent availability with efficient logistics network", icon: <HiOutlineTruck className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-body text-gray-800 dark:text-gray-200 pb-6 sm:pb-20 lg:pb-24">
      <title>{product.name} | Cresta Foods</title>

      {/* Hero Banner */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src={product.gallery?.[0] || product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[10px] sm:text-[13px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <span className="text-gray-500">/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-8 sm:pt-12">

        {/* Header Area */}
        <div className="mb-6 sm:mb-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white uppercase tracking-widest mb-4 sm:mb-6 leading-snug">{product.name}</h1>
            
            {/* Related Products Quick Links */}
            {relatedProducts.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gray-500 flex-shrink-0">Related:</span>
                {relatedProducts.map(rp => (
                  <button 
                    key={rp._id}
                    onClick={() => {
                      document.getElementById('related-products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-shrink-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors border border-primary-200 dark:border-primary-800/50 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
                    {rp.name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 mb-10 sm:mb-16">

          {/* Left Column - Image & Actions */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 flex flex-col items-center">

              {/* Product Image */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative border border-gray-100 dark:border-gray-800 mb-4">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-sm scale-110" />
              </div>
              
              {/* Application Details Link */}
              <Link 
                to="/application-platforms"
                className="w-full flex items-center justify-center gap-1.5 pt-1 text-[13px] font-semibold text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors uppercase tracking-widest"
              >
                View Application Details
                <HiArrowLongRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Key Properties Card */}
            {product.keyProperties?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700">
                <h3 className="font-heading font-bold tracking-widest text-gray-800 dark:text-gray-200 text-sm uppercase mb-5">Key Properties</h3>
                <ul className="space-y-4">
                  {product.keyProperties.map((prop, i) => {
                    const colonIndex = prop.indexOf(':');
                    const title = colonIndex !== -1 ? prop.substring(0, colonIndex) : null;
                    const desc = colonIndex !== -1 ? prop.substring(colonIndex + 1) : prop;
                    return (
                      <li key={i} className="flex items-start gap-3 text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400">
                        <div className="mt-[3px] shrink-0 text-green-600 dark:text-green-400">
                          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="leading-relaxed">
                          {title ? (
                            <>
                              <strong className="font-semibold text-gray-800 dark:text-gray-200">{title}:</strong>
                              {desc}
                            </>
                          ) : (
                            <span>{desc}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 min-w-0">

            {/* Overview Card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700">
              <h2 className="font-heading font-bold tracking-widest text-gray-800 dark:text-gray-200 text-sm sm:text-lg uppercase mb-5 flex items-center gap-3">
                <HiInformationCircle className="w-6 h-6 opacity-80 text-primary-600 dark:text-primary-400" /> Product Overview
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-[13px] sm:text-sm md:text-base leading-normal md:leading-relaxed">
                {product.description.split('\n').map((para, i) => {
                  if (!para.trim()) return null;
                  const isHeading = para.trim().toLowerCase().startsWith('what is') || para.trim() === 'Guar Korma' || para.trim() === 'Guar Churi' || para.trim().endsWith('-');
                  if (isHeading) {
                    return <h3 key={i} className="font-heading font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mt-6 mb-2">{para}</h3>;
                  }
                  return <p key={i}>{para}</p>;
                })}
                {product.packaging && <p><strong>Packaging:</strong> {product.packaging}</p>}
                {product.applications?.length > 0 && (
                  <p><strong>Ideal for:</strong> {product.applications.join(', ')}</p>
                )}
              </div>

              {/* Certifications inside Overview */}
              {product.certifications?.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
                  {product.certifications.map(cert => (
                    <span key={cert} className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[12px] sm:text-[13px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5">
                      <HiCheckBadge className="w-4 h-4 opacity-80" /> {cert}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Technical Specs Card */}
            {(product.specificationTable?.headers?.length > 0 || product.specifications?.length > 0 || product.techSpecDesc) && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700">
                {product.techSpecDesc ? (
                  <>
                    <h2 className="font-heading font-bold text-lg sm:text-2xl text-[#1ca38b] dark:text-[#2ad4b7] mb-4 inline-block border-b-[3px] border-[#1ca38b] pb-1">
                      Technical Specification
                    </h2>
                    <div className="space-y-4 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {product.techSpecDesc.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    {product.whyPartner && (
                      <div className="mb-8">
                        <h3 className="font-bold text-[13px] sm:text-base text-gray-900 dark:text-white mb-3 underline">
                          Why Partner with Cresta Foods:
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-[13px] sm:text-sm text-gray-700 dark:text-gray-300">
                          {product.whyPartner.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <h2 className="font-heading font-bold tracking-widest text-gray-800 dark:text-gray-200 text-[14px] sm:text-[15px] lg:text-lg uppercase mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <HiOutlineCube className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 text-primary-600 dark:text-primary-400" /> Technical Specifications
                  </h2>
                )}

                {(product.specificationTable?.headers?.length > 0 || product.specifications?.length > 0) && (
                  <div className="w-full flex flex-col mt-4 min-w-0">
                    {product.techSpecDesc && (
                      <button
                        onClick={() => setIsTableExpanded(!isTableExpanded)}
                        className="w-full flex items-center justify-between py-3 sm:py-4 px-4 sm:px-5 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                      >
                        <span className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Food Grade Specifications
                        </span>
                        <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isTableExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}

                    {(!product.techSpecDesc || isTableExpanded) && (
                      <motion.div 
                        initial={product.techSpecDesc ? { height: 0, opacity: 0 } : false} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={product.techSpecDesc ? { height: 0, opacity: 0 } : undefined} 
                        className="w-full max-w-full overflow-hidden"
                      >
                        {/* Dynamic Specification Table */}
                        {product.specificationTable?.headers?.length > 0 && (
                          <div className="w-full max-w-full overflow-x-auto scrollbar-thin pb-2 mt-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-full">
                              <thead>
                                <tr>
                                  {product.specificationTable.headers.map((header, i) => (
                                    <th key={i} className={`bg-[#1ca38b] text-white p-3 font-semibold text-[14px] sm:text-[15px] border-r border-[#15826f] ${i === 0 ? 'bg-[#1f3b4d] border-[#152a38] text-left' : 'text-center'}`}>
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {product.specificationTable.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-t border-gray-200 dark:border-gray-700">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className={`p-3 border-r border-gray-200 dark:border-gray-700 text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-400 whitespace-pre-line ${cIdx === 0 ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-center'}`}>
                                        {cell?.replace(/ \/ /g, '\n')}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Simple Specifications List (if no table or in addition to table) */}
                        {product.specifications?.length > 0 && (
                          <div className={`mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ${product.specificationTable?.headers?.length > 0 ? 'pt-4 border-t border-gray-200 dark:border-gray-700' : ''}`}>
                            {product.specifications.map((spec, i) => (
                              <div key={i} className="flex flex-col bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{spec.label}</span>
                                <span className="text-[13px] sm:text-[14px] font-medium text-gray-800 dark:text-gray-200">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    <div className="mt-6 bg-primary-50 dark:bg-primary-900/20 p-4 sm:p-5 rounded-xl border border-primary-100 dark:border-primary-800/30">
                      <p className="text-[13px] sm:text-[14px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px] sm:text-[13px] mr-2">Special Note:</strong> 
                        Specifications may vary as per buyer requirements. ETO Treated / Steam Sterilized products can be provided upon request. Complete technical details and Certificate of Analysis (COA) will also be provided upon request.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Sub Products (if any) */}
            {product.subProducts?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700">
                <h2 className="font-heading font-bold tracking-widest text-gray-800 dark:text-gray-200 text-sm sm:text-lg uppercase mb-5 flex items-center gap-3">
                  <HiOutlineDocumentText className="w-6 h-6 opacity-80 text-primary-600 dark:text-primary-400" /> Product Variants
                </h2>
                <div className="space-y-8">
                  {product.subProducts.map((sub, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{sub.name}</h3>
                      {sub.desc && <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{sub.desc}</p>}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {sub.cutSize && <div><span className="text-gray-400">Cut Size:</span> <span className="font-medium text-gray-700 dark:text-gray-300">{sub.cutSize}</span></div>}
                        {sub.color && <div><span className="text-gray-400">Color:</span> <span className="font-medium text-gray-700 dark:text-gray-300">{sub.color}</span></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Packaging & Storage Section */}
        {product.packagingAndStorage && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 mt-6 sm:mt-10">
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-gray-800 dark:text-white mb-6">
              Packaging & storage
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
                <HiOutlineCube className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-3" />
                <h3 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2">Packaging</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.packagingAndStorage.packaging}
                </p>
              </div>
              <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 sm:p-6 bg-gray-50 dark:bg-gray-900/50">
                <div className="text-gray-600 dark:text-gray-400 mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-2">Storage guidelines</h3>
                <p className="text-[14px] sm:text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.packagingAndStorage.storageGuidelines}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Section */}
        {product.whySource && product.whySource.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 lg:p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 mt-6 sm:mt-10">
            <h2 className="font-heading font-bold text-lg sm:text-2xl text-gray-800 dark:text-white mb-6">
              Why source {product.name.toLowerCase()} through Cresta Foods?
            </h2>
            <ul className="space-y-4 mb-8">
              {product.whySource.map((item, idx) => {
                const [title, desc] = item.includes(' - ') ? item.split(' - ') : [item, ''];
                return (
                  <motion.li key={idx} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 * idx }} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-[13px] sm:text-sm text-gray-600 dark:text-gray-400 leading-snug">
                      {desc ? (
                        <>
                          <strong className="font-semibold text-gray-800 dark:text-gray-200">{title}</strong> - {desc}
                        </>
                      ) : (
                        item
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-[13px] font-semibold text-gray-800 dark:text-gray-200 transition-colors">
              Request a quote or sample
              <HiArrowLongRight className="w-4 h-4 transform -rotate-45" />
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 lg:p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 mt-6 sm:mt-10">
            <h2 className="font-heading font-bold text-sm sm:text-xl md:text-3xl text-gray-800 dark:text-white uppercase tracking-widest text-center mb-6 sm:mb-12 leading-snug">Why Choose Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {features.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * idx }} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 sm:p-6 lg:p-8 text-left sm:text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-800 hover:-translate-y-1 transition-all duration-300 flex flex-row sm:flex-col items-center sm:items-stretch gap-4 sm:gap-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 mx-0 sm:mx-auto rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center sm:mb-5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-[10px] sm:text-[13px] md:text-[13px] font-bold tracking-widest text-gray-800 dark:text-gray-200 uppercase mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-[10px] sm:text-[13px] md:text-[13px] text-gray-500 dark:text-gray-400 leading-snug md:leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div id="related-products" className="mt-16 sm:mt-24 pt-10 border-t border-gray-200 dark:border-gray-800 scroll-mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 dark:text-white uppercase tracking-widest">
                Related Products
              </h2>
              <Link to="/products" className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                View All <HiArrowLongRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map(rp => {
                const rpImage = rp.image ? (rp.image.startsWith('http') ? rp.image : `/uploads/${rp.image}`) : '';
                return (
                <Link to={`/products/${rp.slug}`} key={rp._id} className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-900 relative overflow-hidden flex items-center justify-center p-3 sm:p-6 border-b border-gray-100 dark:border-gray-800">
                    <img src={rpImage} alt={rp.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3 sm:p-5 flex flex-col flex-grow">
                    <h3 className="font-heading font-bold text-[10px] sm:text-sm text-gray-900 dark:text-white uppercase tracking-widest mb-2 sm:mb-3 line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {rp.name}
                    </h3>
                    <div className="mt-auto flex items-center text-[9px] sm:text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest group-hover:gap-1.5 transition-all">
                      View Details <HiArrowLongRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
