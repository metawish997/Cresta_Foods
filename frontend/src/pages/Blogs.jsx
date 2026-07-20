import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineClock, HiArrowRight, HiOutlineSearch } from 'react-icons/hi';
import { HiMagnifyingGlass, HiArrowLongRight, HiCalendarDays, HiTag } from 'react-icons/hi2';
import { usePageContent } from '../context/PageContentContext';
import SeoHead from '../components/SeoHead';

const Blogs = () => {
  const { blogs } = usePageContent();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Extract unique categories
  const blogCategories = ['All', ...new Set(blogs?.map(b => b.category).filter(Boolean) || [])];

  const filtered = useMemo(() => {
    let list = [...(blogs || [])];
    if (category !== 'All') list = list.filter((b) => b.category === category);
    if (search) list = list.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [search, category, blogs]);

  const featured = (blogs || []).filter((b) => b.featured).slice(0, 1)[0];
  const getImageUrl = (img) => img ? (img.startsWith('http') ? img : `/uploads/${img}`) : '';

  return (
    <>
      <SeoHead slug="blogs" />
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt="Blogs"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 to-gray-900/60" />
        <div className="relative z-10 h-full flex items-center max-w-[1280px] mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-300">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Blogs</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">Blog & Insights</h1>
            <p className="text-secondary-400 text-base mt-2 font-body">Industry News & Expert Perspectives</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <p className="text-xs text-primary-600 font-semibold tracking-widest uppercase mb-4 font-body">Featured Post</p>
            <Link to={`/blogs/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-3xl overflow-hidden h-72">
                <img
                  src={getImageUrl(featured.image)}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <HiTag className="w-3 h-3" />{featured.category}
                </span>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-500 font-body text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-body mb-5">
                  <div className="flex items-center gap-1.5">
                    <HiCalendarDays className="w-3.5 h-3.5" />
                    {new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-primary-700 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Full Article <HiArrowLongRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary-400 font-body"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all font-body ${
                    category === cat
                      ? 'bg-primary-700 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, i) => (
                <motion.div
                  key={blog._id || blog.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] transition-all duration-400 hover:-translate-y-1.5 h-full"
                  >
                    <div className="h-52 overflow-hidden">
                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full">{blog.category}</span>
                        <span className="text-xs text-gray-400 font-body">{blog.readTime}</span>
                      </div>
                      <h3 className="font-heading font-bold text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-body leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-body">
                          <HiCalendarDays className="w-3.5 h-3.5" />
                          {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-primary-700 group-hover:gap-2 transition-all">
                          Read <HiArrowLongRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-500 font-body">No articles found. Try different search terms.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-primary-700 font-semibold text-sm hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;
