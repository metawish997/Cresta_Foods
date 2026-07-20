// frontend/src/pages/admin/StatisticsManager.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const StatisticsManager = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { label: '', value: 0, suffix: '', prefix: '', decimals: 0, icon: '', description: '' } });

  const fetchStats = async () => {
    try {
      const res = await api.get('/statistics');
      setStats(res.data);
    } catch {
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (modal.isEdit) {
        await api.put(`/statistics/${modal.data._id}`, modal.data);
        showMsg('success', 'Statistic updated');
      } else {
        await api.post('/statistics', modal.data);
        showMsg('success', 'Statistic created');
      }
      setModal({ open: false, isEdit: false, data: {} });
      fetchStats();
    } catch {
      showMsg('error', 'Failed to save statistic');
    }
  };

  const deleteStat = async (id) => {
    if (!confirm('Delete this statistic?')) return;
    try {
      await api.delete(`/statistics/${id}`);
      setStats((prev) => prev.filter((s) => s._id !== id));
      showMsg('success', 'Statistic deleted');
    } catch {
      showMsg('error', 'Failed to delete');
    }
  };

  const handleMove = async (index, dir) => {
    if (index + dir < 0 || index + dir >= stats.length) return;
    const newStats = [...stats];
    const temp = newStats[index];
    newStats[index] = newStats[index + dir];
    newStats[index + dir] = temp;
    setStats(newStats);

    try {
      await api.put('/statistics/utils/reorder', { orderedIds: newStats.map((s) => s._id) });
    } catch {
      showMsg('error', 'Failed to reorder');
      fetchStats();
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Statistics Manager</h1>
          <p className="admin-page-subtitle">Manage the animated counters on the homepage</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => setModal({ open: true, isEdit: false, data: { label: '', value: 0, suffix: '', prefix: '', decimals: 0, icon: '📊', description: '' } })}
        >
          ➕ Add Statistic
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : stats.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📈</div>
          <div className="admin-empty-title">No statistics found</div>
        </div>
      ) : (
        <div className="admin-grid-4">
          {stats.map((stat, i) => (
            <div key={stat._id} className="admin-card" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 4 }}>
                <button className="admin-btn-icon" style={{ padding: 4 }} onClick={() => handleMove(i, -1)} disabled={i === 0}>◀</button>
                <button className="admin-btn-icon" style={{ padding: 4 }} onClick={() => handleMove(i, 1)} disabled={i === stats.length - 1}>▶</button>
                <button className="admin-btn-icon" style={{ padding: 4, marginLeft: 8 }} onClick={() => setModal({ open: true, isEdit: true, data: stat })}>✏️</button>
                <button className="admin-btn-icon" style={{ padding: 4, color: '#EF4444' }} onClick={() => deleteStat(stat._id)}>🗑</button>
              </div>

              <div style={{ fontSize: 32, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                {stat.prefix}{stat.value.toFixed(stat.decimals)}{stat.suffix}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8 }}>
                {stat.label}
              </div>
              {stat.description && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{stat.description}</div>}
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
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit Statistic' : 'Create Statistic'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Label *</label>
                    <input className="admin-input" required value={modal.data.label} onChange={(e) => setModal({ ...modal, data: { ...modal.data, label: e.target.value } })} placeholder="e.g. Revenue" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Number Value *</label>
                    <input type="number" step="any" className="admin-input" required value={modal.data.value} onChange={(e) => setModal({ ...modal, data: { ...modal.data, value: Number(e.target.value) } })} />
                  </div>
                </div>
                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label className="admin-label">Prefix</label>
                    <input className="admin-input" value={modal.data.prefix} onChange={(e) => setModal({ ...modal, data: { ...modal.data, prefix: e.target.value } })} placeholder="e.g. $" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Suffix</label>
                    <input className="admin-input" value={modal.data.suffix} onChange={(e) => setModal({ ...modal, data: { ...modal.data, suffix: e.target.value } })} placeholder="e.g. M+" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Decimals</label>
                    <input type="number" min="0" max="4" className="admin-input" value={modal.data.decimals} onChange={(e) => setModal({ ...modal, data: { ...modal.data, decimals: Number(e.target.value) } })} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Icon (Emoji or text)</label>
                  <input className="admin-input" value={modal.data.icon} onChange={(e) => setModal({ ...modal, data: { ...modal.data, icon: e.target.value } })} placeholder="e.g. 💰" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description</label>
                  <input className="admin-input" value={modal.data.description} onChange={(e) => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })} placeholder="e.g. Annual revenue" />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Statistic</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsManager;
