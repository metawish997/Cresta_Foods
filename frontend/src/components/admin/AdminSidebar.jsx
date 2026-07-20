// frontend/src/components/admin/AdminSidebar.jsx
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';
import logoImg from '../../assets/images/logo/full-logo.png';

const navSections = [
  {
    label: 'Overview',
    items: [
      { icon: '📊', label: 'Dashboard', to: '/admin/dashboard', permission: 'view_dashboard' },
    ],
  },
  {
    label: 'Content',
    items: [
      { icon: '🖼️', label: 'Hero Slides', to: '/admin/hero-slides', permission: 'manage_hero_slides' },
      { icon: '🌿', label: 'Products', to: '/admin/products', permission: 'manage_products' },
      { icon: '✍️', label: 'Blogs', to: '/admin/blogs', permission: 'manage_blogs' },
      { icon: '❓', label: 'FAQs', to: '/admin/faqs', permission: 'manage_faqs' },
      { icon: '🏢', label: 'Clients', to: '/admin/clients', permission: 'manage_clients' },
      { icon: '📜', label: 'Certifications', to: '/admin/certifications', permission: 'manage_clients' },
      // { icon: '📈', label: 'Statistics', to: '/admin/statistics', permission: 'manage_statistics' },
    ],
  },
  {
    label: 'Inquiries',
    items: [
      { icon: '📬', label: 'Inquiries', to: '/admin/inquiries', permission: 'manage_inquiries' },
      // { icon: '💬', label: 'Live Chat', to: '/admin/live-chat', permission: 'manage_live_chat' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { icon: '🔍', label: 'SEO Manager', to: '/admin/seo', permission: 'manage_seo' },
      { icon: '📄', label: 'Pages', to: '/admin/pages', permission: null },
    ],
  },
  {
    label: 'Admin',
    items: [
      { icon: '👥', label: 'Users', to: '/admin/users', permission: 'manage_users' },
      { icon: '🔑', label: 'Roles', to: '/admin/roles', permission: 'manage_roles' },
    ],
  },
];

const AdminSidebar = ({ mobileOpen, desktopCollapsed, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="admin-overlay visible"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? '' : 'mobile-closed lg:translate-x-0'} ${desktopCollapsed ? 'desktop-collapsed' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to="/" onClick={onClose} className="flex justify-center w-full">
            <img src={logoImg} alt="Cresta Foods" style={{ height: desktopCollapsed ? 28 : 36 }} />
          </Link>
          {!desktopCollapsed && <span className="sidebar-logo-badge">Admin Panel</span>}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navSections.map((section) => {
            const visibleItems = section.items.filter(
              (item) => !item.permission || hasPermission(user, item.permission)
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.label}>
                <div className="sidebar-section-label">
                  {desktopCollapsed ? section.label.substring(0, 3) : section.label}
                </div>
                {visibleItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar-nav-item${isActive ? ' active' : ''}`
                    }
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!desktopCollapsed && (
            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Signed in as</p>
              <p style={{ fontSize: 13, color: '#D1FAE5', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email}
              </p>
              <span style={{ fontSize: 10, background: 'rgba(46,125,50,0.4)', color: '#86EFAC', padding: '2px 8px', borderRadius: 20, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {user?.role}
              </span>
            </div>
          )}
          <button
            onClick={logout}
            className="admin-btn admin-btn-danger admin-btn-sm"
            style={{ width: '100%', justifyContent: 'center', marginTop: desktopCollapsed ? 0 : 8, padding: desktopCollapsed ? '8px 0' : undefined }}
            title="Sign Out"
          >
            {desktopCollapsed ? '🚪' : 'Sign Out'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
