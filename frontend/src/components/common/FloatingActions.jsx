import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiDocumentArrowDown } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const FloatingActions = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-40 flex flex-col gap-4 items-end">
      {/* Brochure Download */}
      <a
        href="/api/brochure/download"
        download
        className="group flex items-center bg-[#D68A1E] text-white rounded-full shadow-2xl shadow-[#D68A1E]/40 hover:bg-[#C27C1A] transition-all duration-300 overflow-hidden w-12 h-12 hover:w-[155px] cursor-pointer outline-none border-none"
        title="Download Application Platforms PDF"
        aria-label="Download Brochure"
      >
        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <HiDocumentArrowDown className="w-6 h-6" />
        </div>
        <span className="text-sm font-bold tracking-wide whitespace-nowrap pr-4">
          Download
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/911234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-[#25D366] text-white rounded-full shadow-2xl shadow-[#25D366]/40 hover:bg-[#20BA5A] transition-all duration-300 overflow-hidden w-12 h-12 hover:w-[110px]"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <FaWhatsapp className="w-6 h-6" />
        </div>
        <span className="text-sm font-bold tracking-wide whitespace-nowrap pr-4">
          Chat
        </span>
      </a>
    </div>
  );
};

export default FloatingActions;
