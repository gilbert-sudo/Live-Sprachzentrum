import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await dispatch(login({ email, password })).unwrap();
      onClose();
    } catch (err) {
      setError(err || 'Authentication failed');
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
            Willkommen zurück!
          </h2>
          <p className="text-secondary mb-8 text-sm">
            Bitte melden Sie sich an, um fortzufahren.
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-germany-red rounded-xl text-sm border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              Anmelden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
