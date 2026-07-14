import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    if (!user) {
      openAuthModal();
    }
  }, [user, openAuthModal]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-8 text-center animate-in fade-in duration-300">
        <div className="w-24 h-24 bg-surface-container-highest rounded-full flex items-center justify-center mb-6 border border-surface-variant">
          <span className="material-symbols-outlined text-5xl text-germany-red">lock</span>
        </div>
        <h2 className="text-3xl font-bold text-on-surface mb-3 font-headline-md">Anmeldung erforderlich</h2>
        <p className="text-secondary mb-8 max-w-md font-body-md text-lg">
          Sie müssen angemeldet sein, um auf diesen Bereich zugreifen zu können. Bitte melden Sie sich an oder registrieren Sie sich kostenlos.
        </p>
        <button 
          onClick={openAuthModal} 
          className="bg-germany-red hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Jetzt Anmelden
        </button>
      </div>
    );
  }

  return children;
}
