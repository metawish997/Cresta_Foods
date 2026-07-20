import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import ContactCTA from '../components/home/ContactCTA';

const milestones = [
  {
    year: '1994',
    title: 'Foundation',
    desc: 'Cresta Foods established with a vision to lead in natural starch products.',
  },
  {
    year: '2003',
    title: 'Expansion',
    desc: 'Diversified into food-grade starches and maltodextrin, entering FMCG markets.',
  },
  {
    year: '2010',
    title: 'Export Begin',
    desc: 'First international shipment marking the beginning of our global export journey.',
  },
  {
    year: '2015',
    title: 'Cresta Foods',
    desc: 'Cresta Foods Ltd. established as a dedicated potato products entity.',
  },
  {
    year: '2018',
    title: 'European Standards',
    desc: 'New plant commissioned to European food safety and manufacturing standards.',
  },
  {
    year: '2022',
    title: 'ISO 22000',
    desc: 'Achieved ISO 22000:2018 certification, strengthening our global credibility.',
  },
  {
    year: '2025',
    title: '40+ Countries',
    desc: 'Exporting to over 40 countries across 6 continents with 5,000+ satisfied clients.',
  },
];

const values = [
  {
    icon: '🌱',
    title: 'Sustainability',
    desc: 'We practice sustainable farming and manufacturing to protect our planet.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    desc: 'Uncompromising quality standards at every step of our process.',
  },
  {
    icon: '🤝',
    title: 'Reliability',
    desc: 'Consistent supply chain solutions trusted by 5,000+ clients globally.',
  },
  {
    icon: '🔬',
    title: 'Innovation',
    desc: 'Continuous R&D to develop new products and improve existing ones.',
  },
];

const About = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1920&q=80"
          alt="About Cresta Foods"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-900/70 sm:from-gray-950/80 sm:to-gray-900/60" />
        <div className="relative z-10 h-full flex items-center max-w-[1280px] mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-3 text-[10px] sm:text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Our Story</span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white">Our Story</h1>
            <p className="text-secondary-400 text-xs sm:text-base mt-1 sm:mt-2 font-body">The Cresta Foods Legacy</p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section ref={heroRef} className="py-12 sm:py-20 lg:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary-600 text-[10px] sm:text-xs font-semibold tracking-widest uppercase font-body">Who We Are</span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 dark:text-white mt-1.5 mb-3 sm:mt-2 sm:mb-5">
                Cresta Foods — Premium Quality Since 1994
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-body">
                Cresta Foods Ltd., a star member of the Cresta Foods of Companies, aims to become a
                quality leader in the dehydrated potato, flavoured french fries and frozen vegetables
                business. With the establishment of our ultra-modern plant conformed to European standards
                and our rigorous process, we ensure exceptional quality potato products.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-body">
                With a primary focus on the food sector since its inception, Cresta Foods has established
                itself as a prominent player in the market. Specialising in the manufacturing of various
                food products, our offerings have garnered a significant presence in the North Indian
                market, and increasingly, across the globe.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-primary-700 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-primary-800 transition-colors text-[11px] sm:text-sm"
              >
                Explore Our Products
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                alt="Cresta Foods manufacturing"
                className="rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full h-[240px] sm:h-[420px] object-cover"
              />
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20 scroll-mt-24 sm:scroll-mt-28" id="values">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 text-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{val.icon}</div>
                <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 sm:mb-2">{val.title}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-body leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-10 sm:py-16 bg-primary-800">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            {[
              { value: 40, suffix: '+', label: 'Export Countries' },
              { value: 30, suffix: '+', label: 'Years Experience' },
              { value: 5000, suffix: '+', label: 'Clients' },
              { value: 10, suffix: '+', label: 'Certifications' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-0.5 sm:mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-green-200 text-[10px] sm:text-sm font-body uppercase tracking-wider sm:tracking-normal sm:uppercase-none">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 lg:py-28 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <SectionHeading
            subtitle="Our Journey"
            title="Milestones"
            description="Three decades of growth, innovation, and unwavering commitment to quality"
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-100 -translate-x-1/2 hidden md:block" />

            <div className="space-y-6 sm:space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'} relative`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute w-4 h-4 bg-primary-700 rounded-full top-4 -translate-y-1/2 shadow-[0_0_0_4px_#C8E6C9]"
                    style={{ [i % 2 === 0 ? 'right' : 'left']: '-2.5rem' }}
                  />

                  <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-gray-800 hover:border-primary-200 transition-colors">
                    <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mb-2 sm:mb-3">
                      📅 {m.year}
                    </div>
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-1.5">{m.title}</h3>
                    <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 font-body leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
};

export default About;
