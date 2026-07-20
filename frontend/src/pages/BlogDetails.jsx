import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLongLeft, HiCalendarDays, HiTag, HiShare } from 'react-icons/hi2';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { usePageContent } from '../context/PageContentContext';

const BlogDetails = () => {
  const { slug } = useParams();
  const { blogs } = usePageContent();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <Navigate to="/blogs" />;

  const related = blogs.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 3);
  const blogImage = blog.image ? (blog.image.startsWith('http') ? blog.image : `/uploads/${blog.image}`) : '';


  return (
    <>
      <title>{blog.title} | Cresta Foods</title>

      {/* Hero */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src={blogImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
        
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
              <span className="text-gray-500">/</span>
              <span className="text-white">{blog.title}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12 sm:pb-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Area */}
            <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 bg-primary-700 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mb-4 shadow-sm shadow-primary-700/20">
              <HiTag className="w-3 h-3" />{blog.category}
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white uppercase tracking-widest leading-snug">
              {blog.title}
            </h1>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 sm:pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900/30"
              />
              <div>
                <p className="text-[11px] sm:text-[12px] font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">{blog.author}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400">{blog.readTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
              <HiCalendarDays className="w-4 h-4" />
              {new Date(blog.createdAt || blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-[12px] sm:text-sm font-bold uppercase tracking-wide leading-relaxed mb-8 italic border-l-4 border-primary-500 pl-4 sm:pl-5">
            {blog.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-gray dark:prose-invert max-w-none 
              prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-gray-800 dark:prose-headings:text-gray-200
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5
              prose-p:text-[11px] sm:prose-p:text-[13px] prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-loose prose-p:mb-5
              prose-strong:text-gray-800 dark:prose-strong:text-gray-200"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            {blog.tags && blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer border border-transparent dark:border-gray-800">
                #{tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
              <HiShare className="w-4 h-4" /> Share:
            </span>
            {[
              { icon: FaFacebookF, label: 'Facebook', color: 'hover:bg-[#1877F2]' },
              { icon: FaLinkedinIn, label: 'LinkedIn', color: 'hover:bg-[#0A66C2]' },
              { icon: FaXTwitter, label: 'X', color: 'hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900' },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                aria-label={`Share on ${label}`}
                className={`w-9 h-9 bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 ${color} hover:text-white text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-md`}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
            <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl uppercase tracking-widest text-gray-800 dark:text-gray-200 mb-8 sm:mb-10 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {related.map((b, i) => {
                const bImage = b.image ? (b.image.startsWith('http') ? b.image : `/uploads/${b.image}`) : '';
                return (
                <motion.div
                  key={b._id || b.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/blogs/${b.slug}`}
                    className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-44 sm:h-52 overflow-hidden">
                      <img src={bImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">{b.category}</span>
                      <h3 className="font-heading font-bold uppercase tracking-wider text-gray-900 dark:text-white text-[12px] sm:text-[13px] mt-2 line-clamp-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">{b.title}</h3>
                    </div>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="py-6 bg-gray-50 dark:bg-gray-900 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <Link to="/blogs" className="flex items-center gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors w-fit">
            <HiArrowLongLeft className="w-5 h-5" /> Back to Blogs
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
