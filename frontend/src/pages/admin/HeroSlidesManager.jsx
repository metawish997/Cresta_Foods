import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import api from '../../utils/api';

const SlideCard = ({ slide, idx, getImageUrl, toggleStatus, deleteSlide, updateAltText, dragAttributes, dragListeners, style, isDragging, isOverlay }) => {
  return (
    <div
      style={{ ...style, padding: 0, overflow: 'hidden', opacity: isDragging && !isOverlay ? 0.3 : 1 }}
      className={`admin-card ${isOverlay ? 'shadow-2xl scale-105' : ''}`}
    >
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#F3F4F6' }}>
        <div 
          {...dragAttributes} 
          {...dragListeners} 
          style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: isOverlay ? 'grabbing' : 'grab' }}
        />
        {slide.image_path ? (
          <img
            src={getImageUrl(slide)}
            alt={slide.alt_text || 'Slide'}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🖼️</div>
        )}
        <div style={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
          <span className={`admin-badge ${slide.status === 'ACTIVE' ? 'admin-badge-green' : 'admin-badge-gray'}`}>
            {slide.status}
          </span>
        </div>
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12, zIndex: 10 }}>
          #{idx + 1}
        </div>
      </div>

      <div style={{ padding: '12px 14px', position: 'relative', zIndex: 10 }}>
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
    </div>
  );
};

const SortableSlide = ({ slide, idx, getImageUrl, toggleStatus, deleteSlide, updateAltText }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: slide._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative',
  };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.05 }}
    >
      <SlideCard 
        slide={slide} 
        idx={idx} 
        getImageUrl={getImageUrl} 
        toggleStatus={toggleStatus} 
        deleteSlide={deleteSlide} 
        updateAltText={updateAltText} 
        dragAttributes={attributes} 
        dragListeners={listeners} 
        style={style} 
        isDragging={isDragging} 
      />
    </motion.div>
  );
};

const HeroSlidesManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeId, setActiveId] = useState(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((i) => i._id === active.id);
        const newIndex = items.findIndex((i) => i._id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        const orderedIds = newOrder.map((s) => s._id);
        api.put('/hero-slides/utils/reorder', { orderedIds }).catch(() => {
          showMsg('error', 'Failed to save new order');
        });
        
        return newOrder;
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
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
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={slides.map(s => s._id)} strategy={rectSortingStrategy}>
            <div className="admin-grid-3" style={{ gap: 20 }}>
              {slides.map((slide, idx) => (
                <SortableSlide
                  key={slide._id}
                  slide={slide}
                  idx={idx}
                  getImageUrl={getImageUrl}
                  toggleStatus={toggleStatus}
                  deleteSlide={deleteSlide}
                  updateAltText={updateAltText}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <SlideCard
                slide={slides.find(s => s._id === activeId)}
                idx={slides.findIndex(s => s._id === activeId)}
                getImageUrl={getImageUrl}
                toggleStatus={toggleStatus}
                deleteSlide={deleteSlide}
                updateAltText={updateAltText}
                isOverlay={true}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};

export default HeroSlidesManager;
