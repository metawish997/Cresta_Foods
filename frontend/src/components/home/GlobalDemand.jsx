import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
 ComposableMap,
 Geographies,
 Geography,
 Sphere,
 Graticule,
 Marker,
 useMapContext
} from 'react-simple-maps';
import SectionHeading from '../common/SectionHeading';
import { countries } from '../../data/countries';
import { useTheme } from '../../context/ThemeContext';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const regionColors = {
 Americas: '#2E7D32',
 Europe: '#1565C0',
 Africa: '#E65100',
 'Middle East': '#6A1B9A',
 'South Asia': '#B71C1C',
 'SE Asia': '#00695C',
 Oceania: '#4527A0',
 'North Asia': '#D84315',
};

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
 strokeWidth={1}
 strokeOpacity={0.2}
 />
 {/* Animated full dashed line */}
 <path
 d={pathData}
 fill="none"
 stroke="#15803d"
 strokeWidth={2}
 strokeLinecap="round"
 className="flowing-line pointer-events-none"
 />
 </g>
 );
 })}
 </>
 );
};

const GlobalDemand = () => {
 const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
 const [hoveredCountry, setHoveredCountry] = useState(null);
 const { isDarkMode } = useTheme();

 // Map colors
 const sphereFill = isDarkMode ? "#1f2937" : "#ffffff";
 const sphereStroke = isDarkMode ? "#374151" : "#f3f4f6";
 const geoNonTargetFill = isDarkMode ? "#374151" : "#f3f4f6";
 const geoNonTargetHover = isDarkMode ? "#4b5563" : "#e5e7eb";
 const geoTargetFill = isDarkMode ? "#065f46" : "#a7f3d0";
 const geoTargetHover = isDarkMode ? "#059669" : "#34d399";
 const geoStroke = isDarkMode ? "#1f2937" : "#ffffff";
 const tooltipFill = isDarkMode ? "#f9fafb" : "#1f2937";
 const tooltipStroke = isDarkMode ? "#1f2937" : "#ffffff";

 return (
 <section ref={ref} className="pt-4 pb-0 md:pt-8 md:pb-0 lg:pt-8 lg:pb-0 bg-white dark:bg-gray-900 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 lg:px-8">
 <SectionHeading
 subtitle="Global Reach"
 title="Our Export Markets"
 description="Cresta Foods exports Guar Gum Hydrocolloids and Dehydrated Onion Products to 40+ countries across 6 continents — including USA, Europe, Australia, South America, Middle East, and South East Asia."
 className="!mb-4 !md:mb-8"
 />

 {/* World Map with Animations */}
 <motion.div
 initial={{ opacity: 0, y: 40 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.8 }}
 className="relative max-w-5xl mx-auto w-full mb-0"
 >
 <div className="relative w-full">
 <style>
 {`
 @keyframes flow {
 from { stroke-dashoffset: 10; }
 to { stroke-dashoffset: 0; }
 }
 .flowing-line {
 stroke-dasharray: 4 6;
 animation: flow 1s linear infinite;
 }
 `}
 </style>

 <ComposableMap 
 projectionConfig={{ scale: 160, center: [40, 15] }} 
 className="w-full h-auto outline-none"
 >
 
 <Geographies geography={geoUrl}>
 {({ geographies }) =>
 geographies.map((geo) => {
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
 </div>
 </motion.div>
 </div>
 </section>
 );
};

export default GlobalDemand;
