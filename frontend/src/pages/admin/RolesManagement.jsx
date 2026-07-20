// frontend/src/pages/admin/RolesManagement.jsx
import { useState, useEffect } from 'react';
import api from '../../utils/api';

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState({ open: false, isEdit: false, data: { name: '', description: '', permissions: [] } });

  const fetchData = async () => {
    try {
      const [rolesRes, permsRes] = await Promise.all([
        api.get('/roles'),
        api.get('/roles/permissions')
      ]);
      setRoles(rolesRes.data);
      setAllPermissions(permsRes.data);
    } catch {
      setError('Failed to load roles');
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
    if (modal.data.name === 'admin') {
      showMsg('error', 'Cannot modify the admin role');
      return;
    }
    try {
      if (modal.isEdit) {
        await api.put(`/roles/${modal.data._id}`, modal.data);
        showMsg('success', 'Role updated');
      } else {
        await api.post('/roles', modal.data);
        showMsg('success', 'Role created');
      }
      setModal({ open: false, isEdit: false, data: {} });
      fetchData();
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to save role');
    }
  };

  const deleteRole = async (role) => {
    if (role.name === 'admin') {
      alert("Cannot delete the admin role.");
      return;
    }
    if (!confirm('Delete this role? Users with this role will lose their permissions.')) return;
    try {
      await api.delete(`/roles/${role._id}`);
      setRoles((prev) => prev.filter((r) => r._id !== role._id));
      showMsg('success', 'Role deleted');
    } catch {
      showMsg('error', 'Failed to delete role');
    }
  };

  const togglePermission = (permId) => {
    setModal((prev) => {
      const current = prev.data.permissions || [];
      const next = current.includes(permId)
        ? current.filter((id) => id !== permId)
        : [...current, permId];
      return { ...prev, data: { ...prev.data, permissions: next } };
    });
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Roles & Permissions</h1>
          <p className="admin-page-subtitle">Manage user roles and their access levels</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => setModal({ open: true, isEdit: false, data: { name: '', description: '', permissions: [] } })}
        >
          ➕ Create Role
        </button>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : (
        <div className="admin-grid-3">
          {roles.map((role) => (
            <div key={role._id} className="admin-card">
              <div className="admin-card-header" style={{ marginBottom: 12 }}>
                <h3 className="admin-card-title">{role.name}</h3>
                {role.name !== 'admin' && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="admin-btn-icon" onClick={() => setModal({ open: true, isEdit: true, data: { ...role, permissions: role.permissions.map(p => p._id) } })}>✏️</button>
                    <button className="admin-btn-icon" style={{ color: '#EF4444' }} onClick={() => deleteRole(role)}>🗑</button>
                  </div>
                )}
              </div>
              <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>{role.description}</p>
              <div>
                <strong style={{ fontSize: 11, textTransform: 'uppercase', color: '#9CA3AF' }}>Permissions:</strong>
                {role.name === 'admin' ? (
                  <div style={{ fontSize: 13, color: '#059669', marginTop: 4 }}>✅ All Permissions</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {role.permissions.map((p) => (
                      <span key={p._id} className="admin-badge admin-badge-gray" style={{ fontSize: 10 }}>{p.name}</span>
                    ))}
                    {role.permissions.length === 0 && <span style={{ fontSize: 12, color: '#9CA3AF' }}>No permissions</span>}
                  </div>
                )}
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
                <h3 className="admin-modal-title">{modal.isEdit ? 'Edit Role' : 'Create Role'}</h3>
                <button type="button" className="admin-btn-icon" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Role Name *</label>
                  <input className="admin-input" required value={modal.data.name} onChange={(e) => setModal({ ...modal, data: { ...modal.data, name: e.target.value } })} placeholder="e.g. editor" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description</label>
                  <input className="admin-input" value={modal.data.description} onChange={(e) => setModal({ ...modal, data: { ...modal.data, description: e.target.value } })} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Permissions</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                    {allPermissions.map((p) => (
                      <label key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          className="admin-checkbox"
                          checked={modal.data.permissions?.includes(p._id)}
                          onChange={() => togglePermission(p._id)}
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setModal({ open: false, isEdit: false, data: {} })}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary">Save Role</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesManagement;
