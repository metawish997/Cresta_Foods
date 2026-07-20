// frontend/src/pages/admin/PagesManager.jsx
import { Link } from 'react-router-dom';

const PAGES = [
  { title: 'Homepage', path: '/', description: 'Edit the main landing page, hero sliders, and statistics.' },
  { title: 'Why Us (About)', path: '/about', description: 'Edit the About Us page, values, and client logos.' },
  { title: 'Global Exports', path: '/global-exports', description: 'Edit the global presence map and export capabilities.' },
  { title: 'Application', path: '/application', description: 'Edit the application industries and use cases.' },
  { title: 'Get in Touch', path: '/contact', description: 'Edit the contact information and office locations.' }
];

const PagesManager = () => {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Pages Content (WYSIWYG Editor)</h1>
          <p className="admin-page-subtitle">Click to edit the content of any page directly on the frontend</p>
        </div>
      </div>

      <div className="admin-alert admin-alert-info" style={{ background: '#EFF6FF', borderColor: '#BFDBFE', color: '#1E3A8A' }}>
        <span style={{ fontSize: 18 }}>💡</span>
        Clicking "Edit Page Inline" will open the actual website page in Edit Mode. You can click on any text to edit it, and use the (+) button to add dynamic sections.
      </div>

      <div className="admin-grid-3" style={{ marginTop: 24 }}>
        {PAGES.map((page, idx) => (
          <div key={idx} className="admin-card">
            <div className="admin-card-title">{page.title}</div>
            <p style={{ fontSize: 13, color: '#6B7280', marginTop: 8, marginBottom: 16 }}>
              {page.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href={`${page.path}?mode=edit`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-primary admin-btn-sm" style={{ justifyContent: 'center' }}>
                ✏️ Edit Page Inline
              </a>
              {page.path === '/' && (
                <>
                  <Link to="/admin/hero-slides" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ justifyContent: 'center' }}>Edit Hero Slides</Link>
                  {/* <Link to="/admin/statistics" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ justifyContent: 'center' }}>Edit Statistics</Link> */}
                </>
              )}
              {page.path === '/about' && (
                <Link to="/admin/clients" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ justifyContent: 'center' }}>Edit Clients Logos</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesManager;
