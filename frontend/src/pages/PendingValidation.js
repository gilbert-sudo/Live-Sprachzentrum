import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function PendingValidation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="z-10 flex flex-col items-center justify-center p-8 md:p-16 text-center bg-surface-container-lowest border border-surface-variant rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full mx-4 relative overflow-hidden">
        
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-germany-black via-germany-red to-germany-gold"></div>

        <div className="relative mb-8 mt-4 animate-in zoom-in duration-500">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Willkommen" className="w-48 h-48 object-cover rounded-full border-8 border-surface shadow-2xl ring-4 ring-germany-red/20" />
          <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center absolute bottom-2 right-2 border-4 border-surface shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-[28px] font-bold">check</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-6 tracking-tight">Fantastisch! 🎉</h1>
        <p className="text-lg md:text-xl text-secondary font-medium leading-relaxed mb-10 max-w-lg">
          Dein Account wurde erfolgreich erstellt und zur Warteschlange hinzugefügt. Unser Team wird deine Anmeldung in Kürze prüfen und freischalten.
        </p>
        
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleLogout}
            className="px-8 py-4 bg-germany-red hover:bg-red-700 text-white rounded-full font-bold transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(220,38,38,0.3)] flex justify-center items-center gap-2 group"
          >
            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">logout</span>
            <span>Abmelden & Zurück</span>
          </button>
        </div>

      </div>
    </div>
  );
}
