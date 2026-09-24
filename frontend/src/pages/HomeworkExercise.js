import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExerciseEngine from '../components/exercises/ExerciseEngine';
import ScoreResultModal from '../components/exercises/ScoreResultModal';

export default function HomeworkExercise(props) {
  const { id: paramId, reviewScore } = props;
  const isWithNavbar = props.isStandalonePage === true;
  const exerciseId = props.id || paramId;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Scoring state ─────────────────────────────────────────────────
  // Map: exerciseIndex → { score, total }
  const scoresRef = useRef({});
  const [checkedCount, setCheckedCount] = useState(0);      // how many exercises have been checked
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });
  const [isSubmittingScore, setIsSubmittingScore] = useState(false);

  const isStudent = user?.role === 'student';

  const studentSubmission = isStudent ? homework?.scores?.find(s => s.studentId === user._id) : null;
  const savedAnswers = reviewScore?.answers || studentSubmission?.answers || null;

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
        setError("Erreur lors du chargement de l'exercice.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomework();
  }, [exerciseId, user]);

  // Called by each exercise when student clicks "Antworten prüfen"
  const handleExerciseScored = async (index, score, total, userAnswers) => {
    scoresRef.current[index] = { score, total, userAnswers };
    const newCheckedCount = Object.keys(scoresRef.current).length;
    setCheckedCount(newCheckedCount);

    if (!isStudent) return;
    
    // Recalculate aggregated score immediately for accurate saving
    const currentAggregatedScore = Object.values(scoresRef.current).reduce(
      (acc, val) => ({ score: acc.score + val.score, total: acc.total + val.total }),
      { score: 0, total: 0 }
    );

    const prevScore = studentSubmission?.score || 0;
    const prevTotal = studentSubmission?.total || 0;
    const combinedTotal = prevTotal + currentAggregatedScore.total;
    const combinedScore = prevScore + currentAggregatedScore.score;
    const percentage = combinedTotal > 0 ? Math.round((combinedScore / combinedTotal) * 100) : 0;
    
    const answers = homework.exercises.map((_, idx) => {
      if (scoresRef.current[idx]?.userAnswers) return scoresRef.current[idx].userAnswers;
      if (studentSubmission?.answers && studentSubmission.answers[idx]) return studentSubmission.answers[idx];
      return null;
    });

    try {
      const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      await axios.post(`/api/homework/${exerciseId}/score`, { score: combinedScore, total: combinedTotal, percentage, answers }, config);
      
      const prevCheckedCount = studentSubmission?.answers ? studentSubmission.answers.filter(a => a !== null).length : 0;
      const effectiveCount = prevCheckedCount + newCheckedCount;
      if (effectiveCount >= scorableExercises && scorableExercises > 0) {
        setFinalScore({ score: combinedScore, total: combinedTotal });
        setShowResultModal(true);
      }
    } catch (err) {
      console.error('Failed to auto-save score', err);
    }
  };

  const totalExercises = homework?.exercises?.length || 0;
  const scorableExercises = homework?.exercises?.filter(e =>
    ['fill-in-the-blanks','matching','multiple-choice','true-false','categorization','ordering','crossword','text-marking','transformation'].includes(e.type)
  ).length || 0;

  // Aggregate total score / total questions from scoreable exercises checked so far
  const aggregatedScore = Object.values(scoresRef.current).reduce(
    (acc, { score, total }) => ({ score: acc.score + score, total: acc.total + total }),
    { score: 0, total: 0 }
  );

  // Circular progress: based on how many scoreable exercises have been checked
  const previouslyCheckedCount = studentSubmission?.answers ? studentSubmission.answers.filter(a => a !== null).length : 0;
  const effectiveCheckedCount = previouslyCheckedCount + checkedCount;
  const ringProgress = scorableExercises > 0 ? effectiveCheckedCount / scorableExercises : 0;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const ringOffset = circumference - ringProgress * circumference;
  const ringPct = scorableExercises > 0 ? Math.round(ringProgress * 100) : 0;
  const allChecked = effectiveCheckedCount >= scorableExercises && scorableExercises > 0;

  // ── Teacher edit handlers ─────────────────────────────────────────
  const handleDeleteBlock = (indexToDelete) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet exercice ?')) return;
    const updatedExercises = homework.exercises.filter((_, index) => index !== indexToDelete);
    setHomework({ ...homework, exercises: updatedExercises });
    setIsEdited(true);
  };

  const handleUpdateBlock = (indexToUpdate, updatedExercise) => {
    const updatedExercises = [...homework.exercises];
    updatedExercises[indexToUpdate] = updatedExercise;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-background">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-surface-variant border-t-primary rounded-full animate-spin" />
          <p className="mt-4 text-secondary font-medium">Chargement des exercices...</p>
        </div>
      </div>
    );
  }

  if (error || !homework) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 text-on-background">
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 max-w-md w-full text-center">
          <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
          <h2 className="text-xl font-bold mb-2">Erreur</h2>
          <p className="text-secondary mb-6">{error || 'Exercice introuvable.'}</p>
          <button
            onClick={() => props.onClose ? props.onClose() : navigate(-1)}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold hover:bg-surface-tint transition-colors shadow-md"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const hasExercises = homework.exercises && homework.exercises.length > 0;
  const canEdit = user && (user._id === homework.teacherId || user.role === 'admin');
  const stickyClass = isWithNavbar ? 'top-14 md:top-[72px]' : 'top-0';

  return (
    <div className="w-full relative bg-background min-h-screen text-on-background font-body-md">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className={`bg-surface border-b border-surface-variant/50 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm z-40 sticky ${stickyClass}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => props.onClose ? props.onClose() : navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface transition-colors"
            title="Fermer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div>
            <h1 className="text-sm font-bold text-on-surface leading-tight line-clamp-1">{homework.title}</h1>
            <p className="text-xs text-secondary font-medium">Par {homework.teacherName.replace(/Admin /g, 'Frau ')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Circular progress ring in header */}
          {hasExercises && scorableExercises > 0 && (
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="7" />
                  <circle
                    cx="40" cy="40" r={radius} fill="none"
                    stroke={allChecked ? '#10b981' : '#6366f1'}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={ringOffset}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-black" style={{ color: allChecked ? '#10b981' : '#6366f1' }}>
                    {ringPct}%
                  </span>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-semibold text-on-surface">{effectiveCheckedCount}/{scorableExercises}</p>
                <p className="text-[9px] text-secondary">vérifié</p>
              </div>
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-4 py-2 rounded-full bg-gradient-to-r from-primary to-indigo-500 text-white shadow-md shadow-primary/30">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Mode Exercice
          </span>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="w-full pt-6 pb-32">
        {hasExercises ? (
          <ExerciseEngine
            exercises={homework.exercises}
            savedAnswers={savedAnswers}
            canEdit={canEdit}
            onDeleteBlock={handleDeleteBlock}
            onUpdateBlock={handleUpdateBlock}
            onExerciseScored={isStudent ? handleExerciseScored : undefined}
          />
        ) : (
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 p-6 md:p-8">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">{homework.title}</h2>
              <div 
                className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: homework.description }} 
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action bar (student submit or teacher save) ──────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-3xl mx-auto px-4 pb-6 flex items-center justify-center gap-3 pointer-events-auto">

          {/* Student auto-saves, no button needed */}

          {/* Teacher: Save changes */}
          {canEdit && isEdited && (
            <button
              onClick={handleSaveAllChanges}
              disabled={isSaving}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold shadow-lg transition-all ${
                isSaving
                  ? 'bg-surface-variant/50 text-secondary cursor-not-allowed'
                  : 'bg-primary text-on-primary hover:bg-surface-tint hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              <span className={`material-symbols-outlined ${isSaving ? 'animate-spin' : ''}`}>
                {isSaving ? 'sync' : 'save'}
              </span>
              {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          )}
        </div>
      </div>

      {/* ── Score Result Modal ──────────────────────────────────────── */}
      <ScoreResultModal
        isOpen={showResultModal}
        score={finalScore.score}
        total={finalScore.total}
        isSaving={isSubmittingScore}
        onClose={() => {
          setShowResultModal(false);
          props.onClose ? props.onClose() : navigate(-1);
        }}
      />
    </div>
  );
}
