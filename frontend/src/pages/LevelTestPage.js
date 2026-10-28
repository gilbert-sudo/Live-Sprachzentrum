import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Grid,
  HelpCircle,
  Headphones,
  Layers,
  Maximize2,
  Printer,
  RotateCcw,
  Sparkles,
  X,
  AlertTriangle,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { LEVEL_TESTS, LEVEL_TEST_LIST } from '../data/levelTestsData';
import { getLevelColor } from '../utils/levelColors';
import LevelTestAudioPlayer from '../components/exercises/LevelTestAudioPlayer';
import LevelTestTaskRenderer, {
  isQuestionAnswered,
  evaluateLevelTest,
  getInitialSequenceOrder
} from '../components/exercises/LevelTestTaskRenderer';

const STORAGE_KEY = 'lsz_level_test_results_v1';

export function loadSavedLevelTestResults() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveTestResult(testId, summary) {
  try {
    const existing = loadSavedLevelTestResults();
    existing[testId] = summary;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore storage quota errors
  }
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function stripHtmlTags(html) {
  if (!html) return '';
  return html
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const questionSlideVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? 24 : -24,
    opacity: 0,
    scale: 0.99
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: (direction) => ({
    x: direction >= 0 ? -24 : 24,
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.16,
      ease: 'easeIn'
    }
  })
};

const LevelTestPage = () => {
  const { levelId: paramLevelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const queryLevel = searchParams.get('level')?.toLowerCase();
  const initialTestId =
    paramLevelId?.toLowerCase() ||
    (queryLevel && LEVEL_TESTS[queryLevel] ? queryLevel : null);

  const [selectedTestId, setSelectedTestId] = useState(
    initialTestId && LEVEL_TESTS[initialTestId] ? initialTestId : null
  );
  // Stages: 'hub' | 'setup' | 'testing' | 'results'
  const [stage, setStage] = useState(
    initialTestId && LEVEL_TESTS[initialTestId] ? 'setup' : 'hub'
  );

  const defaultFirstName = useMemo(() => {
    if (!user?.name) return '';
    return user.name.split(' ')[0] || '';
  }, [user]);
  const defaultLastName = useMemo(() => {
    if (!user?.name) return '';
    return user.name.split(' ').slice(1).join(' ') || '';
  }, [user]);

  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);

  useEffect(() => {
    if (defaultFirstName && !firstName) setFirstName(defaultFirstName);
    if (defaultLastName && !lastName) setLastName(defaultLastName);
  }, [defaultFirstName, defaultLastName, firstName, lastName]);

  useEffect(() => {
    const target =
      paramLevelId?.toLowerCase() ||
      (queryLevel && LEVEL_TESTS[queryLevel] ? queryLevel : null);
    if (target && LEVEL_TESTS[target]) {
      setSelectedTestId(target);
      setStage((prev) => (prev === 'hub' ? 'setup' : prev));
    } else if (!target) {
      setStage('hub');
      setSelectedTestId(null);
    }
  }, [paramLevelId, queryLevel]);

  // Active Test State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navDirection, setNavDirection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [flaggedIds, setFlaggedIds] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState(1800);
  const [remainingSeconds, setRemainingSeconds] = useState(1800);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeReminderBanner, setTimeReminderBanner] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [savedResults, setSavedResults] = useState(() => loadSavedLevelTestResults());

  // Modals & Drawers
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isQuellenOpen, setIsQuellenOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [imageOrientations, setImageOrientations] = useState({});
  const [reviewFilter, setReviewFilter] = useState('all');

  const handleImageLoad = (imgSrc, e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (!naturalWidth || !naturalHeight) return;
    const ratio = naturalWidth / naturalHeight;
    let orientation = 'square';
    if (ratio >= 1.15) {
      orientation = 'landscape';
    } else if (ratio <= 0.88) {
      orientation = 'portrait';
    }
    setImageOrientations((prev) => {
      if (prev[imgSrc]?.orientation === orientation) return prev;
      return {
        ...prev,
        [imgSrc]: {
          width: naturalWidth,
          height: naturalHeight,
          ratio,
          orientation
        }
      };
    });
  };

  const currentTest = selectedTestId ? LEVEL_TESTS[selectedTestId] : null;
  const currentQuestion =
    currentTest && currentTest.questions[currentIndex]
      ? currentTest.questions[currentIndex]
      : null;

  useEffect(() => {
    if (stage !== 'testing') return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, stage]);

  const goToQuestionIndex = (nextIdx) => {
    if (!currentTest) return;
    const bounded = Math.max(0, Math.min(currentTest.questions.length - 1, nextIdx));
    setNavDirection(bounded >= currentIndex ? 1 : -1);
    setCurrentIndex(bounded);
  };

  const handleSelectTest = (testId) => {
    setSelectedTestId(testId);
    setStage('setup');
    navigate(`/level-test/${testId}`);
  };

  const handleBackToHub = () => {
    setStage('hub');
    setSelectedTestId(null);
    setEvaluationResult(null);
    setIsTimedOut(false);
    setTimeReminderBanner(null);
    navigate('/level-test');
  };

  const handleStartTest = (e) => {
    if (e) e.preventDefault();
    if (!currentTest) return;

    const initialAnswers = {};
    currentTest.questions.forEach((q) => {
      if (q.type === 'order-sequence' || q.type === 'dialogue-order') {
        initialAnswers[q.id] = getInitialSequenceOrder(q);
      }
    });

    const totalSecs = (currentTest.estimatedMinutes || 30) * 60;

    setAnswers(initialAnswers);
    setFlaggedIds([]);
    setNavDirection(1);
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setTimeLimitSeconds(totalSecs);
    setRemainingSeconds(totalSecs);
    setIsTimedOut(false);
    setTimeReminderBanner(null);
    setEvaluationResult(null);
    setStage('testing');
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const toggleFlag = (questionId) => {
    setFlaggedIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const answeredCount = useMemo(() => {
    if (!currentTest) return 0;
    return currentTest.questions.filter((q) =>
      isQuestionAnswered(q, answers[q.id])
    ).length;
  }, [currentTest, answers]);

  const unansweredQuestions = useMemo(() => {
    if (!currentTest) return [];
    return currentTest.questions.filter(
      (q) => !isQuestionAnswered(q, answers[q.id])
    );
  }, [currentTest, answers]);

  const handleFinalizeTest = (timedOut = false) => {
    if (!currentTest) return;

    if (typeof document !== 'undefined') {
      document.querySelectorAll('audio').forEach((audioEl) => {
        try {
          audioEl.pause();
        } catch {
          // ignore audio pause errors
        }
      });
    }

    setIsSubmitModalOpen(false);
    setIsMatrixOpen(false);
    setIsHelpOpen(false);
    setIsQuellenOpen(false);
    setLightboxImage(null);
    setTimeReminderBanner(null);
    setIsTimedOut(Boolean(timedOut));

    const finalDuration = timedOut
      ? Math.max(elapsedSeconds, timeLimitSeconds)
      : elapsedSeconds;
    const result = evaluateLevelTest(currentTest, answers, finalDuration);
    setEvaluationResult(result);
    setReviewFilter('all');
    setStage('results');

    const summary = {
      testId: currentTest.id,
      targetLevel: currentTest.targetLevel,
      prerequisiteLevel: currentTest.prerequisiteLevel,
      percentage: result.percentage,
      totalPoints: result.totalPoints,
      maxPoints: result.maxPoints,
      recommendedLevel: result.scaleMatch?.level || '',
      badge: result.scaleMatch?.badge || '',
      timedOut: Boolean(timedOut),
      completedAt: new Date().toISOString()
    };
    saveTestResult(currentTest.id, summary);
    setSavedResults(loadSavedLevelTestResults());
  };

  // Countdown reminders & automatic test end on timeout
  useEffect(() => {
    if (stage !== 'testing' || !currentTest) return;

    if (remainingSeconds === 0) {
      handleFinalizeTest(true);
      return;
    }

    if (remainingSeconds === 600) {
      setTimeReminderBanner({
        level: 'info',
        message: 'Hinweis: Noch 10 Minuten verbleibende Bearbeitungszeit.'
      });
    } else if (remainingSeconds === 300) {
      setTimeReminderBanner({
        level: 'warning',
        message:
          'Erinnerung: Noch 5 Minuten übrig! Bitte überprüfen Sie Ihre offenen Fragen.'
      });
    } else if (remainingSeconds === 60) {
      setTimeReminderBanner({
        level: 'urgent',
        message:
          'Achtung: Nur noch 1 Minute verbleibend! Nach Ablauf der Zeit wird der Test automatisch beendet und ausgewertet.'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds, stage, currentTest]);

  // ═════════════════════════════════════════════════════════════════
  // STAGE 1: COMPACT LEVEL SELECTION HUB (Follows A1/A2/B1/B2 Colors)
  // ═════════════════════════════════════════════════════════════════
  if (stage === 'hub' || !currentTest) {
    return (
      <div className="min-h-[calc(100vh-4rem)] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-6xl mx-auto px-3 sm:px-6 pt-1 sm:pt-3 space-y-5"
        >
          {/* Compact Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low dark:bg-[#1E1F22] hover:bg-surface-container dark:hover:bg-[#26282E] text-on-surface text-sm font-light tracking-wide whitespace-nowrap transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zum Dashboard</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <Compass className="w-3.5 h-3.5 text-on-surface-variant" />
              <span>Offizieller DaF Einstufungstest</span>
            </div>
          </div>

          {/* Borderless Hero Banner with Level Color Rules */}
          <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-7 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.45)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                  Live-Sprachzentrum • Einstufungstest Deutsch
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-headline text-on-surface tracking-tight">
                Welches Kursniveau möchten Sie besuchen?
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Wählen Sie Ihre gewünschte Zielstufe. Jeder Einstufungstest prüft das
                jeweils vorausgesetzte Sprachniveau nach dem offiziellen GER-Farbsystem.
              </p>
            </div>

            {/* Level-Colored Prerequisite Pills (A2=Green/A1=Blue, B1=Yellow/A2=Green, B2=Orange/B1=Yellow) */}
            <div className="grid grid-cols-3 gap-2.5 shrink-0">
              {[
                { target: 'A2', exam: 'A1' },
                { target: 'B1', exam: 'A2' },
                { target: 'B2', exam: 'B1' }
              ].map((item) => {
                const targetClr = getLevelColor(item.target);
                const examClr = getLevelColor(item.exam);
                return (
                  <div
                    key={item.target}
                    className={`px-3 py-2.5 rounded-2xl ${targetClr.softBg} flex items-center gap-2.5 shadow-sm`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${targetClr.badge}`}
                    >
                      {item.target}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-black leading-tight ${targetClr.text}`}>
                        Ziel {item.target}
                      </p>
                      <p className={`text-[10px] font-bold leading-tight mt-0.5 ${examClr.accentText}`}>
                        Prüfung {item.exam}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 Level Cards Following Level Color Rules & Borderless Tonal Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LEVEL_TEST_LIST.map((test, idx) => {
              const lvlColor = getLevelColor(test.targetLevel);
              const prereqColor = getLevelColor(test.prerequisiteLevel);
              const saved = savedResults[test.id];
              const audioCount = test.questions.filter(
                (q) => q.audio || q.audios || q.audioCards
              ).length;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.25 }}
                  whileHover={{ y: -4 }}
                  key={test.id}
                  className="group relative rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.45)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-5 sm:p-6 space-y-5"
                >
                  {/* Soft Tonal Top Gradient Wash */}
                  <div
                    className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${lvlColor.cardWash} pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${lvlColor.badge}`}
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        Zielkurs {test.targetLevel}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full ${prereqColor.softBg} ${prereqColor.text} text-[11px] font-extrabold`}
                      >
                        Prüfung {test.prerequisiteLevel}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h2 className="text-lg sm:text-xl font-extrabold font-headline text-on-surface transition-colors">
                        {test.title}
                      </h2>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                        {test.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="py-2 px-2 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] text-center">
                        <p className={`text-xs font-black ${lvlColor.accentText}`}>
                          {test.totalQuestions}
                        </p>
                        <p className="text-[9px] font-bold uppercase text-on-surface-variant mt-0.5">
                          Aufgaben
                        </p>
                      </div>
                      <div className="py-2 px-2 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] text-center">
                        <p className={`text-xs font-black ${lvlColor.accentText}`}>
                          ~{test.estimatedMinutes}m
                        </p>
                        <p className="text-[9px] font-bold uppercase text-on-surface-variant mt-0.5">
                          Dauer
                        </p>
                      </div>
                      <div className="py-2 px-2 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] text-center">
                        <p className={`text-xs font-black ${lvlColor.accentText}`}>
                          {audioCount} Audio
                        </p>
                        <p className="text-[9px] font-bold uppercase text-on-surface-variant mt-0.5">
                          Hören
                        </p>
                      </div>
                    </div>

                    {saved && (
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl ${lvlColor.softBg} flex items-center justify-between gap-2`}
                      >
                        <div className="min-w-0">
                          <p className={`text-[10px] font-extrabold uppercase tracking-wider ${lvlColor.text}`}>
                            Letztes Ergebnis: {saved.percentage}%
                          </p>
                          <p className="text-[11px] font-bold text-on-surface truncate">
                            {saved.recommendedLevel}
                          </p>
                        </div>
                        <CheckCircle2 className={`w-4 h-4 ${lvlColor.accentText} shrink-0`} />
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleSelectTest(test.id)}
                    className={`relative z-10 w-full py-3.5 px-5 rounded-full ${lvlColor.buttonBg} font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap flex items-center justify-center gap-2 shadow-md ${lvlColor.shadowGlow} transition-all`}
                  >
                    <span>
                      {saved
                        ? `${test.targetLevel}-Test wiederholen`
                        : `${test.targetLevel}-Test starten`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // STAGE 2: COMPACT TEST WELCOME & SOUNDCHECK (Level-Colored, Borderless)
  // ═════════════════════════════════════════════════════════════════
  if (stage === 'setup') {
    const lvlColor = getLevelColor(currentTest.targetLevel);
    const prereqColor = getLevelColor(currentTest.prerequisiteLevel);

    return (
      <div className="min-h-[calc(100vh-4rem)] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="max-w-4xl mx-auto px-3 sm:px-6 pt-1 sm:pt-3 space-y-4"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleBackToHub}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low dark:bg-[#1E1F22] hover:bg-surface-container dark:hover:bg-[#26282E] text-on-surface text-sm font-light tracking-wide whitespace-nowrap transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Alle Niveaustufen</span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${lvlColor.badge}`}
              >
                Zielkurs {currentTest.targetLevel}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${prereqColor.softBg} ${prereqColor.text}`}
              >
                Prüfung {currentTest.prerequisiteLevel}
              </span>
            </div>
          </div>

          {/* Borderless 2-Column Welcome Card */}
          <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-7 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_44px_-10px_rgba(0,0,0,0.45)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${lvlColor.accentText}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentTest.subtitle}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold font-headline text-on-surface">
                  {currentTest.title}
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {currentTest.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${lvlColor.softBg} ${lvlColor.accentText} flex items-center justify-center shrink-0`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-on-surface">
                      {currentTest.estimatedMinutes}:00 Min. Countdown
                    </h3>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      {currentTest.totalQuestions} Aufgaben • Automatische Auswertung
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${prereqColor.softBg} ${prereqColor.accentText} flex items-center justify-center shrink-0`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-on-surface">
                      Freie Navigation
                    </h3>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                      Fragen merken & beliebig wechseln
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Soundcheck + Start Form (Tonal Pod, No Single Left Border) */}
            <div className="lg:col-span-6 p-4 sm:p-5 rounded-2xl bg-surface-container-low/65 dark:bg-[#24262C] space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Headphones className={`w-4 h-4 ${lvlColor.accentText}`} />
                  <h3 className="text-xs font-extrabold text-on-surface">
                    Audio-Soundcheck vor dem Start
                  </h3>
                </div>
                <LevelTestAudioPlayer
                  src={currentTest.soundCheckAudio}
                  title="Hörprobe abspielen"
                  level={currentTest.targetLevel}
                />
              </div>

              <form onSubmit={handleStartTest} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-1">
                      Vorname (Zertifikat)
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="z. B. Maria"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest dark:bg-[#1A1B1E] text-on-surface placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-400/60 font-bold text-xs sm:text-sm shadow-sm focus:outline-none focus:${lvlColor.ringGlow}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant mb-1">
                      Nachname (optional)
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="z. B. Mustermann"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest dark:bg-[#1A1B1E] text-on-surface placeholder:text-on-surface-variant/50 dark:placeholder:text-slate-400/60 font-bold text-xs sm:text-sm shadow-sm focus:outline-none focus:${lvlColor.ringGlow}`}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3.5 px-5 rounded-full ${lvlColor.buttonBg} font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap shadow-lg ${lvlColor.shadowGlow} flex items-center justify-center gap-2 transition-all`}
                >
                  <span>Jetzt {currentTest.targetLevel}-Einstufungstest starten</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // STAGE 3: COMPACT, ANIMATED ACTIVE TEST RUNNER (Level-Colored)
  // ═════════════════════════════════════════════════════════════════
  if (stage === 'testing' && currentQuestion) {
    const totalQ = currentTest.questions.length;
    const progressPct = Math.round(((currentIndex + 1) / totalQ) * 100);
    const isFlagged = flaggedIds.includes(currentQuestion.id);
    const isAnswered = isQuestionAnswered(
      currentQuestion,
      answers[currentQuestion.id]
    );
    const lvlColor = getLevelColor(currentTest.targetLevel);
    const prereqColor = getLevelColor(currentTest.prerequisiteLevel);

    const hasLeftContext =
      Boolean(currentQuestion.rubricHtml) ||
      Boolean(currentQuestion.promptHtml) ||
      Boolean(currentQuestion.audio) ||
      Boolean(currentQuestion.audios && currentQuestion.audios.length > 0) ||
      Boolean(currentQuestion.images && currentQuestion.images.length > 0);

    const primaryImgSrc =
      currentQuestion.images && currentQuestion.images.length > 0
        ? currentQuestion.images[0]
        : null;
    const primaryImgMeta = primaryImgSrc
      ? imageOrientations[primaryImgSrc]
      : null;
    const isWideLandscapeQuestion =
      primaryImgMeta && primaryImgMeta.ratio >= 1.35;

    return (
      <div className="min-h-[calc(100vh-4rem)] pb-20">
        {/* Ultra-Compact Sticky Top Bar (Borderless Tonal Elevation) */}
        <div className="sticky top-14 md:top-[72px] z-30 max-w-7xl mx-auto px-3 sm:px-5">
          <div className="rounded-2xl bg-surface-container-lowest/95 dark:bg-[#1E1F22]/95 backdrop-blur-md shadow-[0_8px_28px_-6px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
              {/* Left: Back + Level Pills + Question Counter */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStage('setup')}
                  title="Zurück zur Einführung"
                  className="p-2 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <span className={`px-2.5 py-1 rounded-full ${lvlColor.badge} font-black text-[11px]`}>
                  {currentTest.targetLevel}
                </span>
                <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full ${prereqColor.softBg} ${prereqColor.text} font-extrabold text-[11px]`}>
                  Prüfung {currentTest.prerequisiteLevel}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-on-surface">
                  Frage {currentIndex + 1}{' '}
                  <span className="text-on-surface-variant font-normal">
                    / {totalQ}
                  </span>
                </span>
              </div>

              {/* Right: Countdown + Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div
                  title="Verbleibende Bearbeitungszeit (Countdown)"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-mono font-extrabold transition-all ${
                    remainingSeconds <= 60
                      ? 'bg-rose-600 text-white animate-pulse shadow-sm shadow-rose-500/30'
                      : remainingSeconds <= 300
                      ? 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-200'
                      : `${lvlColor.softBg} ${lvlColor.text}`
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${
                      remainingSeconds <= 60
                        ? 'bg-white'
                        : remainingSeconds <= 300
                        ? 'bg-amber-500 dark:bg-amber-400'
                        : lvlColor.dot
                    }`}
                  />
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="tabular-nums">{formatDuration(remainingSeconds)}</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={() => toggleFlag(currentQuestion.id)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all inline-flex items-center gap-1.5 ${
                    isFlagged
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-surface-container-low dark:bg-[#26282E] text-on-surface hover:bg-surface-container dark:hover:bg-[#32353C]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">
                    {isFlagged ? 'Gemerkt' : 'Merken'}
                  </span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => setIsHelpOpen(true)}
                  aria-label="Hilfe"
                  className="p-2 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMatrixOpen(true)}
                  className="px-3.5 py-2 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap inline-flex items-center gap-1.5 transition-colors"
                >
                  <Grid className={`w-3.5 h-3.5 ${lvlColor.accentText}`} />
                  <span className="hidden sm:inline">Übersicht</span>
                  <span className={`px-2 py-0.5 rounded-full ${lvlColor.softBg} ${lvlColor.text} text-[11px] font-bold`}>
                    {answeredCount}/{totalQ}
                  </span>
                </button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className={`px-4 sm:px-5 py-2 rounded-full ${lvlColor.buttonBg} text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap shadow-sm ${lvlColor.shadowGlow} transition-all`}
                >
                  Auswerten
                </motion.button>
              </div>
            </div>

            <div className="h-1.5 w-full bg-surface-container dark:bg-white/10">
              <motion.div
                className={`h-full bg-gradient-to-r ${lvlColor.barGradient}`}
                initial={false}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {/* Animated Countdown Time Reminder Banner */}
            <AnimatePresence>
              {timeReminderBanner && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`overflow-hidden ${
                    timeReminderBanner.level === 'urgent'
                      ? 'bg-rose-600 text-white'
                      : timeReminderBanner.level === 'warning'
                      ? 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200'
                      : `${lvlColor.softBg} ${lvlColor.text}`
                  }`}
                >
                  <div className="px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{timeReminderBanner.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTimeReminderBanner(null)}
                      aria-label="Hinweis schließen"
                      className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Animated Question Workspace (Orientation-Aware 2-Column Layout, Borderless) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-5 pt-3.5 sm:pt-4 overflow-x-hidden">
          <AnimatePresence mode="wait" custom={navDirection}>
            <motion.div
              key={currentQuestion.id}
              custom={navDirection}
              variants={questionSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
            >
              {/* Left Column: Stimulus, Audio, & Orientation-Adaptive Big Images */}
              {hasLeftContext && (
                <div
                  className={
                    isWideLandscapeQuestion ? 'lg:col-span-7' : 'lg:col-span-6'
                  }
                >
                  <div className="rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-4 sm:p-5 shadow-[0_10px_32px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.45)] space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full ${lvlColor.softBg} ${lvlColor.text} text-[10px] font-extrabold uppercase tracking-wider`}>
                        {currentQuestion.category || 'Aufgabe'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          isAnswered
                            ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                            : 'bg-surface-container-low dark:bg-white/10 text-on-surface-variant dark:text-slate-300'
                        }`}
                      >
                        {isAnswered ? 'Beantwortet' : 'Offen'}
                      </span>
                    </div>

                    {currentQuestion.rubricHtml && (
                      <div
                        className="text-xs sm:text-sm text-on-surface leading-snug [&_strong]:font-extrabold [&_em]:text-on-surface-variant [&_p]:mb-1.5 last:[&_p]:mb-0"
                        dangerouslySetInnerHTML={{
                          __html: currentQuestion.rubricHtml
                        }}
                      />
                    )}

                    {currentQuestion.promptHtml && (
                      <div
                        className="p-3.5 rounded-2xl bg-surface-container-low/85 dark:bg-[#26282E] text-xs sm:text-sm text-on-surface leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: currentQuestion.promptHtml
                        }}
                      />
                    )}

                    {(currentQuestion.audio ||
                      (currentQuestion.audios &&
                        currentQuestion.audios.length > 0)) && (
                      <LevelTestAudioPlayer
                        src={currentQuestion.audio}
                        audios={currentQuestion.audios}
                        questionId={currentQuestion.id}
                        title={`Hörtext zu Aufgabe ${currentQuestion.id}`}
                        level={currentTest.targetLevel}
                      />
                    )}

                    {currentQuestion.images &&
                      currentQuestion.images.length > 0 && (
                        <div
                          className={`grid gap-2.5 ${
                            currentQuestion.images.length > 1
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : 'grid-cols-1'
                          }`}
                        >
                          {currentQuestion.images.map((imgSrc, idx) => {
                            const meta = imageOrientations[imgSrc];
                            const orientation = meta?.orientation || 'landscape';
                            const isMulti = currentQuestion.images.length > 1;
                            const hasAudio =
                              Boolean(currentQuestion.audio) ||
                              Boolean(
                                currentQuestion.audios &&
                                  currentQuestion.audios.length > 0
                              );

                            const imgSizeClass = hasAudio
                              ? orientation === 'landscape'
                                ? 'w-full h-auto max-h-[220px] sm:max-h-[270px] lg:max-h-[310px] object-contain'
                                : 'w-auto max-w-full mx-auto h-auto max-h-[240px] sm:max-h-[290px] lg:max-h-[320px] object-contain'
                              : orientation === 'portrait'
                              ? 'w-auto max-w-full mx-auto h-auto max-h-[300px] sm:max-h-[360px] lg:max-h-[400px] object-contain'
                              : orientation === 'landscape'
                              ? 'w-full h-auto max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] object-contain'
                              : 'w-auto max-w-full mx-auto h-auto max-h-[280px] sm:max-h-[330px] lg:max-h-[360px] object-contain';

                            return (
                              <motion.div
                                whileHover={{ scale: 1.005 }}
                                key={imgSrc}
                                onClick={() => setLightboxImage(imgSrc)}
                                className={`group relative rounded-2xl overflow-hidden bg-surface-container-low/65 dark:bg-[#16171B] cursor-zoom-in flex flex-col items-center justify-center p-2 shadow-inner transition-all ${
                                  isMulti && orientation === 'landscape'
                                    ? 'sm:col-span-2'
                                    : ''
                                }`}
                              >
                                <img
                                  src={imgSrc}
                                  onLoad={(e) => handleImageLoad(imgSrc, e)}
                                  alt={`Aufgabe ${currentQuestion.id} Bild ${idx + 1}`}
                                  className={`${imgSizeClass} rounded-xl bg-white shadow-sm`}
                                />
                                <span className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-black/75 text-white backdrop-blur-sm inline-flex items-center gap-1 text-[10px] font-bold opacity-85 group-hover:opacity-100 transition-all shadow-sm`}>
                                  <Maximize2 className="w-3 h-3" />
                                  <span>Vollbild</span>
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Right Column: Compact Interactive Task Card */}
              <div
                className={
                  hasLeftContext
                    ? isWideLandscapeQuestion
                      ? 'lg:col-span-5'
                      : 'lg:col-span-6'
                    : 'lg:col-span-12 max-w-3xl mx-auto w-full'
                }
              >
                <div className="rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-4 sm:p-5 shadow-[0_10px_32px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.45)] space-y-4">
                  <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-surface-container-low/75 dark:bg-[#26282E]">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-lg ${lvlColor.badge} font-black text-xs flex items-center justify-center`}>
                        {currentIndex + 1}
                      </span>
                      <h2 className="text-xs sm:text-sm font-extrabold text-on-surface">
                        Ihre Antwort
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsHelpOpen(true)}
                      className={`text-[11px] font-bold text-on-surface-variant hover:${lvlColor.accentText} inline-flex items-center gap-1 transition-colors`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Hinweis</span>
                    </button>
                  </div>

                  {/* Task Renderer with Level Color Rules */}
                  <LevelTestTaskRenderer
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onChange={(val) =>
                      handleAnswerChange(currentQuestion.id, val)
                    }
                    level={currentTest.targetLevel}
                  />

                  {/* Inline Navigation Footer Inside Card (Borderless Tonal Pod) */}
                  <div className="pt-2 flex items-center justify-between gap-2.5">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => goToQuestionIndex(currentIndex - 1)}
                      disabled={currentIndex === 0}
                      className="px-5 py-2.5 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap inline-flex items-center gap-2 disabled:opacity-35 disabled:pointer-events-none transition-colors shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Zurück</span>
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => setIsMatrixOpen(true)}
                      className="px-4 py-2.5 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap text-on-surface inline-flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Grid className={`w-4 h-4 ${lvlColor.accentText}`} />
                      <span>
                        {currentIndex + 1} / {totalQ}
                      </span>
                    </button>

                    {currentIndex < totalQ - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => goToQuestionIndex(currentIndex + 1)}
                        className={`px-6 py-2.5 rounded-full ${lvlColor.buttonBg} font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap inline-flex items-center gap-2 shadow-md ${lvlColor.shadowGlow} transition-all`}
                      >
                        <span>Weiter</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setIsSubmitModalOpen(true)}
                        className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap inline-flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-colors"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Test abschließen</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Modals & Drawers */}
        <AnimatePresence>
          {isMatrixOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setIsMatrixOpen(false)}
            >
              <motion.div
                initial={{ y: 40, scale: 0.96, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 40, scale: 0.96, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-6 max-h-[82vh] overflow-y-auto space-y-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold font-headline text-on-surface">
                      Aufgabenübersicht ({answeredCount}/{totalQ} beantwortet)
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">
                      Tippen Sie auf eine Nummer, um direkt zur Aufgabe zu wechseln.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMatrixOpen(false)}
                    className="p-2 rounded-full bg-surface-container dark:bg-white/10 hover:bg-surface-variant dark:hover:bg-white/20 text-on-surface transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 text-[11px] font-bold text-on-surface-variant px-3 py-2 rounded-2xl bg-surface-container-low/75 dark:bg-[#26282E]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${lvlColor.dot}`} />
                    Aktuell
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Beantwortet
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Gemerkt
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-surface-container-high dark:bg-white/20" />
                    Offen
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {currentTest.questions.map((q, idx) => {
                    const ans = isQuestionAnswered(q, answers[q.id]);
                    const flg = flaggedIds.includes(q.id);
                    const cur = idx === currentIndex;

                    return (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        key={q.id}
                        type="button"
                        onClick={() => {
                          goToQuestionIndex(idx);
                          setIsMatrixOpen(false);
                        }}
                        className={`h-10 rounded-xl font-black text-xs flex items-center justify-center relative transition-all ${
                          cur
                            ? `${lvlColor.badge} ${lvlColor.ringGlow}`
                            : flg
                            ? 'bg-amber-500/20 text-amber-800 dark:text-amber-200 ring-2 ring-amber-500/40'
                            : ans
                            ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                            : 'bg-surface-container-low dark:bg-[#26282E] text-on-surface-variant dark:text-slate-300 hover:bg-surface-container'
                        }`}
                      >
                        <span>{idx + 1}</span>
                        {flg && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pt-1 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMatrixOpen(false)}
                    className="flex-1 py-2.5 px-5 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface font-medium text-sm tracking-wide whitespace-nowrap transition-colors"
                  >
                    Weiterarbeiten
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMatrixOpen(false);
                      setIsSubmitModalOpen(true);
                    }}
                    className={`flex-1 py-2.5 px-5 rounded-full ${lvlColor.buttonBg} font-bold text-sm tracking-wide whitespace-nowrap shadow-md ${lvlColor.shadowGlow} transition-all`}
                  >
                    Jetzt auswerten
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {isHelpOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsHelpOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="w-full max-w-md rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-6 space-y-3.5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 ${lvlColor.accentText} font-extrabold text-sm`}>
                    <HelpCircle className="w-4 h-4" />
                    <span>Bearbeitungshinweis</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsHelpOpen(false)}
                    className="p-1.5 rounded-full bg-surface-container dark:bg-white/10 hover:bg-surface-variant dark:hover:bg-white/20 text-on-surface transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {currentQuestion.help}
                </p>
                <button
                  type="button"
                  onClick={() => setIsHelpOpen(false)}
                  className={`w-full py-2.5 px-5 rounded-full ${lvlColor.buttonBg} font-bold text-sm tracking-wide whitespace-nowrap shadow-md ${lvlColor.shadowGlow} transition-all`}
                >
                  Verstanden
                </button>
              </motion.div>
            </motion.div>
          )}

          {isSubmitModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="w-full max-w-md rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-6 space-y-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        unansweredQuestions.length === 0
                          ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {unansweredQuestions.length === 0 ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold font-headline text-on-surface">
                        Test jetzt auswerten?
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        {answeredCount} von {totalQ} Aufgaben beantwortet.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="p-1.5 rounded-full bg-surface-container dark:bg-white/10 hover:bg-surface-variant dark:hover:bg-white/20 text-on-surface transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {unansweredQuestions.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/12 dark:bg-amber-500/15 space-y-2">
                    <p className="text-[11px] font-extrabold text-amber-800 dark:text-amber-200">
                      Noch {unansweredQuestions.length} offene Aufgaben (Antippen zum Öffnen):
                    </p>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                      {unansweredQuestions.map((uq) => {
                        const qIdx = currentTest.questions.findIndex(
                          (item) => item.id === uq.id
                        );
                        return (
                          <button
                            key={uq.id}
                            type="button"
                            onClick={() => {
                              goToQuestionIndex(qIdx);
                              setIsSubmitModalOpen(false);
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest dark:bg-[#26282E] text-xs font-bold whitespace-nowrap text-on-surface hover:scale-105 shadow-sm transition-all"
                          >
                            Frage {qIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="flex-1 py-2.5 px-5 rounded-full bg-surface-container-low dark:bg-[#26282E] hover:bg-surface-container dark:hover:bg-[#32353C] text-on-surface font-medium text-sm tracking-wide whitespace-nowrap transition-colors"
                  >
                    Zurück
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFinalizeTest(false)}
                    className={`flex-1 py-2.5 px-5 rounded-full ${lvlColor.buttonBg} font-bold text-sm tracking-wide whitespace-nowrap shadow-md ${lvlColor.shadowGlow} transition-all`}
                  >
                    Verbindlich auswerten
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="mb-3 px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium tracking-wide whitespace-nowrap inline-flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Schließen
                </button>
                <img
                  src={lightboxImage}
                  alt="Vergrößerte Ansicht"
                  className="max-h-[82vh] w-auto object-contain rounded-2xl bg-white p-2 shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // STAGE 4: COMPACT, ANIMATED RESULTS & CERTIFICATE (Level-Colored)
  // ═════════════════════════════════════════════════════════════════
  if (stage === 'results' && evaluationResult) {
    const {
      totalPoints,
      maxPoints,
      percentage,
      scaleMatch,
      details,
      correctCount,
      partialCount,
      wrongCount
    } = evaluationResult;

    const lvlColor = getLevelColor(currentTest.targetLevel);
    const recommendedColor = getLevelColor(
      scaleMatch?.level || currentTest.targetLevel
    );

    const fullName =
      [firstName, lastName].filter(Boolean).join(' ').trim() ||
      user?.name ||
      'Teilnehmer/in';
    const dateStr = new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const filteredDetails = details.filter((d) => {
      if (reviewFilter === 'correct') return d.isFullyCorrect;
      if (reviewFilter === 'wrong') return !d.isFullyCorrect;
      return true;
    });

    const nextLevelTestId =
      currentTest.id === 'a2' ? 'b1' : currentTest.id === 'b1' ? 'b2' : null;
    const nextLvlColor = nextLevelTestId
      ? getLevelColor(LEVEL_TESTS[nextLevelTestId].targetLevel)
      : null;

    return (
      <div className="min-h-[calc(100vh-4rem)] pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-5xl mx-auto px-3 sm:px-6 pt-1 sm:pt-3 space-y-5"
        >
          {/* Top Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 print:hidden">
            <button
              type="button"
              onClick={handleBackToHub}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low dark:bg-[#1E1F22] hover:bg-surface-container dark:hover:bg-[#26282E] text-on-surface text-sm font-light tracking-wide whitespace-nowrap shadow-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Alle Einstufungstests</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low dark:bg-[#1E1F22] hover:bg-surface-container dark:hover:bg-[#26282E] text-on-surface text-sm font-light tracking-wide whitespace-nowrap shadow-sm transition-colors"
              >
                <Printer className={`w-4 h-4 ${lvlColor.accentText}`} />
                <span>Drucken</span>
              </button>
              <button
                type="button"
                onClick={handleStartTest}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${lvlColor.buttonBg} text-sm font-bold tracking-wide whitespace-nowrap shadow-md ${lvlColor.shadowGlow} transition-all`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Wiederholen</span>
              </button>
            </div>
          </div>

          {/* Timeout Notification Banner when Countdown Reaches 00:00 */}
          {isTimedOut && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-rose-500/12 dark:bg-rose-500/20 p-4 flex items-start gap-3 text-rose-800 dark:text-rose-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs sm:text-sm font-extrabold">
                  Zeit abgelaufen! Der Test wurde automatisch beendet.
                </h2>
                <p className="text-[11px] sm:text-xs opacity-90 leading-relaxed">
                  Die vorgesehene Bearbeitungszeit von {currentTest.estimatedMinutes}{' '}
                  Minuten ist abgelaufen. Ihr Test wurde automatisch abgeschlossen und
                  auf Basis Ihrer bis dahin eingegebenen Antworten ausgewertet.
                </p>
              </div>
            </motion.div>
          )}

          {/* Borderless Certificate + Recommendation Card */}
          <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-7 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_44px_-10px_rgba(0,0,0,0.45)] space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low/70 dark:bg-[#26282E]">
              <div className="space-y-1">
                <div className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider ${lvlColor.accentText}`}>
                  <Award className="w-3.5 h-3.5" />
                  <span>Auswertung & Einstufungszertifikat</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold font-headline text-on-surface">
                  {fullName}
                </h1>
                <p className="text-xs text-on-surface-variant font-medium">
                  {currentTest.title} ({currentTest.subtitle}) • {dateStr}
                </p>
              </div>

              {/* Animated Score Ring */}
              <div className="flex items-center gap-4 self-center md:self-auto">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-surface-container dark:text-white/10"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={326.7}
                      initial={{ strokeDashoffset: 326.7 }}
                      animate={{
                        strokeDashoffset: 326.7 - (326.7 * percentage) / 100
                      }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      strokeLinecap="round"
                      className={recommendedColor.accentText}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-on-surface">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-on-surface">
                    Punkte:{' '}
                    <span className={`font-black ${lvlColor.accentText}`}>
                      {totalPoints} / {maxPoints}
                    </span>
                  </div>
                  <div className="font-bold text-on-surface">
                    Zeit:{' '}
                    <span className="font-mono">
                      {formatDuration(elapsedSeconds)}
                    </span>
                  </div>
                  <div className="text-[11px] text-on-surface-variant">
                    {correctCount} richtig • {partialCount} teilw. • {wrongCount}{' '}
                    falsch
                  </div>
                </div>
              </div>
            </div>

            {scaleMatch && (
              <div className={`p-5 rounded-2xl ${recommendedColor.softBg} space-y-2.5`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[11px] font-black uppercase tracking-wider ${recommendedColor.text}`}>
                    Kursempfehlung
                  </span>
                  <span className={`px-3 py-1 rounded-full ${recommendedColor.badge} text-[11px] font-extrabold`}>
                    {scaleMatch.badge} ({scaleMatch.min}–{scaleMatch.max}%)
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold font-headline text-on-surface">
                  Empfohlenes Kursniveau: {scaleMatch.level}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {scaleMatch.description}
                </p>

                {percentage >= 80 && nextLevelTestId && nextLvlColor && (
                  <div className="pt-1 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleSelectTest(nextLevelTestId)}
                      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${nextLvlColor.buttonBg} font-bold text-sm tracking-wide whitespace-nowrap shadow-md ${nextLvlColor.shadowGlow} transition-all`}
                    >
                      <span>
                        Weiter zum {LEVEL_TESTS[nextLevelTestId].targetLevel}-Test
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Compact 4-Band Scale with Level Color Rules */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {(currentTest.evaluationScale || []).map((row) => {
                const isActive =
                  scaleMatch &&
                  row.min === scaleMatch.min &&
                  row.max === scaleMatch.max;
                const bandColor = getLevelColor(row.level);
                return (
                  <div
                    key={`${row.min}-${row.max}`}
                    className={`p-3.5 rounded-2xl transition-all ${
                      isActive
                        ? `${bandColor.softBg} ${bandColor.ringGlow} shadow-sm`
                        : 'bg-surface-container-low/65 dark:bg-[#26282E]/70 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant mb-1">
                      <span>
                        {row.min}%–{row.max}%
                      </span>
                      {isActive && (
                        <span className={`px-2 py-0.5 rounded-full ${bandColor.badge} text-[9px] font-black`}>
                          Ihr Wert
                        </span>
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm font-extrabold ${isActive ? bandColor.text : 'text-on-surface'}`}>
                      {row.level}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Borderless Question Review List */}
          <div className="rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-7 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_44px_-10px_rgba(0,0,0,0.45)] space-y-4 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-surface-container-low/70 dark:bg-[#26282E]">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold font-headline text-on-surface">
                  Aufgabenanalyse
                </h2>
                <p className="text-[11px] text-on-surface-variant">
                  Ihre Antworten im Vergleich zur Musterlösung
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: `Alle (${details.length})` },
                  { id: 'correct', label: `Richtig (${correctCount})` },
                  {
                    id: 'wrong',
                    label: `Optimierbar (${partialCount + wrongCount})`
                  }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReviewFilter(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all ${
                      reviewFilter === tab.id
                        ? `${lvlColor.buttonBg} shadow-sm ${lvlColor.shadowGlow}`
                        : 'bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface-variant dark:text-slate-300 hover:text-on-surface shadow-sm'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
              {filteredDetails.map((item) => {
                const q = item.question;
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-2xl transition-all space-y-2.5 ${
                      item.isFullyCorrect
                        ? 'bg-emerald-500/[0.06] dark:bg-emerald-500/[0.10]'
                        : item.isPartial
                        ? 'bg-amber-500/[0.06] dark:bg-amber-500/[0.10]'
                        : 'bg-rose-500/[0.06] dark:bg-rose-500/[0.10]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                            item.isFullyCorrect
                              ? 'bg-emerald-500 text-white'
                              : item.isPartial
                              ? 'bg-amber-500 text-white'
                              : 'bg-rose-500 text-white'
                          }`}
                        >
                          {q.id}
                        </span>
                        <p className="text-xs font-bold text-on-surface truncate">
                          {stripHtmlTags(q.rubricHtml) || q.category}
                        </p>
                      </div>

                      <span className="text-[11px] font-black shrink-0 px-2.5 py-0.5 rounded-full bg-surface-container-lowest dark:bg-[#1E1F22] text-on-surface shadow-sm">
                        {Math.round(item.score * 100) / 100} / 1 Pkt.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-surface-container-lowest dark:bg-[#1A1B1E] shadow-sm">
                        <span className="text-[10px] font-black uppercase text-on-surface-variant mr-1.5">
                          Ihre Antwort:
                        </span>
                        <span
                          className={`font-bold break-words ${
                            item.isFullyCorrect
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : item.isPartial
                              ? 'text-amber-700 dark:text-amber-300'
                              : 'text-rose-600 dark:text-rose-300'
                          }`}
                        >
                          {item.userText}
                        </span>
                      </div>

                      {!item.isFullyCorrect && (
                        <div className="p-2.5 rounded-xl bg-surface-container-lowest dark:bg-[#1A1B1E] shadow-sm">
                          <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 mr-1.5">
                            Lösung:
                          </span>
                          <span className="font-bold text-on-surface break-words">
                            {item.correctText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {currentTest.quellen && (
              <div className="pt-2 flex justify-between items-center text-[11px] text-on-surface-variant">
                <span>© Cornelsen Verlag GmbH, Berlin</span>
                <button
                  type="button"
                  onClick={() => setIsQuellenOpen(true)}
                  className={`font-bold hover:${lvlColor.accentText} underline transition-colors`}
                >
                  Quellenverzeichnis
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isQuellenOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsQuellenOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="w-full max-w-lg rounded-3xl bg-surface-container-lowest dark:bg-[#1E1F22] p-5 sm:p-6 space-y-3 max-h-[80vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-on-surface">
                    Quellenverzeichnis
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsQuellenOpen(false)}
                    className="p-1.5 rounded-full bg-surface-container dark:bg-white/10 hover:bg-surface-variant dark:hover:bg-white/20 text-on-surface transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-xs text-on-surface-variant whitespace-pre-wrap font-body leading-relaxed p-3.5 rounded-2xl bg-surface-container-low dark:bg-[#26282E]">
                  {currentTest.quellen}
                </pre>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
};

export default LevelTestPage;
