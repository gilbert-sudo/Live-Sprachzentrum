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

      <div className="bg-surface-container-lowest border border-surface-variant rounded-3xl p-8 md:p-12 max-w-lg w-full mx-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-10 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-germany-gold border-dashed animate-[spin_10s_linear_infinite] opacity-50"></div>
          <span className="material-symbols-outlined text-[48px] text-germany-gold relative z-10 animate-pulse">
            visibility
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-on-surface mb-4">Account in Prüfung</h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Vielen Dank für Ihre Registrierung! Ihr Account wurde erfolgreich erstellt und befindet sich derzeit in der Warteschlange. Ein Administrator wird Ihre Anmeldung in Kürze überprüfen und validieren.
        </p>

        <div className="bg-surface-container rounded-2xl p-4 w-full mb-8 text-left border border-surface-variant flex items-start gap-4">
          <span className="material-symbols-outlined text-germany-gold mt-1">info</span>
          <p className="text-sm text-on-surface-variant">
            Sie erhalten Zugang zu Ihrem Dashboard und allen Lernmaterialien, sobald Ihr Account validiert wurde.
          </p>
        </div>

        <button 
          onClick={handleLogout}
          className="px-8 py-3 bg-surface-container hover:bg-surface-variant text-on-surface rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Abmelden
        </button>
      </div>
    </div>
  );
}
