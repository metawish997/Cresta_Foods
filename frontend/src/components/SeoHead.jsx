// frontend/src/components/SeoHead.jsx
// Injects dynamic SEO meta tags into <head> using the SEO data from the backend.
// Usage: <SeoHead slug="home" /> or <SeoHead slug="products/food-grade-guar-gum-powder" />
import { useEffect } from 'react';
import { usePageContent } from '../context/PageContentContext';

const DEFAULT_SEO = {
  title: 'Cresta Foods | Premium Guar Gum & Dehydrated Onion Exporters from India',
  description: "Cresta Foods is India's leading exporter of premium Guar Gum Powder and Dehydrated Onion products. FSSAI, ISO 22000, HACCP, Halal, Kosher certified.",
  keywords: 'guar gum exporter India, dehydrated onion exporter India, Cresta Foods',
};

const SeoHead = ({ slug, fallbackTitle, fallbackDescription, fallbackKeywords }) => {
  const { getSeoForPage } = usePageContent();
  const seo = getSeoForPage(slug);

  const title = seo?.title || fallbackTitle || DEFAULT_SEO.title;
  const description = seo?.description || fallbackDescription || DEFAULT_SEO.description;
  const keywords = seo?.keywords || fallbackKeywords || DEFAULT_SEO.keywords;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to upsert a <meta> tag by name or property
    const setMeta = (attr, attrValue, content) => {
      let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Cresta Foods');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Cleanup: restore default title on unmount
    return () => {
      document.title = DEFAULT_SEO.title;
    };
  }, [title, description, keywords]);

  // Also render a <title> tag inline (helps with SSR/initial paint)
  return <title>{title}</title>;
};

export default SeoHead;
