import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openAuthModal } from '../store/authSlice';

// A liquid glass component using Tailwind utilities
const GlassCard = ({ children, className }) => (
  <div className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}>
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
    <div className="min-h-screen bg-germany-black text-white overflow-x-hidden font-sans relative">
      {/* Animated 3D Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-germany-black">
        {/* Slow panning container */}
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

        {/* Gradient Overlay for Text Readability - Made lighter so images pop beautifully */}
        <div className="absolute inset-0 bg-gradient-to-b from-germany-black/20 via-germany-black/50 to-germany-black z-10 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Navbar */}
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-16 md:mb-24 p-3 md:p-4 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl"
        >
          <div className="flex items-center space-x-3 px-2 md:px-4">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-lg p-1 overflow-hidden">
                <img src="/logo.png" alt="Live-Sprachzentrum Logo" className="w-full h-full object-contain" />
             </div>
             <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                <span className="text-white">Live</span>-<span className="text-germany-red">Sprach</span><span className="text-germany-gold">zentrum</span>
             </span>
          </div>
          <button 
            onClick={handleGetStarted}
            className="px-6 py-2.5 md:px-8 md:py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 font-semibold flex items-center space-x-2"
          >
            <span className="text-sm md:text-base">Anmelden</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 mb-24 md:mb-40 mt-10 md:mt-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium text-germany-gold shadow-xl">
            <Sparkles className="w-4 h-4 text-germany-gold" />
            <span>Die Zukunft des Sprachenlernens</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight max-w-5xl">
            Lerne Sprachen <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-germany-red via-red-400 to-germany-gold">
              natürlich & grenzenlos
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed">
            Tauche ein in eine immersive Lernumgebung. Interaktive Live-Klassen, KI-gestütztes Training und eine globale Community warten auf dich.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-10 w-full sm:w-auto px-4 sm:px-0">
            <button 
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-germany-red hover:bg-red-700 text-white font-bold text-lg shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <span>Jetzt durchstarten</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-[2rem] bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 group">
              <PlayCircle className="w-6 h-6 text-germany-red group-hover:scale-110 transition-transform" />
              <span>Tour ansehen</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-20"
        >
          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-germany-red/20 flex items-center justify-center mb-8 group-hover:bg-germany-red/40 transition-colors border border-germany-red/30">
              <Users className="w-8 h-8 text-red-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Live-Klassen</h3>
            <p className="text-slate-300/90 leading-relaxed text-lg">Interaktiver Unterricht mit muttersprachlichen Lehrern in Echtzeit. Erlebe dynamische Gruppenarbeit.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-germany-gold/20 flex items-center justify-center mb-8 group-hover:bg-germany-gold/40 transition-colors border border-germany-gold/30">
              <BookOpen className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Intelligente Bibliothek</h3>
            <p className="text-slate-300/90 leading-relaxed text-lg">Zugriff auf tausende interaktive Materialien, die sich deinem persönlichen Lernfortschritt anpassen.</p>
          </GlassCard>

          <GlassCard className="p-8 md:p-10 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 flex items-center justify-center mb-8 group-hover:bg-white/40 transition-colors border border-white/30">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Globale Community</h3>
            <p className="text-slate-300/90 leading-relaxed text-lg">Vernetze dich am virtuellen Stammtisch mit Lernenden weltweit und übe authentische Konversation.</p>
          </GlassCard>
        </motion.div>

        {/* Floating elements animation */}
        <motion.div 
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-0 w-64 h-64 bg-germany-red/20 rounded-full blur-[100px] -z-10 pointer-events-none"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-germany-gold/20 rounded-full blur-[100px] -z-10 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default LandingPage;
