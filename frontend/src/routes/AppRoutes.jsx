import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import WhyUs from '../pages/WhyUs';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import GlobalExports from '../pages/GlobalExports';
import ApplicationPlatforms from '../pages/ApplicationPlatforms';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Media from '../pages/Media';
import Blogs from '../pages/Blogs';
import BlogDetails from '../pages/BlogDetails';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy load admin pages for performance
const Login = lazy(() => import('../pages/Login'));
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const HeroSlidesManager = lazy(() => import('../pages/admin/HeroSlidesManager'));
const ProductsManager = lazy(() => import('../pages/admin/ProductsManager'));
const ProductEditor = lazy(() => import('../pages/admin/ProductEditor'));
const BlogsManager = lazy(() => import('../pages/admin/BlogsManager'));
const BlogEditor = lazy(() => import('../pages/admin/BlogEditor'));
const InquiriesManager = lazy(() => import('../pages/admin/InquiriesManager'));
const FaqManager = lazy(() => import('../pages/admin/FaqManager'));
const SeoManager = lazy(() => import('../pages/admin/SeoManager'));
const StatisticsManager = lazy(() => import('../pages/admin/StatisticsManager'));
const ClientsManager = lazy(() => import('../pages/admin/ClientsManager'));
const UserManagement = lazy(() => import('../pages/admin/UserManagement'));
const RolesManagement = lazy(() => import('../pages/admin/RolesManagement'));
const LiveChat = lazy(() => import('../pages/admin/LiveChat'));
const PagesManager = lazy(() => import('../pages/admin/PagesManager'));
const CertificationsManager = lazy(() => import('../pages/admin/CertificationsManager'));
const MediaManager = lazy(() => import('../pages/admin/MediaManager'));

// Admin loading fallback
const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-primary-700 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<WhyUs />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetails />} />
        <Route path="global-exports" element={<GlobalExports />} />
        <Route path="application-platforms" element={<ApplicationPlatforms />} />
        <Route path="contact" element={<Contact />} />
        <Route path="manufacturing-excellence" element={<GlobalExports />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogDetails />} />
        <Route path="media" element={<Media />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ── Login ── */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<AdminLoader />}>
            <Login />
          </Suspense>
        }
      />

      {/* ── Admin Routes ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute permission="view_dashboard">
            <Suspense fallback={<AdminLoader />}>
              <AdminLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route index element={<Suspense fallback={<AdminLoader />}><Dashboard /></Suspense>} />
        <Route path="dashboard" element={<Suspense fallback={<AdminLoader />}><Dashboard /></Suspense>} />
        <Route path="hero-slides" element={<ProtectedRoute permission="manage_hero_slides"><Suspense fallback={<AdminLoader />}><HeroSlidesManager /></Suspense></ProtectedRoute>} />
        <Route path="products" element={<ProtectedRoute permission="manage_products"><Suspense fallback={<AdminLoader />}><ProductsManager /></Suspense></ProtectedRoute>} />
        <Route path="products/create" element={<ProtectedRoute permission="manage_products"><Suspense fallback={<AdminLoader />}><ProductEditor /></Suspense></ProtectedRoute>} />
        <Route path="products/edit/:id" element={<ProtectedRoute permission="manage_products"><Suspense fallback={<AdminLoader />}><ProductEditor /></Suspense></ProtectedRoute>} />
        <Route path="blogs" element={<ProtectedRoute permission="manage_blogs"><Suspense fallback={<AdminLoader />}><BlogsManager /></Suspense></ProtectedRoute>} />
        <Route path="blogs/create" element={<ProtectedRoute permission="manage_blogs"><Suspense fallback={<AdminLoader />}><BlogEditor /></Suspense></ProtectedRoute>} />
        <Route path="blogs/edit/:id" element={<ProtectedRoute permission="manage_blogs"><Suspense fallback={<AdminLoader />}><BlogEditor /></Suspense></ProtectedRoute>} />
        <Route path="inquiries" element={<ProtectedRoute permission="manage_inquiries"><Suspense fallback={<AdminLoader />}><InquiriesManager /></Suspense></ProtectedRoute>} />
        <Route path="faqs" element={<ProtectedRoute permission="manage_faqs"><Suspense fallback={<AdminLoader />}><FaqManager /></Suspense></ProtectedRoute>} />
        <Route path="seo" element={<ProtectedRoute permission="manage_seo"><Suspense fallback={<AdminLoader />}><SeoManager /></Suspense></ProtectedRoute>} />
        <Route path="statistics" element={<ProtectedRoute permission="manage_statistics"><Suspense fallback={<AdminLoader />}><StatisticsManager /></Suspense></ProtectedRoute>} />
        <Route path="clients" element={<ProtectedRoute permission="manage_clients"><Suspense fallback={<AdminLoader />}><ClientsManager /></Suspense></ProtectedRoute>} />
        <Route path="users" element={<ProtectedRoute permission="manage_users"><Suspense fallback={<AdminLoader />}><UserManagement /></Suspense></ProtectedRoute>} />
        <Route path="roles" element={<ProtectedRoute permission="manage_roles"><Suspense fallback={<AdminLoader />}><RolesManagement /></Suspense></ProtectedRoute>} />
        <Route path="live-chat" element={<ProtectedRoute permission="manage_live_chat"><Suspense fallback={<AdminLoader />}><LiveChat /></Suspense></ProtectedRoute>} />
        <Route path="certifications" element={<ProtectedRoute permission="manage_clients"><Suspense fallback={<AdminLoader />}><CertificationsManager /></Suspense></ProtectedRoute>} />
        <Route path="media" element={<Suspense fallback={<AdminLoader />}><MediaManager /></Suspense>} />
        <Route path="pages" element={<Suspense fallback={<AdminLoader />}><PagesManager /></Suspense>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
