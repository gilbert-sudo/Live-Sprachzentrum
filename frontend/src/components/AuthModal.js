import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await signup(name, email, password);
    }

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      <div className="bg-surface w-full max-w-md rounded-3xl shadow-2xl border border-surface-variant overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-low text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-on-surface mb-2">
            {isLogin ? 'Willkommen zurück!' : 'Konto erstellen'}
          </h2>
          <p className="text-secondary mb-8 text-sm">
            {isLogin 
              ? 'Bitte melden Sie sich an, um fortzufahren.' 
              : 'Registrieren Sie sich, um auf alle Kurse zuzugreifen.'}
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-germany-red rounded-xl text-sm border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all text-on-surface"
                  placeholder="Ihr vollständiger Name"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">E-Mail</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all text-on-surface"
                placeholder="name@beispiel.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">Passwort</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all text-on-surface"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 px-4 bg-germany-red hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all active:scale-[0.98]"
            >
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-secondary text-sm">
              {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="ml-2 text-germany-red font-bold hover:underline outline-none"
              >
                {isLogin ? 'Hier registrieren' : 'Hier anmelden'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
