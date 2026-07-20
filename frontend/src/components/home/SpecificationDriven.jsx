import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EditableText from '../EditableText';
import EditableList from '../EditableList';

const SpecificationDriven = () => {
  return (
    <section className="relative w-full pt-16 md:pt-24 pb-0 bg-transparent overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-[6%] mb-10 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent"></div>
              <EditableText id="home_spec_eyebrow" defaultText="India's Finest Ingredients - Exported Worldwide" as="span" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-[1.1] mb-6 font-heading font-normal">
              <EditableText 
                id="home_spec_title_p1" 
                defaultText="Specification-Driven Supply of Indian " 
                as="span" 
              />
              <EditableText 
                id="home_spec_title_p2" 
                defaultText="Dehydrated Onion, Guar Hydrocolloids, and Feed Proteins" 
                as="span" 
                className="text-accent italic" 
              />
            </h1>

            {/* Sub-eyebrow */}
            <div className="mb-6 flex items-center justify-start text-gray-500 dark:text-gray-400 text-xs md:text-sm tracking-widest uppercase font-body">
              <span className="mr-2">—</span> Sourcing Excellence Delivered Globally <span className="ml-2">—</span>
            </div>

            {/* Description */}
            <EditableText 
              id="home_spec_desc" 
              defaultText="Three core platforms: Dehydrated Allium for flavor systems, Guar galactomannans for rheology control, Guar protein concentrates for animal nutrition. All with plant-level COA and export documentation." 
              as="p" 
              className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-body mb-10 max-w-lg" 
            />

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/products" className="bg-accent hover:bg-accent-600 text-white font-body text-xs md:text-sm font-semibold tracking-wider uppercase px-8 py-4 transition-colors duration-300">
                Explore Products
              </Link>
              <Link to="/contact" className="bg-transparent border border-gray-300 dark:border-gray-700 hover:border-accent text-gray-800 dark:text-white font-body text-xs md:text-sm font-semibold tracking-wider uppercase px-8 py-4 transition-colors duration-300">
                Request a Quote
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <div className="border border-gray-200 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm p-2">
              <EditableList
                id="home_spec_stats"
                listContainerClass="grid grid-cols-2 md:flex md:flex-col"
                defaultItems={[
                  { id: '1', num: '6', title: 'Export Products', desc: 'Across 2 premium categories' },
                  { id: '2', num: '80%', title: "India's Global Guar Share", desc: 'We source from the heartland, Rajasthan' },
                  { id: '3', num: '12+', title: 'Export Destinations', desc: '5 continents, growing annually' },
                  { id: '4', num: '24h', title: 'Inquiry Response', desc: 'Every inquiry answered within one business day' }
                ]}
                newItemTemplate={{ num: '0', title: 'New Stat', desc: 'Stat description' }}
                renderItem={(stat, i) => (
                  <div key={stat.id} className={`flex flex-col md:flex-row items-start gap-2 md:gap-6 p-4 md:p-6 border-gray-200 dark:border-gray-800 ${i === 0 ? 'border-b border-r md:border-r-0' : i === 1 ? 'border-b' : i === 2 ? 'border-r md:border-r-0 md:border-b' : ''}`}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-heading text-accent md:min-w-[3rem]">
                      <EditableText id={`home_spec_stat_num_${stat.id}`} defaultText={stat.num} as="span" />
                    </div>
                    <div>
                      <EditableText id={`home_spec_stat_title_${stat.id}`} defaultText={stat.title} as="h4" className="text-gray-900 dark:text-white text-sm md:text-base font-semibold font-body mb-1 leading-tight" />
                      <EditableText id={`home_spec_stat_desc_${stat.id}`} defaultText={stat.desc} as="p" className="text-gray-500 dark:text-gray-400 text-[11px] md:text-sm font-body leading-relaxed" />
                    </div>
                  </div>
                )}
              />
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator (optional, keeping it subtle) */}
        {/* <div className="hidden lg:flex flex-col items-center justify-center mt-12 opacity-50">
          <span className="text-[10px] tracking-widest uppercase font-body text-gray-500 mb-2">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
        </div> */}
      </div>


    </section>
  );
};

export default SpecificationDriven;
