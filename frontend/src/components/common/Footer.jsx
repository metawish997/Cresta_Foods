import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaTiktok, FaPinterest
} from 'react-icons/fa6';
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { HiArrowUp } from 'react-icons/hi';
import logoImg from '../../assets/images/logo/full-logo.png';
import EditableText from '../EditableText';
import EditableList from '../EditableList';
import { useAuth } from '../../context/AuthContext';

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest
};

const footerLinks = {
  company: [
    { label: 'Why Us', to: '/about' },
    { label: 'Global Exports', to: '/global-exports' },
    // { label: 'Application Platforms', to: '/application-platforms' },
    { label: 'Quality Assurance', to: '/global-exports#quality' },
    { label: 'Packaging & Shipping', to: '/global-exports#packaging' },
  ],
  products: [
    {
      label: 'Hydrocolloids & Thickener (Guar)',
      subDropdown: [
        { label: 'Food grade guar gum powder', to: '/products/food-grade-guar-gum-powder' },
        { label: 'Industrial grade gum powder', to: '/products/industrial-grade-guar-gum-powder' },
        { label: 'Guar Meal (Korma & Churi)', to: '/products/guar-meal-korma-roasted' },
      ],
    },
    {
      label: 'Dehydrated Onions',
      subDropdown: [
        { label: 'Dehydrated White Onion', to: '/products/dehydrated-white-onion-powder' },
        { label: 'Dehydrated Red & Pink Onion', to: '/products/red-onion-powder' },
      ],
    },
  ],
  quickLinks: [
    { label: 'Home', to: '/' },
    { label: 'Our Products', to: '/products' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Get In Touch', to: '/contact' },
  ],
};

const socials = [
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://twitter.com', label: 'X (Twitter)' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const location = useLocation();
  const { user } = useAuth();
  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">

      {/* Main footer */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">

            {/* Logo Link wrapper made relative */}
            <Link to="/" className="relative inline-flex items-center mb-6 sm:mb-8 group">
              <img src={logoImg} alt="Cresta Foods Logo" className="h-16 sm:h-20 w-auto object-contain" />

              {/* Tagline using exact absolute constraints with responsive mobile override */}
              <EditableText
                id="footer_tagline"
                defaultText="sourcing excellence delivered globally."
                as="span"
                className="absolute bottom-[18px] left-[53px] lg:bottom-[17px] lg:left-auto lg:right-[-18px] text-[7px] lg:text-[8.5px] font-semibold tracking-wider whitespace-nowrap"
                style={{ color: '#3A6B2F' }}
              />
            </Link>

            <EditableText 
              id="footer_description"
              defaultText="Exporters of Guar Gum Hydrocolloids and Dehydrated Onion Products from India. APEDA registered, sourcing from FSSC 22000 certified mills. Exporting globally from Mundra Port."
              className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5 sm:mb-6 max-w-sm block"
            />

            {/* Trust badges */}
            <EditableList
              id="footer_certificates_list"
              listContainerClass="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6"
              defaultItems={[
                { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }
              ]}
              newItemTemplate={{ id: Date.now().toString() }}
              renderItem={(cert, idx) => (
                <span className="px-2 py-1 sm:px-2.5 sm:py-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-[11px] sm:text-xs uppercase font-semibold tracking-wider rounded-md">
                  <EditableText id={`footer_cert_text_${cert.id}`} defaultText={['FSSAI', 'APEDA', 'ISO 22000', 'Halal', 'Kosher'][idx] || 'CERT'} as="span" />
                </span>
              )}
            />

            {/* Social icons */}
            <EditableList
              id="footer_social_list"
              listContainerClass="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              defaultItems={[
                { id: '1', icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
                { id: '2', icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
                { id: '3', icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
                { id: '4', icon: 'twitter', href: 'https://twitter.com', label: 'X (Twitter)' },
                { id: '5', icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
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
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 hover:bg-primary-50 flex items-center justify-center text-gray-400 hover:text-primary-700 transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                    {isEditMode && (
                      <div className="absolute top-10 left-0 bg-white dark:bg-gray-800 p-2 shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg z-50 hidden group-hover/social:flex flex-col gap-2 min-w-[150px]">
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
                          className="text-xs p-1 border rounded"
                        />
                      </div>
                    )}
                  </div>
                );
              }}
            />

            {/* Newsletter */}
            <div>
              <EditableText id="footer_newsletter_title" defaultText="Subscribe to our Newsletter" as="p" className="text-[11px] sm:text-[13px] font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 uppercase tracking-wider" />
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-1.5 sm:py-2 text-[13px] sm:text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-primary-300 transition-colors"
                />
                <button className="px-4 sm:px-5 py-1.5 sm:py-2 bg-primary-700 hover:bg-primary-800 text-white text-[11px] sm:text-[13px] font-semibold rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-[11px] sm:text-[13px] uppercase tracking-widest mb-3 sm:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 hover:text-primary-700 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-primary-600 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="col-span-1">
            <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-[11px] sm:text-[13px] uppercase tracking-widest mb-3 sm:mb-5">
              Our Products
            </h4>
            <div className="space-y-4 sm:space-y-5">
              {footerLinks.products.map((category) => (
                <div key={category.label}>
                  <div className="text-[13px] sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {category.label}
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {category.subDropdown.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 hover:text-primary-700 transition-colors flex items-center gap-1.5 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-primary-600 transition-all duration-200" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Sourcing */}
          <div className="col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 lg:gap-x-0">
              {/* Contact Us */}
              <div>
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-[11px] sm:text-[13px] uppercase tracking-widest mb-3 sm:mb-5">
                  Contact Us
                </h4>
                <div className="space-y-2.5 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <HiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <EditableText id="footer_address" defaultText="Cresta Foods, Exporting from Mundra Port" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 leading-tight sm:leading-relaxed block w-full" />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <HiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                    <EditableText id="footer_phone" defaultText="+91 12345 67890" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 hover:text-primary-700 transition-colors block w-full" />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <HiEnvelope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                    <EditableText id="footer_email" defaultText="info@crestafoods.com" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 hover:text-primary-700 transition-colors block w-full" />
                  </div>
                </div>
              </div>

              {/* Sourcing regions */}
              <div className="mt-0 lg:mt-6">
                <h4 className="font-heading font-semibold text-gray-900 dark:text-white text-[11px] sm:text-[13px] uppercase tracking-widest mb-3 sm:mb-5 lg:mb-2 lg:text-[9px] lg:text-gray-500 lg:dark:text-gray-400 lg:font-semibold lg:tracking-wider">
                  Sourcing Regions
                </h4>
                <div className="space-y-1.5 lg:space-y-1">
                  <EditableText id="footer_region_1" defaultText="🌾 Guar Gum — Rajasthan" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 block w-full" />
                  <EditableText id="footer_region_2" defaultText="🧅 Onions — Mahuva" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 block w-full" />
                  <EditableText id="footer_region_3" defaultText="🚢 Port — Mundra" className="text-[11px] sm:text-sm md:text-[15px] text-gray-500 dark:text-gray-400 block w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[9px] sm:text-[13px] sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} Cresta Foods. All rights reserved. | Premium Guar Gum & Dehydrated Onion Exporters
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/contact" className="text-[9px] sm:text-[13px] sm:text-sm text-gray-500 dark:text-gray-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-[9px] sm:text-[13px] sm:text-sm text-gray-500 dark:text-gray-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-700 hover:bg-primary-600 flex items-center justify-center text-white transition-colors mt-2 sm:mt-0"
            aria-label="Back to top"
          >
            <HiArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;