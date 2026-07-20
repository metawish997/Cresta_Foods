import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Trash2, GripVertical, Save, ChevronUp, ChevronDown, Settings, Image as ImageIcon, Layout, AlignLeft, AlignRight, X } from 'lucide-react';
import { usePageContent } from '../context/PageContentContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicSections = ({ slotId = 'default' }) => {
  const { contentMap, updateContent } = usePageContent();
  const { user } = useAuth();
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSettings, setActiveSettings] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const isEditMode = new URLSearchParams(location.search).get('mode') === 'edit' && user && user.role === 'admin';
  const contentKey = `dynamic_sections_${slotId}`;

  useEffect(() => {
    const rawData = contentMap?.[contentKey];
    if (rawData) {
      try {
        const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        if (Array.isArray(parsed)) {
          setSections(parsed);
        }
      } catch (e) {
        console.error(`Failed to parse dynamic sections for ${slotId}:`, e);
      }
    } else {
        setSections([]);
    }
  }, [contentMap, contentKey, slotId]);

  const saveToDatabase = async (updatedSections) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const pathSlug = location.pathname.split('/').filter(Boolean).pop();
      const slug = pathSlug || 'home';
      
      const res = await fetch(`http://localhost:5001/api/page-content/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [contentKey]: JSON.stringify(updatedSections) })
      });
      
      if (res.ok) {
        if (updateContent) {
          updateContent(contentKey, JSON.stringify(updatedSections));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      subtitle: 'NEW SECTION',
      title: 'Click to edit title',
      content: 'Click to edit content area...',
      layout: 'full', // 'full', 'split'
      alignment: 'left', // 'left', 'right'
      image: null
    };
    const updated = [...sections, newSection];
    setSections(updated);
    saveToDatabase(updated);
  };

  const removeSection = (id) => {
    if (!window.confirm("Remove this section?")) return;
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    saveToDatabase(updated);
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newSections.length) return;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
    saveToDatabase(newSections);
  };

  if (!isEditMode && sections.length === 0) return null;

  return (
    <section className={`dynamic-slot-section slot-${slotId} ${isEditMode ? 'edit-slot-active relative my-8 border border-dashed border-primary-300 bg-primary-50/10 p-8 rounded-xl' : 'py-16 md:py-24'}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-[6%]">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id} 
            className={`seo-block-luxe layout-${section.layout || 'full'} align-${section.alignment || 'left'} relative group mb-20 last:mb-0`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <div className="seo-block-header relative mb-10">
              <div className="seo-title-wrapper max-w-4xl">
                <div className="eyebrow-container flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-accent"></div>
                  {isEditMode ? (
                    <div contentEditable 
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newVal = e.target.innerText;
                        if (newVal !== section.subtitle) {
                          const updated = sections.map(s => s.id === section.id ? { ...s, subtitle: newVal } : s);
                          setSections(updated);
                          saveToDatabase(updated);
                        }
                      }}
                      className="text-accent text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase font-body outline-none border-b border-dashed border-accent/30 focus:border-accent"
                    >
                      {section.subtitle || 'SUBTITLE'}
                    </div>
                  ) : (
                    section.subtitle && <span className="text-accent text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase font-body">{section.subtitle}</span>
                  )}
                </div>

                {isEditMode ? (
                  <div contentEditable 
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newVal = e.target.innerText;
                      if (newVal !== section.title) {
                        const updated = sections.map(s => s.id === section.id ? { ...s, title: newVal } : s);
                        setSections(updated);
                        saveToDatabase(updated);
                      }
                    }}
                    className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1a2332] dark:text-white leading-[1.15] outline-none hover:bg-gray-50 focus:bg-white rounded transition-colors -ml-2 p-2 focus:ring-2 ring-primary-200"
                  >
                    {section.title}
                  </div>
                ) : (
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#1a2332] dark:text-white leading-[1.15]">{section.title}</h2>
                )}
              </div>
              
              {isEditMode && (
                <div className="absolute -top-4 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white shadow-sm border border-gray-100 rounded-lg p-1">
                    <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded" onClick={() => setActiveSettings(activeSettings === section.id ? null : section.id)} title="Section Settings"><Settings size={16}/></button>
                    <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded disabled:opacity-30" onClick={() => moveSection(idx, -1)} disabled={idx === 0} title="Move Up"><ChevronUp size={16}/></button>
                    <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded disabled:opacity-30" onClick={() => moveSection(idx, 1)} disabled={idx === sections.length - 1} title="Move Down"><ChevronDown size={16}/></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" onClick={() => removeSection(section.id)} title="Delete"><Trash2 size={16} /></button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {isEditMode && activeSettings === section.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10 flex flex-wrap gap-8 overflow-hidden"
                >
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">LAYOUT</label>
                    <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
                      <button 
                        className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${section.layout === 'full' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => {
                          const updated = sections.map(s => s.id === section.id ? { ...s, layout: 'full' } : s);
                          setSections(updated);
                          saveToDatabase(updated);
                        }}
                      >
                        <Layout size={16}/> Full Width
                      </button>
                      <button 
                        className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${section.layout === 'split' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => {
                          const updated = sections.map(s => s.id === section.id ? { ...s, layout: 'split' } : s);
                          setSections(updated);
                          saveToDatabase(updated);
                        }}
                      >
                        <ImageIcon size={16}/> Split Layout
                      </button>
                    </div>
                  </div>

                  {section.layout === 'split' && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">ALIGNMENT</label>
                      <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
                        <button 
                          className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${section.alignment === 'left' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => {
                            const updated = sections.map(s => s.id === section.id ? { ...s, alignment: 'left' } : s);
                            setSections(updated);
                            saveToDatabase(updated);
                          }}
                        >
                          <AlignLeft size={16}/> Image Left
                        </button>
                        <button 
                          className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors ${section.alignment === 'right' ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}
                          onClick={() => {
                            const updated = sections.map(s => s.id === section.id ? { ...s, alignment: 'right' } : s);
                            setSections(updated);
                            saveToDatabase(updated);
                          }}
                        >
                          <AlignRight size={16}/> Image Right
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">IMAGE</label>
                    <div className="w-48 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative bg-white overflow-hidden group/img">
                      {section.image ? (
                        <>
                          <img src={section.image} alt="Preview" className="w-full h-full object-cover" />
                          <button className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 rounded-full shadow-sm opacity-0 group-hover/img:opacity-100 transition-opacity" onClick={() => {
                            const updated = sections.map(s => s.id === section.id ? { ...s, image: null } : s);
                            setSections(updated);
                            saveToDatabase(updated);
                          }}><X size={14}/></button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setIsUploading(true);
                              try {
                                const formData = new FormData();
                                formData.append('image', file);
                                const token = localStorage.getItem('token');
                                const res = await fetch('http://localhost:5001/api/upload/image', {
                                  method: 'POST',
                                  headers: { 'Authorization': `Bearer ${token}` },
                                  body: formData
                                });
                                const data = await res.json();
                                if (data.url) {
                                  let newSrc = data.url;
                                  if (newSrc.startsWith('/uploads/')) {
                                    newSrc = `http://localhost:5001${newSrc}`;
                                  }
                                  const updated = sections.map(s => s.id === section.id ? { ...s, image: newSrc } : s);
                                  setSections(updated);
                                  saveToDatabase(updated);
                                }
                              } catch (err) {
                                console.error(err);
                              } finally {
                                setIsUploading(false);
                              }
                            }}
                          />
                          <span className="text-xs text-gray-500 font-medium">
                            {isUploading ? 'Uploading...' : 'Click to upload image'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className={`grid gap-10 md:gap-16 items-center ${section.layout === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {section.image && section.layout === 'split' && (
                 <div className={`w-full ${section.alignment === 'right' ? 'lg:order-2' : ''}`}>
                    <img src={section.image} alt={section.title} className="w-full h-auto rounded-lg shadow-xl" />
                 </div>
              )}
              
              <div className="flex flex-col">
                {isEditMode ? (
                  <div contentEditable 
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newVal = e.target.innerText;
                      if (newVal !== section.content) {
                        const updated = sections.map(s => s.id === section.id ? { ...s, content: newVal } : s);
                        setSections(updated);
                        saveToDatabase(updated);
                      }
                    }}
                    className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-body outline-none hover:bg-gray-50 focus:bg-white rounded transition-colors -ml-3 p-3 focus:ring-2 ring-primary-200 min-h-[100px] whitespace-pre-wrap"
                  >
                    {section.content}
                  </div>
                ) : (
                  <div className="space-y-6 text-gray-600 dark:text-gray-400 text-[13px] sm:text-sm md:text-[15px] font-body leading-relaxed md:leading-[1.8]">
                    {section.content.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
                
                {!isEditMode && section.image && section.layout === 'full' && (
                   <div className="w-full mt-12">
                      <img src={section.image} alt={section.title} className="w-full h-auto rounded-xl shadow-lg" />
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isEditMode && (
          <div className="flex justify-center mt-16 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <button 
              className="relative z-10 bg-white border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-300 hover:shadow-md p-3 rounded-full transition-all transform hover:scale-110" 
              onClick={addSection} 
              title={`Add block to ${slotId}`}
            >
              <Plus size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicSections;
