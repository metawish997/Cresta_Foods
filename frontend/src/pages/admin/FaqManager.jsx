// frontend/src/pages/admin/FaqManager.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const FaqManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { question: '', answer: '', category: '' } });

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/faqs');
      setFaqs(res.data);
    } catch {
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (modal.isEdit) {
        await api.put(`/faqs/${modal.data._id}`, modal.data);
        showMsg('success', 'FAQ updated');
      } else {
        await api.post('/faqs', modal.data);
        showMsg('success', 'FAQ created');
      }
      setModal({ open: false, isEdit: false, data: { question: '', answer: '', category: '' } });
      fetchFaqs();
    } catch {
      showMsg('error', 'Failed to save FAQ');
    }
  };

  const deleteFaq = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/${id}`);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      showMsg('success', 'FAQ deleted');
    } catch {
      showMsg('error', 'Failed to delete FAQ');
    }
  };

  const handleMove = async (index, dir) => {
    if (index + dir < 0 || index + dir >= faqs.length) return;
    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[index + dir];
    newFaqs[index + dir] = temp;
    setFaqs(newFaqs);

    try {
      await api.put('/faqs/utils/reorder', { orderedIds: newFaqs.map((f) => f._id) });
    } catch {
      showMsg('error', 'Failed to reorder');
      fetchFaqs();
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">FAQs</h1>
          <p className="admin-page-subtitle">Manage frequently asked questions</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => setModal({ open: true, isEdit: false, data: { question: '', answer: '', category: '' } })}
        >
          ➕ Add FAQ
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : faqs.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">❓</div>
          <div className="admin-empty-title">No FAQs found</div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Order</th>
                <th>Question & Answer</th>
                <th>Category</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq, i) => (
                <tr key={faq._id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <button className="admin-btn-icon admin-btn-sm" onClick={() => handleMove(i, -1)} disabled={i === 0}>▲</button>
                      <button className="admin-btn-icon admin-btn-sm" onClick={() => handleMove(i, 1)} disabled={i === faqs.length - 1}>▼</button>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1F2937', marginBottom: 4 }}>{faq.question}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', whiteSpace: 'pre-wrap', maxHeight: 80, overflowY: 'auto' }}>{faq.answer}</div>
                  </td>
                  <td>{faq.category ? <span className="admin-badge admin-badge-gray">{faq.category}</span> : '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setModal({ open: true, isEdit: true, data: faq })}>✏️</button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteFaq(faq._id)}>🗑</button>
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
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit FAQ' : 'Create FAQ'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Question *</label>
                  <input className="admin-input" required value={modal.data.question} onChange={(e) => setModal({ ...modal, data: { ...modal.data, question: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Answer *</label>
                  <textarea className="admin-textarea" rows={4} required value={modal.data.answer} onChange={(e) => setModal({ ...modal, data: { ...modal.data, answer: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Category</label>
                  <input className="admin-input" value={modal.data.category} onChange={(e) => setModal({ ...modal, data: { ...modal.data, category: e.target.value } })} placeholder="e.g. Products, Shipping" />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqManager;
