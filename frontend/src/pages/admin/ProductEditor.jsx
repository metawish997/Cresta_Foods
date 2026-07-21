// frontend/src/pages/admin/ProductEditor.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const ArrayField = ({ label, value, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const add = () => {
    if (!input.trim()) return;
    onChange([...value, input.trim()]);
    setInput('');
  };
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));
  return (
    <div className="admin-form-group" style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px', marginBottom: '20px', background: '#fff' }}>
      <label className="admin-label" style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '12px', display: 'block' }}>{label}</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          className="admin-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>Add</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {value.map((item, i) => (
          <span key={i} style={{ background: '#F3F4F6', borderRadius: 20, padding: '4px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            {item}
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 16 }}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

const ObjectArrayField = ({ label, value = [], onChange, key1, key2, placeholder1, placeholder2 }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const fileInputRef = useRef(null);

  const add = () => {
    if (!input1.trim() || !input2.trim()) return;
    onChange([...value, { [key1]: input1.trim(), [key2]: input2.trim() }]);
    setInput1(''); setInput2('');
  };
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/);
      const newItems = [];
      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length >= 2) {
          const k1 = parts[0].trim().replace(/^"|"$/g, '');
          const k2 = parts.slice(1).join(',').trim().replace(/^"|"$/g, '');
          if (k1 && k2) {
            newItems.push({ [key1]: k1, [key2]: k2 });
          }
        }
      });
      if (newItems.length > 0) {
        onChange([...value, ...newItems]);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-form-group" style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px', marginBottom: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '12px' }}>
        <label className="admin-label" style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button type="button" onClick={() => setShowInfo(!showInfo)} style={{ background: '#E5E7EB', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#4B5563' }} title="Show Format Info">
            !
          </button>
          <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImportCSV} />
          <button type="button" className="admin-btn admin-btn-sm" style={{ background: '#10B981', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }} onClick={() => fileInputRef.current?.click()}>
            📥 Import CSV
          </button>
        </div>
      </div>
      {showInfo && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px', color: '#1E3A8A' }}>
          <strong>CSV Format Expected:</strong> Upload a <code>.csv</code> file with exactly two columns per row.
          <ul style={{ margin: '6px 0 0 20px', padding: 0 }}>
            <li><strong>Column 1:</strong> {placeholder1.replace('e.g. ', '')}</li>
            <li><strong>Column 2:</strong> {placeholder2.replace('e.g. ', '')}</li>
          </ul>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input className="admin-input" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder={placeholder1} />
        <input className="admin-input" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder={placeholder2} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())} />
        <button type="button" className="admin-btn admin-btn-secondary" onClick={add}>Add</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {value.map((item, i) => (
          <div key={i} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><strong style={{ color: '#374151' }}>{item[key1]}:</strong> <span style={{ color: '#4B5563' }}>{item[key2]}</span></div>
            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontWeight: 'bold' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const TableEditor = ({ label, value = { headers: [], rows: [], tableName: '' }, onChange }) => {
  const [headerInput, setHeaderInput] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const fileInputRef = useRef(null);

  const addHeader = () => {
    if (!headerInput.trim()) return;
    onChange({ ...value, headers: [...value.headers, headerInput.trim()] });
    setHeaderInput('');
  };

  const removeHeader = (idx) => {
    const newHeaders = value.headers.filter((_, i) => i !== idx);
    const newRows = value.rows.map(row => row.filter((_, i) => i !== idx));
    onChange({ ...value, headers: newHeaders, rows: newRows });
  };

  const addRow = () => onChange({ ...value, rows: [...value.rows, new Array(value.headers.length).fill('')] });

  const updateRow = (rIdx, cIdx, val) => {
    const newRows = [...value.rows];
    newRows[rIdx][cIdx] = val;
    onChange({ ...value, rows: newRows });
  };

  const removeRow = (rIdx) => onChange({ ...value, rows: value.rows.filter((_, i) => i !== rIdx) });

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/).filter(line => line.trim());
      if (lines.length > 0) {
        const newRows = [];
        const numCols = value.headers.length > 0 ? value.headers.length : 1;
        for (let i = 0; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
          const row = Array.from({ length: numCols }, (_, idx) => parts[idx] || '');
          newRows.push(row);
        }
        onChange({ ...value, rows: [...value.rows, ...newRows] });
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-form-group" style={{ border: '1px solid #E5E7EB', padding: '16px', borderRadius: '8px', marginBottom: '20px', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px', marginBottom: '12px' }}>
        <input 
          value={value.tableName !== undefined ? value.tableName : label} 
          onChange={e => onChange({ ...value, tableName: e.target.value })}
          placeholder="Table Name (e.g. Food Grade Specifications Table)"
          style={{ fontSize: '14px', fontWeight: 'bold', border: 'none', borderBottom: '1px dashed #9CA3AF', outline: 'none', width: '60%', background: 'transparent' }} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button type="button" onClick={() => setShowInfo(!showInfo)} style={{ background: '#E5E7EB', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#4B5563' }} title="Show Format Info">
            !
          </button>
          <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImportCSV} />
          <button type="button" className="admin-btn admin-btn-sm" style={{ background: '#10B981', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }} onClick={() => fileInputRef.current?.click()}>
            📥 Import CSV
          </button>
        </div>
      </div>
      {showInfo && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px', color: '#1E3A8A' }}>
          <strong>CSV Format Expected:</strong> Upload a <code>.csv</code> file containing <strong>only the data rows</strong> (no header row). The columns in your CSV will be matched to the {value.headers.length} columns currently added below.
        </div>
      )}
      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input className="admin-input" value={headerInput} onChange={e => setHeaderInput(e.target.value)} placeholder="New Column Name (e.g. 100 Mesh)" />
          <button type="button" className="admin-btn admin-btn-secondary" onClick={addHeader}>Add Column</button>
        </div>
        {value.headers.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', marginBottom: 12, fontSize: 13 }}>
              <thead>
                <tr>
                  {value.headers.map((h, i) => (
                    <th key={i} style={{ background: '#E5E7EB' }}>{h} <button type="button" onClick={() => removeHeader(i)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', marginLeft: 4 }}>×</button></th>
                  ))}
                  <th style={{ width: 60, background: '#E5E7EB' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {value.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {value.headers.map((_, cIdx) => (
                      <td key={cIdx} style={{ padding: 4 }}>
                        <input className="admin-input" style={{ padding: '6px 8px', minWidth: 100, fontSize: 13 }} value={row[cIdx] || ''} onChange={e => updateRow(rIdx, cIdx, e.target.value)} />
                      </td>
                    ))}
                    <td style={{ padding: 4, textAlign: 'center' }}><button type="button" onClick={() => removeRow(rIdx)} style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Del</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addRow}>+ Add Row</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const imageInputRef = useRef(null);

  const [form, setForm] = useState({
    slug: '', name: '', category: 'Guar', subCategory: '', shortDesc: '',
    description: '', badge: '', featured: false, status: 'DRAFT',
    applications: [], certifications: [], packaging: '', specialNote: '',
    highlight: '', usageRecommendation: '', meta_title: '', meta_description: '', meta_keywords: '',
    storageGuidelines: '', technicalSpecText: '',
    specifications: [], keyProperties: [], whyChoose: [],
    specificationTable: { tableName: 'Food Grade Specifications Table', headers: ['Specification', '100 Mesh', '200 Mesh'], rows: [] }
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/id/${id}`)
        .then((res) => {
          const p = res.data;
          setForm({
            slug: p.slug || '',
            name: p.name || '',
            category: p.category || 'Guar',
            subCategory: p.subCategory || '',
            shortDesc: p.shortDesc || '',
            description: p.description || '',
            badge: p.badge || '',
            featured: p.featured || false,
            status: p.status || 'DRAFT',
            applications: p.applications || [],
            certifications: p.certifications || [],
            packaging: p.packaging || '',
            storageGuidelines: p.storageGuidelines || '',
            technicalSpecText: p.technicalSpecText || '',
            specialNote: p.specialNote || '',
            highlight: p.highlight || '',
            usageRecommendation: p.usageRecommendation || '',
            meta_title: p.meta_title || '',
            meta_description: p.meta_description || '',
            meta_keywords: p.meta_keywords || '',
            specifications: p.specifications || [],
            keyProperties: p.keyProperties || [],
            whyChoose: p.whyChoose || [],
            specificationTable: p.specificationTable?.headers?.length > 0
              ? { tableName: p.specificationTable.tableName || 'Food Grade Specifications Table', headers: p.specificationTable.headers, rows: p.specificationTable.rows || [] }
              : { tableName: 'Food Grade Specifications Table', headers: ['Specification', '100 Mesh', '200 Mesh'], rows: [] },
          });
          if (p.image) setImagePreview(p.image.startsWith('http') ? p.image : `/uploads/${p.image}`);
        })
        .catch(() => setError('Failed to load product'))
        .finally(() => setFetching(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'name' && !isEdit) {
      setForm((prev) => ({ ...prev, name: value, slug: slugify(value) }));
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
    if (!form.name || !form.slug) {
      setError('Name and slug are required');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'specificationTable') {
        formData.append(key, JSON.stringify(val));
      } else if (Array.isArray(val)) {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    });
    if (imageFile) formData.set('image', imageFile);

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, formData);
        setSuccess('Product updated successfully');
      } else {
        await api.post('/products', formData);
        setSuccess('Product created successfully');
        setTimeout(() => navigate('/admin/products'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-loading-center"><div className="admin-spinner" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isEdit ? 'Edit Product' : 'Create Product'}</h1>
          <p className="admin-page-subtitle">
            <Link to="/admin/products" style={{ color: '#6B7280', textDecoration: 'none' }}>Products</Link> /
            {isEdit ? ' Edit' : ' Create'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/products" className="admin-btn admin-btn-secondary">← Back</Link>
          <button type="submit" form="product-form" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? '💾 Save Changes' : '✅ Create Product'}
          </button>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">❌ {error}</div>}
      {success && <div className="admin-alert admin-alert-success">✅ {success}</div>}

      <form id="product-form" onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, alignItems: 'start' }}>
          {/* Left column */}
          <div>
            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Basic Information</div>
              <div className="admin-form-group">
                <label className="admin-label">Product Name *</label>
                <input className="admin-input" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Food Grade Guar Gum Powder" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Slug *</label>
                <input className="admin-input" name="slug" value={form.slug} onChange={handleChange} required placeholder="food-grade-guar-gum" />
              </div>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Category *</label>
                  <select className="admin-select" name="category" value={form.category} onChange={(e) => {
                    const newCategory = e.target.value;
                    const newSubCategory = newCategory === 'Guar' ? 'Hydrocolloids' : 'White Onion';
                    setForm(prev => ({ ...prev, category: newCategory, subCategory: newSubCategory }));
                  }}>
                    <option value="Guar">Guar</option>
                    <option value="Onions">Onions</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Sub Category (Assigns Product to Tab) *</label>
                  <select className="admin-select" name="subCategory" value={form.subCategory} onChange={handleChange}>
                    {form.category === 'Guar' ? (
                      <>
                        <option value="Hydrocolloids">Guar Gum Powders (Hydrocolloids)</option>
                        <option value="Animal Feed">Guar Meal Feeds (Animal Feed)</option>
                      </>
                    ) : (
                      <>
                        <option value="White Onion">White Onions</option>
                        <option value="Red & Pink Onion">Red & Pink Onions</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Short Description</label>
                <textarea className="admin-textarea" name="shortDesc" value={form.shortDesc} onChange={handleChange} rows={2} placeholder="Brief product summary" />
              </div>
              <div className="admin-form-group">
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Full Description</label>
                <textarea className="admin-textarea" name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Detailed product description" />
              </div>
            </div>

            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Advanced Specifications</div>

              <div className="admin-form-group">
                <label className="admin-label">Technical Specification Intro Text</label>
                <textarea className="admin-textarea" name="technicalSpecText" value={form.technicalSpecText} onChange={handleChange} rows={3} placeholder="Intro text above specifications table" />
              </div>

              <TableEditor
                label="Food Grade Specifications Table"
                value={form.specificationTable}
                onChange={(val) => setForm(p => ({ ...p, specificationTable: val }))}
              />

              <ObjectArrayField
                label="General Specifications"
                value={form.specifications}
                onChange={(val) => setForm((p) => ({ ...p, specifications: val }))}
                key1="label" key2="value"
                placeholder1="e.g. Moisture" placeholder2="e.g. Max 12%"
              />

              <ObjectArrayField
                label="Key Properties"
                value={form.keyProperties}
                onChange={(val) => setForm((p) => ({ ...p, keyProperties: val }))}
                key1="title" key2="desc"
                placeholder1="e.g. Superior thickening" placeholder2="e.g. Delivers consistent viscosity..."
              />

              <ObjectArrayField
                label="Why Choose Us / Partner"
                value={form.whyChoose}
                onChange={(val) => setForm((p) => ({ ...p, whyChoose: val }))}
                key1="title" key2="desc"
                placeholder1="e.g. Vetted supply chain" placeholder2="e.g. We work only with audited manufacturers."
              />
            </div>

            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Product Details</div>
              <ArrayField
                label="Applications (Ideal for..)"
                value={form.applications}
                onChange={(v) => setForm((p) => ({ ...p, applications: v }))}
                placeholder="e.g. Dairy Products & Ice Cream"
              />
              <ArrayField
                label="Certifications"
                value={form.certifications}
                onChange={(v) => setForm((p) => ({ ...p, certifications: v }))}
                placeholder="e.g. FSSAI"
              />
              <div className="admin-form-group">
                <label className="admin-label">Packaging</label>
                <input className="admin-input" name="packaging" value={form.packaging} onChange={handleChange} placeholder="e.g. 25 kg multi-wall paper bags" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Storage Guidelines</label>
                <textarea className="admin-textarea" name="storageGuidelines" value={form.storageGuidelines} onChange={handleChange} rows={2} placeholder="e.g. Store in a cool, dry place..." />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Special Note</label>
                <textarea className="admin-textarea" name="specialNote" value={form.specialNote} onChange={handleChange} rows={2} />
              </div>
              {/* <div className="admin-form-group">
                <label className="admin-label">Highlight</label>
                <input className="admin-input" name="highlight" value={form.highlight} onChange={handleChange} placeholder="e.g. ★ Hygienically Processed..." />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Usage Recommendation</label>
                <input className="admin-input" name="usageRecommendation" value={form.usageRecommendation} onChange={handleChange} placeholder="e.g. Up to 30% inclusion in cattle feed" />
              </div> */}
            </div>

            {/* <div className="admin-card">
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
                <input className="admin-input" name="meta_keywords" value={form.meta_keywords} onChange={handleChange} placeholder="keyword1, keyword2" />
              </div>
            </div> */}
          </div>

          {/* Right column */}
          <div>
            <div className="admin-card" style={{ marginBottom: 16 }}>
              <div className="admin-card-title" style={{ marginBottom: 12 }}>Status</div>
              <div className="admin-form-group">
                <label className="admin-label">Publish Status</label>
                <select className="admin-select" name="status" value={form.status} onChange={handleChange}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Badge</label>
                <input className="admin-input" name="badge" value={form.badge} onChange={handleChange} placeholder="e.g. Best Seller" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="admin-checkbox"
                />
                <label htmlFor="featured" style={{ fontSize: 14, fontWeight: 500, cursor: 'pointer', color: '#374151' }}>
                  Featured product ⭐
                </label>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-title" style={{ marginBottom: 12 }}>Product Image</div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 10, border: '1px solid #E5E7EB' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <label
                className="admin-upload-area"
                style={{ padding: 16, cursor: 'pointer', marginBottom: 0 }}
              >
                <span style={{ fontSize: 28 }}>📸</span>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
                  {imageFile ? imageFile.name : 'Click to upload image'}
                </p>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
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
                <input className="admin-input" name="meta_keywords" value={form.meta_keywords} onChange={handleChange} placeholder="keyword1, keyword2" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEditor;
