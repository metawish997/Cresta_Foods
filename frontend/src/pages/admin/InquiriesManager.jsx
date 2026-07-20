// frontend/src/pages/admin/InquiriesManager.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [notesModal, setNotesModal] = useState({ open: false, id: null, notes: '' });

  const fetchInquiries = async () => {
    try {
      const res = await api.get('/inquiries');
      setInquiries(res.data);
      setFiltered(res.data);
    } catch {
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  useEffect(() => {
    let result = inquiries;
    if (search) {
      result = result.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase()) ||
        (i.company && i.company.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (statusFilter) result = result.filter((i) => i.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, inquiries]);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status });
      setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
      showMsg('success', 'Status updated');
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const saveNotes = async () => {
    try {
      await api.patch(`/inquiries/${notesModal.id}/notes`, { notes: notesModal.notes });
      setInquiries((prev) => prev.map((i) => i._id === notesModal.id ? { ...i, followUpNotes: notesModal.notes } : i));
      setNotesModal({ open: false, id: null, notes: '' });
      showMsg('success', 'Notes saved');
    } catch {
      showMsg('error', 'Failed to save notes');
    }
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      setSelectedIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      showMsg('success', 'Inquiry deleted');
    } catch {
      showMsg('error', 'Failed to delete');
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.size || !confirm(`Delete ${selectedIds.size} inquiries?`)) return;
    try {
      await api.post('/inquiries/bulk-delete', { ids: Array.from(selectedIds) });
      setInquiries((prev) => prev.filter((i) => !selectedIds.has(i._id)));
      setSelectedIds(new Set());
      showMsg('success', 'Inquiries deleted');
    } catch {
      showMsg('error', 'Bulk delete failed');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((i) => i._id)));
  };

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inquiries</h1>
          <p className="admin-page-subtitle">Manage contact form submissions</p>
        </div>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="admin-search" style={{ minWidth: 240 }}>
            <span>🔍</span>
            <input type="text" placeholder="Search name, email, company..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="admin-select" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        {selectedIds.size > 0 && (
          <button className="admin-btn admin-btn-danger" onClick={handleBulkDelete}>
            🗑 Delete Selected ({selectedIds.size})
          </button>
        )}
      </div>

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📭</div>
          <div className="admin-empty-title">No inquiries found</div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input type="checkbox" className="admin-checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} />
                </th>
                <th>Contact Details</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq._id} style={{ background: inq.status === 'NEW' ? 'rgba(46,125,50,0.03)' : 'transparent' }}>
                  <td>
                    <input type="checkbox" className="admin-checkbox" checked={selectedIds.has(inq._id)} onChange={() => toggleSelect(inq._id)} />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{inq.name}</div>
                    <div style={{ fontSize: 13, color: '#4CAF50' }}><a href={`mailto:${inq.email}`}>{inq.email}</a></div>
                    {inq.phone && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>📞 {inq.phone}</div>}
                    {inq.company && <div style={{ fontSize: 12, color: '#6B7280' }}>🏢 {inq.company}</div>}
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>{new Date(inq.createdAt).toLocaleString()}</div>
                  </td>
                  <td style={{ maxWidth: 300 }}>
                    <div style={{ fontSize: 13, color: '#374151', whiteSpace: 'pre-wrap', maxHeight: 80, overflowY: 'auto' }}>
                      {inq.message}
                    </div>
                    {inq.followUpNotes && (
                      <div style={{ marginTop: 8, padding: 8, background: '#FEF3C7', borderRadius: 4, borderLeft: '3px solid #F59E0B', fontSize: 12 }}>
                        <strong>Notes:</strong> {inq.followUpNotes}
                      </div>
                    )}
                  </td>
                  <td>
                    <select
                      className="admin-select"
                      style={{ width: 120, padding: '4px 8px', fontSize: 12 }}
                      value={inq.status}
                      onChange={(e) => updateStatus(inq._id, e.target.value)}
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setNotesModal({ open: true, id: inq._id, notes: inq.followUpNotes || '' })}>
                        📝 Notes
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteInquiry(inq._id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Notes Modal */}
      {notesModal.open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Follow-up Notes</h3>
              <button className="admin-btn-icon" onClick={() => setNotesModal({ open: false, id: null, notes: '' })}>✕</button>
            </div>
            <div className="admin-modal-body">
              <textarea
                className="admin-textarea"
                rows={5}
                placeholder="Add notes about your contact with this person..."
                value={notesModal.notes}
                onChange={(e) => setNotesModal({ ...notesModal, notes: e.target.value })}
              />
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setNotesModal({ open: false, id: null, notes: '' })}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={saveNotes}>Save Notes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiriesManager;
