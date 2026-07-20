import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiArrowLongRight } from 'react-icons/hi2';
import SectionHeading from '../common/SectionHeading';
import { usePageContent } from '../../context/PageContentContext';

const ProductCard = ({ product, index, inView }) => {
  const imageSrc = product.image_path ? (product.image_path.startsWith('http') ? product.image_path : `/uploads/${product.image_path}`) : '';
  const applications = product.apps ? product.apps.split(',').map(s => s.trim()).filter(s => s) : [];

  return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.5, delay: index * 0.08 }}
 className="group bg-white rounded-3xl overflow-hidden shadow-md shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-primary-700/15 hover:border-primary-100 transition-all duration-500"
 >
 {/* Image */}
 <div className="relative h-52 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
 <img
 src={imageSrc}
 alt={product.name}
 className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-600"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
 {product.badges && product.badges.length > 0 && (
 <span className="absolute top-4 left-4 bg-primary-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
 {product.badges[0]}
 </span>
 )}
 {/* Category tag */}
 <span className="absolute top-4 right-4 bg-white/95 text-gray-700 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
 {product.categoryName || (product.categoryId ? product.categoryId.replace('-', ' ') : 'Category')}
 </span>
 </div>

 {/* Content */}
 <div className="p-5 flex flex-col h-[220px]">
 <h3 className="font-heading font-bold text-gray-900 text-sm uppercase tracking-widest mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
 {product.name}
 </h3>
 <p className="text-[12px] text-gray-500 font-body leading-relaxed mb-4 line-clamp-2">
 {product.desc}
 </p>

 {/* Applications */}
 <div className="flex flex-wrap gap-1.5 mb-auto">
 {applications.slice(0, 2).map((app) => (
 <span
 key={app}
 className="text-[10px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary-100"
 >
 {app}
 </span>
 ))}
 </div>

 <Link
 to={`/products/${product.slug}`}
 className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary-700 hover:text-primary-900 group/link transition-colors mt-4 pt-4 border-t border-gray-100"
 >
 Explore Product
 <HiArrowLongRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
 </Link>
 </div>
 </motion.div>
  );
};

const ProductHighlights = () => {
  const { products } = usePageContent();
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

 return (
 <section ref={ref} className="py-16 md:py-20 lg:py-28 bg-white">
 <div className="max-w-7xl mx-auto px-4 lg:px-8">
 <SectionHeading
 subtitle="Our Range"
 title="Product Highlights"
 description="From premium potato flakes to frozen vegetables discover our complete range of high-quality food products for global markets."
 />

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
 {products.slice(0, 3).map((product, i) => (
 <ProductCard key={product._id} product={product} index={i} inView={inView} />
 ))}
 </div>

 <motion.div
 initial={{ opacity: 0 }}
 animate={inView ? { opacity: 1 } : {}}
 transition={{ delay: 0.6 }}
 className="text-center"
 >
 <Link
 to="/products"
 className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white rounded-xl transition-all duration-300 w-full sm:w-auto"
 >
 View All Products
 <HiArrowLongRight className="w-5 h-5" />
 </Link>
 </motion.div>
 </div>
 </section>
 );
};

export default ProductHighlights;
