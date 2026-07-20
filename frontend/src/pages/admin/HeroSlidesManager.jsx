// frontend/src/pages/admin/HeroSlidesManager.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const HeroSlidesManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const fetchSlides = async () => {
    try {
      const res = await api.get('/hero-slides?all=true');
      setSlides(res.data);
    } catch {
      setError('Failed to load slides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlides(); }, []);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('alt_text', file.name.replace(/\.[^.]+$/, ''));
        await api.post('/hero-slides', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      await fetchSlides();
      showMsg('success', `${files.length} slide(s) uploaded successfully`);
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const toggleStatus = async (slide) => {
    try {
      await api.put(`/hero-slides/${slide._id}`, {
        status: slide.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      });
      await fetchSlides();
      showMsg('success', 'Slide status updated');
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const deleteSlide = async (id) => {
    if (!confirm('Delete this slide?')) return;
    try {
      await api.delete(`/hero-slides/${id}`);
      setSlides((prev) => prev.filter((s) => s._id !== id));
      showMsg('success', 'Slide deleted');
    } catch {
      showMsg('error', 'Failed to delete slide');
    }
  };

  const updateAltText = async (slide, altText) => {
    try {
      await api.put(`/hero-slides/${slide._id}`, { alt_text: altText });
      showMsg('success', 'Alt text updated');
    } catch {
      showMsg('error', 'Failed to update alt text');
    }
  };

  const getImageUrl = (slide) => {
    if (!slide.image_path) return '';
    if (slide.image_path.startsWith('http')) return slide.image_path;
    return `/uploads/${slide.image_path}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Hero Slides</h1>
          <p className="admin-page-subtitle">Manage the homepage hero slider images</p>
        </div>
        <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
          {uploading ? (
            <><span className="admin-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Uploading...</>
          ) : '📤 Upload Slides'}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Alerts */}
      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {/* Upload area */}
      <div
        className="admin-upload-area"
        style={{ marginBottom: 24 }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>🖼️</div>
        <p style={{ fontWeight: 700, color: '#374151', marginBottom: 4 }}>Click to upload hero slides</p>
        <p style={{ fontSize: 12, color: '#6B7280' }}>JPG, PNG, WebP — max 20MB each. Will be optimized to AVIF.</p>
      </div>

      {/* Slides grid */}
      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : slides.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🖼️</div>
          <div className="admin-empty-title">No slides yet</div>
          <p style={{ fontSize: 13, marginTop: 4 }}>Upload your first hero image to get started</p>
        </div>
      ) : (
        <div className="admin-grid-3" style={{ gap: 20 }}>
          {slides.map((slide, idx) => (
            <motion.div
              key={slide._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="admin-card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              {/* Image */}
              <div style={{ position: 'relative', paddingTop: '56.25%', background: '#F3F4F6' }}>
                {slide.image_path ? (
                  <img
                    src={getImageUrl(slide)}
                    alt={slide.alt_text || 'Slide'}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🖼️</div>
                )}
                {/* Status badge */}
                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                  <span className={`admin-badge ${slide.status === 'ACTIVE' ? 'admin-badge-green' : 'admin-badge-gray'}`}>
                    {slide.status}
                  </span>
                </div>
                {/* Order badge */}
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
                  #{idx + 1}
                </div>
              </div>

              {/* Controls */}
              <div style={{ padding: '12px 14px' }}>
                <input
                  type="text"
                  className="admin-input"
                  style={{ marginBottom: 10, fontSize: 12 }}
                  defaultValue={slide.alt_text || ''}
                  placeholder="Alt text / description"
                  onBlur={(e) => updateAltText(slide, e.target.value)}
                />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                  <button
                    className={`admin-btn admin-btn-sm ${slide.status === 'ACTIVE' ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                    onClick={() => toggleStatus(slide)}
                  >
                    {slide.status === 'ACTIVE' ? '⏸ Deactivate' : '▶ Activate'}
                  </button>
                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => deleteSlide(slide._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlidesManager;
