import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../store/authSlice';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';

// A liquid glass component using Tailwind utilities
const GlassCard = ({ children, className }) => (
  <div className={`bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}>
    {children}
  </div>
);

const LandingPage = () => {
  const dispatch = useDispatch();

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
      {/* Background Detail & Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-red-50/80 dark:from-slate-900 dark:via-germany-black dark:to-red-950/40 transition-colors duration-500">
        {/* Subtle Motive Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-40 hidden dark:block" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Animated Gradient Orbs for Depth */}
        <motion.div 
          animate={{ x: [0, 150, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-germany-red/30 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-germany-gold/20 rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none"
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
            className="absolute top-[5%] left-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.4)] border-4 border-white/10"
            animate={{ y: [0, -50, 0], x: [0, 30, 0] }} 
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          >
            <img src="/assets/bg1.jpg" className="w-full h-full object-cover" alt="Student Classroom" />
          </motion.div>

          {/* Circle 2 - Top Right */}
          <motion.div 
            className="absolute top-[2%] right-[5%] w-[150px] h-[150px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,204,0,0.3)] border-4 border-white/10"
            animate={{ y: [0, 40, 0], x: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 2 }}
          >
            <img src="/assets/bg2.jpg" className="w-full h-full object-cover" alt="Student Learning" />
          </motion.div>

          {/* Circle 3 - Center Right */}
          <motion.div 
            className="absolute top-[35%] right-[8%] w-[220px] h-[220px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] border-4 border-white/10"
            animate={{ y: [0, -30, 0], x: [0, -40, 0], scale: [1, 1.08, 1] }} 
            transition={{ repeat: Infinity, duration: 22, ease: "easeInOut", delay: 1 }}
          >
            <img src="/assets/bg3.jpg" className="w-full h-full object-cover" alt="Student Library" />
          </motion.div>

          {/* Circle 4 - Bottom Left */}
          <motion.div 
            className="absolute bottom-[5%] left-[10%] w-[180px] h-[180px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,204,0,0.3)] border-4 border-white/10"
            animate={{ y: [0, 50, 0], x: [0, 20, 0] }} 
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 4 }}
          >
            <img src="/assets/bg1.jpg" className="w-full h-full object-cover" alt="Student Group" />
          </motion.div>

          {/* Circle 5 - Center Left */}
          <motion.div 
            className="absolute top-[40%] left-[25%] w-[120px] h-[120px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] border-2 border-white/20 opacity-90"
            animate={{ y: [0, -60, 0], x: [0, -30, 0] }} 
            transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 3 }}
          >
            <img src="/assets/bg2.jpg" className="w-full h-full object-cover" alt="Student Focus" />
          </motion.div>

          {/* Circle 6 - Bottom Right */}
          <motion.div 
            className="absolute bottom-[15%] right-[30%] w-[140px] h-[140px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.4)] border-2 border-white/20 opacity-95"
            animate={{ y: [0, 40, 0], x: [0, 40, 0] }} 
            transition={{ repeat: Infinity, duration: 19, ease: "easeInOut", delay: 5 }}
          >
            <img src="/assets/bg3.jpg" className="w-full h-full object-cover" alt="Students Happy" />
          </motion.div>

        </motion.div>

        {/* Gradient Overlay for Text Readability - Made highly transparent so background shines through */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-germany-black/20 to-germany-black/60 z-10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-16 md:mb-24 p-3 md:p-4 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-slate-200/50 dark:border-white/10 shadow-xl dark:shadow-2xl"
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
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight max-w-5xl">
            Lerne Deutsch für <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-germany-red via-red-500 to-amber-500 dark:from-germany-red dark:via-red-400 dark:to-germany-gold">
              deine Zukunft in Deutschland
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
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
              <Users className="w-8 h-8 text-red-500 dark:text-red-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Erfahrene Lehrkräfte</h3>
            <p className="text-slate-600 dark:text-slate-300/90 leading-relaxed text-lg">Lerne mit Dozenten der Universität Madagaskar und muttersprachlichen Lehrkräften aus Deutschland.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-100 dark:bg-germany-gold/20 flex items-center justify-center mb-8 group-hover:bg-amber-200 dark:group-hover:bg-germany-gold/40 transition-colors border border-amber-200 dark:border-germany-gold/30">
              <BookOpen className="w-8 h-8 text-amber-500 dark:text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Strukturierte Kurse (A1-B2)</h3>
            <p className="text-slate-600 dark:text-slate-300/90 leading-relaxed text-lg">Von den Grundlagen bis zur Mittelstufe. Abendkurse für Berufstätige und Ferienworkshops für Jugendliche.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 dark:bg-white/20 flex items-center justify-center mb-8 group-hover:bg-slate-200 dark:group-hover:bg-white/40 transition-colors border border-slate-200 dark:border-white/30">
              <Globe className="w-8 h-8 text-slate-500 dark:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Au Pair, FSJ & Ausbildung</h3>
            <p className="text-slate-600 dark:text-slate-300/90 leading-relaxed text-lg">Wir bereiten dich sprachlich auf deinen Aufenthalt in Deutschland vor und unterstützen bei Visa-Fragen.</p>
          </GlassCard>
        </motion.div>

        {/* Floating elements animation */}
        <motion.div 
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-0 w-64 h-64 bg-germany-red/20 rounded-full blur-[100px] -z-10 pointer-events-none"
        />
      </div>

      {/* Full-width Contact Footer */}
      <footer id="kontakt" className="relative z-20 w-full bg-white/40 dark:bg-white/5 backdrop-blur-2xl border-t border-slate-200/50 dark:border-white/10 py-16 mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg p-1 overflow-hidden">
                  <img src="/logo.png" alt="Live-Sprachzentrum Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Finde uns in <span className="text-amber-600 dark:text-germany-gold">Antananarivo</span></h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg max-w-md">Dein Sprachpartner für Deutsch. Erlebe die deutsche Sprache direkt in Madagaskar.</p>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-amber-600 dark:text-germany-gold mb-2">Adresse</h4>
                  <p className="text-slate-600 dark:text-slate-300">Antanetibe Ivato<br/>Antananarivo 105, Madagascar</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-amber-600 dark:text-germany-gold mb-2">Kontakt</h4>
                  <p className="text-slate-600 dark:text-slate-300">034 93 986 89<br/>034 83 036 70<br/>livesprachzentrum2@gmail.com</p>
                </div>
              </div>
              <div className="space-y-6">
                 <div>
                  <h4 className="text-lg font-semibold text-amber-600 dark:text-germany-gold mb-2">Öffnungszeiten</h4>
                  <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                    <li className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1"><span>Mo, Mi, Do:</span> <span>08:30 - 16:00</span></li>
                    <li className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-1"><span>Di, Fr:</span> <span>08:30 - 12:00</span></li>
                    <li className="flex justify-between pb-1"><span>Samstag:</span> <span>09:00 - 11:30</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Live-Sprachzentrum LIS. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
