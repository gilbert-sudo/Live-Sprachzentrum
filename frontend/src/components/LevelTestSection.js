import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { getLevelColor } from '../utils/levelColors';
import { fetchMyLevelTestResults, readCachedLevelTestResults } from '../store/levelTestSlice';

export const LEVEL_SHOWCASE_STEPS = [
  {
    id: 'a2',
    target: 'A2',
    exam: 'A1',
    stageLabel: 'Grundlagen',
    questions: 30,
    minutes: 25
  },
  {
    id: 'b1',
    target: 'B1',
    exam: 'A2',
    stageLabel: 'Mittelstufe',
    questions: 30,
    minutes: 30
  },
  {
    id: 'b2',
    target: 'B2',
    exam: 'B1',
    stageLabel: 'Gute Mittelstufe',
    questions: 30,
    minutes: 35
  }
];

export default function LevelTestSection({ className = 'mb-4' }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { savedResults: reduxSavedLevelTests } = useSelector((state) => state.levelTest);

  useEffect(() => {
    dispatch(fetchMyLevelTestResults());
  }, [dispatch, user]);

  const savedLevelTests = reduxSavedLevelTests || readCachedLevelTestResults();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link
        to="/level-test"
        aria-label="Einstufungstest Deutsch öffnen"
        className="group block w-full rounded-[2rem] bg-surface-container-low/80 dark:bg-[#191B1F] p-2 sm:p-3 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.07)] dark:shadow-[0_20px_48px_-14px_rgba(0,0,0,0.55)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.11)] transition-all duration-300 focus:outline-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
          {/* Left Editorial Pod */}
          <div className="lg:col-span-5 rounded-[1.5rem] bg-surface-container-lowest dark:bg-[#22242A] p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3">
              {/* Minimalist Status Pill */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low dark:bg-white/[0.06]">
                  <div className="flex items-center gap-1">
                    {['A1', 'A2', 'B1', 'B2'].map((lvl, idx) => (
                      <motion.span
                        key={lvl}
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: idx * 0.35,
                          ease: 'easeInOut'
                        }}
                        className={`w-1.5 h-1.5 rounded-full ${getLevelColor(lvl).dot}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
                    Sprachniveau-Analyse
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-surface-container-low dark:bg-white/[0.06] flex items-center justify-center text-on-surface-variant group-hover:scale-110 group-hover:rotate-45 group-hover:text-germany-red transition-all duration-500">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              {/* Clean Minimalist Title without (A2 • B1 • B2) */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-on-surface tracking-tight leading-snug">
                  Einstufungstest Deutsch
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  Ermittle dein aktuelles Sprachniveau für deinen Wunschkurs mit offizieller Auswertung.
                </p>
              </div>
            </div>

            {/* Minimalist Action Row */}
            <div className="mt-5 pt-3 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-on-surface-variant">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Hören • Lesen • Grammatik</span>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 sm:px-5 py-2.5 rounded-full bg-germany-red text-white text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap inline-flex items-center gap-2 shadow-md shadow-germany-red/30 group-hover:bg-[#a91220] dark:group-hover:bg-red-600 group-hover:shadow-xl group-hover:shadow-germany-red/40 group-hover:-translate-y-0.5 group-hover:ring-2 group-hover:ring-white/20 select-none transition-all duration-300"
              >
                <span>Zum Einstufungstest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.div>
            </div>
          </div>

          {/* Right 3-Column Visual Level Progression Showcase (No Direct Exam Links) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-2.5">
            {LEVEL_SHOWCASE_STEPS.map((step, idx) => {
              const targetClr = getLevelColor(step.target);
              const examClr = getLevelColor(step.exam);
              const saved = savedLevelTests[step.id];

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + idx * 0.07,
                    duration: 0.3,
                    ease: 'easeOut'
                  }}
                  whileHover={{ y: -3 }}
                  className="relative rounded-[1.5rem] bg-surface-container-lowest dark:bg-[#22242A] p-3 sm:p-4 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden transition-transform duration-300"
                >
                  {/* Soft Tonal Gradient Wash */}
                  <div
                    className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${targetClr.cardWash} pointer-events-none`}
                  />

                  {/* Top Badges */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span
                      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl font-black text-xs sm:text-sm ${targetClr.badge}`}
                    >
                      {step.target}
                    </span>

                    <span
                      className={`self-start sm:self-auto inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold ${examClr.softBg} ${examClr.text}`}
                    >
                      Prüfung {step.exam}
                    </span>
                  </div>

                  {/* Middle Stage Description */}
                  <div className="relative z-10 my-3 sm:my-4">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${targetClr.accentText}`}>
                      Zielkurs {step.target}
                    </p>
                    <h4 className="text-xs sm:text-sm font-extrabold text-on-surface truncate mt-0.5">
                      {step.stageLabel}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant font-medium mt-0.5">
                      {step.questions} Aufg. • ~{step.minutes}m
                    </p>
                  </div>

                  {/* Bottom Visual Level Bar / Saved Score Indicator */}
                  <div className="relative z-10">
                    {saved ? (
                      <div
                        className={`px-2.5 py-1.5 rounded-xl ${targetClr.softBg} flex items-center justify-between gap-1`}
                      >
                        <span className={`text-[10px] font-black ${targetClr.text}`}>
                          {saved.percentage}%
                        </span>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${targetClr.accentText} shrink-0`} />
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="w-full h-1.5 rounded-full bg-surface-container-low dark:bg-white/[0.07] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(idx + 1) * 32}%` }}
                            transition={{ duration: 0.7, delay: 0.2 + idx * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${targetClr.barGradient}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.section>
  );
}

