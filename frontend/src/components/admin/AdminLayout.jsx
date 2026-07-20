// frontend/src/components/admin/AdminLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../../pages/admin/Admin.css';

// Derive a readable page title from the current URL path
const getPageTitle = (pathname) => {
  const map = {
    '/admin': 'Dashboard',
    '/admin/dashboard': 'Dashboard',
    '/admin/hero-slides': 'Hero Slides',
    '/admin/products': 'Products',
    '/admin/products/create': 'Create Product',
    '/admin/blogs': 'Blogs',
    '/admin/blogs/create': 'Create Blog',
    '/admin/inquiries': 'Inquiries',
    '/admin/faqs': 'FAQ Manager',
    '/admin/seo': 'SEO Manager',
    '/admin/statistics': 'Statistics',
    '/admin/clients': 'Clients',
    '/admin/users': 'User Management',
    '/admin/roles': 'Roles & Permissions',
    '/admin/live-chat': 'Live Chat',
    '/admin/pages': 'Pages',
    '/admin/certifications': 'Certifications',
  };
  if (pathname.includes('/edit/')) return pathname.includes('products') ? 'Edit Product' : 'Edit Blog';
  return map[pathname] || 'Admin';
};

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen((p) => !p);
    } else {
      setDesktopCollapsed((p) => !p);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onClose={() => setMobileOpen(false)}
      />

      <div className={`admin-main ${desktopCollapsed ? 'desktop-collapsed' : ''}`}>
        <AdminHeader
          onToggleSidebar={handleToggleSidebar}
          pageTitle={getPageTitle(location.pathname)}
          desktopCollapsed={desktopCollapsed}
        />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
