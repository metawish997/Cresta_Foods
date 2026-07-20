import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
 ComposableMap,
 Geographies,
 Geography,
 Marker,
 useMapContext
} from 'react-simple-maps';
import SectionHeading from '../common/SectionHeading';
import { countries } from '../../data/countries';
import { useTheme } from '../../context/ThemeContext';
import EditableText from '../EditableText';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Target countries names exactly as they appear in the TopoJSON to highlight them
const targetCountryNames = [
 "United States of America", "Canada", "Brazil", "Peru", "Chile", "Argentina",
 "France", "Italy", "Portugal", "United Kingdom", "Germany",
 "Nigeria", "Kenya", "South Africa", "United Arab Emirates",
 "India", "Vietnam", "Thailand", "Malaysia", "Indonesia", "Philippines",
 "Australia", "New Zealand", "Russia"
];

const sourceCoordinates = [78.9629, 20.5937]; // India

const CustomLines = ({ countries, sourceCoords }) => {
 const { projection } = useMapContext();
 if (!projection) return null;

 const source = projection(sourceCoords);

 return (
 <>
 {countries.map((country) => {
 if (country.name === 'India') return null;
 
 const dest = projection(country.coordinates);
 
 // Calculate a gentle, direct 2D arc to prevent spherical wrap-arounds
 const dist = Math.sqrt(Math.pow(source[0] - dest[0], 2) + Math.pow(source[1] - dest[1], 2));
 const midX = (source[0] + dest[0]) / 2;
 const midY = (source[1] + dest[1]) / 2 - dist * 0.15; // Arc upwards gently

 const pathData = `M ${source[0]} ${source[1]} Q ${midX} ${midY} ${dest[0]} ${dest[1]}`;

 return (
 <g key={`custom-line-${country.id}`}>
 {/* Background faint line */}
 <path
 d={pathData}
 fill="none"
 stroke="#16a34a"
 strokeWidth={0.5}
 strokeOpacity={0.15}
 />
 {/* Animated dotted line */}
 <path
 d={pathData}
 fill="none"
 stroke="#15803d"
 strokeWidth={1.2}
 strokeOpacity={0.7}
 strokeLinecap="round"
 className="flowing-line pointer-events-none"
 />
 </g>
 );
 })}
 </>
 );
};

const StaticMapSection = () => {
 const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
 const [hoveredCountry, setHoveredCountry] = useState(null);
 const { isDarkMode } = useTheme();

 // Map colors
 const geoNonTargetFill = isDarkMode ? "#374151" : "#f3f4f6";
 const geoNonTargetHover = isDarkMode ? "#4b5563" : "#e5e7eb";
 const geoTargetFill = isDarkMode ? "#065f46" : "#a7f3d0";
 const geoTargetHover = isDarkMode ? "#059669" : "#34d399";
 const geoStroke = isDarkMode ? "#1f2937" : "#ffffff";
 const tooltipFill = isDarkMode ? "#f9fafb" : "#1f2937";
 const tooltipStroke = isDarkMode ? "#1f2937" : "#ffffff";

 return (
 <section ref={ref} className="pt-6 pb-0 md:pt-10 md:pb-0 lg:pt-12 lg:pb-0 bg-[#f8f9fa] relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 relative z-20"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#c8922a]"></div>
              <EditableText id="home_map_eyebrow" defaultText="Global Reach" as="span" className="text-[#c8922a] text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body" />
            </div>
            <EditableText 
              id="home_map_title" 
              defaultText="Our Export Markets" 
              as="h2" 
              className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1a2332] dark:text-white leading-[1.15]" 
            />
          </div>
          <div className="lg:max-w-md lg:pb-2">
            <EditableText 
              id="home_map_desc" 
              defaultText="Cresta Foods exports Guar Gum Hydrocolloids and Dehydrated Onion Products to 40+ countries across 6 continents — including USA, Europe, Australia, South America, Middle East, and South East Asia." 
              as="p" 
              className="text-gray-500 dark:text-gray-400 text-[13px] sm:text-sm font-body leading-relaxed" 
            />
          </div>
        </motion.div>

 {/* World Map with Animations */}
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.8 }}
 className="relative w-full -mt-16 md:-mt-48 -mb-4 md:-mb-12"
 >
 <div className="relative w-full">
 <style>
 {`
 @keyframes flow {
 from { stroke-dashoffset: 22; }
 to { stroke-dashoffset: 0; }
 }
 .flowing-line {
 stroke-dasharray: 1 10;
 animation: flow 1.5s linear infinite;
 }
 `}
 </style>

 <ComposableMap 
 projectionConfig={{ scale: 160, center: [40, 15] }} 
 className="w-full h-auto outline-none"
 >
 
 <Geographies geography={geoUrl}>
 {({ geographies }) =>
 geographies
 .filter((geo) => geo.properties.name !== "Antarctica")
 .map((geo) => {
 const isTarget = targetCountryNames.includes(geo.properties.name);
 return (
 <Geography
 key={geo.rsmKey}
 geography={geo}
 fill={isTarget ? geoTargetFill : geoNonTargetFill}
 stroke={geoStroke}
 strokeWidth={0.5}
 className="outline-none"
 style={{
 default: { outline: "none" },
 hover: { fill: isTarget ? geoTargetHover : geoNonTargetHover, outline: "none", cursor: "pointer" },
 pressed: { outline: "none" },
 }}
 />
 );
 })
 }
 </Geographies>

 {/* Directly mapped 2D lines from India to bypass spherical wrap-around */}
 <CustomLines countries={countries} sourceCoords={sourceCoordinates} />

 {/* Country pins */}
 {countries.map((country) => (
 <Marker 
 key={country.id} 
 coordinates={country.coordinates}
 onMouseEnter={() => setHoveredCountry(country)}
 onMouseLeave={() => setHoveredCountry(null)}
 style={{ cursor: "pointer" }}
 >
 <motion.g
 initial={{ scale: 0, opacity: 0 }}
 animate={inView ? { scale: 1, opacity: 1 } : {}}
 transition={{ delay: 0.5 + Math.random() * 0.5, type: "spring" }}
 className="group"
 >
 {/* Transparent hover target for easier interacting */}
 <circle cx="0" cy="0" r="12" fill="transparent" />
 
 {/* Pulse ring for India, regular glowing ring for others */}
 {country.name === 'India' ? (
 <>
 <circle cx="0" cy="0" r="16" fill="#10b981" className="animate-ping opacity-20" />
 <circle cx="0" cy="0" r="6" fill="#10b981" stroke="#ffffff" strokeWidth={2} />
 </>
 ) : (
 <>
 {/* Outer Glow */}
 <circle 
 cx="0" 
 cy="0" 
 r="10" 
 fill="#10b981" 
 className="opacity-10 transition-all duration-300 group-hover:opacity-30 group-hover:r-[12px]" 
 />
 {/* Inner Dot */}
 <circle 
 cx="0" 
 cy="0" 
 r="3" 
 fill="#10b981" 
 stroke="#ffffff" 
 strokeWidth="1"
 className="transition-transform duration-300 group-hover:scale-150" 
 />
 </>
 )}
 </motion.g>
 </Marker>
 ))}

 {/* Top-level Tooltip Overlay (ensures it is always above all other markers and lines) */}
 {hoveredCountry && (
 <Marker coordinates={hoveredCountry.coordinates}>
 <text
 textAnchor="middle"
 y="-18"
 fill={tooltipFill}
 fontSize="14"
 fontWeight="800"
 stroke={tooltipStroke}
 strokeWidth="4"
 paintOrder="stroke"
 className="pointer-events-none select-none drop-shadow-md font-heading"
 >
 {hoveredCountry.name}
 </text>
 </Marker>
 )}
 </ComposableMap>

 {/* Map Legend */}
 
 </div>
 
 </motion.div>
 </div>
 <div className="absolute top-[55%] right-2 md:right-12 flex flex-col gap-0.5 md:gap-3 pointer-events-none bg-white/50 dark:bg-gray-800/50 p-1 md:p-4 rounded md:rounded-xl backdrop-blur-md shadow-sm border border-white/20 dark:border-gray-700/50">
 <div className="flex items-center gap-1 md:gap-3">
 <div className="w-2 h-2 md:w-4 md:h-4 rounded-full border border-[#10b981] md:border-2 flex items-center justify-center relative">
 <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-[#10b981] absolute opacity-20 animate-ping" />
 <div className="w-[3px] h-[3px] md:w-1.5 md:h-1.5 rounded-full bg-[#10b981]" />
 </div>
 <span className="text-[10px] sm:text-[11px] md:text-sm leading-tight font-body text-gray-800 dark:text-gray-200 font-medium tracking-wide whitespace-nowrap">Cresta Foods, Indore</span>
 </div>
 <div className="flex items-center gap-1 md:gap-3">
 <div className="w-2 h-2 md:w-4 md:h-4 flex items-center justify-center">
 <div className="w-1 h-1 md:w-2.5 md:h-2.5 rounded-full bg-[#10b981]" />
 </div>
 <span className="text-[10px] sm:text-[11px] md:text-sm leading-tight font-body text-gray-800 dark:text-gray-200 font-medium tracking-wide whitespace-nowrap">Active supply lanes</span>
 </div>
 </div>
 </section>
 );
};

export default StaticMapSection;
