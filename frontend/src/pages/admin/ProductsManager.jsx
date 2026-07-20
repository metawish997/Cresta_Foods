// frontend/src/pages/admin/ProductsManager.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products?all=true');
      setProducts(res.data);
      setFiltered(res.data);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }
    setFiltered(result);
  }, [search, categoryFilter, products]);

  const showMsg = (type, msg) => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 5000); }
  };

  const toggleStatus = async (product) => {
    const newStatus = product.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await api.put(`/products/${product._id}`, { status: newStatus });
      setProducts((prev) => prev.map((p) => p._id === product._id ? { ...p, status: newStatus } : p));
      showMsg('success', `Product ${newStatus === 'PUBLISHED' ? 'published' : 'unpublished'}`);
    } catch {
      showMsg('error', 'Failed to update status');
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showMsg('success', 'Product deleted');
    } catch {
      showMsg('error', 'Failed to delete product');
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle">{products.length} products total</p>
        </div>
        <Link to="/admin/products/create" className="admin-btn admin-btn-primary">
          ➕ Add Product
        </Link>
      </div>

      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}
      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="admin-search" style={{ flex: 1, minWidth: 200 }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="admin-select"
          style={{ width: 160 }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="admin-loading-center"><div className="admin-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🌿</div>
          <div className="admin-empty-title">No products found</div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {product.image ? (
                        <img
                          src={product.image.startsWith('http') ? product.image : `/uploads/${product.image}`}
                          alt={product.name}
                          className="admin-img-preview"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="admin-img-preview" style={{ background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🌿</div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{product.name}</div>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>/{product.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-blue">{product.category}</span>
                  </td>
                  <td>
                    <button
                      className={`admin-badge ${product.status === 'PUBLISHED' ? 'admin-badge-green' : 'admin-badge-gray'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      onClick={() => toggleStatus(product)}
                      title="Click to toggle status"
                    >
                      {product.status}
                    </button>
                  </td>
                  <td>
                    <span>{product.featured ? '⭐' : '—'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => deleteProduct(product._id)}
                      >
                        🗑
                      </button>
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

export default ProductsManager;
