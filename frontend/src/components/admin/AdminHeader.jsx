// frontend/src/components/admin/AdminHeader.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ sidebarOpen, onToggleSidebar, pageTitle, desktopCollapsed }) => {
  const { user, logout } = useAuth();

  return (
    <header className={`admin-header ${desktopCollapsed ? 'desktop-collapsed' : ''}`}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Hamburger */}
        <button
          className="admin-btn-icon"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: '#F3F4F6', border: 'none', cursor: 'pointer', borderRadius: 8 }}
        >
          <span style={{ fontSize: 18 }}>☰</span>
        </button>

        {/* Page title */}
        {pageTitle && (
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 700, fontSize: 18, color: '#1F2937', margin: 0 }}>
            {pageTitle}
          </h1>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* View site link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn-secondary admin-btn-sm"
          style={{ textDecoration: 'none' }}
        >
          🌐 View Site
        </Link>

        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0
          }}>
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="hidden sm:block">
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1F2937', margin: 0 }}>{user?.username}</p>
            <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, textTransform: 'capitalize' }}>{user?.role}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="admin-btn admin-btn-danger admin-btn-sm hidden sm:flex"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
