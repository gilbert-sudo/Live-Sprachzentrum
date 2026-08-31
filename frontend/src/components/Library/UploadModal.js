import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useUploadThing } from '../../utils/uploadthing';

export default function UploadModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    type: 'book',
    level: 'A1',
    duration: ''
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  
  // Advanced Upload States
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0); // bytes per second
  const [timeRemaining, setTimeRemaining] = useState(0); // seconds
  const [error, setError] = useState('');
  
  const lastProgressTime = useRef(null);
  const lastLoaded = useRef(0);

  
  const { startUpload } = useUploadThing("libraryUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
      
      if (mediaFile) {
        const total = mediaFile.size;
        const loaded = (progress / 100) * total;
        const now = Date.now();
        const timeElapsed = (now - lastProgressTime.current) / 1000;
        
        if (timeElapsed > 0.5) {
          const bytesLoadedSinceLast = loaded - lastLoaded.current;
          const speedBps = bytesLoadedSinceLast / timeElapsed;
          
          setUploadSpeed(speedBps);
          
          if (speedBps > 0) {
            const bytesRemaining = total - loaded;
            setTimeRemaining(bytesRemaining / speedBps);
          }
          
          lastProgressTime.current = now;
          lastLoaded.current = loaded;
        }
      }

      if (progress === 100) {
        setUploadState('processing');
      }
    }
  });
  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setFormData({ title: '', author: '', description: '', type: 'book', level: 'A1', duration: '' });
      setMediaFile(null);
      setCoverFile(null);
      setUploadState('idle');
      setUploadProgress(0);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 100MB validation on frontend
      if (file.size > 100 * 1024 * 1024) {
        setError('Die Datei darf maximal 100MB groß sein.');
        return;
      }
      setMediaFile(file);
      setError('');
    }
  };

  const removeMediaFile = () => {
    setMediaFile(null);
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 16 * 1024 * 1024) {
        setError('Das Cover darf maximal 16MB groß sein.');
        return;
      }
      setCoverFile(file);
      setError('');
    }
  };

  const removeCoverFile = () => {
    setCoverFile(null);
  };

  const cancelUpload = () => {
    // Note: UploadThing client doesn't support manual abort yet, so we just reset the UI state.
    setUploadState('idle');
    setUploadProgress(0);
    setError('Upload abgebrochen.');
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.ceil(seconds)}s verbleibend`;
    const m = Math.floor(seconds / 60);
    const s = Math.ceil(seconds % 60);
    return `${m}m ${s}s verbleibend`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFile) {
      setError('Bitte wähle eine Datei aus.');
      return;
    }

    setUploadState('uploading');
    setUploadProgress(0);
    setError('');
    lastProgressTime.current = Date.now();
    lastLoaded.current = 0;

    try {
      let fileUrl = null;
      let coverUrl = null;

      // 1. Upload file directly to UploadThing from the client
      if (mediaFile) {
        const filesToUpload = [mediaFile];
        if (coverFile) filesToUpload.push(coverFile);
        
        const uploadRes = await startUpload(filesToUpload);
        if (uploadRes && uploadRes.length > 0) {
          fileUrl = uploadRes[0].url || uploadRes[0].ufsUrl;
          if (coverFile && uploadRes.length > 1) {
            coverUrl = uploadRes[1].url || uploadRes[1].ufsUrl;
          }
        } else {
          throw new Error('Upload fehlgeschlagen');
        }
      }

      // 2. Send metadata and fileUrl to our backend
      const data = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        type: formData.type,
        level: formData.level,
        fileUrl: fileUrl,
        coverUrl: coverUrl
      };
      
      if (formData.type === 'audio') {
        data.duration = formData.duration;
      }

      const response = await axios.post('http://localhost:5001/api/library', data);

      setUploadState('success');
      
      // Brief pause to show success animation before closing
      setTimeout(() => {
        onSuccess(response.data);
        onClose();
      }, 1500);

    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Upload canceled');
      } else {
        console.error(err);
        setUploadState('error');
        setError(err.response?.data?.message || err.message || 'Ein unerwarteter Fehler ist aufgetreten.');
      }
    }
  };

  const acceptType = formData.type === 'book' ? 'application/pdf' : 'audio/mpeg, audio/mp3, audio/wav, audio/x-m4a';
  const isUploadingOrProcessing = uploadState === 'uploading' || uploadState === 'processing' || uploadState === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-germany-black/60 animate-fade-in backdrop-blur-md">
      <div className="bg-surface-container-lowest rounded-3xl w-full max-w-2xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Overlay when uploading */}
        {isUploadingOrProcessing && (
          <div className="absolute inset-0 z-20 bg-surface-container-lowest/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-fade-in">
            <div className="bg-surface p-8 rounded-3xl shadow-xl w-full max-w-md border border-surface-variant text-center">
              
              {uploadState === 'uploading' && (
                <>
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" className="stroke-surface-variant fill-none" strokeWidth="6" />
                      <circle 
                        cx="50" cy="50" r="45" 
                        className="stroke-germany-red fill-none transition-all duration-300 ease-out" 
                        strokeWidth="6" 
                        strokeDasharray="283" 
                        strokeDashoffset={283 - (283 * uploadProgress) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-on-surface">{uploadProgress}%</span>
                    </div>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-2">Wird hochgeladen...</h3>
                  <div className="flex justify-between text-sm text-secondary px-4 mt-4 bg-surface-container-low p-3 rounded-xl">
                    <div className="flex flex-col items-start">
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Geschwindigkeit</span>
                      <span className="font-medium text-on-surface">{formatBytes(uploadSpeed)}/s</span>
                    </div>
                    <div className="w-px h-8 bg-surface-variant mx-2"></div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Verbleibend</span>
                      <span className="font-medium text-on-surface">{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={cancelUpload}
                    className="mt-6 px-6 py-2 rounded-full font-label-md text-error hover:bg-error-container/50 transition-colors"
                  >
                    Abbrechen
                  </button>
                </>
              )}

              {uploadState === 'processing' && (
                <div className="animate-fade-in">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-4 border-surface-variant rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-germany-red rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-germany-gold animate-pulse">cloud_sync</span>
                    </div>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-2">Verarbeitung läuft</h3>
                  <p className="text-secondary text-sm">Die Datei wird in der Cloud optimiert und gespeichert. Dies kann einen Moment dauern...</p>
                </div>
              )}

              {uploadState === 'success' && (
                <div className="animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" className="animate-[dash_0.5s_ease-out_forwards]" strokeDasharray="50" strokeDashoffset="50"></path>
                    </svg>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-2 text-emerald-600 dark:text-emerald-400">Erfolgreich hochgeladen!</h3>
                  <p className="text-secondary text-sm">Das Material ist nun in der Bibliothek verfügbar.</p>
                  
                  <style>{`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: 0;
                      }
                    }
                  `}</style>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-6 md:px-8 border-b border-surface-variant shrink-0 bg-surface">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">library_add</span>
              </div>
              <div>
                <h2 className="text-title-lg font-headline-md text-on-surface">Neues Material</h2>
                <p className="text-secondary text-xs mt-0.5 font-medium">Bücher (bis 100MB) oder Audio hinzufügen</p>
              </div>
            </div>
            <button onClick={onClose} className="text-secondary hover:text-on-surface p-2 rounded-full hover:bg-surface-variant transition-colors group">
              <span className="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:px-8 overflow-y-auto flex-1 custom-scrollbar">
          {uploadState === 'error' && error && (
            <div className="mb-6 p-4 bg-error-container border border-error/20 text-on-error-container rounded-xl flex items-center gap-3 animate-slide-up shadow-sm">
              <span className="material-symbols-outlined text-[24px]">error</span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form id="uploadForm" onSubmit={handleSubmit} className="space-y-7">
            
            {/* 1. Type and Level Selection */}
            <div className="bg-surface-container-lowest p-1 rounded-xl flex bg-surface-variant/30">
              <label className={`flex-1 cursor-pointer rounded-lg py-2 text-center text-sm font-bold transition-all ${formData.type === 'book' ? 'bg-surface shadow-sm text-germany-red' : 'text-secondary hover:text-on-surface'}`}>
                <input type="radio" name="type" value="book" checked={formData.type === 'book'} onChange={handleInputChange} className="hidden" />
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">menu_book</span> Buch (PDF)
                </span>
              </label>
              <label className={`flex-1 cursor-pointer rounded-lg py-2 text-center text-sm font-bold transition-all ${formData.type === 'audio' ? 'bg-surface shadow-sm text-germany-red' : 'text-secondary hover:text-on-surface'}`}>
                <input type="radio" name="type" value="audio" checked={formData.type === 'audio'} onChange={handleInputChange} className="hidden" />
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">headphones</span> Audio
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-2">Titel</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70">title</span>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="z.B. Goethe-Zertifikat B1"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-germany-red focus:ring-4 focus:ring-germany-red/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-2">Autor / Herausgeber</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70">person</span>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="z.B. Goethe-Institut"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-germany-red focus:ring-4 focus:ring-germany-red/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-2">Sprachniveau</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70">school</span>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-germany-red focus:ring-4 focus:ring-germany-red/10 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="A1">Niveau A1 (Anfänger)</option>
                    <option value="A2">Niveau A2 (Grundlagen)</option>
                    <option value="B1">Niveau B1 (Mittelstufe)</option>
                    <option value="B2">Niveau B2 (Gute Mittelstufe)</option>
                    <option value="C1">Niveau C1 (Fortgeschritten)</option>
                    <option value="C2">Niveau C2 (Exzellente Kenntnisse)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary/70 pointer-events-none">expand_more</span>
                </div>
              </div>

              {formData.type === 'audio' && (
                <div className="animate-fade-in">
                  <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-2">Dauer</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary/70">timer</span>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="z.B. 05:30"
                      className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-germany-red focus:ring-4 focus:ring-germany-red/10 transition-all font-medium"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-2">Beschreibung (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Kurze Beschreibung des Materials..."
                rows={2}
                className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-germany-red focus:ring-4 focus:ring-germany-red/10 transition-all resize-none font-medium"
              ></textarea>
            </div>

            {/* Modern File Upload UX */}
            <div className="pt-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-3">
                {formData.type === 'book' ? 'PDF Datei hochladen' : 'Audiodatei hochladen'}
              </label>
              
              {!mediaFile ? (
                <div className="relative group w-full">
                  <div className="flex flex-col sm:flex-row items-center justify-center w-full p-8 border-2 border-dashed border-secondary/40 bg-surface hover:bg-primary-container/5 hover:border-germany-red hover:shadow-[0_0_20px_rgba(213,31,38,0.1)] rounded-2xl transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-[32px] text-secondary group-hover:text-germany-red transition-colors">cloud_upload</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-base font-bold text-on-surface mb-1">Datei auswählen oder hierher ziehen</p>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="px-2 py-1 bg-surface-variant/50 rounded-md text-xs font-bold text-secondary uppercase tracking-wider">
                          {formData.type === 'book' ? 'PDF' : 'MP3, WAV'}
                        </span>
                        <span className="text-sm font-medium text-secondary">
                          bis zu 100MB
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept={acceptType}
                      onChange={handleMediaChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full p-4 border-2 border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl shadow-sm animate-fade-in group hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-surface flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-emerald-600 text-[28px]">
                        {formData.type === 'book' ? 'picture_as_pdf' : 'audio_file'}
                      </span>
                    </div>
                    <div className="min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{mediaFile.name}</p>
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-600/80">{formatBytes(mediaFile.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="p-2.5 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-surface-variant text-gray-600 dark:text-gray-300 rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant cursor-pointer flex items-center" title="Datei ändern">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                      <input type="file" accept={acceptType} onChange={handleMediaChange} className="hidden" />
                    </label>
                    <button
                      type="button"
                      onClick={removeMediaFile}
                      className="p-2.5 bg-white dark:bg-surface hover:bg-error hover:text-on-error text-error rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant flex items-center"
                      title="Datei entfernen"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {formData.type === 'audio' && (
              <div className="pt-2 animate-fade-in">
                <label className="block text-xs uppercase tracking-wider font-bold text-secondary mb-3">
                  Cover-Bild (Optional)
                </label>
                
                {!coverFile ? (
                  <div className="relative group w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center w-full p-6 border-2 border-dashed border-secondary/40 bg-surface hover:bg-primary-container/5 hover:border-germany-red hover:shadow-[0_0_20px_rgba(213,31,38,0.1)] rounded-2xl transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-300">
                        <span className="material-symbols-outlined text-[24px] text-secondary group-hover:text-germany-red transition-colors">image</span>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-sm font-bold text-on-surface mb-1">Bild auswählen oder hierher ziehen</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="px-2 py-1 bg-surface-variant/50 rounded-md text-[10px] font-bold text-secondary uppercase tracking-wider">
                            JPG, PNG
                          </span>
                          <span className="text-xs font-medium text-secondary">
                            bis zu 16MB
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleCoverChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full p-3 border-2 border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl shadow-sm animate-fade-in group hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                        <img src={URL.createObjectURL(coverFile)} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{coverFile.name}</p>
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-600/80">{formatBytes(coverFile.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <label className="p-2 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-surface-variant text-gray-600 dark:text-gray-300 rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant cursor-pointer flex items-center" title="Bild ändern">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleCoverChange} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={removeCoverFile}
                        className="p-2 bg-white dark:bg-surface hover:bg-error hover:text-on-error text-error rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant flex items-center"
                        title="Bild entfernen"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-surface-variant shrink-0 bg-surface-container-lowest">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold text-secondary hover:bg-surface-variant transition-colors"
            >
              Abbrechen
            </button>
            <button
              form="uploadForm"
              type="submit"
              className="px-8 py-3 rounded-xl font-bold bg-germany-red text-white hover:bg-surface-tint shadow-[0_4px_14px_rgba(213,31,38,0.39)] hover:shadow-[0_6px_20px_rgba(213,31,38,0.23)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">cloud_upload</span>
              Material hochladen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
