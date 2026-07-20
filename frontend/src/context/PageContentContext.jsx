// frontend/src/context/PageContentContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const PageContentContext = createContext(null);

export const PageContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    heroSlides: [],
    statistics: [],
    faqs: [],
    seoSettings: [],
    clients: [],
    products: [],
    blogs: [],
    certifications: [],
    contentMap: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlobalContent = async () => {
      try {
        const [slides, stats, faqs, seo, clients, products, blogs, certs, pageContent] = await Promise.all([
          api.get('/hero-slides'),
          api.get('/statistics'),
          api.get('/faqs'),
          api.get('/seo'),
          api.get('/clients'),
          api.get('/products'),
          api.get('/blogs'),
          api.get('/certifications').catch(() => ({ data: [] })),
          api.get('/page-content')
        ]);

        setContent({
          heroSlides: slides.data,
          statistics: stats.data,
          faqs: faqs.data,
          seoSettings: seo.data,
          clients: clients.data,
          products: products.data,
          blogs: blogs.data,
          certifications: certs.data,
          contentMap: pageContent.data,
        });
      } catch (err) {
        console.error('Failed to load global content:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalContent();
  }, []);

  const getSeoForPage = (slug) => {
    return content.seoSettings.find((s) => s.page_slug === slug);
  };

  const updateContent = (key, value) => {
    setContent((prev) => ({
      ...prev,
      contentMap: {
        ...prev.contentMap,
        [key]: value,
      },
    }));
  };

  return (
    <PageContentContext.Provider value={{ ...content, loading, error, getSeoForPage, updateContent }}>
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => useContext(PageContentContext);
