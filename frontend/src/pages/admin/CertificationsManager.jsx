import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';

const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { name: '', description: '', initials: '' }, imageFile: null });
  const fileInputRef = useRef(null);

  const fetchCertifications = async () => {
    try {
      const res = await api.get('/certifications/all');
      setCertifications(res.data);
    } catch {
      setError('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCertifications(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let image_path = modal.data.image_path;

      // Upload new image if selected
      if (modal.imageFile) {
        const formData = new FormData();
        formData.append('image', modal.imageFile);
        const uploadRes = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        image_path = uploadRes.data.filePath;
      }

      const payload = {
        name: modal.data.name,
        description: modal.data.description,
        initials: modal.data.initials,
        image_path
      };

      if (modal.isEdit) {
        await api.put(`/certifications/${modal.data._id}`, payload);
        showMsg('success', 'Certification updated');
      } else {
        await api.post('/certifications', payload);
        showMsg('success', 'Certification created');
      }

      setModal({ open: false, isEdit: false, data: { name: '', description: '', initials: '' }, imageFile: null });
      fetchCertifications();
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to save certification');
    }
  };

  const toggleStatus = async (cert) => {
    try {
      await api.put(`/certifications/${cert._id}`, { status: cert.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' });
      await fetchCertifications();
      showMsg('success', 'Status updated');
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const deleteCertification = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await api.delete(`/certifications/${id}`);
      setCertifications((prev) => prev.filter((c) => c._id !== id));
      showMsg('success', 'Certification deleted');
    } catch {
      showMsg('error', 'Failed to delete certification');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModal(prev => ({ ...prev, imageFile: file }));
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Certifications</h1>
          <p className="admin-page-subtitle">Manage company certifications and standards</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setModal({ open: true, isEdit: false, data: { name: '', description: '', initials: '' }, imageFile: null });
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
        >
          ➕ Add Certification
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : certifications.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📜</div>
          <div className="admin-empty-title">No certifications found</div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name / Initials</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert._id}>
                  <td>
                    <div style={{ width: 40, height: 40, background: '#F3F4F6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {cert.image_path ? (
                        <img src={`/uploads/${cert.image_path}`} alt={cert.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: 16 }}>{cert.initials || cert.name.substring(0, 2)}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937' }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{cert.initials || '—'}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: '#4B5563', maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cert.description || '—'}
                    </div>
                  </td>
                  <td>
                    <button
                      className={`admin-badge ${cert.status === 'ACTIVE' ? 'admin-badge-green' : 'admin-badge-gray'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => toggleStatus(cert)}
                    >
                      {cert.status}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setModal({ open: true, isEdit: true, data: cert, imageFile: null })}>✏️</button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteCertification(cert._id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <form onSubmit={handleSave}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit Certification' : 'Create Certification'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {}, imageFile: null })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Certification Name *</label>
                  <input className="admin-input" required value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} placeholder="e.g. FSSAI" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Initials</label>
                  <input className="admin-input" value={modal.data.initials || ''} onChange={(e) => setModal({ ...modal, data: { ...modal.data, initials: e.target.value } })} placeholder="e.g. FSSAI (Used if no image)" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description</label>
                  <textarea className="admin-textarea" rows={2} value={modal.data.description || ''} onChange={(e) => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })} placeholder="Brief description of the certification..." />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Image Logo</label>
                  <input type="file" className="admin-input" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                  {modal.data.image_path && !modal.imageFile && (
                    <div style={{ marginTop: 8, fontSize: 12, color: '#6B7280' }}>
                      Current: {modal.data.image_path}
                    </div>
                  )}
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {}, imageFile: null })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Certification</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsManager;
