import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown, HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import logoImg from '../../assets/images/logo/full-logo.png';
import EditableText from '../EditableText';

const navLinks = [
  {
    label: 'Why Us',
    to: '/about',
  },
  {
    label: 'Products',
    to: '/products',
    dropdown: [
      {
        label: 'Hydrocolloids and Thickener (Guar)',
        to: '/products/guar-gums',
        subDropdown: [
          { label: 'Food grade guar gum powder', to: '/products/food-grade-guar-gum-powder' },
          { label: 'Industrial grade gum powder', to: '/products/industrial-grade-guar-gum-powder' },
          { label: 'Guar  Meal(Korma and Guar Churi)', to: '/products/guar-meal-korma-roasted' },
        ],
      },
      {
        label: 'Dehydrated Onions',
        to: '/products/animal-feed',
        subDropdown: [
          { label: 'Dehydrated White Onion', to: '/products/dehydrated-white-onion-powder' },
          { label: 'Dehydrated Red and Pink Onion', to: '/products/red-onion-powder' },
          { label: 'View All Products', to: '/products' },
        ],
      },
    ],
  },
  {
    label: 'Blogs',
    to: '/blogs',
  },
];

const navLinksRight = [
  { label: 'Global Exports', to: '/manufacturing-excellence' },
  { label: 'Application', to: '/application-platforms' },
  { label: 'Get In Touch', to: '/contact' },
];

const DropdownMenu = ({ items, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="dropdown-menu-wrapper" style={{ width: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="bg-white w-[42rem] dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-[100]"
          >
            <div className="grid grid-cols-2 gap-0 min-w-[400px]">
              {items.map((item) => (
                <div key={item.label} className="border-r border-gray-100 dark:border-gray-700 last:border-r-0">
                  <div className="flex items-center px-4 py-2.5 text-sm font-semibold text-green-600 dark:text-green-400">
                    <HiChevronDown className="w-4 h-4 mr-2 transform rotate-270" />
                    {item.label}
                  </div>
                  {item.subDropdown && item.subDropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.to}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors whitespace-nowrap"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const NavItem = ({ link, scrolled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const linkClasses = clsx(
    'relative font-semibold text-xs uppercase tracking-widest transition-colors duration-200 py-2 flex items-center gap-1',
    'text-gray-600 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-400',
    isActive && 'text-primary-700 dark:text-primary-400'
  );

  if (!link.dropdown) {
    return (
      <li className="relative group">
        <NavLink to={link.to} className={linkClasses}>
          {link.label}
          {isActive && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-primary-700 dark:bg-primary-400" />
          )}
        </NavLink>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative group" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className={linkClasses}>
        <Link to={link.to} onClick={() => setOpen(false)} className="hover:opacity-80 transition-opacity">
          {link.label}
        </Link>
        <button onClick={() => setOpen((p) => !p)} className="p-0.5 -mr-0.5">
          <HiChevronDown className={clsx('w-4 h-4 transition-transform duration-200', open && 'rotate-180')} />
        </button>
        {isActive && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-primary-700 dark:bg-primary-400" />
        )}
      </div>
      <DropdownMenu items={link.dropdown} isOpen={open} />
    </li>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileExpandedSub, setMobileExpandedSub] = useState(null);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 py-3'
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">

            {/* Logo & Tagline Desktop */}
            <Link
              to="/"
              className="relative flex items-center justify-start flex-shrink-0 lg:mr-8 pb-3.5"
            >
              <img src={logoImg} alt="Cresta Foods Logo" className="w-[10rem] sm:w-[10rem] lg:w-[13rem] h-auto object-contain transition-all" />
              {/* <span
                className="absolute bottom-[27px] right-[-35px] text-[7px] lg:text-[8.5px] font-semibold tracking-wider whitespace-nowrap"
                style={{ color: '#c58a2b' }}
              >
                sourcing excellence delivered globally.
              </span> */}
              <span className="absolute bottom-[20px] left-[33px] lg:bottom-[23px] lg:left-auto lg:right-[-35px]">
                <EditableText
                  id="header_tagline"
                  defaultText="sourcing excellence delivered globally."
                  as="span"
                  className="text-[8px] lg:text-[10px] font-semibold tracking-wider whitespace-nowrap"
                  style={{ color: '#3A6B2F' }}
                />
              </span>
            </Link>

            {/* Nav - Right desktop */}
            <div className="hidden lg:flex items-center justify-end flex-grow gap-6 xl:gap-8">
              <ul className="flex items-center gap-6 xl:gap-8">
                {navLinks.map((link) => (
                  <NavItem key={link.label} link={link} scrolled={scrolled} />
                ))}
                {navLinksRight.map((link) => (
                  <NavItem key={link.label} link={link} scrolled={scrolled} />
                ))}
              </ul>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3 ml-auto">
              <button
                className={clsx(
                  "p-2 rounded-lg transition-colors",
                  "text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-400"
                )}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <HiMenuAlt3 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[200] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-gray-900 z-[200] lg:hidden shadow-2xl flex flex-col rounded-b-2xl"
            >
              {/* Mobile Header Menu with Tagline */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <Link to="/" className="relative flex items-center pb-3" onClick={() => setMobileOpen(false)}>
                  <img src={logoImg} alt="Cresta Foods Logo" className="h-12 sm:h-14 w-auto object-contain" />
                  <span
                    className="absolute bottom-0 right-[3px] text-[7.5px] sm:text-[8.5px] font-semibold tracking-wider whitespace-nowrap"
                    style={{ color: '#c58a2b' }}
                  >
                    sourcing excellence delivered globally.
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-500 hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-500 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-5">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 items-start">
                  {[
                    ...navLinks.filter(l => l.label !== 'Products'),
                    ...navLinksRight.filter(l => l.label !== 'Get In Touch'),
                    navLinks.find(l => l.label === 'Products'),
                    navLinksRight.find(l => l.label === 'Get In Touch')
                  ].filter(Boolean).map((link) => (
                    <div key={link.label} className="border-b border-gray-50 dark:border-gray-800 last:border-0 pb-1">
                      {link.dropdown ? (
                        <>
                          <div className="w-full flex items-center justify-between py-1.5 text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                            <Link
                              to={link.to}
                              onClick={() => setMobileOpen(false)}
                              className="flex-grow text-left py-1 hover:text-primary-700 dark:hover:text-primary-400"
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={() =>
                                setMobileExpanded((p) => (p === link.label ? null : link.label))
                              }
                              className="p-2 -mr-2 text-gray-500 dark:text-gray-400"
                            >
                              <HiChevronDown
                                className={clsx(
                                  'w-4 h-4 transition-transform',
                                  mobileExpanded === link.label && 'rotate-180'
                                )}
                              />
                            </button>
                          </div>
                          <AnimatePresence>
                            {mobileExpanded === link.label && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 pt-1 space-y-3">
                                  {link.dropdown.map((sub) => (
                                    <div key={sub.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                                      {sub.subDropdown ? (
                                        <>
                                          <button
                                            onClick={() => setMobileExpandedSub(p => p === sub.label ? null : sub.label)}
                                            className="w-full flex items-center justify-between text-xs font-semibold text-green-600 dark:text-green-400"
                                          >
                                            <span className="flex items-center">
                                              <HiChevronDown className={clsx("w-3.5 h-3.5 mr-1.5 transition-transform", mobileExpandedSub === sub.label ? "rotate-0" : "-rotate-90")} />
                                              {sub.label}
                                            </span>
                                          </button>
                                          <AnimatePresence>
                                            {mobileExpandedSub === sub.label && (
                                              <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="overflow-hidden"
                                              >
                                                <div className="pl-5 space-y-2.5 pt-2.5">
                                                  {sub.subDropdown.map((subItem) => (
                                                    <Link
                                                      key={subItem.label}
                                                      to={subItem.to}
                                                      onClick={() => setMobileOpen(false)}
                                                      className="block text-[11px] text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                                                    >
                                                      {subItem.label}
                                                    </Link>
                                                  ))}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </>
                                      ) : (
                                        <Link
                                          to={sub.to}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center text-xs font-semibold text-green-600 dark:text-green-400"
                                        >
                                          <HiChevronDown className="w-3.5 h-3.5 mr-1.5 transform -rotate-90" />
                                          {sub.label}
                                        </Link>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2.5 text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 bg-primary-700 text-white rounded-xl text-sm font-semibold hover:bg-primary-800 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;