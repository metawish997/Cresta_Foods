import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EditableText from '../EditableText';
import EditableList from '../EditableList';
import api from '../../utils/api';

const ContactCTA = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to send request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
 <section className="relative py-8 md:py-10 bg-gray-50 dark:bg-gray-900 overflow-hidden border-t border-gray-100 dark:border-gray-800">
 {/* Side-wise glowing orbs for Dark Mode */}
 <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none hidden dark:block" />

 <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 z-10">
 <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 xl:gap-28">
 
 {/* Left Side: Text & Trust Indicators */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="lg:w-1/2 text-left flex flex-col justify-start h-full pt-0"
 >
 <EditableText id="home_cta_eyebrow" defaultText="Tell Us Your Application" as="p" className="text-primary-600 text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase font-body mb-2 sm:mb-3" />
 <EditableText id="home_cta_title" defaultText="Not Sure Which Product Fits Your Formulation?" as="h2" className="font-heading text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-3 leading-[1.15]" />
 <EditableText id="home_cta_desc" defaultText="Tell us what you make — we'll tell you exactly which product and grade suits you, with a sample and a quote usually within 24 hours." as="p" className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-5 font-body leading-relaxed" />

 {/* Trust indicators */}
 <EditableList
 id="home_cta_trust_indicators"
 listContainerClass="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
 defaultItems={[
 { id: '1', icon: '✅', text: 'COA with Every Shipment' },
 { id: '2', icon: '🌍', text: 'Global Shipping' },
 { id: '3', icon: '🔬', text: 'Pre-Shipment Samples' },
 { id: '4', icon: '📦', text: 'Custom Packaging' },
 ]}
 newItemTemplate={{ icon: '⭐', text: 'New Trust Point' }}
 renderItem={(item) => (
 <div key={item.id} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-xs uppercase tracking-widest font-body w-full">
 <span className="text-lg opacity-90"><EditableText id={`home_cta_trust_icon_${item.id}`} defaultText={item.icon} as="span" /></span>
 <EditableText id={`home_cta_trust_text_${item.id}`} defaultText={item.text} as="span" className="leading-snug flex-1" />
 </div>
 )}
 />
 </motion.div>

 {/* Right Side: Form Section */}
 <motion.div 
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.2, duration: 0.6 }}
 className="lg:w-1/2 w-full"
 >
  {submitted ? (
    <div className="w-full bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-3xl mb-4">
        ✓
      </div>
      <h3 className="font-heading text-2xl text-gray-900 dark:text-white mb-2 font-bold">Request Sent!</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">We've received your application details and will get back to you with a sample and quote shortly.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-700 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-2">Full Name</label>
          <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow text-gray-900 dark:text-white" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-2">Email Address</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow text-gray-900 dark:text-white" placeholder="john@company.com" />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-2">Company Name</label>
          <input required type="text" name="company" value={form.company} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow text-gray-900 dark:text-white" placeholder="Company Ltd." />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-2">Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow text-gray-900 dark:text-white" placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-2">Application / Product Requirement</label>
        <textarea required name="message" value={form.message} onChange={handleChange} rows="4" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow resize-none text-gray-900 dark:text-white" placeholder="Tell us about your formulation, end-use, required specs, and estimated volume..."></textarea>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-70 text-white rounded-xl px-6 py-4 transition-colors duration-300 text-sm uppercase tracking-widest shadow-md hover:shadow-lg">
        {loading ? 'Sending...' : 'Request Sample & Quote'}
      </button>
    </form>
  )}
 </motion.div>

 </div>
 </div>
 </section>
 );
};

export default ContactCTA;
