import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLibraryItems } from '../../store/librarySlice';

export default function LibraryAudioPickerModal({ onClose, onSelect }) {
  const dispatch = useDispatch();
  const { libraryItems, status } = useSelector((state) => state.library);
  const [activeAlbum, setActiveAlbum] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLibraryItems());
    }
  }, [status, dispatch]);

  const audiosAndAlbums = libraryItems.filter(item => item.type === 'audio' || item.type === 'album');

  const handleSelectTrack = (audioUrl, audioTitle) => {
    onSelect(audioUrl, audioTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-[#18181B] w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1f1f23]">
          <div className="flex items-center gap-3">
            {activeAlbum ? (
              <button 
                onClick={() => setActiveAlbum(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-200"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400">library_music</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {activeAlbum ? activeAlbum.title : 'Sélectionner un fichier audio'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeAlbum ? 'Choisissez une piste de l\'album' : 'Choisissez une piste audio ou un album depuis la bibliothèque'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-500 dark:text-gray-400"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white dark:bg-[#18181B]">
          {status === 'loading' ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : activeAlbum ? (
            /* Album Tracks View */
            (!activeAlbum.audios || activeAlbum.audios.length === 0) ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2">music_off</span>
                <p>Cet album ne contient aucune piste.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {activeAlbum.audios.map((track, idx) => {
                  const trackTitle = track.title || track.originalName || `Piste ${idx + 1}`;
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleSelectTrack(track.fileUrl, trackTitle)}
                      className="flex items-center gap-4 p-3 sm:p-4 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 shrink-0">
                        <span className="font-bold text-sm group-hover:hidden">{idx + 1}</span>
                        <span className="material-symbols-outlined hidden group-hover:block text-[20px]">add_circle</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate">{trackTitle}</h4>
                        <p className="text-xs text-gray-500 truncate">{activeAlbum.author}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Main Library View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {audiosAndAlbums.map(item => (
                <div 
                  key={item._id}
                  onClick={() => {
                    if (item.type === 'album') {
                      setActiveAlbum(item);
                    } else {
                      handleSelectTrack(item.fileUrl, item.title || item.originalName);
                    }
                  }}
                  className="flex flex-col group cursor-pointer"
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:shadow-md transition-all">
                    {item.coverUrl ? (
                      <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="material-symbols-outlined text-[48px] text-indigo-300 dark:text-indigo-500/50">
                          {item.type === 'album' ? 'album' : 'audio_file'}
                        </span>
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wide">
                      {item.type === 'album' ? 'Album' : 'Audio'}
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.author || 'Inconnu'}</p>
                </div>
              ))}
              {audiosAndAlbums.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  <span className="material-symbols-outlined text-4xl mb-2">library_music</span>
                  <p>Aucun fichier audio ou album disponible dans la bibliothèque.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
