// frontend/src/pages/admin/ClientsManager.jsx
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';

const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients?all=true');
      setClients(res.data);
    } catch {
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('logo', file);
    formData.append('name', file.name.replace(/\.[^.]+$/, ''));

    try {
      await api.post('/clients', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      await fetchClients();
      showMsg('success', 'Client logo added');
    } catch {
      showMsg('error', 'Failed to upload logo');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleStatus = async (client) => {
    try {
      await api.put(`/clients/${client._id}`, { status: client.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' });
      await fetchClients();
      showMsg('success', 'Status updated');
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const deleteClient = async (id) => {
    if (!confirm('Delete this client logo?')) return;
    try {
      await api.delete(`/clients/${id}`);
      setClients((prev) => prev.filter((c) => c._id !== id));
      showMsg('success', 'Client deleted');
    } catch {
      showMsg('error', 'Failed to delete client');
    }
  };

  const updateName = async (client, name) => {
    if (client.name === name) return;
    try {
      await api.put(`/clients/${client._id}`, { name });
      showMsg('success', 'Client name updated');
    } catch {
      showMsg('error', 'Failed to update name');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Clients & Partners</h1>
          <p className="admin-page-subtitle">Manage client logos displayed on the website</p>
        </div>
        <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
          ➕ Add Client Logo
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : clients.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🏢</div>
          <div className="admin-empty-title">No clients yet</div>
          <p style={{ fontSize: 13, marginTop: 4 }}>Upload your first client logo to get started</p>
        </div>
      ) : (
        <div className="admin-grid-4">
          {clients.map((client) => (
            <div key={client._id} className="admin-card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#F3F4F6', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
                {client.logo_path ? (
                  <img src={`/uploads/${client.logo_path}`} alt={client.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.8 }} />
                ) : (
                  <span style={{ fontSize: 32 }}>🏢</span>
                )}
              </div>
              <input
                type="text"
                className="admin-input"
                style={{ fontSize: 13, padding: '6px 10px' }}
                defaultValue={client.name}
                onBlur={(e) => updateName(client, e.target.value)}
                placeholder="Client Name"
              />
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`admin-btn admin-btn-sm ${client.status === 'ACTIVE' ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                  style={{ flex: 1 }}
                  onClick={() => toggleStatus(client)}
                >
                  {client.status === 'ACTIVE' ? 'Hide' : 'Show'}
                </button>
                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteClient(client._id)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsManager;
