import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane, HiChevronDown,
} from 'react-icons/hi2';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaTiktok, FaPinterest
} from 'react-icons/fa6';
import EditableText from '../components/EditableText';
import EditableList from '../components/EditableList';
import { usePageContent } from '../context/PageContentContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import DynamicSections from '../components/DynamicSections';
import api from '../utils/api';
import SeoHead from '../components/SeoHead';

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest
};

const initialFaqs = [
  {
    q: 'What is the minimum order quantity for Guar Gum or Dehydrated Onions?',
    a: 'Our standard minimum order quantity is 1 full container (FCL 20ft). For first-time buyers, we can discuss LCL options. Contact us for specific requirements.',
  },
  {
    q: 'Do you offer product samples before committing to a full order?',
    a: 'Yes. We provide pre-shipment product samples for qualified buyers. Please share your specification sheet or intended application and we will dispatch a sample promptly.',
  },
  {
    q: 'What certifications do your Guar Gum and Onion products carry?',
    a: 'Our supply chain partners hold FSSAI, FSSC 22000, ISO 22000, HACCP, APEDA, Halal, Kosher, BRCGS, and GMP certifications. Full COA from NABL-accredited labs is provided with every shipment.',
  },
  {
    q: 'What are the lead times for export orders?',
    a: 'Standard lead time is 2–4 weeks from order confirmation and advance payment receipt. We will provide production and dispatch updates in real time.',
  },
  {
    q: 'Can you provide ETO treated or Steam Sterilized onion products?',
    a: 'Yes. ETO Treated and Steam Sterilized products are available upon request for markets requiring specific microbial specifications. Please mention this requirement at the time of inquiry.',
  },
  {
    q: 'What incoterms and payment terms do you offer?',
    a: 'We offer FOB (Mundra Port), CIF, and CFR. Payment terms are typically LC at sight or TT advance. We are open to discussing terms based on order size and business relationship.',
  },
];

const FaqItem = ({ faq, idx }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none dark:border-gray-700 rounded-xl overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 bg-white dark:bg-gray-800">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 text-left"
        id={`faq-${idx}`}
      >
        <span className="font-heading font-bold text-gray-800 dark:text-gray-100 text-[12px] sm:text-[14px] uppercase tracking-widest pr-3 sm:pr-4">{faq.question}</span>
        <HiChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-primary-600' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 sm:px-6 sm:pb-6 sm:pt-2">
          <p className="text-[12px] sm:text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const { faqs } = usePageContent();
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const location = useLocation();
  const { user } = useAuth();
  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inquiries', form);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      <SeoHead slug="contact" />
      {/* Hero */}
      <section className="relative h-48 sm:h-[40vh] min-h-[250px] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40 dark:bg-gray-900/60" />
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 sm:pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-widest text-gray-300 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-gray-500">/</span>
              <EditableText id="contact_breadcrumb" defaultText="Contact" as="span" className="text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-10 pb-4 sm:pb-6 bg-gray-50 dark:bg-gray-900">
        {/* Background glow effects for dark mode */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none hidden dark:block" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
            {/* Company Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none p-5 sm:p-6 lg:p-8 flex-grow flex flex-col justify-between">
                <EditableText id="contact_reach_label" defaultText="Reach Out" as="p" className="text-primary-600 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase mb-3 block" />
                <EditableText
                  id="contact_info_title"
                  defaultText="Contact Information"
                  as="h1"
                  className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white uppercase tracking-widest mb-6 sm:mb-8 leading-snug"
                />
                <div className="divide-y divide-gray-100 dark:divide-gray-700/50 mb-8 sm:mb-10">
                  <EditableList
                    id="contact_addresses_list"
                    listContainerClass="space-y-5 sm:space-y-6 pb-5 sm:pb-6"
                    defaultItems={[
                      { id: '1', title: 'Address', value: 'Cresta Foods, India Exporting from Mundra Port, Gujarat. Sourcing from Rajasthan (Guar Gum) and Mahuva, Gujarat (Dehydrated Onions).' }
                    ]}
                    newItemTemplate={{ id: Date.now().toString(), title: 'New Office', value: 'New Address Location' }}
                    renderItem={(item) => (
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <HiMapPin className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <EditableText id={`contact_addr_label_${item.id}`} defaultText={item.title} as="p" className="text-[12px] sm:text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2 block" />
                          <EditableText
                            id={`contact_addr_value_${item.id}`}
                            defaultText={item.value}
                            as="p"
                            className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed block"
                          />
                        </div>
                      </div>
                    )}
                  />

                  <div className="flex items-start gap-3 sm:gap-4 py-5 sm:py-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <HiPhone className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <EditableText id="contact_phone_label" defaultText="Phone" as="p" className="text-[12px] sm:text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2 block" />
                      <EditableText id="contact_phone_value" defaultText="+91 12345 67890" as="p" className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-300 block" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 pt-5 sm:pt-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <HiEnvelope className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <EditableText id="contact_email_label" defaultText="Email" as="p" className="text-[12px] sm:text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-2 block" />
                      <EditableText id="contact_email_value" defaultText="info@crestafoods.com" as="p" className="text-[13px] sm:text-[14px] text-gray-600 dark:text-gray-300 block" />
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="rounded-xl overflow-hidden h-32 sm:h-48 relative grayscale hover:grayscale-0 transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                    alt="Map location"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-[12px] sm:text-[13px] uppercase tracking-widest font-bold shadow-sm">
                      <EditableText id="contact_map_label" defaultText="📍 Mundra Port, Gujarat" as="span" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-col"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 lg:p-12 border border-transparent dark:border-gray-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none flex-grow">
                <EditableText id="contact_form_label" defaultText="Inquiries" as="p" className="text-primary-600 text-[12px] sm:text-[13px] font-bold tracking-widest uppercase mb-3 block" />
                <EditableText
                  id="contact_form_title"
                  defaultText="Send Us a Message"
                  as="h2"
                  className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-white uppercase tracking-widest mb-6 sm:mb-8 leading-snug"
                />
                <EditableText
                  id="contact_form_desc"
                  defaultText="Fill out the form below and our team will get back to you within 24 hours."
                  as="p"
                  className="text-gray-600 dark:text-gray-400 text-[13px] sm:text-[14px] leading-relaxed mb-8 sm:mb-10 max-w-lg block"
                />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 sm:py-16"
                  >
                    <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 opacity-80">✅</div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-800 dark:text-white uppercase tracking-widest mb-2 sm:mb-3">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-[13px] sm:text-[14px] leading-relaxed">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', phone: '', message: '' }); }}
                      className="text-primary-700 font-bold text-[12px] sm:text-[13px] uppercase tracking-widest hover:text-primary-800 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith', required: true },
                        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com', required: true },
                        { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your Company Ltd.', required: false },
                        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 234 567 890', required: false },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-[12px] sm:text-[13px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2">
                            {field.label} {field.required && <span className="text-primary-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-[13px] sm:text-[14px] text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-300 focus:bg-white transition-all shadow-sm inset-shadow-sm"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[12px] sm:text-[13px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2">
                        Message <span className="text-primary-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your requirements..."
                        required
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-[13px] sm:text-[14px] text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-300 focus:bg-white transition-all shadow-sm inset-shadow-sm resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-full transition-all shadow-md shadow-primary-700/20 text-[12px] sm:text-[13px] uppercase tracking-widest"
                      >
                        <HiPaperAirplane className="w-3.5 h-3.5" />
                        Send Message
                      </motion.button>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2 hidden sm:block">Follow Us</span>
                        <EditableList
                          id="contact_social_list"
                          listContainerClass="flex items-center gap-3"
                          defaultItems={[
                            { id: '1', icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
                            { id: '2', icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
                            { id: '3', icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
                            { id: '4', icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
                          ]}
                          newItemTemplate={{ id: Date.now().toString(), icon: 'facebook', href: 'https://...', label: 'New Social' }}
                          renderItem={(social, idx, updateItem) => {
                            const Icon = iconMap[social.icon] || FaFacebookF;
                            return (
                              <div className="relative group/social flex items-center">
                                <a
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={social.label}
                                  className="w-8 h-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 text-gray-500 dark:text-gray-400 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                </a>
                                {isEditMode && (
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-50 invisible opacity-0 group-hover/social:visible group-hover/social:opacity-100 transition-all duration-300 [transition-delay:1s] group-hover/social:[transition-delay:0s]">
                                    <div className="bg-white dark:bg-gray-800 p-2 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col gap-2 min-w-[150px]">
                                      <select
                                        value={social.icon}
                                        onChange={e => updateItem({ icon: e.target.value })}
                                        className="text-xs p-1 border rounded"
                                      >
                                        {Object.keys(iconMap).map(k => <option key={k} value={k}>{k}</option>)}
                                      </select>
                                      <input
                                        type="text"
                                        value={social.href}
                                        onChange={e => updateItem({ href: e.target.value })}
                                        placeholder="Link URL"
                                        className="text-xs p-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <DynamicSections slotId="contact-main" />

      {/* FAQ */}
      <section className="pt-6 sm:pt-10 pb-8 sm:pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <EditableText
              id="contact_faq_title"
              defaultText="Frequently Asked Questions"
              as="h2"
              className="font-heading font-bold text-xl md:text-3xl text-gray-800 dark:text-white uppercase tracking-widest mb-3 sm:mb-4"
            />
            <EditableText
              id="contact_faq_desc"
              defaultText="Everything you need to know about our products and services."
              as="p"
              className="text-gray-600 dark:text-gray-400 text-[12px] sm:text-[14px] leading-relaxed block"
            />
          </div>
          <div className="space-y-4">
            {faqs?.map((faq, i) => (
              <FaqItem key={faq._id || i} faq={faq} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <DynamicSections slotId="contact-faq" />
    </>
  );
};

export default Contact;
