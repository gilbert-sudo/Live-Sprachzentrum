import React, { useState, useEffect } from 'react';
import PdfReaderModal from '../components/EBook/PdfReaderModal';
import UploadModal from '../components/Library/UploadModal';
import PdfCover from '../components/Library/PdfCover';
import AudioPlayer from '../components/EBook/AudioPlayer';

export default function Bibliothek({ readOnly = false }) {
  const [activeTab, setActiveTab] = useState('books');
  const [activeAudio, setActiveAudio] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Real data state
  const [libraryItems, setLibraryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Simulating user role (in a real app, this comes from auth context)
  const isTeacher = true && !readOnly; // Hidden if readOnly is true

  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const fetchLibraryItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/library');
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Bibliothek');
      }
      const data = await response.json();
      setLibraryItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Möchtest du dieses Material wirklich löschen?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/library/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Fehler beim Löschen');
      
      setLibraryItems(prev => prev.filter(item => item._id !== id));
      if (activeAudio && activeAudio._id === id) setActiveAudio(null);
    } catch (err) {
      console.error(err);
      alert('Fehler beim Löschen des Materials.');
    }
  };

  const handlePlayAudio = (audio) => {
    setActiveAudio(audio);
  };

  const handleReadBook = (book) => {
    setActiveBook(book);
  };

  const handleUploadSuccess = (newItem) => {
    setLibraryItems(prev => [newItem, ...prev]);
  };

  const books = libraryItems.filter(item => item.type === 'book');
  const audios = libraryItems.filter(item => item.type === 'audio');

  return (
    <div className="max-w-container-max-width mx-auto px-4 md:px-8 py-6 md:py-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-[36px] text-germany-red">local_library</span>
            Bibliothek
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Dein virtueller Lesesaal und Hörbuch-Bereich.
          </p>
        </div>
        {isTeacher && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-germany-red text-white px-4 py-2 rounded-lg font-label-md flex items-center gap-2 hover:bg-surface-tint shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">upload</span>
            <span className="hidden sm:inline">Neues Material</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-surface-variant mb-6">
        <button
          onClick={() => setActiveTab('books')}
          className={`pb-2 px-4 font-label-md text-label-md transition-colors relative ${
            activeTab === 'books' ? 'text-germany-red' : 'text-secondary hover:text-on-surface'
          }`}
        >
          Bücher ({books.length})
          {activeTab === 'books' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-germany-red rounded-t-full"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={`pb-2 px-4 font-label-md text-label-md transition-colors relative ${
            activeTab === 'audio' ? 'text-germany-red' : 'text-secondary hover:text-on-surface'
          }`}
        >
          Hörverstehen ({audios.length})
          {activeTab === 'audio' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-germany-red rounded-t-full"></span>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="material-symbols-outlined animate-spin text-germany-red text-[40px]">progress_activity</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Content Grid */}
      {!isLoading && !error && activeTab === 'books' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {books.length === 0 ? (
            <p className="text-secondary col-span-full">Noch keine Bücher vorhanden.</p>
          ) : (
            books.map((book) => (
              <div key={book._id} className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-subtle overflow-hidden hover:-translate-y-1 transition-transform duration-200 group relative">
                <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
                  <PdfCover pdfUrl={book.fileUrl || book.url} />
                  <div className="absolute inset-0 bg-germany-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <button 
                      onClick={() => handleReadBook(book)}
                      className="bg-germany-red text-white p-3 rounded-full hover:bg-surface-tint shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200"
                    >
                      <span className="material-symbols-outlined fill">menu_book</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-germany-gold uppercase tracking-wider">{book.level}</span>
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface truncate" title={book.title}>{book.title}</h3>
                  <p className="font-label-sm text-label-sm text-secondary truncate">{book.author}</p>
                </div>
                {isTeacher && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(book._id); }}
                    className="absolute top-2 right-2 bg-germany-black/70 text-white p-1.5 rounded-full hover:bg-germany-red opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-md cursor-pointer"
                    title="Löschen"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {!isLoading && !error && activeTab === 'audio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {audios.length === 0 ? (
            <p className="text-secondary col-span-full">Noch keine Hörverstehen-Materialien vorhanden.</p>
          ) : (
            audios.map((audio) => (
              <div key={audio._id} className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200 group relative">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-low">
                  <img 
                    src={audio.coverUrl} 
                    alt={audio.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/e8e8e8/333333?text=Audio'; }}
                  />
                  <div className="absolute inset-0 bg-germany-black/20"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-germany-gold uppercase tracking-wider bg-tertiary-container/10 px-2 py-0.5 rounded-full">{audio.level}</span>
                    {audio.duration && <span className="text-xs text-secondary">{audio.duration}</span>}
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface truncate leading-tight" title={audio.title}>{audio.title}</h3>
                  <p className="font-label-sm text-label-sm text-secondary truncate">{audio.author} • {audio.description}</p>
                </div>
                <button 
                  onClick={() => handlePlayAudio(audio)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors mr-6 md:mr-0 ${
                    activeAudio?._id === audio._id ? 'bg-surface-tint text-white' : 'bg-surface-container-high text-germany-red hover:bg-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined fill">
                    {activeAudio?._id === audio._id ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                {isTeacher && (
                  <button 
                    onClick={() => handleDelete(audio._id)}
                    className="absolute top-2 right-2 text-secondary hover:text-germany-red md:opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Löschen"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Floating Audio Player */}
      {activeAudio && (
        <AudioPlayer 
          audioUrl={activeAudio.fileUrl} 
          title={activeAudio.title} 
          onClose={() => setActiveAudio(null)} 
        />
      )}

      {/* PDF Reader Modal */}
      {activeBook && (
        <PdfReaderModal book={activeBook} onClose={() => setActiveBook(null)} />
      )}

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
