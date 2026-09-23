import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScoreResultModal — shown after student submits a completed homework
 * Displays a circular score ring, a congratulations message, and a close button.
 */
export default function ScoreResultModal({ isOpen, score, total, onClose, isSaving }) {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  // SVG circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Ausgezeichnet! 🌟', color: '#10b981', ring: '#10b981', bg: 'from-emerald-500/10 to-teal-500/5' };
    if (percentage >= 70) return { label: 'Sehr gut! 👍', color: '#3b82f6', ring: '#3b82f6', bg: 'from-blue-500/10 to-indigo-500/5' };
    if (percentage >= 50) return { label: 'Gut gemacht! ✨', color: '#f59e0b', ring: '#f59e0b', bg: 'from-amber-500/10 to-yellow-500/5' };
    return { label: 'Weiter üben! 💪', color: '#ef4444', ring: '#ef4444', bg: 'from-red-500/10 to-rose-500/5' };
  };

  const grade = getGrade();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className={`relative bg-white dark:bg-[#18181B] rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 dark:border-gray-800`}
          >
            {/* Gradient header background */}
            <div className={`absolute inset-0 bg-gradient-to-b ${grade.bg} pointer-events-none`} />

            <div className="relative p-8 flex flex-col items-center">
              {/* Circular Progress Ring */}
              <div className="relative w-36 h-36 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  {/* Track */}
                  <circle
                    cx="64" cy="64" r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  {/* Progress */}
                  <motion.circle
                    cx="64" cy="64" r={radius}
                    fill="none"
                    stroke={grade.ring}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                    className="text-3xl font-black"
                    style={{ color: grade.ring }}
                  >
                    {percentage}%
                  </motion.span>
                  <span className="text-xs text-gray-400 font-medium">{score}/{total}</span>
                </div>
              </div>

              {/* Grade label */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 text-center"
              >
                {grade.label}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8"
              >
                {isSaving ? 'Score wird gespeichert…' : 'Dein Score wurde gespeichert!'}
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 w-full mb-8"
              >
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black text-green-600">{score}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Richtig</p>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black text-red-500">{total - score}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Falsch</p>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black text-gray-700 dark:text-gray-200">{total}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Gesamt</p>
                </div>
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onClick={onClose}
                disabled={isSaving}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-sm transition-all active:scale-95 disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${grade.ring}, ${grade.ring}cc)` }}
              >
                {isSaving ? 'Speichern…' : 'Fertig'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
