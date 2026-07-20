import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const clients = [
 { name: 'Al Kabeer', logo: 'https://placehold.co/400x200/ffffff/333333?text=Al+Kabeer' },
 { name: 'Alnutri', logo: 'https://placehold.co/400x200/ffffff/333333?text=Alnutri' },
 { name: 'Balaji Wafers', logo: 'https://placehold.co/400x200/ffffff/333333?text=Balaji+Wafers' },
 { name: 'Bikaji', logo: 'https://placehold.co/400x200/ffffff/333333?text=Bikaji' },
 { name: 'DFM Foods Ltd', logo: 'https://placehold.co/400x200/ffffff/333333?text=DFM+Foods' },
 { name: 'Yellow Diamond', logo: 'https://placehold.co/400x200/ffffff/333333?text=Yellow+Diamond' },
 { name: 'ENGEL', logo: 'https://placehold.co/400x200/ffffff/333333?text=ENGEL' },
 { name: 'Haldiram\'s', logo: 'https://placehold.co/400x200/ffffff/333333?text=Haldiram%27s' },
 { name: 'Indian Army', logo: 'https://placehold.co/400x200/ffffff/333333?text=Indian+Army' },
 { name: 'ITC Limited', logo: 'https://placehold.co/400x200/ffffff/333333?text=ITC+Limited' },
 { name: 'Parle', logo: 'https://placehold.co/400x200/ffffff/333333?text=Parle' },
 { name: 'TTK Healthcare', logo: 'https://placehold.co/400x200/ffffff/333333?text=TTK+Healthcare' },
 { name: 'Bikanervala', logo: 'https://placehold.co/400x200/ffffff/333333?text=Bikanervala' },
 { name: 'Lotte', logo: 'https://placehold.co/400x200/ffffff/333333?text=Lotte' },
 { name: 'Chhajed', logo: 'https://placehold.co/400x200/ffffff/333333?text=Chhajed' },
 { name: 'Roble', logo: 'https://placehold.co/400x200/ffffff/333333?text=Roble' }
];

const OurClients = () => {
 const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

 return (
 <section ref={ref} className="py-16 md:py-24 bg-white border-t border-gray-100">
 <div className="max-w-6xl mx-auto px-4">
 
 {/* Header */}
 <div className="text-center mb-16">
 <p className="text-primary-600 text-xs italic mb-2 font-body">Our Partners in Success</p>
 <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-gray-800 uppercase tracking-wide">
 OUR CLIENTS
 </h2>
 </div>

 {/* Grid */}
 <motion.div 
 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
 initial={{ opacity: 0, y: 30 }}
 animate={inView ? { opacity: 1, y: 0 } : {}}
 transition={{ duration: 0.6 }}
 >
 {clients.map((client, i) => (
 <div 
 key={client.name} 
 className="group border border-gray-100 -mt-px -ml-px flex items-center justify-center p-4 sm:p-8 h-24 sm:h-32 hover:bg-gray-50 transition-colors cursor-pointer"
 >
 <img 
 src={client.logo} 
 alt={client.name} 
 className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-105" 
 onError={(e) => {
 e.target.onerror = null; 
 e.target.src = `https://ui-avatars.com/api/?name=${client.name.replace(' ', '+')}&background=random&color=fff&size=200&font-size=0.3`;
 }}
 />
 </div>
 ))}
 </motion.div>

 </div>
 </section>
 );
};

export default OurClients;
