import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeworks, addHomework, deleteHomework, updateHomework } from '../store/homeworkSlice';
import { fetchClassrooms } from '../store/classroomsSlice';
import HomeworkExercise from '../pages/HomeworkExercise';
import HomeworkScoresModal from './exercises/HomeworkScoresModal';
import { getLevelColor } from '../utils/levelColors';

export default function HomeworkPanel({ roomId, socket, isStandalonePage }) {
  const { user } = useSelector((state) => state.auth);
  const { homeworks, status } = useSelector((state) => state.homework);
  const { classrooms } = useSelector((state) => state.classrooms);
  const dispatch = useDispatch();
  const role = user?.role || 'student';
  const isLoading = status === 'loading';

  // Form states for teachers
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [activeReviewScore, setActiveReviewScore] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLevelView, setSelectedLevelView] = useState(null);
  const [editingHomework, setEditingHomework] = useState(null);
  const [title, setTitle] = useState(`Exercice du ${new Date().toLocaleDateString('fr-FR')}`);
  const [description, setDescription] = useState('');
  const [scope, setScope] = useState(roomId ? 'room' : 'level');
  const [selectedRoomId, setSelectedRoomId] = useState(roomId || '');
  const [selectedLevel, setSelectedLevel] = useState((roomId && roomId.includes('-')) ? roomId.split('-')[1] : 'A1');
  const [exercisesData, setExercisesData] = useState(null);
  const [jsonFileName, setJsonFileName] = useState('');
  const [scoresModalData, setScoresModalData] = useState(null);

  useEffect(() => {
    loadHomeworks();
    if (role === 'teacher' || role === 'admin') {
      dispatch(fetchClassrooms());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, role]);

  useEffect(() => {
    if (socket) {
      const onHomeworkUpdated = () => loadHomeworks();
      socket.on('homework_updated', onHomeworkUpdated);
      return () => {
        socket.off('homework_updated', onHomeworkUpdated);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomId]);

  const notifyUpdate = () => {
    if (socket) {
      socket.emit('homework_updated', { roomId });
    }
  };

  const loadHomeworks = () => {
    let fetchLevel;
    if (roomId) {
      fetchLevel = roomId.split('-')[1];
    } else if (role === 'student' && user?.level) {
      fetchLevel = user.level;
    } else {
      fetchLevel = null;
    }
    dispatch(fetchHomeworks({ roomId, level: fetchLevel }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const payload = {
        title,
        description,
        dueDate: new Date().toISOString(), // Automatically set to today
        roomId: scope === 'room' ? selectedRoomId : null,
        level: scope === 'level' ? selectedLevel : null,
        exercises: exercisesData || []
      };

      await dispatch(addHomework(payload)).unwrap();
      setTitle(`Exercice du ${new Date().toLocaleDateString('fr-FR')}`);
      setDescription('');
      setExercisesData(null);
      setJsonFileName('');
      setIsFormOpen(false);
      loadHomeworks();
      notifyUpdate();
    } catch (err) {
      console.error('Failed to add homework', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !description || !editingHomework) return;

    try {
      const payload = {
        title,
        description,
        roomId: scope === 'room' ? selectedRoomId : null,
        level: scope === 'level' ? selectedLevel : null,
      };

      await dispatch(updateHomework({ id: editingHomework._id, payload })).unwrap();
      setTitle(`Exercice du ${new Date().toLocaleDateString('fr-FR')}`);
      setDescription('');
      setEditingHomework(null);
      loadHomeworks();
      notifyUpdate();
    } catch (err) {
      console.error('Failed to update homework', err);
    }
  };

  const openEditModal = (hw) => {
    setEditingHomework(hw);
    setTitle(hw.title);
    setDescription(hw.description);
    if (hw.roomId) {
      setScope('room');
      setSelectedRoomId(hw.roomId);
    } else if (hw.level) {
      setScope('level');
      setSelectedLevel(hw.level);
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      alert("Veuillez sélectionner un fichier JSON valide.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          setExercisesData(parsed);
          setJsonFileName(file.name);
        } else {
          alert("Le fichier JSON doit contenir un tableau d'exercices.");
        }
      } catch (err) {
        console.error("Error parsing JSON:", err);
        alert("Le fichier JSON est invalide.");
      }
    };
    reader.readAsText(file);
  };

  const groupedHomeworks = useMemo(() => {
    const groups = {};
    homeworks.forEach(hw => {
      let level = hw.level;
      if (!level && hw.roomId && hw.roomId.includes('-')) {
        level = hw.roomId.split('-')[1];
      }
      if (!level) level = 'Alle';

      if (!groups[level]) groups[level] = [];
      groups[level].push(hw);
    });

    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === 'Alle') return 1;
      if (b === 'Alle') return -1;
      return a.localeCompare(b);
    });

    return sortedKeys.map(key => ({
      level: key,
      items: groups[key]
    }));
  }, [homeworks]);

  useEffect(() => {
    if (selectedLevelView) {
      const exists = groupedHomeworks.some(g => g.level === selectedLevelView);
      if (!exists) {
        setSelectedLevelView(null);
      }
    }
  }, [groupedHomeworks, selectedLevelView]);

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFC] dark:bg-[#121214] text-gray-900 dark:text-gray-100 font-sans relative min-h-0">
      
      {activeExerciseId ? (
        <HomeworkExercise 
          id={activeExerciseId} 
          reviewScore={activeReviewScore}
          onClose={() => { 
            setActiveExerciseId(null); 
            setActiveReviewScore(null); 
            loadHomeworks();
            notifyUpdate();
          }} 
          isStandalonePage={isStandalonePage} 
        />
      ) : (
        <>
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-[#18181B] sticky top-0 z-10 pr-16">
        <div className="flex items-center gap-2">
          {selectedLevelView && (
            <button onClick={() => setSelectedLevelView(null)} className="p-1.5 -ml-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          )}
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-400 text-xl">assignment</span>
            {selectedLevelView ? (selectedLevelView === 'Alle' ? 'Devoirs Généraux' : `Niveau ${selectedLevelView}`) : 'Devoirs'}
          </h2>
        </div>
        {(role === 'teacher' || role === 'admin') && (
          <button 
            onClick={() => {
              if (roomId) {
                setScope('room');
                setSelectedRoomId(roomId);
              } else if (selectedLevelView && selectedLevelView !== 'Alle') {
                setScope('level');
                setSelectedLevel(selectedLevelView);
              } else {
                setScope('level');
              }
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1 text-sm font-medium bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Créer
          </button>
        )}
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar" data-lenis-prevent>
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
        ) : !selectedLevelView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedHomeworks.map(({ level, items }) => (
              <div 
                key={level} 
                onClick={() => setSelectedLevelView(level)}
                className="bg-white dark:bg-[#202024] border border-gray-200 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer group flex flex-col items-center text-center gap-3 relative overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-inner mt-2 ${getLevelColor(level).badge}`}>
                  {level === 'Alle' ? 'All' : level}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {level === 'Alle' ? 'Devoirs Généraux' : `Niveau ${level}`}
                  </h3>
                  <p className="text-sm text-gray-500">{items.length} devoir{items.length !== 1 ? 's' : ''}</p>
                </div>
                <button className="mt-2 w-full py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  Voir les devoirs <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 p-2">
            {groupedHomeworks.find(g => g.level === selectedLevelView)?.items.map((hw) => {
              const studentScore = role === 'student' ? hw.scores?.find(s => s.studentId === user._id) : null;
                    const completedExercisesCount = studentScore?.answers ? studentScore.answers.filter(a => a !== null).length : 0;
                    const hasExercises = hw.exercises && hw.exercises.length > 0;
                    const scorableCount = hw.exercises?.filter(e => ['fill-in-the-blanks','matching','multiple-choice','true-false','categorization','ordering','crossword','text-marking','transformation'].includes(e.type)).length || 0;
                    const isFullyDone = hasExercises && scorableCount > 0 && completedExercisesCount >= scorableCount;
                    const isStarted = completedExercisesCount > 0;
                    return (
                    <div key={hw._id} className="group bg-white dark:bg-[#2B2D31] rounded-3xl p-6 shadow-md dark:shadow-lg dark:shadow-black/40 hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 border border-gray-200 dark:border-white/10 relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-white/10 dark:via-white/20 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                            {hw.isPinned && (
                              <span className="material-symbols-outlined icon-filled text-orange-400 text-[18px]" title="Épinglé">push_pin</span>
                            )}
                            {hw.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap leading-relaxed line-clamp-3">
                            {hw.description}
                          </p>
                        </div>

                        {hasExercises && (
                          <div className="shrink-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl p-3 border border-gray-100 dark:border-white/5">
                            <div className="relative w-14 h-14">
                              <svg width="56" height="56" viewBox="0 0 48 48" className="-rotate-90">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-white/10" />
                                <circle 
                                  cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                                  className={`${isFullyDone ? 'text-green-500' : 'text-gray-900 dark:text-white'} transition-all duration-1000`}
                                  strokeDasharray={2 * Math.PI * 20}
                                  strokeDashoffset={(2 * Math.PI * 20) - ((hasExercises ? completedExercisesCount / hw.exercises.length : 0) * (2 * Math.PI * 20))}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[11px] font-black text-gray-800 dark:text-gray-200">
                                  {completedExercisesCount}/{hw.exercises.length}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">
                              {isFullyDone ? 'Terminé' : isStarted ? `${studentScore.percentage}% Score` : 'À faire'}
                            </p>
                          </div>
                        )}
                      </div>

                      {hasExercises && (
                        <div className="mb-5">
                          <button 
                            onClick={() => setActiveExerciseId(hw._id)}
                            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
                              isFullyDone 
                                ? 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20' 
                                : 'bg-gradient-to-r from-germany-red to-primary text-white shadow-md shadow-germany-red/20 hover:shadow-lg hover:shadow-germany-red/40 hover:-translate-y-0.5'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">{isFullyDone ? 'done_all' : 'edit_document'}</span>
                            {isFullyDone ? 'Revoir mes réponses' : isStarted ? "Continuer l'exercice" : "Faire l'exercice"}
                          </button>
                        </div>
                      )}
                      
                      {/* Footer with badges and actions */}
                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 dark:border-white/5 pt-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {hw.dueDate && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 whitespace-nowrap">
                              <span className="material-symbols-outlined text-[14px]">event</span>
                              {formatDate(hw.dueDate)}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300 whitespace-nowrap">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                            {hw.teacherName?.replace(/Admin /g, 'Frau ') || 'Frau '}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 whitespace-nowrap">
                            <span className="material-symbols-outlined text-[14px]">group</span>
                            {hw.roomId ? 'Classe' : `Niveau ${hw.level}`}
                          </span>
                        </div>

                        {(role === 'teacher' || role === 'admin') && (
                          <div className="flex items-center justify-end gap-1">
                            {hasExercises && (
                              <button 
                                onClick={() => setScoresModalData({ id: hw._id, title: hw.title })}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
                                title="Résultats des élèves"
                              >
                                <span className="material-symbols-outlined text-[18px]">analytics</span>
                              </button>
                            )}
                            
                            <button 
                              onClick={() => openEditModal(hw)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-colors"
                              title="Modifier"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>

                            <button 
                              onClick={() => handleTogglePin(hw._id)}
                              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${hw.isPinned ? 'text-orange-500 bg-orange-500/10' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'}`}
                              title={hw.isPinned ? "Désépingler" : "Épingler"}
                            >
                              <span className={hw.isPinned ? "material-symbols-outlined icon-filled text-[18px]" : "material-symbols-outlined text-[18px]"}>push_pin</span>
                            </button>
                            
                            <button 
                              onClick={() => handleDelete(hw._id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"
                              title="Supprimer"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )})}
          </div>
        )}
      </div>

      {/* Modal for New Homework */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
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
                <div className="flex gap-2">
                  <select 
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-1/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                  >
                    <option value="room">Une classe</option>
                    <option value="level">Un niveau complet</option>
                  </select>
                  
                  {scope === 'room' ? (
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-2/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                    >
                      {roomId && !classrooms?.find(c => c.roomId === roomId) && (
                         <option value={roomId}>Cette classe ({roomId})</option>
                      )}
                      {!roomId && <option value="" disabled>Sélectionner une classe</option>}
                      {classrooms?.map(c => (
                        <option key={c._id} value={c.roomId}>{c.name} ({c.roomId})</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-2/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                    >
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                        <option key={l} value={l}>Niveau {l}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Exercices (JSON)</label>
                <div className="relative">
                  <input 
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="json-upload"
                  />
                  <label 
                    htmlFor="json-upload" 
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="material-symbols-outlined text-gray-400 text-2xl mb-2">upload_file</span>
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                        {jsonFileName ? (
                           <span className="font-semibold text-indigo-600 dark:text-indigo-400">{jsonFileName}</span>
                        ) : (
                           <span className="font-semibold">Cliquez pour ajouter des exercices</span>
                        )}
                      </p>
                    </div>
                  </label>
                </div>
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
      </>
      )}

      {/* Modal for Edit Homework */}
      {editingHomework && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-2xl w-full max-w-sm animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Modifier le Devoir</h3>
              <button onClick={() => setEditingHomework(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-800 w-7 h-7 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
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
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Audience</label>
                <div className="flex gap-2">
                  <select 
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-1/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                  >
                    <option value="room">Une classe</option>
                    <option value="level">Un niveau complet</option>
                  </select>
                  
                  {scope === 'room' ? (
                    <select
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="w-2/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                    >
                      {roomId && !classrooms?.find(c => c.roomId === roomId) && (
                         <option value={roomId}>Cette classe ({roomId})</option>
                      )}
                      {!roomId && <option value="" disabled>Sélectionner une classe</option>}
                      {classrooms?.map(c => (
                        <option key={c._id} value={c.roomId}>{c.name} ({c.roomId})</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-2/3 bg-gray-50 dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all appearance-none"
                    >
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                        <option key={l} value={l}>Niveau {l}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all mt-4"
              >
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Scores Modal */}
      <HomeworkScoresModal 
        isOpen={!!scoresModalData} 
        onClose={() => setScoresModalData(null)}
        homeworkId={scoresModalData?.id}
        homeworkTitle={scoresModalData?.title}
        onViewStudent={(scoreEntry) => {
          setActiveReviewScore(scoreEntry);
          setActiveExerciseId(scoresModalData.id);
          setScoresModalData(null);
        }}
      />
    </div>
  );
}
