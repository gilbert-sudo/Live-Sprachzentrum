import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HomeworkScoresModal — Teacher-only modal that shows all student scores
 * for a specific homework. Opens via the 📊 icon on interactive homework cards.
 */
export default function HomeworkScoresModal({ isOpen, onClose, homeworkId, homeworkTitle }) {
  const { user } = useSelector(state => state.auth);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen || !homeworkId) return;
    const fetchScores = async () => {
      setLoading(true);
      setError('');
      try {
        const config = user?.token ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
        const res = await axios.get(`/api/homework/${homeworkId}/scores`, config);
        setScores(res.data.scores || []);
      } catch (err) {
        setError('Impossible de charger les scores.');
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [isOpen, homeworkId, user]);

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getScoreColor = (pct) => {
    if (pct >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
    if (pct >= 70) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    if (pct >= 50) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20';
  };

  // Mini circular ring for each student
  const MiniRing = ({ pct }) => {
    const r = 16;
    const circ = 2 * Math.PI * r;
    const off = circ - (pct / 100) * circ;
    const color = pct >= 90 ? '#10b981' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f59e0b' : '#ef4444';
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} />
      </svg>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-[#18181B] rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-indigo-500">analytics</span>
                  Résultats des élèves
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{homeworkTitle}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex justify-center py-10">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                </div>
              )}

              {error && (
                <div className="text-center py-6 text-red-500 text-sm">{error}</div>
              )}

              {!loading && !error && scores.length === 0 && (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-[40px] text-gray-300 mb-2">school</span>
                  <p className="text-sm text-gray-500 font-medium">Aucun élève n'a encore soumis ce devoir.</p>
                </div>
              )}

              {!loading && scores.length > 0 && (
                <div className="space-y-2">
                  {/* Summary bar */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-gray-800 dark:text-gray-100">{scores.length}</p>
                      <p className="text-[10px] text-gray-400">Soumissions</p>
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-indigo-600">
                        {Math.round(scores.reduce((a, s) => a + (s.percentage || 0), 0) / scores.length)}%
                      </p>
                      <p className="text-[10px] text-gray-400">Moyenne</p>
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-emerald-600">
                        {Math.max(...scores.map(s => s.percentage || 0))}%
                      </p>
                      <p className="text-[10px] text-gray-400">Meilleur</p>
                    </div>
                  </div>

                  {/* Student rows */}
                  {scores.map((s, i) => (
                    <motion.div
                      key={s._id || i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl px-4 py-3"
                    >
                      {/* Mini ring */}
                      <div className="relative shrink-0">
                        <MiniRing pct={s.percentage || 0} />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black rotate-90" style={{ color: '#6b7280' }}>
                          {s.percentage || 0}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{s.studentName}</p>
                        <p className="text-[11px] text-gray-400">{formatDate(s.completedAt)}</p>
                      </div>

                      {/* Score badge */}
                      <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${getScoreColor(s.percentage || 0)}`}>
                        {s.score}/{s.total}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
