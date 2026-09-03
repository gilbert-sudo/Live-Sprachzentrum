import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useUploadThing } from '../../utils/uploadthing';

export default function UploadModal({ isOpen, onClose, onSuccess, books = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    type: 'book', // 'book', 'audio', 'album'
    level: 'A1',
    duration: '',
    linkedBook: ''
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
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
      setFormData({ title: '', author: '', description: '', type: 'book', level: 'A1', duration: '', linkedBook: '' });
      setMediaFile(null);
      setMediaFiles([]);
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
    if (e.target.files && e.target.files.length > 0) {
      if (formData.type === 'album') {
        const filesArray = Array.from(e.target.files);
        const oversized = filesArray.some(f => f.size > 100 * 1024 * 1024);
        if (oversized) {
          setError('Eine oder mehrere Dateien sind größer als 100MB.');
          return;
        }
        setMediaFiles(prev => [...prev, ...filesArray]);
        setError('');
      } else {
        const file = e.target.files[0];
        if (file.size > 100 * 1024 * 1024) {
          setError('Die Datei darf maximal 100MB groß sein.');
          return;
        }
        setMediaFile(file);
        setError('');
        
        // Auto-calculate duration behind the scenes
        if (file.type.startsWith('audio/')) {
          const objectUrl = URL.createObjectURL(file);
          const audio = new Audio(objectUrl);
          audio.onloadedmetadata = () => {
            const time = audio.duration;
            if (!isNaN(time)) {
              const minutes = Math.floor(time / 60);
              const seconds = Math.floor(time % 60);
              const durationStr = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
              setFormData(prev => ({ ...prev, duration: durationStr }));
            }
            URL.revokeObjectURL(objectUrl);
          };
        }
      }
    }
  };

  const removeMediaFile = () => {
    setMediaFile(null);
  };
  
  const removeMediaFileFromArray = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
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
    if (formData.type !== 'album' && !mediaFile) {
      setError('Bitte wähle eine Datei aus.');
      return;
    }
    if (formData.type === 'album' && mediaFiles.length === 0) {
      setError('Bitte wähle mindestens eine Audiodatei für das Album aus.');
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
      let audios = [];

      // 1. Upload file directly to UploadThing from the client
      if (formData.type === 'album') {
        const filesToUpload = [...mediaFiles];
        if (coverFile) filesToUpload.push(coverFile);
        
        const uploadRes = await startUpload(filesToUpload);
        if (uploadRes && uploadRes.length >= mediaFiles.length) {
          audios = uploadRes.slice(0, mediaFiles.length).map((res, index) => ({
            title: mediaFiles[index].name.replace(/\.[^/.]+$/, ""),
            fileUrl: res.url || res.ufsUrl,
            originalName: mediaFiles[index].name
          }));
          
          if (coverFile && uploadRes.length > mediaFiles.length) {
            coverUrl = uploadRes[uploadRes.length - 1].url || uploadRes[uploadRes.length - 1].ufsUrl;
          }
        } else {
          throw new Error('Upload fehlgeschlagen');
        }
      } else if (mediaFile) {
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
        coverUrl: coverUrl,
        linkedBook: formData.type === 'album' && formData.linkedBook ? formData.linkedBook : undefined,
        audios: formData.type === 'album' ? audios : undefined
      };
      
      if (formData.type === 'audio') {
        data.duration = formData.duration;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${API_URL}/api/library`, data);

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
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden relative">
        
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
        <div className="px-5 py-4 border-b border-surface-variant shrink-0 bg-surface">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">library_add</span>
              </div>
              <div>
                <h2 className="text-title-md font-bold text-on-surface leading-tight">Neues Material</h2>
                <p className="text-secondary text-[10px] mt-0.5 font-medium">Bücher (bis 100MB) oder Audio hinzufügen</p>
              </div>
            </div>
            <button onClick={onClose} className="text-secondary hover:text-on-surface p-1.5 rounded-full hover:bg-surface-variant transition-colors group">
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform duration-300">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-5 py-4 overflow-y-auto flex-1 custom-scrollbar">
          {uploadState === 'error' && error && (
            <div className="mb-4 p-3 bg-error-container border border-error/20 text-on-error-container rounded-lg flex items-center gap-2 animate-slide-up shadow-sm">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          <form id="uploadForm" onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Type and Level Selection */}
            <div className="bg-surface-container-lowest p-1 rounded-xl flex bg-surface-variant/30">
              <label className={`flex-1 cursor-pointer rounded-lg py-1.5 text-center text-xs font-bold transition-all ${formData.type === 'book' ? 'bg-surface shadow-sm text-germany-red' : 'text-secondary hover:text-on-surface'}`}>
                <input type="radio" name="type" value="book" checked={formData.type === 'book'} onChange={handleInputChange} className="hidden" />
                <span className="flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span> Buch
                </span>
              </label>
              <label className={`flex-1 cursor-pointer rounded-lg py-1.5 text-center text-xs font-bold transition-all ${formData.type === 'audio' ? 'bg-surface shadow-sm text-germany-red' : 'text-secondary hover:text-on-surface'}`}>
                <input type="radio" name="type" value="audio" checked={formData.type === 'audio'} onChange={handleInputChange} className="hidden" />
                <span className="flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">headphones</span> Audio
                </span>
              </label>
              <label className={`flex-1 cursor-pointer rounded-lg py-1.5 text-center text-xs font-bold transition-all ${formData.type === 'album' ? 'bg-surface shadow-sm text-germany-red' : 'text-secondary hover:text-on-surface'}`}>
                <input type="radio" name="type" value="album" checked={formData.type === 'album'} onChange={handleInputChange} className="hidden" />
                <span className="flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">library_music</span> Album
                </span>
              </label>
            </div>

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

              {(formData.type === 'audio' || formData.type === 'album') && (
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

            {/* Modern File Upload UX */}
            <div className="pt-1">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1.5">
                {formData.type === 'book' ? 'PDF Datei hochladen' : formData.type === 'album' ? 'Audiodateien hochladen (Album)' : 'Audiodatei hochladen'}
              </label>
              
              {formData.type === 'album' ? (
                <div className="space-y-2">
                  <div className="relative group w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center w-full p-4 border-2 border-dashed border-secondary/40 bg-surface hover:bg-primary-container/5 hover:border-germany-red hover:shadow-[0_0_20px_rgba(213,31,38,0.1)] rounded-xl transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-2 sm:mb-0 sm:mr-3 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px] text-secondary group-hover:text-germany-red transition-colors">library_music</span>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-on-surface mb-0.5">Audiodateien hinzufügen</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="px-1.5 py-0.5 bg-surface-variant/50 rounded text-[9px] font-bold text-secondary uppercase tracking-wider">
                            MP3, WAV
                          </span>
                        </div>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept={acceptType}
                        onChange={handleMediaChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>
                  
                  {mediaFiles.length > 0 && (
                    <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-3 max-h-40 overflow-y-auto custom-scrollbar">
                      <h4 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-germany-red text-[16px]">queue_music</span>
                        Ausgewählte Titel ({mediaFiles.length})
                      </h4>
                      <div className="space-y-1">
                        {mediaFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-1.5 hover:bg-surface-variant/30 rounded-lg group transition-colors">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] font-bold text-secondary w-4 text-right">{index + 1}.</span>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-on-surface truncate">{file.name}</p>
                                <p className="text-[9px] text-secondary">{formatBytes(file.size)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMediaFileFromArray(index)}
                              className="p-1 text-secondary hover:text-error hover:bg-error-container/50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                              title="Titel entfernen"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : !mediaFile ? (
                <div className="relative group w-full">
                  <div className="flex flex-col sm:flex-row items-center justify-center w-full p-5 border-2 border-dashed border-secondary/40 bg-surface hover:bg-primary-container/5 hover:border-germany-red hover:shadow-[0_0_20px_rgba(213,31,38,0.1)] rounded-xl transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-[24px] text-secondary group-hover:text-germany-red transition-colors">cloud_upload</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-sm font-bold text-on-surface mb-1">Datei auswählen oder hierher ziehen</p>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="px-1.5 py-0.5 bg-surface-variant/50 rounded text-[10px] font-bold text-secondary uppercase tracking-wider">
                          {formData.type === 'book' ? 'PDF' : 'MP3, WAV'}
                        </span>
                        <span className="text-xs font-medium text-secondary">
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
                <div className="flex items-center justify-between w-full p-3 border border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl shadow-sm animate-fade-in group hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-surface flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-emerald-600 text-[22px]">
                        {formData.type === 'book' ? 'picture_as_pdf' : 'audio_file'}
                      </span>
                    </div>
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{mediaFile.name}</p>
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                      </div>
                      <p className="text-[10px] font-semibold text-emerald-600/80">{formatBytes(mediaFile.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <label className="p-1.5 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-surface-variant text-gray-600 dark:text-gray-300 rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant cursor-pointer flex items-center" title="Datei ändern">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      <input type="file" accept={acceptType} onChange={handleMediaChange} className="hidden" />
                    </label>
                    <button
                      type="button"
                      onClick={removeMediaFile}
                      className="p-1.5 bg-white dark:bg-surface hover:bg-error hover:text-on-error text-error rounded-full transition-all shadow-sm border border-gray-200 dark:border-surface-variant flex items-center"
                      title="Datei entfernen"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {(formData.type === 'audio' || formData.type === 'album') && (
              <div className="pt-1 animate-fade-in">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-secondary mb-1.5">
                  Cover-Bild (Optional)
                </label>
                
                {!coverFile ? (
                  <div className="relative group w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center w-full p-4 border-2 border-dashed border-secondary/40 bg-surface hover:bg-primary-container/5 hover:border-germany-red hover:shadow-[0_0_20px_rgba(213,31,38,0.1)] rounded-xl transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px] text-secondary group-hover:text-germany-red transition-colors">image</span>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-on-surface mb-0.5">Bild auswählen oder hierher ziehen</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span className="px-1.5 py-0.5 bg-surface-variant/50 rounded text-[9px] font-bold text-secondary uppercase tracking-wider">
                            JPG, PNG
                          </span>
                          <span className="text-[10px] font-medium text-secondary">
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
                  <div className="flex items-center justify-between w-full p-2.5 border border-emerald-500/80 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl shadow-sm animate-fade-in group hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-surface flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                        <img src={URL.createObjectURL(coverFile)} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{coverFile.name}</p>
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                        </div>
                        <p className="text-[10px] font-semibold text-emerald-600/80">{formatBytes(coverFile.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <label className="p-1.5 bg-white dark:bg-surface hover:bg-gray-100 dark:hover:bg-surface-variant text-gray-600 dark:text-gray-300 rounded-lg transition-all shadow-sm border border-gray-200 dark:border-surface-variant cursor-pointer flex items-center" title="Bild ändern">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleCoverChange} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={removeCoverFile}
                        className="p-1.5 bg-white dark:bg-surface hover:bg-error hover:text-on-error text-error rounded-lg transition-all shadow-sm border border-gray-200 dark:border-surface-variant flex items-center"
                        title="Bild entfernen"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
              form="uploadForm"
              type="submit"
              className="px-6 py-2 rounded-lg text-sm font-bold bg-germany-red text-white hover:bg-surface-tint shadow-[0_2px_8px_rgba(213,31,38,0.3)] hover:shadow-[0_4px_12px_rgba(213,31,38,0.2)] hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              Material hochladen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
