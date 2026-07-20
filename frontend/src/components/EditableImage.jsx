import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';
import { usePageContent } from '../context/PageContentContext';
import { useAuth } from '../context/AuthContext';

const EditableImage = ({ id, defaultSrc, alt = '', className = '', style = {}, wrapperClassName = 'inline-block' }) => {
  const { contentMap, updateContent } = usePageContent();
  const [src, setSrc] = useState(defaultSrc);
  const [isEditing, setIsEditing] = useState(false);
  const [savedStatus, setSavedStatus] = useState(''); // 'saving', 'saved', 'error'
  const location = useLocation();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  useEffect(() => {
    if (contentMap && contentMap[id]) {
      setSrc(contentMap[id]);
    } else {
      setSrc(defaultSrc);
    }
  }, [contentMap, id, defaultSrc]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSavedStatus('saving');
    
    try {
      const token = localStorage.getItem('token');
      const pathSlug = location.pathname.split('/').filter(Boolean).pop();
      const slug = pathSlug || 'home';
      
      const formData = new FormData();
      formData.append('image', file);
      
      const uploadRes = await fetch(`http://localhost:5001/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        let newSrc = data.url;
        // if it's a relative path, make it absolute for the frontend or handle it as is
        // CrestaFoods frontend can probably handle relative paths if we prepend the backend URL or if it's served together
        if (newSrc.startsWith('/uploads/')) {
          newSrc = `http://localhost:5001${newSrc}`; // Use full URL for the editor preview
        }
        
        setSrc(newSrc);

        // Now save this URL to page-content
        const saveRes = await fetch(`http://localhost:5001/api/page-content/${slug}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ [id]: newSrc })
        });
        
        if (saveRes.ok) {
          if (updateContent) {
            updateContent(id, newSrc);
          }
          setSavedStatus('saved');
          setTimeout(() => setSavedStatus(''), 2000);
        } else {
          setSavedStatus('error');
        }
      } else {
        setSavedStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSavedStatus('error');
    }
  };

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  return (
    <div 
      className={`editable-image-wrapper group relative ${wrapperClassName}`}
      style={style}
      onMouseEnter={() => setIsEditing(true)}
      onMouseLeave={() => setIsEditing(false)}
      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`${className} transition-opacity duration-300 ${isEditing ? 'opacity-80' : ''}`}
        style={{ cursor: 'pointer', outline: isEditing ? '2px dashed var(--primary)' : 'none' }}
      />
      
      {/* Visual Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 bg-black/20">
        <div className="bg-primary-600 text-white rounded-full p-2 shadow-lg flex items-center gap-2">
          <ImageIcon size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Change Image</span>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Save Status Indicator */}
      {savedStatus === 'saving' && <span className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded font-bold bg-amber-500 text-white z-20">Uploading...</span>}
      {savedStatus === 'saved' && <span className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded font-bold bg-green-500 text-white z-20">Saved!</span>}
      {savedStatus === 'error' && <span className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded font-bold bg-red-500 text-white z-20">Error</span>}
    </div>
  );
};

export default EditableImage;
