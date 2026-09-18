import React, { useState, useEffect } from 'react';
import PdfReaderModal from '../components/EBook/PdfReaderModal';
import UploadModal from '../components/Library/UploadModal';
import EditModal from '../components/Library/EditModal';

import AudioPlayer from '../components/EBook/AudioPlayer';
import AlbumViewModal from '../components/Library/AlbumViewModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLibraryItems, deleteLibraryItem } from '../store/librarySlice';

export default function Bibliothek({ readOnly = false }) {
  const [activeTab, setActiveTab] = useState('books');
  const [activeAudio, setActiveAudio] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real data state
  const dispatch = useDispatch();
  const { libraryItems, status, error } = useSelector((state) => state.library);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLibraryItems());
    }
  }, [status, dispatch]);

  // Simulating user role (in a real app, this comes from auth context)
  const isTeacher = true && !readOnly; // Hidden if readOnly is true

  const handleDelete = async (id) => {
    if (!window.confirm('Möchtest du dieses Material wirklich löschen?')) return;
    
    try {
      await dispatch(deleteLibraryItem(id)).unwrap();
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
    // Relying on Redux state, can optionally dispatch fetch if not handled in modal
    dispatch(fetchLibraryItems());
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleEditSuccess = (updatedItem) => {
    dispatch(fetchLibraryItems());
  };

  const filteredLibraryItems = libraryItems.filter(item => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
      (item.author && item.author.toLowerCase().includes(lowerQuery)) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
  });

  const books = filteredLibraryItems.filter(item => item.type === 'book');
  const audios = filteredLibraryItems.filter(item => item.type === 'audio' || item.type === 'album');

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

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-variant mb-6 pb-2">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-2 font-label-md text-label-md transition-colors relative ${
              activeTab === 'books' ? 'text-germany-red' : 'text-secondary hover:text-on-surface'
            }`}
          >
            Bücher ({books.length})
            {activeTab === 'books' && (
              <span className="absolute -bottom-[9px] left-0 w-full h-[2px] bg-germany-red rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-2 font-label-md text-label-md transition-colors relative ${
              activeTab === 'audio' ? 'text-germany-red' : 'text-secondary hover:text-on-surface'
            }`}
          >
            Hörverstehen ({audios.length})
            {activeTab === 'audio' && (
              <span className="absolute -bottom-[9px] left-0 w-full h-[2px] bg-germany-red rounded-t-full"></span>
            )}
          </button>
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Suchen (Titel, Autor...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-surface-variant rounded-full pl-10 pr-4 py-2 text-sm text-on-surface focus:outline-none focus:border-germany-red focus:ring-2 focus:ring-germany-red/10 transition-all font-medium shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface flex items-center justify-center bg-surface-variant/50 hover:bg-surface-variant rounded-full p-0.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
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
                <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden flex items-center justify-center">
                  <img 
                    src={book.coverUrl || 'https://placehold.co/400x600/e8e8e8/333333?text=Buch'} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x600/e8e8e8/333333?text=Buch'; }}
                  />
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
                  <div className="absolute top-2 right-2 flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(book); }}
                      className="bg-germany-black/70 text-white p-1.5 rounded-full hover:bg-surface-tint shadow-md cursor-pointer flex items-center justify-center transition-colors"
                      title="Bearbeiten"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(book._id); }}
                      className="bg-germany-black/70 text-white p-1.5 rounded-full hover:bg-germany-red shadow-md cursor-pointer flex items-center justify-center transition-colors"
                      title="Löschen"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
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
              <div 
                key={audio._id} 
                className={`bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200 group relative ${audio.type === 'album' ? 'cursor-pointer hover:shadow-md' : ''}`}
                onClick={() => {
                  if (audio.type === 'album') setActiveAlbum(audio);
                }}
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-low">
                  <img 
                    src={audio.coverUrl} 
                    alt={audio.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/e8e8e8/333333?text=' + (audio.type === 'album' ? 'Album' : 'Audio'); }}
                  />
                  <div className="absolute inset-0 bg-germany-black/20 group-hover:bg-transparent transition-colors"></div>
                  {audio.type === 'album' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-germany-black/40">
                      <span className="material-symbols-outlined text-white text-[28px]">open_in_new</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-germany-gold uppercase tracking-wider bg-tertiary-container/10 px-2 py-0.5 rounded-full">{audio.level}</span>
                    {audio.type === 'album' && <span className="bg-gradient-to-r from-germany-red to-orange-500 text-white text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">ALBUM</span>}
                    {audio.duration && <span className="text-xs text-secondary">{audio.duration}</span>}
                  </div>
                  <h3 className="font-title-lg text-title-lg text-on-surface truncate leading-tight" title={audio.title}>{audio.title}</h3>
                  <p className="font-label-sm text-label-sm text-secondary truncate">{audio.author} {audio.description && `• ${audio.description}`}</p>
                  {audio.type === 'album' && <p className="text-xs text-secondary mt-0.5 font-medium">{audio.audios?.length || 0} Titel</p>}
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  {isTeacher && (
                    <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-lowest/90 backdrop-blur-sm p-1 rounded-full border border-surface-variant shadow-sm">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEdit(audio); }}
                        className="text-secondary hover:text-surface-tint p-1.5 rounded-full hover:bg-surface-variant transition-colors flex items-center justify-center"
                        title="Bearbeiten"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(audio._id); }}
                        className="text-secondary hover:text-error p-1.5 rounded-full hover:bg-error-container transition-colors flex items-center justify-center"
                        title="Löschen"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  )}

                  {audio.type === 'album' ? (
                    <button 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors bg-surface-container-high text-germany-red hover:bg-surface-tint hover:text-white"
                    >
                      <span className="material-symbols-outlined fill">play_arrow</span>
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePlayAudio(audio); }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                        activeAudio?._id === audio._id ? 'bg-surface-tint text-white' : 'bg-surface-container-high text-germany-red hover:bg-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined fill">
                        {activeAudio?._id === audio._id ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                  )}
                </div>
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
        <PdfReaderModal 
          book={activeBook} 
          audios={audios}
          activeAudio={activeAudio}
          onPlayAudio={handlePlayAudio}
          onClose={() => setActiveBook(null)} 
        />
      )}

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
        books={books}
      />

      {/* Edit Modal */}
      <EditModal 
        isOpen={!!itemToEdit} 
        onClose={() => setItemToEdit(null)}
        onSuccess={handleEditSuccess}
        item={itemToEdit}
        books={books}
      />

      {/* Album View Modal */}
      <AlbumViewModal 
        album={activeAlbum}
        onClose={() => setActiveAlbum(null)}
        onPlayTrack={handlePlayAudio}
        activeAudio={activeAudio}
      />
    </div>
  );
}
