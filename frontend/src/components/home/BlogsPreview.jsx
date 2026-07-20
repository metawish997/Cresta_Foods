import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLongRight, HiCalendarDays, HiTag } from 'react-icons/hi2';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SectionHeading from '../common/SectionHeading';
import { usePageContent } from '../../context/PageContentContext';
import { useInView } from 'react-intersection-observer';

const BlogCard = ({ blog }) => {
  const blogImage = blog.image_path ? (blog.image_path.startsWith('http') ? blog.image_path : `/uploads/${blog.image_path}`) : '';

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-md shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-1.5 h-full"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={blogImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
        <span className="absolute top-4 left-4 bg-primary-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
          <HiTag className="w-3 h-3" />
          {blog.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-body">
            <HiCalendarDays className="w-3.5 h-3.5" />
            {new Date(blog.createdAt || blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-400 font-body">{blog.readTime || '5 min read'}</span>
        </div>

        <h3 className="font-heading text-gray-900 text-base mb-2.5 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
          {blog.title}
        </h3>
        <p className="text-[13px] sm:text-sm text-gray-500 font-body leading-relaxed mb-4 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-primary-700 group-hover:gap-2.5 transition-all">
          Read More <HiArrowLongRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

const BlogsPreview = () => {
  const { blogs } = usePageContent();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeading
            subtitle="Latest Insights"
            title="From Our Blog"
            align="left"
            className="mb-0 max-w-none"
          />
          <Link
            to="/blogs"
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 text-primary-700 text-sm border border-primary-700 px-5 py-2.5 rounded-xl hover:bg-primary-700 hover:text-white transition-all duration-300 w-full sm:w-auto"
          >
            All Articles <HiArrowLongRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog, i) => (
            <motion.div
              key={blog._id || blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{ 480: { slidesPerView: 1.3 } }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {blogs.slice(0, 4).map((blog) => (
              <SwiperSlide key={blog._id || blog.id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogsPreview;
