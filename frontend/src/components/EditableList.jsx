import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageContent } from '../context/PageContentContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const EditableList = ({ id, defaultItems, renderItem, newItemTemplate, className = '', listContainerClass = '' }) => {
  const { contentMap, updateContent } = usePageContent();
  const [items, setItems] = useState(defaultItems);
  const location = useLocation();
  const { user } = useAuth();
  
  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';

  useEffect(() => {
    if (contentMap && contentMap[id]) {
      try {
        const parsed = JSON.parse(contentMap[id]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      } catch (e) {
        console.error('Failed to parse list content', e);
      }
    }
  }, [contentMap, id]);

  const handleSave = async (newItems) => {
    setItems(newItems);
    try {
      const pathSlug = location.pathname.split('/').filter(Boolean).pop();
      const slug = pathSlug || 'home';
      
      const res = await api.post(`/page-content/${slug}`, { [id]: JSON.stringify(newItems) });
      
      if (res.status === 200) {
        if (updateContent) {
          updateContent(id, JSON.stringify(newItems));
        }
      }
    } catch (err) {
      console.error('List save error:', err);
    }
  };

  const handleUpdateItem = (index, newProps) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...newProps };
    handleSave(newItems);
  };

  const handleRemoveItem = (index) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const newItems = items.filter((_, i) => i !== index);
      handleSave(newItems);
    }
  };

  const handleAddItem = () => {
    const newItems = [...items, { ...newItemTemplate, id: Date.now().toString() }];
    handleSave(newItems);
  };
  
  const handleMove = (index, direction) => {
    if (direction === -1 && index === 0) return;
    if (direction === 1 && index === items.length - 1) return;
    
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + direction];
    newItems[index + direction] = temp;
    
    handleSave(newItems);
  };

  return (
    <div className={`relative ${className}`}>
      <div className={listContainerClass}>
        {items.map((item, index) => (
          <div key={item.id || index} className="relative group">
            {renderItem(item, index, (props) => handleUpdateItem(index, props))}
            
            {isEditMode && (
              <div className="absolute -top-3 -right-3 flex gap-1 z-[60] opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMove(index, -1); }}
                  className="bg-gray-700 text-white p-1.5 rounded-full shadow-md hover:bg-gray-800"
                  title="Move Up"
                >
                  <ArrowUp size={12} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleMove(index, 1); }}
                  className="bg-gray-700 text-white p-1.5 rounded-full shadow-md hover:bg-gray-800"
                  title="Move Down"
                >
                  <ArrowDown size={12} />
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveItem(index); }}
                  className="bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600"
                  title="Remove Item"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isEditMode && (
        <div className="mt-6 flex justify-center w-full relative z-[60]">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddItem(); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition-colors text-xs uppercase tracking-wider font-bold"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableList;
