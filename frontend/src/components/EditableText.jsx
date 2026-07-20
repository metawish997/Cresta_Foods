import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { usePageContent } from '../context/PageContentContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const EditableText = ({ id, defaultText, as: Component = 'span', className = '', style = {} }) => {
  const { contentMap, updateContent } = usePageContent();
  const [content, setContent] = useState(defaultText);
  const [isEditing, setIsEditing] = useState(false);
  const [savedStatus, setSavedStatus] = useState(''); // 'saving', 'saved', 'error'
  const location = useLocation();
  const { user } = useAuth();
  
  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  useEffect(() => {
    if (contentMap && contentMap[id]) {
      setContent(contentMap[id]);
    } else {
      setContent(defaultText);
    }
  }, [contentMap, id, defaultText]);

  const handleSave = async (newText) => {
    if (newText === content) return;
    setContent(newText);
    setSavedStatus('saving');
    
    try {
      const pathSlug = location.pathname.split('/').filter(Boolean).pop();
      const slug = pathSlug || 'home';
      
      const res = await api.post(`/page-content/${slug}`, { [id]: newText });
      
      if (res.status === 200) {
        if (updateContent) {
          updateContent(id, newText);
        }
        setSavedStatus('saved');
        setTimeout(() => setSavedStatus(''), 2000);
      } else {
        setSavedStatus('error');
      }
    } catch (err) {
      console.error('Save error:', err);
      setSavedStatus('error');
    }
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    handleSave(e.target.innerText);
  };

  if (!isEditMode) {
    return <Component className={className} style={style}>{content}</Component>;
  }

  const isBlockLevel = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'section', 'article'].includes(Component);

  return (
    <div className={`editable-wrapper ${isEditing ? 'editing' : ''} ${isBlockLevel ? 'block w-full' : 'inline-block'}`} style={{ position: 'relative', ...style }}>
      <Component
        contentEditable
        suppressContentEditableWarning
        className={`${className} editable-element relative z-10 ${isBlockLevel ? 'block w-full' : 'inline-block'}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onFocus={(e) => { e.stopPropagation(); setIsEditing(true); }}
        onBlur={handleBlur}
        style={{
          outline: 'none',
          borderBottom: isEditing ? '2px dashed var(--primary)' : '1px dashed rgba(0,0,0,0.2)',
          minWidth: '20px',
          cursor: 'text'
        }}
      >
        {content}
      </Component>
      
      {/* Visual Indicator */}
      {!isEditing && (
        <div className="absolute -top-3 -right-3 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 z-20" style={{ opacity: isEditing ? 0 : undefined }}>
          <Pencil size={10} />
        </div>
      )}

      {/* Save Status Indicator */}
      {savedStatus === 'saving' && <span className="absolute -bottom-5 right-0 text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-500 text-white z-20">Saving...</span>}
      {savedStatus === 'saved' && <span className="absolute -bottom-5 right-0 text-[10px] px-1.5 py-0.5 rounded font-bold bg-green-500 text-white z-20">Saved!</span>}
      {savedStatus === 'error' && <span className="absolute -bottom-5 right-0 text-[10px] px-1.5 py-0.5 rounded font-bold bg-red-500 text-white z-20">Error</span>}

      <style jsx="true">{`
        .editable-wrapper:hover > div {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default EditableText;
