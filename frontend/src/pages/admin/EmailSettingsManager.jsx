import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';

const EmailSettingsManager = () => {
  const [settings, setSettings] = useState({
    smtp_host: '',
    smtp_port: '',
    smtp_username: '',
    smtp_password: '',
    smtp_encryption: 'TLS',
    from_email: '',
    from_name: '',
    admin_email: '',
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/email-settings');
      if (res.data) {
        setSettings({
          smtp_host: res.data.smtp_host || '',
          smtp_port: res.data.smtp_port || '',
          smtp_username: res.data.smtp_username || '',
          smtp_password: res.data.smtp_password || '', // masked password from API
          smtp_encryption: res.data.smtp_encryption || 'TLS',
          from_email: res.data.from_email || '',
          from_name: res.data.from_name || '',
          admin_email: res.data.admin_email || '',
          is_active: res.data.is_active !== undefined ? res.data.is_active : true,
        });
      }
    } catch (err) {
      showAlert('error', 'Failed to load email settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 5000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/email-settings', settings);
      showAlert('success', 'Email settings updated successfully.');
      // Refresh to get masked password if it was updated
      await fetchSettings();
    } catch (err) {
      showAlert('error', err.response?.data?.message || 'Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    setTesting(true);
    setAlert({ type: 'info', message: 'Sending test email...' });
    try {
      const res = await api.post('/email-settings/test');
      showAlert('success', res.data.message || 'Test email sent successfully.');
    } catch (err) {
      const backendError = err.response?.data?.error;
      const mainMessage = err.response?.data?.message || 'Test email failed. Please check your SMTP settings.';
      showAlert('error', backendError ? `${mainMessage} Details: ${backendError}` : mainMessage);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-center">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pb-10">
      <div className="admin-page-header mb-6">
        <div>
          <h1 className="admin-page-title text-2xl font-bold text-gray-800">Email / SMTP Settings</h1>
          <p className="admin-page-subtitle text-gray-500">Configure your email server for sending inquiries and notifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">SMTP Status:</span>
          {settings.is_active ? (
            <span className="admin-badge admin-badge-green">● Configured & Active</span>
          ) : (
            <span className="admin-badge admin-badge-gray">● Not Configured</span>
          )}
        </div>
      </div>

      {alert.message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          alert.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          alert.type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
          'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {alert.type === 'info' && <div className="admin-spinner w-4 h-4" style={{ borderWidth: '2px' }} />}
          <p className="font-medium">{alert.message}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Enable Toggle */}
        <div className="admin-card p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Enable SMTP Provider</h3>
            <p className="text-sm text-gray-500">When enabled, the system will use this SMTP configuration instead of default server settings.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={settings.is_active}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
          </label>
        </div>

        {/* SMTP Configuration */}
        <div className="admin-card p-0 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">SMTP Configuration</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">SMTP Host</label>
              <input
                type="text"
                name="smtp_host"
                value={settings.smtp_host}
                onChange={handleChange}
                placeholder="e.g. smtp.gmail.com"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">SMTP Port</label>
              <input
                type="number"
                name="smtp_port"
                value={settings.smtp_port}
                onChange={handleChange}
                placeholder="e.g. 587 or 465"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">SMTP Username</label>
              <input
                type="text"
                name="smtp_username"
                value={settings.smtp_username}
                onChange={handleChange}
                placeholder="e.g. example@gmail.com"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label flex justify-between">
                SMTP Password
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#2E7D32] hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="smtp_password"
                value={settings.smtp_password}
                onChange={handleChange}
                placeholder="Enter password or App Password"
                className="admin-input"
                required={!settings.smtp_password || settings.smtp_password === '****************'}
              />
              <p className="text-xs text-gray-500 mt-1">If using Gmail, use an App Password instead of your regular password.</p>
            </div>
            <div>
              <label className="admin-label">Encryption</label>
              <select
                name="smtp_encryption"
                value={settings.smtp_encryption}
                onChange={handleChange}
                className="admin-input"
              >
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sender Configuration */}
        <div className="admin-card p-0 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Sender Configuration</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">From Email</label>
              <input
                type="email"
                name="from_email"
                value={settings.from_email}
                onChange={handleChange}
                placeholder="e.g. no-reply@example.com"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">From Name</label>
              <input
                type="text"
                name="from_name"
                value={settings.from_name}
                onChange={handleChange}
                placeholder="e.g. Cresta Foods Website"
                className="admin-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Inquiry Notification */}
        <div className="admin-card p-0 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Inquiry Notification</h2>
          </div>
          <div className="p-6">
            <div>
              <label className="admin-label">Admin/Receiver Email</label>
              <input
                type="email"
                name="admin_email"
                value={settings.admin_email}
                onChange={handleChange}
                placeholder="e.g. admin@example.com"
                className="admin-input"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This email address will receive all the contact and product inquiries.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={saving || testing}
            className="admin-btn admin-btn-primary flex items-center justify-center min-w-[150px]"
          >
            {saving ? (
              <><div className="admin-spinner w-4 h-4 border-2" /> Saving...</>
            ) : (
              'Save Settings'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleTestEmail}
            disabled={saving || testing}
            className="admin-btn admin-btn-secondary flex items-center justify-center min-w-[150px]"
          >
            Send Test Email
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmailSettingsManager;
