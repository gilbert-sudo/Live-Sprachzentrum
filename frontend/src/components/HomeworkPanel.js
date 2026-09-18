import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeworks, addHomework, deleteHomework } from '../store/homeworkSlice';

export default function HomeworkPanel({ roomId, socket }) {
  const { user } = useSelector((state) => state.auth);
  const { homeworks, status } = useSelector((state) => state.homework);
  const dispatch = useDispatch();
  const role = user?.role || 'student';
  const isLoading = status === 'loading';

  // Form states for teachers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState(`Exercice du ${new Date().toLocaleDateString('fr-FR')}`);
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState('room');
  const [level, setLevel] = useState(roomId.split('-')[1] || 'A1');

  useEffect(() => {
    loadHomeworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      const onHomeworkUpdated = () => loadHomeworks();
      socket.on('homework_updated', onHomeworkUpdated);
      return () => {
        socket.off('homework_updated', onHomeworkUpdated);
      };
    }
  }, [socket, roomId]);

  const notifyUpdate = () => {
    if (socket) {
      socket.emit('homework_updated', { roomId });
    }
  };

  const loadHomeworks = () => {
    dispatch(fetchHomeworks({ roomId, level }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const payload = {
        title,
        description,
        dueDate: new Date().toISOString(), // Automatically set to today
        roomId: scope === 'room' ? roomId : null,
        level: scope === 'level' ? level : null
      };

      await dispatch(addHomework(payload)).unwrap();
      setTitle(`Exercice du ${new Date().toLocaleDateString('fr-FR')}`);
      setDescription('');
      setIsFormOpen(false);
      loadHomeworks();
      notifyUpdate();
    } catch (err) {
      console.error('Failed to add homework', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce devoir ?")) return;
    try {
      await dispatch(deleteHomework(id)).unwrap();
      loadHomeworks();
      notifyUpdate();
    } catch (err) {
      console.error('Failed to delete homework', err);
    }
  };

  const handleTogglePin = async (id) => {
    try {
      const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      await axios.patch(`/api/homework/${id}/pin`, {}, config);
      loadHomeworks();
      notifyUpdate();
    } catch (err) {
      console.error('Failed to pin/unpin homework', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFC] dark:bg-[#121214] text-gray-900 dark:text-gray-100 font-sans relative">
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#18181B] sticky top-0 z-10 pr-16">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-400 text-xl">assignment</span>
          Devoirs
        </h2>
        {(role === 'teacher' || role === 'admin') && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-1 text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Créer
          </button>
        )}
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-black dark:border-gray-600 dark:border-t-white rounded-full animate-spin"></div>
          </div>
        ) : homeworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-gray-400">done_all</span>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Aucun devoir</p>
            <p className="text-xs text-gray-400 mt-1">Vous êtes à jour.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {homeworks.map((hw) => (
              <div key={hw._id} className="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2 pr-12">
                  {hw.isPinned && (
                    <span className="material-symbols-outlined icon-filled text-orange-400 text-[14px]" title="Épinglé">push_pin</span>
                  )}
                  {hw.title}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed mb-4">
                  {hw.description}
                </p>
                
                {/* Footer with badges and actions on the bottom right */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {hw.dueDate && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        <span className="material-symbols-outlined text-[12px]">event</span>
                        {formatDate(hw.dueDate)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      <span className="material-symbols-outlined text-[12px]">person</span>
                      {hw.teacherName.replace(/Admin /g, 'Frau ')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <span className="material-symbols-outlined text-[12px]">group</span>
                      {hw.roomId ? 'Classe' : `Niveau ${hw.level}`}
                    </span>
                  </div>

                  {(role === 'teacher' || role === 'admin') && (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleTogglePin(hw._id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${hw.isPinned ? 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        title={hw.isPinned ? "Désépingler" : "Épingler"}
                      >
                        <span className={hw.isPinned ? "material-symbols-outlined icon-filled text-[18px]" : "material-symbols-outlined text-[18px]"}>push_pin</span>
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(hw._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for New Homework */}
      {isFormOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-2xl w-full max-w-sm animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Nouveau Devoir</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Titre</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Instructions</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow resize-none h-28"
                  placeholder="Détaillez le devoir ici..."
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Audience</label>
                <select 
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                >
                  <option value="room">Cette classe uniquement</option>
                  <option value="level">Tout le niveau ({level})</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all mt-4"
              >
                Publier le devoir
              </button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
