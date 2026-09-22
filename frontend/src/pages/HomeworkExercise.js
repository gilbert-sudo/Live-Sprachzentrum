import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExerciseEngine from '../components/exercises/ExerciseEngine';

export default function HomeworkExercise(props) {
  const { id: paramId } = useParams();
  const isDirectRoute = !props.id;
  const isWithNavbar = props.isStandalonePage === true;
  const exerciseId = props.id || paramId;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
        const res = await axios.get('/api/homework', config);
        const found = res.data.find(h => h._id === exerciseId);
        
        if (found) {
          setHomework(found);
        } else {
          setError('Exercice introuvable.');
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement de l\'exercice.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [exerciseId, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-medium">Chargement des exercices...</p>
        </div>
      </div>
    );
  }

  if (error || !homework) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <span className="material-symbols-outlined text-[48px] text-red-500 mb-4">error</span>
          <h2 className="text-xl font-bold mb-2">Erreur</h2>
          <p className="text-slate-600 mb-6">{error || 'Exercice introuvable.'}</p>
          <button 
            onClick={() => props.onClose ? props.onClose() : navigate(-1)}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const hasExercises = homework.exercises && homework.exercises.length > 0;
  
  const canEdit = user && (user._id === homework.teacherId || user.role === 'admin');

  const handleDeleteBlock = (indexToDelete) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet exercice ?')) {
      return;
    }

    const updatedExercises = homework.exercises.filter((_, index) => index !== indexToDelete);
    setHomework({ ...homework, exercises: updatedExercises });
    setIsEdited(true);
  };

  const handleSaveAllChanges = async () => {
    setIsSaving(true);
    try {
      const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      await axios.put(`/api/homework/${exerciseId}/exercises`, { exercises: homework.exercises }, config);
      setIsEdited(false);
      alert('Modifications enregistrées avec succès.');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement des modifications.");
    } finally {
      setIsSaving(false);
    }
  };

  const stickyClass = isWithNavbar ? 'top-14 md:top-[72px]' : 'top-0';

  return (
    <div className="w-full relative bg-slate-50 min-h-screen">
      {/* Header */}
      <div className={`bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-40 sticky ${stickyClass}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => props.onClose ? props.onClose() : navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            title="Fermer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{homework.title}</h1>
            <p className="text-xs text-slate-500 font-medium">Par {homework.teacherName.replace(/Admin /g, 'Frau ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
             <span className="material-symbols-outlined text-[14px]">menu_book</span>
             Mode Exercice
           </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pt-6">
        {hasExercises ? (
          <ExerciseEngine exercises={homework.exercises} canEdit={canEdit} onDeleteBlock={handleDeleteBlock} />
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-[64px] text-slate-300 mb-4">assignment_late</span>
              <h2 className="text-xl font-bold text-slate-700 mb-2">Aucun exercice interactif</h2>
              <p className="text-slate-500 max-w-md mx-auto">Ce devoir ne contient pas d'exercices interactifs. Veuillez lire les instructions dans le panneau des devoirs.</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Save Button */}
      {canEdit && isEdited && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <button 
            onClick={handleSaveAllChanges}
            disabled={isSaving}
            className={`px-8 py-3.5 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all ${
              isSaving 
                ? 'bg-slate-400 text-white cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            <span className={`material-symbols-outlined ${isSaving ? 'animate-spin' : ''}`}>
              {isSaving ? 'sync' : 'save'}
            </span>
            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      )}
    </div>
  );
}
