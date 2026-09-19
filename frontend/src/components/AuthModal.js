import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all">
      {/* Dynamic blurred backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <div className="bg-white/90 dark:bg-surface/90 backdrop-blur-2xl w-full max-w-[420px] rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-white/10 overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Decorative background blobs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-germany-gold/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-germany-red/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close button */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-secondary hover:text-on-surface transition-all z-50"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="p-10 relative z-10 flex flex-col items-center text-center">
          {/* Welcoming Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-germany-red to-[#FF4B53] flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
            <span className="material-symbols-outlined text-white text-4xl">waving_hand</span>
          </div>

          <h2 className="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
            Willkommen zurück!
          </h2>
          <p className="text-secondary/80 mb-8 text-base font-medium">
            Schön, dass du wieder da bist.
          </p>

          {error && (
            <div className="mb-6 w-full p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm text-germany-red rounded-2xl text-sm font-medium border border-red-100 dark:border-red-900/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span className="text-left">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 flex items-center justify-center transition-colors group-focus-within:text-germany-red">
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 focus:border-germany-red focus:bg-white dark:focus:bg-black/40 focus:ring-4 focus:ring-germany-red/10 outline-none transition-all text-on-surface placeholder:text-secondary/50 font-medium"
                  placeholder="E-Mail Adresse"
                />
              </div>
            </div>

            <div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 flex items-center justify-center transition-colors group-focus-within:text-germany-red">
                  <span className="material-symbols-outlined text-[22px]">lock</span>
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 focus:border-germany-red focus:bg-white dark:focus:bg-black/40 focus:ring-4 focus:ring-germany-red/10 outline-none transition-all text-on-surface placeholder:text-secondary/50 font-medium"
                  placeholder="Passwort"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-on-surface p-2 rounded-full transition-colors flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-4 px-4 bg-gradient-to-r from-germany-red to-[#FF4B53] hover:from-[#E61E25] hover:to-[#FF333D] text-white rounded-2xl font-bold shadow-xl shadow-red-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span className="text-lg">Anmelden</span>
                <span className="material-symbols-outlined text-[22px] transition-transform group-hover:translate-x-1">login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
