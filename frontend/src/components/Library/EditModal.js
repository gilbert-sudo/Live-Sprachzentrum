import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditModal({ isOpen, onClose, onSuccess, item, books = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    level: 'A1',
    duration: '',
    linkedBook: ''
  });
  
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, success, error
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && item) {
      setFormData({
        title: item.title || '',
        author: item.author || '',
        description: item.description || '',
        level: item.level || 'A1',
        duration: item.duration || '',
        linkedBook: item.linkedBook || ''
      });
      setUploadState('idle');
      setError('');
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadState('uploading');
    setError('');

    try {
      const data = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        level: formData.level,
      };
      
      if (item.type === 'audio' || item.type === 'album') {
        data.linkedBook = formData.linkedBook;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.put(`${API_URL}/api/library/${item._id}`, data);

      setUploadState('success');
      
      setTimeout(() => {
        onSuccess(response.data);
        onClose();
      }, 1000);

    } catch (err) {
      console.error(err);
      setUploadState('error');
      setError(err.response?.data?.message || err.message || 'Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const isUploadingOrProcessing = uploadState === 'uploading' || uploadState === 'success';
  const isSubmitting = uploadState === 'uploading';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-germany-black/60 animate-fade-in backdrop-blur-md">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Overlay when uploading */}
        {isUploadingOrProcessing && (
          <div className="absolute inset-0 z-20 bg-surface-container-lowest/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-fade-in">
            <div className="bg-surface p-8 rounded-3xl shadow-xl w-full max-w-md border border-surface-variant text-center">
              
              {uploadState === 'uploading' && (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-4 border-surface-variant rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-germany-red rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-2">Wird gespeichert...</h3>
                </>
              )}

              {uploadState === 'success' && (
                <div className="animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className="animate-[dash_0.5s_ease-out_forwards]" strokeDasharray="50" strokeDashoffset="50"></path>
                    </svg>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-2 text-emerald-600 dark:text-emerald-400">Erfolgreich gespeichert!</h3>
                  <style>{`
                    @keyframes dash {
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-surface-variant shrink-0 bg-surface">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-germany-red/10 flex items-center justify-center text-germany-red shrink-0">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </div>
              <div>
                <h2 className="text-title-md font-bold text-on-surface leading-tight">Material bearbeiten</h2>
                <p className="text-secondary text-[10px] mt-0.5 font-medium">Metadaten anpassen</p>
              </div>
            </div>
            <button onClick={onClose} className="text-secondary hover:text-on-surface p-1.5 rounded-full hover:bg-surface-variant transition-colors group shrink-0">
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-300">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-5 py-4 overflow-y-auto flex-1 custom-scrollbar">
          {error && (
            <div className="mb-4 p-3 bg-error-container border border-error/20 text-on-error-container rounded-lg flex items-center gap-2 animate-slide-up shadow-sm">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          <form id="editForm" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Titel</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70 text-[18px]">title</span>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="z.B. Goethe-Zertifikat B1"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl pl-9 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Autor / Herausgeber</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70 text-[18px]">person</span>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="z.B. Goethe-Institut"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl pl-9 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Sprachniveau</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70 text-[18px]">school</span>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl pl-9 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="A1">Niveau A1 (Anfänger)</option>
                    <option value="A2">Niveau A2 (Grundlagen)</option>
                    <option value="B1">Niveau B1 (Mittelstufe)</option>
                    <option value="B2">Niveau B2 (Gute Mittelstufe)</option>
                    <option value="C1">Niveau C1 (Fortgeschritten)</option>
                    <option value="C2">Niveau C2 (Exzellente Kenntnisse)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary/70 pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              {(item.type === 'audio' || item.type === 'album') && (
                <div className="animate-fade-in">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Verknüpftes Buch (Optional)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70 text-[18px]">book</span>
                    <select
                      name="linkedBook"
                      value={formData.linkedBook}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl pl-9 pr-3 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="">Kein Buch verknüpfen</option>
                      {books.map(book => (
                        <option key={book._id} value={book._id}>{book.title}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary/70 pointer-events-none text-[18px]">expand_more</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Beschreibung (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Kurze Beschreibung des Materials..."
                rows={1}
                className="w-full bg-surface-container-lowest border border-surface-variant rounded-xl px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all resize-none font-medium"
              ></textarea>
            </div>
            
          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-surface-variant shrink-0 bg-surface-container-lowest">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-sm font-bold text-secondary hover:bg-surface-variant transition-colors"
            >
              Abbrechen
            </button>
            <button
              form="editForm"
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg text-sm font-bold bg-germany-red text-white hover:bg-surface-tint shadow-[0_2px_8px_rgba(213,31,38,0.3)] hover:shadow-[0_4px_12px_rgba(213,31,38,0.2)] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Speichern...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Änderungen speichern
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
