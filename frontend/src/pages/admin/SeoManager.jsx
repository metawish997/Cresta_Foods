// frontend/src/pages/admin/SeoManager.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const SeoManager = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { page_slug: '', page_name: '', title: '', description: '', keywords: '' } });

  const fetchSettings = async () => {
    try {
      const res = await api.get('/seo');
      setSettings(res.data);
    } catch {
      setError('Failed to load SEO settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (modal.isEdit) {
        await api.put(`/seo/${modal.data._id}`, modal.data);
        showMsg('success', 'SEO setting updated');
      } else {
        await api.post('/seo', modal.data);
        showMsg('success', 'SEO setting created');
      }
      setModal({ open: false, isEdit: false, data: {} });
      fetchSettings();
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to save SEO setting');
    }
  };

  const deleteSetting = async (id) => {
    if (!confirm('Delete this SEO setting?')) return;
    try {
      await api.delete(`/seo/${id}`);
      setSettings((prev) => prev.filter((s) => s._id !== id));
      showMsg('success', 'SEO setting deleted');
    } catch {
      showMsg('error', 'Failed to delete');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">SEO Manager</h1>
          <p className="admin-page-subtitle">Manage meta tags and titles for all static pages</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => setModal({ open: true, isEdit: false, data: { page_slug: '', page_name: '', title: '', description: '', keywords: '' } })}
        >
          ➕ Add SEO Config
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : settings.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🔍</div>
          <div className="admin-empty-title">No SEO settings found</div>
        </div>
      ) : (
        <div className="admin-grid-2">
          {settings.map((setting) => (
            <div key={setting._id} className="admin-card">
              <div className="admin-card-header" style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="admin-badge admin-badge-blue">{setting.page_slug}</span>
                  <span style={{ fontWeight: 600, color: '#374151', fontSize: 15 }}>{setting.page_name}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="admin-btn-icon" onClick={() => setModal({ open: true, isEdit: true, data: setting })}>✏️</button>
                  <button className="admin-btn-icon" style={{ color: '#EF4444' }} onClick={() => deleteSetting(setting._id)}>🗑</button>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 8 }}>
                <strong style={{ color: '#111827' }}>Title:</strong> {setting.title}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                <strong style={{ color: '#111827' }}>Desc:</strong> {setting.description || '—'}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                <strong style={{ color: '#111827' }}>Keywords:</strong> {setting.keywords || '—'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit SEO Setting' : 'Create SEO Setting'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Page Slug *</label>
                    <input className="admin-input" required disabled={modal.isEdit} value={modal.data.page_slug} onChange={(e) => setModal({ ...modal, data: { ...modal.data, page_slug: e.target.value } })} placeholder="e.g. home" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Page Name</label>
                    <input className="admin-input" value={modal.data.page_name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, page_name: e.target.value } })} placeholder="e.g. Home Page" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Meta Title</label>
                  <input className="admin-input" value={modal.data.title} onChange={(e) => setModal({ ...modal, data: { ...modal.data, title: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Meta Description</label>
                  <textarea className="admin-textarea" rows={3} value={modal.data.description} onChange={(e) => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Meta Keywords</label>
                  <input className="admin-input" value={modal.data.keywords} onChange={(e) => setModal({ ...modal, data: { ...modal.data, keywords: e.target.value } })} placeholder="keyword1, keyword2" />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save SEO Config</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeoManager;
