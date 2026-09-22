import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExerciseEngine from '../components/exercises/ExerciseEngine';

export default function HomeworkExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
        const res = await axios.get('/api/homework', config);
        const found = res.data.find(h => h._id === id);
        
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
  }, [id, user]);

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
            onClick={() => window.close()}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  const hasExercises = homework.exercises && homework.exercises.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.close()} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            title="Fermer l'onglet"
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
      <div className="flex-1 overflow-hidden min-h-0">
        {hasExercises ? (
          <div className="h-full overflow-y-auto">
            <ExerciseEngine exercises={homework.exercises} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <span className="material-symbols-outlined text-[64px] text-slate-300 mb-4">assignment_late</span>
              <h2 className="text-xl font-bold text-slate-700 mb-2">Aucun exercice interactif</h2>
              <p className="text-slate-500 max-w-md mx-auto">Ce devoir ne contient pas d'exercices interactifs. Veuillez lire les instructions dans le panneau des devoirs.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
