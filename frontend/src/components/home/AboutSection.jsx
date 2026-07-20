import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EditableText from '../EditableText';
import EditableList from '../EditableList';

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });



  return (
    <section
      ref={ref}
      className="relative bg-white dark:bg-gray-900 overflow-hidden"
      style={{ padding: '100px 6%' }}
    >
      <div className="w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Content */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent"></div>
              <EditableText id="home_about_eyebrow" defaultText="About Cresta Foods" as="span" className="text-accent text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body" />
            </div>

            {/* Main Heading */}
            <EditableText
              id="home_about_title"
              defaultText="Your Global Trade & Sourcing Partner from India"
              as="h2"
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] text-[#1a2332] dark:text-white leading-[1.15] mb-8 font-normal"
            />

            {/* Text Paragraphs */}
            <div className="space-y-6 mb-8 text-gray-600 dark:text-gray-400 text-[13px] sm:text-sm md:text-[15px] font-body leading-relaxed md:leading-[1.8]">
              <EditableText
                id="home_about_p1"
                defaultText="Cresta Foods is an international trade and sourcing company headquartered in Indore, Madhya Pradesh, central India's commercial capital, strategically positioned at the heart of the country's most productive agricultural zones."
                as="p"
              />
              <EditableText
                id="home_about_p2"
                defaultText="From the guar fields of Rajasthan, we supply Food Grade Guar Gum Powder, Industrial Grade Guar Gum Powder, Guar Meal Korma, and Guar Meal Churi, high performance hydrocolloids and protein rich feed ingredients trusted by food processors, industrial manufacturers, and livestock feed formulators worldwide. From the onion processing belts of Gujarat and Madhya Pradesh, we supply Dehydrated White, Red, and Pink Onions, shelf stable, flavour rich ingredients essential to global food manufacturing."
                as="p"
              />
              <EditableText
                id="home_about_p3"
                defaultText="Our strength lies in our sourcing rigour. We work directly with carefully selected, audited production facilities, ensuring that every consignment leaving India under the Cresta Foods name meets the exact specification, safety standard, and quality expectation of the most demanding international buyers."
                as="p"
              />
            </div>

            {/* Quote Block */}
            <div className="bg-[#fcf9f2] dark:bg-gray-800/50 border-l-[3px] border-[#c8922a] py-5 pl-6 pr-4 md:py-6 md:pl-8 md:pr-6 mt-4">
              <EditableText
                id="home_about_quote"
                defaultText='"We are fully accountable for every product we ship. You always know its origin, its test results, and the facility it came from. No ambiguity, no gaps in the chain."'
                as="p"
                className="italic text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm md:text-[15px] leading-relaxed font-heading"
              />
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="w-full pt-8 lg:pt-0">
            <div className="w-full">
              <EditableList
                id="home_about_quality_points"
                listContainerClass="grid grid-cols-1 sm:grid-cols-2 gap-4"
                defaultItems={[
                  { id: '1', text: "Batch-to-Batch Viscosity Variance <5%" },
                  { id: '2', text: "Aflatoxin B1 <5 PPB Guaranteed" },
                  { id: '3', text: "12-Month Traceability Archive" },
                  { id: '4', text: "Granulation: 98% Through Declared Mesh" },
                  { id: '5', text: "Pre-Shipment Testing" },
                  { id: '6', text: "COA Per Lot" },
                  { id: '7', text: "TPC Guaranteed <10,000 CFU/g" }
                ]}
                newItemTemplate={{ text: "New Quality Point" }}
                renderItem={(point) => (
                  <div key={point.id} className="group relative p-4 sm:p-5 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-lg flex items-start gap-3 transition-shadow duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c8922a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />
                    <div className="w-2 h-2 mt-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-[#c8922a] transition-colors duration-300" />
                    <EditableText id={`home_about_qp_${point.id}`} defaultText={point.text} as="span" className="text-[13px] sm:text-[14px] text-gray-700 dark:text-gray-300 font-medium leading-snug font-body" />
                  </div>
                )}
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
