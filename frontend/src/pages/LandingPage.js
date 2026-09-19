import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, ArrowRight, PlayCircle, Sparkles, Mail, MapPin, Phone } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../store/authSlice';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';
import AnimatedBackgroundLines from '../components/AnimatedBackgroundLines';

// A liquid glass component using Tailwind utilities
const GlassCard = ({ children, className }) => (
  <div className={`bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}>
    {children}
  </div>
);

const LandingPage = () => {
  const dispatch = useDispatch();

  const [contactStep, setContactStep] = useState(1);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const handleNextStep = () => setContactStep(s => Math.min(4, s + 1));
  const handlePrevStep = () => setContactStep(s => Math.max(1, s - 1));

  const handleGetStarted = () => {
    dispatch(openAuthModal());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-germany-black text-slate-900 dark:text-white overflow-x-hidden font-sans relative transition-colors duration-500">

      {/* Floating Social Media Bar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="relative group w-12 h-12 rounded-full bg-white dark:bg-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-white/20 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 hover:-translate-x-1 transition-all duration-300 hover:shadow-blue-500/20">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5">
            <path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02Z" />
          </svg>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-md">Facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="relative group w-12 h-12 rounded-full bg-white dark:bg-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-white/20 flex items-center justify-center text-pink-600 dark:text-pink-400 hover:scale-110 hover:-translate-x-1 transition-all duration-300 hover:shadow-pink-500/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-md">Instagram</span>
        </a>
        <a href="https://wa.me/0349398689" target="_blank" rel="noopener noreferrer" className="relative group w-12 h-12 rounded-full bg-white dark:bg-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-white/20 flex items-center justify-center text-green-600 dark:text-green-400 hover:scale-110 hover:-translate-x-1 transition-all duration-300 hover:shadow-green-500/20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none drop-shadow-md">WhatsApp</span>
        </a>
      </div>

      {/* Background Detail & Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-red-50/80 dark:from-slate-900 dark:via-germany-black dark:to-red-950/40 transition-colors duration-500">
        {/* Subtle Motive Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-40 hidden dark:block" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <AnimatedBackgroundLines />

        {/* Animated Gradient Orbs for Depth */}
        <motion.div
          animate={{ x: [0, 150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-red-200/40 dark:bg-germany-red/30 rounded-full blur-[90px] dark:blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-amber-200/30 dark:bg-germany-gold/20 rounded-full blur-[110px] dark:blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-100/30 dark:bg-white/10 rounded-full blur-[80px] dark:blur-[100px] pointer-events-none"
        />

        {/* Slow panning container for floating images */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
        >
          {/* Floating Image Circles */}

          {/* Circle 1 - Top Left */}
          <motion.div
            className="absolute top-[5%] left-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(220,38,38,0.4)] border-4 border-white/40 dark:border-white/10"
            animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          >
            <img src="/assets/bg1.jpg" className="w-full h-full object-cover" alt="Student Classroom" />
          </motion.div>

          {/* Circle 2 - Top Right */}
          <motion.div
            className="absolute top-[2%] right-[5%] w-[150px] h-[150px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(255,204,0,0.3)] border-4 border-white/40 dark:border-white/10"
            animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 2 }}
          >
            <img src="/assets/bg2.jpg" className="w-full h-full object-cover" alt="Student Learning" />
          </motion.div>

          {/* Circle 3 - Center Right */}
          <motion.div
            className="absolute top-[35%] right-[8%] w-[220px] h-[220px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(220,38,38,0.3)] border-4 border-white/40 dark:border-white/10"
            animate={{ y: [0, -30, 0], x: [0, -40, 0], scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 22, ease: "easeInOut", delay: 1 }}
          >
            <img src="/assets/bg3.jpg" className="w-full h-full object-cover" alt="Student Library" />
          </motion.div>

          {/* Circle 4 - Bottom Left */}
          <motion.div
            className="absolute bottom-[5%] left-[10%] w-[180px] h-[180px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(255,204,0,0.3)] border-4 border-white/40 dark:border-white/10"
            animate={{ y: [0, 50, 0], x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 4 }}
          >
            <img src="/assets/bg1.jpg" className="w-full h-full object-cover" alt="Student Group" />
          </motion.div>

          {/* Circle 5 - Center Left */}
          <motion.div
            className="absolute top-[40%] left-[25%] w-[120px] h-[120px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-white/40 dark:border-white/20 opacity-90"
            animate={{ y: [0, -60, 0], x: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 3 }}
          >
            <img src="/assets/bg2.jpg" className="w-full h-full object-cover" alt="Student Focus" />
          </motion.div>

          {/* Circle 6 - Bottom Right */}
          <motion.div
            className="absolute bottom-[15%] right-[30%] w-[140px] h-[140px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(220,38,38,0.4)] border-2 border-white/40 dark:border-white/20 opacity-95"
            animate={{ y: [0, 40, 0], x: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 19, ease: "easeInOut", delay: 5 }}
          >
            <img src="/assets/bg3.jpg" className="w-full h-full object-cover" alt="Students Happy" />
          </motion.div>

        </motion.div>

        {/* Gradient Overlay for Text Readability - Enhances contrast in both modes */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:from-transparent dark:via-germany-black/40 dark:to-germany-black/80 z-10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-16 md:mb-24 p-3 md:p-4 rounded-full bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-white/60 dark:border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.12)] dark:shadow-2xl"
        >
          <div className="flex items-center space-x-3 px-2 md:px-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-lg p-1 overflow-hidden">
              <img src="/logo.png" alt="Live-Sprachzentrum Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-white/70">
              <span className="text-slate-900 dark:text-white">Live</span>-<span className="text-germany-red">Sprach</span><span className="text-germany-gold">zentrum</span>
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 pr-1 md:pr-2">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={handleGetStarted}
              className="px-5 py-2 md:px-8 md:py-3.5 rounded-full bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-slate-200/50 dark:border-white/30 transition-all duration-300 font-semibold flex items-center space-x-2 text-slate-900 dark:text-white"
            >
              <span className="text-sm md:text-base hidden sm:block">Anmelden</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 mb-24 md:mb-40 mt-10 md:mt-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 text-sm font-medium text-amber-600 dark:text-germany-gold shadow-lg dark:shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-germany-gold" />
            <span>Deutsch erleben! Vivez la langue allemande!</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight max-w-5xl text-slate-900 dark:text-white drop-shadow-sm">
            Lerne Deutsch für <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-germany-red via-red-600 to-amber-600 dark:from-germany-red dark:via-red-400 dark:to-germany-gold">
              deine Zukunft in Deutschland
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-slate-800 dark:text-slate-200 max-w-3xl leading-relaxed font-medium drop-shadow-sm">
            Dein Sprachpartner für Deutsch in Antananarivo. Strukturierte Kurse von A1 bis B2 mit erfahrenen Lehrkräften aus Madagaskar und Deutschland.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-10 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-germany-red hover:bg-red-700 text-white font-bold text-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] dark:shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] dark:hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <span>Jetzt durchstarten</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <a
              href="#kontakt"
              className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-white/60 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl border border-slate-200/50 dark:border-white/20 text-slate-900 dark:text-white font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <Globe className="w-6 h-6 text-amber-600 dark:text-germany-gold group-hover:scale-110 transition-transform" />
              <span>Kontakt aufnehmen</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-20 mb-24"
        >
          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-red-100 dark:bg-germany-red/20 flex items-center justify-center mb-8 group-hover:bg-red-200 dark:group-hover:bg-germany-red/40 transition-colors border border-red-200 dark:border-germany-red/30">
              <Users className="w-8 h-8 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Erfahrene Lehrkräfte</h3>
            <p className="text-slate-800 font-medium dark:text-slate-300/90 leading-relaxed text-lg">Lerne mit Dozenten der Universität Madagaskar und muttersprachlichen Lehrkräften aus Deutschland.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-100 dark:bg-germany-gold/20 flex items-center justify-center mb-8 group-hover:bg-amber-200 dark:group-hover:bg-germany-gold/40 transition-colors border border-amber-200 dark:border-germany-gold/30">
              <BookOpen className="w-8 h-8 text-amber-600 dark:text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Strukturierte Kurse (A1-B2)</h3>
            <p className="text-slate-800 font-medium dark:text-slate-300/90 leading-relaxed text-lg">Von den Grundlagen bis zur Mittelstufe. Abendkurse für Berufstätige und Ferienworkshops für Jugendliche.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 dark:bg-white/20 flex items-center justify-center mb-8 group-hover:bg-slate-200 dark:group-hover:bg-white/40 transition-colors border border-slate-200 dark:border-white/30">
              <Globe className="w-8 h-8 text-slate-600 dark:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Au Pair, FSJ & Ausbildung</h3>
            <p className="text-slate-800 font-medium dark:text-slate-300/90 leading-relaxed text-lg">Wir bereiten dich sprachlich auf deinen Aufenthalt in Deutschland vor und unterstützen bei Visa-Fragen.</p>
          </GlassCard>
        </motion.div>

        {/* Floating elements animation */}
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-0 w-64 h-64 bg-red-200/40 dark:bg-germany-red/20 rounded-full blur-[80px] dark:blur-[100px] -z-10 pointer-events-none"
        />
      </div>

      {/* Full-width Contact Section */}
      <section className="relative z-20 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl py-20 lg:py-24 overflow-hidden border-t border-white/60 dark:border-white/10 mt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0px)`, backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent dark:from-black/20 dark:to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide bg-red-100 dark:bg-red-900/30 text-germany-red dark:text-red-400">
                <Mail className="w-4 h-4" />
                Kontakt aufnehmen
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Hast du <span className="text-transparent bg-clip-text bg-gradient-to-r from-germany-red to-red-600 dark:from-germany-red dark:to-red-400">Fragen?</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed">
                Schreibe uns direkt eine Nachricht. Unser Team meldet sich umgehend bei dir, um dich auf deinem Weg nach Deutschland zu unterstützen.
              </p>
              
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 w-fit">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-black/50 shadow-sm flex items-center justify-center">
                  <Mail className="w-6 h-6 text-germany-red" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Schreib uns eine E-Mail</p>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">livesprachzentrum2@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Side: Step-by-step Form */}
            <div className="w-full relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-germany-red/20 to-amber-500/20 rounded-[3rem] blur-xl opacity-50 dark:opacity-30"></div>
              
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center border border-slate-100 dark:border-gray-800">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-1.5 bg-slate-100 dark:bg-gray-800 w-full">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-germany-red transition-all duration-700 ease-out" style={{ width: `${((contactStep - 1) / 3) * 100}%` }}></div>
                </div>
                
                {contactStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Wie dürfen wir dich nennen?</h3>
                      <p className="text-slate-500 font-medium dark:text-slate-400">Damit wir wissen, mit wem wir sprechen.</p>
                    </div>
                    <input type="text" value={contactData.name} onChange={e => setContactData({...contactData, name: e.target.value})} className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-germany-red transition-colors text-slate-900 dark:text-white placeholder-slate-400 font-medium text-lg" placeholder="Dein Vor- und Nachname" />
                    <button onClick={handleNextStep} disabled={!contactData.name.trim()} className="w-full px-8 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-between items-center group">
                      <span>Weiter</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {contactStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Hallo {contactData.name.split(' ')[0]}, <br/>wie lautet deine E-Mail?</h3>
                      <p className="text-slate-500 font-medium dark:text-slate-400">Wir nutzen diese nur, um dir zu antworten.</p>
                    </div>
                    <input type="email" value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-germany-red transition-colors text-slate-900 dark:text-white placeholder-slate-400 font-medium text-lg" placeholder="deine@email.de" />
                    <div className="flex gap-4">
                      <button onClick={handlePrevStep} className="px-6 py-5 rounded-2xl bg-white dark:bg-gray-800 text-slate-900 dark:text-white font-bold text-lg shadow-sm border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                        Zurück
                      </button>
                      <button onClick={handleNextStep} disabled={!contactData.email.includes('@')} className="flex-1 px-8 py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-between items-center group">
                        <span>Weiter</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {contactStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Was können wir für dich tun?</h3>
                      <p className="text-slate-500 font-medium dark:text-slate-400">Stelle uns deine Fragen zu Kursen oder Visa.</p>
                    </div>
                    <textarea rows="4" value={contactData.message} onChange={e => setContactData({...contactData, message: e.target.value})} className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-germany-red transition-colors text-slate-900 dark:text-white placeholder-slate-400 font-medium text-lg resize-none" placeholder="Deine Nachricht..."></textarea>
                    <div className="flex gap-4">
                      <button onClick={handlePrevStep} className="px-6 py-5 rounded-2xl bg-white dark:bg-gray-800 text-slate-900 dark:text-white font-bold text-lg shadow-sm border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                        Zurück
                      </button>
                      <button onClick={handleNextStep} disabled={!contactData.message.trim()} className="flex-1 px-8 py-5 rounded-2xl bg-gradient-to-r from-germany-red to-red-700 text-white font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2 group">
                        <Mail className="w-5 h-5" />
                        <span>Nachricht Senden</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {contactStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10 space-y-4">
                    <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">Gesendet!</h3>
                    <p className="text-slate-600 font-medium dark:text-slate-300 text-lg max-w-sm">Vielen Dank, {contactData.name.split(' ')[0]}. Wir haben deine Nachricht erhalten und melden uns in Kürze bei dir.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Contact Footer */}
      <footer id="kontakt" className="relative z-20 w-full bg-white/60 dark:bg-white/5 backdrop-blur-2xl pt-24 pb-8 mt-0 shadow-[0_-30px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_-30px_60px_rgba(255,255,255,0.02)]">
        
        {/* Liquid Glass Separator */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white/80 to-transparent dark:from-white/10 dark:to-transparent blur-md pointer-events-none"></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-r from-blue-100/30 via-purple-100/20 to-amber-100/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-amber-900/10 blur-[80px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
            
            {/* Brand Section */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-[1rem] bg-white flex items-center justify-center shadow-sm p-1.5 border border-slate-100 dark:border-white/10">
                  <img src="/logo.png" alt="Live-Sprachzentrum Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Live-<span className="text-transparent bg-clip-text bg-gradient-to-r from-germany-red to-red-500">Sprach</span><span className="text-amber-500">zentrum</span></h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-base max-w-sm font-medium leading-relaxed pl-[60px]">
                Dein Sprachpartner für Deutsch. Erlebe die deutsche Sprache direkt in Antananarivo, Madagaskar.
              </p>
            </div>
            
            {/* Contact Section */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 dark:border-white/10">
                  <Globe className="w-5 h-5" />
                </div>
                Kontakt
              </h4>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 font-medium text-sm pl-[52px]">
                <p>
                  Antanetibe Ivato<br/>Antananarivo 105, Madagascar
                </p>
                <p>
                  034 93 986 89 / 034 83 036 70
                </p>
                <p>
                  livesprachzentrum2@gmail.com
                </p>
              </div>
            </div>
            
            {/* Hours Section */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 dark:border-white/10">
                  <PlayCircle className="w-5 h-5" />
                </div>
                Öffnungszeiten
              </h4>
              <div className="pl-[52px]">
                <ul className="text-slate-600 dark:text-slate-300 font-medium space-y-2 text-sm w-full">
                  <li className="flex justify-between items-center bg-white/40 dark:bg-white/5 px-3 py-2 rounded-lg border border-white/50 dark:border-white/10">
                    <span>Mo, Mi, Do</span> 
                    <span className="font-bold text-slate-800 dark:text-white">08:30 - 16:00</span>
                  </li>
                  <li className="flex justify-between items-center bg-white/40 dark:bg-white/5 px-3 py-2 rounded-lg border border-white/50 dark:border-white/10">
                    <span>Di, Fr</span> 
                    <span className="font-bold text-slate-800 dark:text-white">08:30 - 12:00</span>
                  </li>
                  <li className="flex justify-between items-center bg-white/40 dark:bg-white/5 px-3 py-2 rounded-lg border border-white/50 dark:border-white/10">
                    <span>Samstag</span> 
                    <span className="font-bold text-slate-800 dark:text-white">09:00 - 11:30</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          
          <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 dark:text-slate-400 font-medium text-xs">
            <p>&copy; {new Date().getFullYear()} Live-Sprachzentrum LIS. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
