// frontend/src/pages/admin/BlogsManager.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs?all=true');
      setBlogs(res.data);
      setFiltered(res.data);
    } catch {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  useEffect(() => {
    let result = blogs;
    if (search) result = result.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) result = result.filter((b) => b.status === statusFilter);
    setFiltered(result);
  }, [search, statusFilter, blogs]);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const toggleStatus = async (blog) => {
    const newStatus = blog.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await api.put(`/blogs/${blog._id}`, { status: newStatus });
      setBlogs((prev) => prev.map((b) => b._id === blog._id ? { ...b, status: newStatus } : b));
      showMsg('success', `Blog ${newStatus === 'PUBLISHED' ? 'published' : 'set to draft'}`);
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      showMsg('success', 'Blog deleted');
    } catch {
      showMsg('error', 'Failed to delete blog');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blogs</h1>
          <p className="admin-page-subtitle">{blogs.length} posts total</p>
        </div>
        <Link to="/admin/blogs/create" className="admin-btn admin-btn-primary">
          ✍️ New Post
        </Link>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="admin-search" style={{ flex: 1, minWidth: 200 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search blogs..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" style={{ width: 160 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>
      </div>

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">✍️</div>
          <div className="admin-empty-title">No blog posts found</div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {blog.image ? (
                        <img
                          src={blog.image.startsWith('http') ? blog.image : `/uploads/${blog.image}`}
                          alt={blog.title}
                          className="admin-img-preview"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="admin-img-preview" style={{ background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✍️</div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</div>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>/{blog.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {blog.category && <span className="admin-badge admin-badge-blue">{blog.category}</span>}
                  </td>
                  <td style={{ fontSize: 13, color: '#6B7280' }}>{blog.author || '—'}</td>
                  <td>
                    <button
                      className={`admin-badge ${blog.status === 'PUBLISHED' ? 'admin-badge-green' : 'admin-badge-gray'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      onClick={() => toggleStatus(blog)}
                    >
                      {blog.status}
                    </button>
                  </td>
                  <td style={{ fontSize: 12, color: '#6B7280' }}>{blog.date || new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link to={`/admin/blogs/edit/${blog._id}`} className="admin-btn admin-btn-secondary admin-btn-sm">✏️ Edit</Link>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteBlog(blog._id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogsManager;
