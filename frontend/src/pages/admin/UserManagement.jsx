// frontend/src/pages/admin/UserManagement.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { username: '', email: '', password: '', role: '' } });

  const fetchData = async () => {
    try {
      const [uRes, rRes] = await Promise.all([
        api.get('/users'),
        api.get('/roles')
      ]);
      setUsers(uRes.data);
      setRoles(rRes.data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...modal.data };
      if (modal.isEdit && !payload.password) delete payload.password; // Don't send empty password on edit

      if (modal.isEdit) {
        await api.put(`/users/${modal.data._id}`, payload);
        showMsg('success', 'User updated');
      } else {
        await api.post('/users', payload);
        showMsg('success', 'User created');
      }
      setModal({ open: false, isEdit: false, data: {} });
      fetchData();
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to save user');
    }
  };

  const deleteUser = async (id) => {
    if (id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (!confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      showMsg('success', 'User deleted');
    } catch {
      showMsg('error', 'Failed to delete user');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">User Management</h1>
          <p className="admin-page-subtitle">Manage admin panel access</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => setModal({ open: true, isEdit: false, data: { username: '', email: '', password: '', role: roles[0]?.name || '' } })}
        >
          ➕ Create User
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#4B5563' }}>
                        {u.username[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.username}</span>
                      {u._id === currentUser.id && <span className="admin-badge admin-badge-green" style={{ fontSize: 9 }}>You</span>}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td><span className="admin-badge admin-badge-blue">{u.role?.name || 'unknown'}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setModal({ open: true, isEdit: true, data: { ...u, role: u.role?.name, password: '' } })}>✏️</button>
                      {u._id !== currentUser.id && (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteUser(u._id)}>🗑</button>
                      )}
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
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit User' : 'Create User'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Username *</label>
                  <input className="admin-input" required value={modal.data.username} onChange={(e) => setModal({ ...modal, data: { ...modal.data, username: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Email *</label>
                  <input type="email" className="admin-input" required value={modal.data.email} onChange={(e) => setModal({ ...modal, data: { ...modal.data, email: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">{modal.isEdit ? 'New Password (leave blank to keep current)' : 'Password *'}</label>
                  <input type="password" className="admin-input" required={!modal.isEdit} value={modal.data.password} onChange={(e) => setModal({ ...modal, data: { ...modal.data, password: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Role *</label>
                  <select className="admin-select" required value={modal.data.role} onChange={(e) => setModal({ ...modal, data: { ...modal.data, role: e.target.value } })}>
                    <option value="">Select a role...</option>
                    {roles.map((r) => (
                      <option key={r._id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
