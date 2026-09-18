import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminUsers } from '../store/adminUsersSlice';

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  return (
    <main className="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
      <section className="mb-2 md:mb-4 flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, Master Admin {user?.name}!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Willkommen im Verwaltungsbereich.</p>
        </div>
      </section>

      {/* Campus Entry Banner */}
      <section className="mb-4 md:mb-8">
        <Link to="/campus" className="group block w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/malagasy_student_banner.png')" }}
          ></div>
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-germany-black/90 via-germany-black/60 to-transparent"></div>
          
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-center justify-between h-full gap-6 min-h-[220px]">
            
            <div className="text-center md:text-left flex-1 max-w-xl">
              <h3 className="font-title-lg text-title-lg md:text-4xl text-white mb-3 font-bold tracking-tight drop-shadow-md">
                Willkommen auf dem <span className="text-germany-gold">Campus</span>
              </h3>
              <p className="text-white/90 font-body-lg text-lg drop-shadow-md">
                Betrete die virtuelle Schule. Wähle dein Niveau, finde Live-Klassen und lerne gemeinsam mit anderen.
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <div className="w-full md:w-auto bg-germany-red text-white font-label-lg px-8 py-4 rounded-full shadow-lg group-hover:bg-red-700 transition-colors flex items-center justify-center gap-3 cursor-pointer backdrop-blur-sm border border-white/20">
                <span className="material-symbols-outlined">meeting_room</span>
                Campus betreten
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Students Card */}
        <Link to="/admin/students" className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-germany-gold/10 text-germany-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined icon-filled text-[28px]">school</span>
          </div>
          <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Schüler</h3>
          <p className="text-on-surface-variant mb-6 flex-1">Verwalten Sie alle Schüler. Fügen Sie neue hinzu, ändern Sie Niveaus oder aktualisieren Sie Profile.</p>
          <div className="flex items-center text-germany-gold font-bold gap-2">
            Schüler verwalten
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </Link>

        {/* Teachers Card */}
        <Link to="/admin/teachers" className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-germany-red/10 text-germany-red flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined icon-filled text-[28px]">history_edu</span>
          </div>
          <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Lehrer</h3>
          <p className="text-on-surface-variant mb-6 flex-1">Verwalten Sie das Lehrpersonal. Weisen Sie Rechte zu und pflegen Sie die Lehrerprofile.</p>
          <div className="flex items-center text-germany-red font-bold gap-2">
            Lehrer verwalten
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </Link>

        {/* Admins Card */}
        <Link to="/admin/admins" className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-germany-black/10 text-germany-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined icon-filled text-[28px]">admin_panel_settings</span>
          </div>
          <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Admins</h3>
          <p className="text-on-surface-variant mb-6 flex-1">Verwalten Sie andere Administratoren mit weitreichenden Systemrechten.</p>
          <div className="flex items-center text-germany-black font-bold gap-2">
            Admins verwalten
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
