import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup, openAuthModal, closeWaitlistModal } from '../store/authSlice';
import axios from 'axios';

export default function WaitlistModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'A1',
    phone: '',
    gender: 'female',
    birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0],
    photo: '',
    paymentType: 'full',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1); // Reset step when opened
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenAuth = () => {
    dispatch(closeWaitlistModal());
    dispatch(openAuthModal());
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('avatar', file);

    try {
      setUploadingImage(true);
      const { data } = await axios.post('/api/upload/public-avatar', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      console.error(err);
      alert('Fehler beim Hochladen des Bildes.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setError('');
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
        setLoading(false);
        if (data.exists) {
          setError('Diese E-Mail-Adresse wird bereits verwendet.');
          return;
        }
        setStep(2);
      } catch (err) {
        setLoading(false);
        setError('Fehler bei der Überprüfung der E-Mail.');
      }
    } else if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submit
      setError('');
      setLoading(true);

      const submitData = { ...formData };

      try {
        await dispatch(signup(submitData)).unwrap();
        setLoading(false);
        onClose();
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Registration failed');
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm md:p-4">
      <div className="bg-surface w-full h-full md:w-[500px] md:h-auto md:max-h-[90vh] md:rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 md:px-8 md:py-6 border-b border-surface-variant bg-surface relative z-10 shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-germany-red flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-[24px] md:text-[28px]">how_to_reg</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-on-surface">Auf die Warteliste</h2>
              <p className="text-xs text-secondary font-medium">Schritt {step} von 3</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-secondary hover:bg-surface-variant hover:text-on-surface rounded-full transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 md:px-8 md:py-6 overscroll-contain" data-lenis-prevent="true">
          {error && (
            <div className="mb-6 w-full p-4 bg-red-50 text-germany-red rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span className="text-left">{error}</span>
            </div>
          )}

          <form id="waitlist-form" onSubmit={handleNextStep} className="flex flex-col gap-5 text-on-surface pb-6">
            
            {/* Step 1: Account Info */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Vollständiger Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all" placeholder="Max Mustermann" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">E-Mail</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all" placeholder="max@beispiel.de" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Passwort *</label>
                  <div className="relative flex items-center">
                    <input required type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-4 pr-[120px] py-3 rounded-xl bg-surface-container border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all" placeholder="••••••••" />
                    
                    <div className="absolute right-1.5 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-secondary hover:text-on-surface p-1.5 rounded-full transition-colors flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
                        title="Passwort anzeigen/verbergen"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                      
                      <div className="w-[1px] h-4 bg-surface-variant mx-0.5"></div>
                      
                      <button 
                        type="button" 
                        onClick={() => {
                          setFormData({...formData, password: generatePassword()});
                          setShowPassword(true);
                        }} 
                        className="bg-germany-red hover:bg-red-700 text-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 active:scale-95 ml-1"
                        title="Neues Passwort generieren"
                      >
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                        Auto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Telefon</label>
                  <div className="flex">
                    <div className="flex-shrink-0 bg-surface-variant/30 px-4 py-3 border border-surface-variant border-r-0 rounded-l-xl flex items-center justify-center font-bold text-secondary text-sm select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-auto rounded-[2px] shadow-sm overflow-hidden border border-black/10">
                        <rect width="900" height="600" fill="#007E3A"/>
                        <rect width="900" height="300" fill="#FC3D32"/>
                        <rect width="300" height="600" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})} 
                      className="w-full px-4 py-3 rounded-r-xl bg-surface-container border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all" 
                      placeholder="034 12 345 67" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Geburtsdatum</label>
                  <input required type="date" value={formData.birthday} onChange={e => setFormData({...formData, birthday: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-surface-container border border-surface-variant focus:border-germany-red focus:ring-2 focus:ring-germany-red/20 outline-none transition-all dark:[color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Geschlecht</label>
                  <div className="flex gap-3 h-[48px]">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, gender: 'male'})}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 transition-all ${formData.gender === 'male' ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">male</span>
                      <span>Männlich</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, gender: 'female'})}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 transition-all ${formData.gender === 'female' ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">female</span>
                      <span>Weiblich</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-secondary">Niveau (Sprachkenntnisse)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData({...formData, level: lvl})}
                        className={`py-2.5 rounded-xl font-bold transition-all border-2 text-sm ${
                          formData.level === lvl 
                            ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 shadow-sm' 
                            : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant hover:border-secondary/30'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, level: 'Alle'})}
                      className={`col-span-3 py-2.5 rounded-xl font-bold transition-all border-2 text-sm ${
                        formData.level === 'Alle' 
                          ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 shadow-sm' 
                          : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant hover:border-secondary/30'
                      }`}
                    >
                      Keine Vorkenntnisse
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Setup & Payment */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col gap-5">
                <div className="border border-surface-variant p-4 rounded-2xl bg-surface-container-lowest">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-germany-red">payments</span>
                    Schulgebühren
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Zahlungsweise</label>
                    <div className="flex gap-3 h-[48px]">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentType: 'full'})}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 transition-all ${formData.paymentType === 'full' ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">looks_one</span>
                        <span>Einmalig</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentType: 'twice'})}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-xl border-2 transition-all ${formData.paymentType === 'twice' ? 'border-germany-red bg-red-50 text-germany-red dark:bg-germany-red/10 font-bold shadow-sm' : 'border-surface-variant bg-surface-container text-secondary hover:bg-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">looks_two</span>
                        <span>Zweimalig</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-secondary">Foto (Avatar) - Optional</label>
                  <div className="flex items-center gap-4 bg-surface-container p-3 rounded-xl border border-surface-variant">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-germany-red shadow-sm" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center text-secondary border border-surface-subtle shrink-0">
                        <span className="material-symbols-outlined text-[24px]">person</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      disabled={uploadingImage}
                      className="flex-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-germany-red file:text-white hover:file:bg-red-700 transition-all cursor-pointer text-sm overflow-hidden" 
                    />
                    {uploadingImage && <span className="material-symbols-outlined animate-spin text-germany-red mr-2">progress_activity</span>}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        {/* Sticky Footer */}
        <div className="flex-shrink-0 p-4 md:px-8 md:py-6 border-t border-surface-variant bg-surface/80 backdrop-blur-xl w-full z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 flex-1 max-w-[150px]">
              <div className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${step >= 1 ? 'bg-germany-red' : 'bg-surface-variant'}`}></div>
              <div className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${step >= 2 ? 'bg-germany-red' : 'bg-surface-variant'}`}></div>
              <div className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${step >= 3 ? 'bg-germany-red' : 'bg-surface-variant'}`}></div>
            </div>
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="text-secondary text-sm font-bold hover:text-on-surface flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Zurück
              </button>
            )}
          </div>
          
          <button 
            form="waitlist-form"
            type="submit" 
            disabled={loading || uploadingImage} 
            className={`w-full bg-germany-red hover:bg-red-700 text-white py-4 rounded-full font-bold transition-all flex justify-center items-center gap-2 shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.4)] ${loading || uploadingImage ? 'opacity-70 cursor-not-allowed shadow-none' : 'active:scale-[0.98] group'}`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span className="text-lg">Speichern...</span>
              </>
            ) : step < 3 ? (
              <>
                <span className="text-lg">Weiter</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </>
            ) : (
              <>
                <span className="text-lg">Account erstellen</span>
                <span className="material-symbols-outlined transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">send</span>
              </>
            )}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-secondary text-sm font-medium">
              Du hast bereits einen Account?{' '}
              <button 
                type="button" 
                onClick={handleOpenAuth}
                className="text-germany-red font-bold hover:underline transition-colors"
              >
                Hier einloggen
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
