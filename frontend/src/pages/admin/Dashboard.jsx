// frontend/src/pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { hasPermission } from '../../utils/permissions';

const StatCard = ({ icon, label, value, color, to, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className="admin-stat-card">
        <div className="admin-stat-icon" style={{ background: color + '20' }}>
          <span style={{ fontSize: 22 }}>{icon}</span>
        </div>
        <div>
          <div className="admin-stat-value">{value ?? '—'}</div>
          <div className="admin-stat-label">{label}</div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const QuickLink = ({ icon, label, desc, to, permission, user }) => {
  if (permission && !hasPermission(user, permission)) return null;
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div className="admin-card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1F2937', marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>{desc}</div>
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, inquiriesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          hasPermission(user, 'manage_inquiries') ? api.get('/dashboard/recent-inquiries') : Promise.resolve({ data: [] }),
        ]);
        setStats(statsRes.data);
        setRecentInquiries(inquiriesRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return (
    <div className="admin-loading-center">
      <div className="admin-spinner" />
      <span style={{ color: '#6B7280', fontSize: 13 }}>Loading dashboard...</span>
    </div>
  );

  if (error) return <div className="admin-alert admin-alert-error">{error}</div>;

  return (
    <div>
      {/* Welcome */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Welcome back, {user?.username} 👋</h1>
          <p className="admin-page-subtitle">Here's what's happening on your Cresta Foods website</p>
        </div>
        <Link to="/admin/inquiries" className="admin-btn admin-btn-primary">
          📬 View Inquiries {stats?.newInquiries > 0 && `(${stats.newInquiries} new)`}
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-grid-4" style={{ marginBottom: 28 }}>
        <StatCard icon="📬" label="Total Inquiries" value={stats?.inquiries} color="#2E7D32" to="/admin/inquiries" delay={0} />
        <StatCard icon="🌿" label="Products" value={stats?.products} color="#C58A2B" to="/admin/products" delay={0.05} />
        <StatCard icon="✍️" label="Blog Posts" value={stats?.blogs} color="#1E40AF" to="/admin/blogs" delay={0.1} />
        <StatCard icon="❓" label="FAQs" value={stats?.faqs} color="#7C3AED" to="/admin/faqs" delay={0.15} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* Quick actions */}
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: 16, fontSize: 16 }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuickLink icon="🖼️" label="Manage Hero Slides" desc="Upload and reorder homepage banners" to="/admin/hero-slides" permission="manage_hero_slides" user={user} />
            <QuickLink icon="🌿" label="Add Product" desc="Create a new product listing" to="/admin/products/create" permission="manage_products" user={user} />
            <QuickLink icon="✍️" label="Write Blog" desc="Publish a new blog article" to="/admin/blogs/create" permission="manage_blogs" user={user} />
            <QuickLink icon="📈" label="Edit Statistics" desc="Update homepage stats numbers" to="/admin/statistics" permission="manage_statistics" user={user} />
            <QuickLink icon="🔍" label="SEO Manager" desc="Edit meta titles and descriptions" to="/admin/seo" permission="manage_seo" user={user} />
          </div>
        </div>

        {/* Recent inquiries */}
        {hasPermission(user, 'manage_inquiries') && (
          <div>
            <h2 className="admin-card-title" style={{ marginBottom: 16, fontSize: 16 }}>Recent Inquiries</h2>
            {recentInquiries.length === 0 ? (
              <div className="admin-card">
                <div className="admin-empty">
                  <div className="admin-empty-icon">📭</div>
                  <div className="admin-empty-title">No inquiries yet</div>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.map((inq) => (
                      <tr key={inq._id}>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{inq.name}</div>
                          <div style={{ fontSize: 11, color: '#6B7280' }}>{inq.email}</div>
                        </td>
                        <td>
                          <span className={`admin-badge admin-badge-${inq.status === 'NEW' ? 'green' : inq.status === 'CONTACTED' ? 'yellow' : 'gray'}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: '#6B7280' }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ marginTop: 10, textAlign: 'right' }}>
              <Link to="/admin/inquiries" className="admin-btn admin-btn-secondary admin-btn-sm">
                View All →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
