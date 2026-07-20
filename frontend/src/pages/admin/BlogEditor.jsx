// frontend/src/pages/admin/BlogEditor.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const imageInputRef = useRef(null);

  const [form, setForm] = useState({
    slug: '', title: '', excerpt: '', content: '', category: '', author: '',
    date: new Date().toISOString().split('T')[0], readTime: '',
    featured: false, status: 'DRAFT', tags: '', meta_title: '', meta_description: '', meta_keywords: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/blogs/id/${id}`)
        .then((res) => {
          const b = res.data;
          setForm({
            slug: b.slug || '',
            title: b.title || '',
            excerpt: b.excerpt || '',
            content: b.content || '',
            category: b.category || '',
            author: b.author || '',
            date: b.date || new Date().toISOString().split('T')[0],
            readTime: b.readTime || '',
            featured: b.featured || false,
            status: b.status || 'DRAFT',
            tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
            meta_title: b.meta_title || '',
            meta_description: b.meta_description || '',
            meta_keywords: b.meta_keywords || '',
          });
          if (b.image) setImagePreview(b.image.startsWith('http') ? b.image : `/uploads/${b.image}`);
        })
        .catch(() => setError('Failed to load blog'))
        .finally(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'title' && !isEdit) {
      setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      setError('Title and slug are required');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(val.split(',').map((t) => t.trim()).filter(Boolean)));
      } else {
        formData.append(key, val);
      }
    });
    if (imageFile) formData.set('image', imageFile);

    try {
      if (isEdit) {
        await api.put(`/blogs/${id}`, formData);
        setSuccess('Blog updated successfully');
      } else {
        await api.post('/blogs', formData);
        setSuccess('Blog created successfully');
        setTimeout(() => navigate('/admin/blogs'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-loading-center"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isEdit ? 'Edit Blog' : 'Create Blog Post'}</h1>
          <p className="admin-page-subtitle">
            <Link to="/admin/blogs" style={{ color: '#6B7280', textDecoration: 'none' }}>Blogs</Link> /
            {isEdit ? ' Edit' : ' Create'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/blogs" className="admin-btn admin-btn-secondary">← Back</Link>
          <button type="submit" form="blog-form" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? '💾 Save Changes' : '✅ Publish Post'}
          </button>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}
      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}

      <form id="blog-form" onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, alignItems: 'start' }}>
          {/* Left col */}
          <div>
            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Content</div>
              <div className="admin-form-group">
                <label className="admin-label">Title *</label>
                <input className="admin-input" name="title" value={form.title} onChange={handleChange} required placeholder="Post Title" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Slug *</label>
                <input className="admin-input" name="slug" value={form.slug} onChange={handleChange} required placeholder="post-title" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Excerpt</label>
                <textarea className="admin-textarea" name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Brief summary" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Content</label>
                <div style={{ color: 'black' }}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={form.content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setForm((prev) => ({ ...prev, content: data }));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title" style={{ marginBottom: 16 }}>SEO</div>
              <div className="admin-form-group">
                <label className="admin-label">Meta Title</label>
                <input className="admin-input" name="meta_title" value={form.meta_title} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Meta Description</label>
                <textarea className="admin-textarea" name="meta_description" value={form.meta_description} onChange={handleChange} rows={2} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Meta Keywords</label>
                <input className="admin-input" name="meta_keywords" value={form.meta_keywords} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Right col */}
          <div>
            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Details</div>
              <div className="admin-form-group">
                <label className="admin-label">Status</label>
                <select className="admin-select" name="status" value={form.status} onChange={handleChange}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Category</label>
                <input className="admin-input" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Industry Insights" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Author</label>
                <input className="admin-input" name="author" value={form.author} onChange={handleChange} />
              </div>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Date</label>
                  <input type="date" className="admin-input" name="date" value={form.date} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Read Time</label>
                  <input className="admin-input" name="readTime" value={form.readTime} onChange={handleChange} placeholder="e.g. 5 min read" />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tags (comma separated)</label>
                <input className="admin-input" name="tags" value={form.tags} onChange={handleChange} placeholder="tag1, tag2" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} className="admin-checkbox" />
                <label htmlFor="featured" style={{ fontSize: 14, cursor: 'pointer' }}>Featured Post ⭐</label>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Featured Image</div>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} onError={(e) => { e.target.style.display = 'none'; }} />
              )}
              <label className="admin-upload-area" style={{ padding: 16, cursor: 'pointer', marginBottom: 0 }}>
                <span style={{ fontSize: 28 }}>📸</span>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>{imageFile ? imageFile.name : 'Upload image'}</p>
                <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
