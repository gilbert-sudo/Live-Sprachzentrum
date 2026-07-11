import React from 'react';
import { Link } from 'react-router-dom';

export default function Karriere() {
  return (
    <>

        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 md:pt-10 space-y-8">
          {/* Hero Section */}
          <section className="relative rounded-2xl overflow-hidden bg-germany-black text-white ambient-shadow-lvl2">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-germany-black via-germany-red to-germany-gold mix-blend-overlay"></div>
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
              <div className="space-y-4 max-w-xl">
                <span className="inline-block px-3 py-1 rounded-full bg-germany-red text-white font-label-sm text-label-sm uppercase tracking-wider">Objectif Ausbildung & Karriere</span>
                <h1 className="font-display-lg text-display-lg md:text-[56px] leading-tight text-white">Dein Weg nach <span className="text-germany-gold">Deutschland</span> starts here.</h1>
                <p className="font-body-lg text-body-lg text-surface-container-high max-w-md">Master the language, prepare your documents, and ace your interviews with our tailored resources for Malagasy students.</p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-[80px] text-germany-gold font-light">flight_takeoff</span>
                </div>
              </div>
            </div>
            <div className="h-2 w-full germany-accent-bar absolute bottom-0 left-0"></div>
          </section>

          {/* Resource Categories */}
          <section>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Career Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* CV Card */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">description</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Lebenslauf (CV)</h3>
                <p className="font-body-md text-body-md text-secondary mb-6 flex-1">Standardized German CV templates optimized for Ausbildung applications.</p>
                <div className="space-y-3 mt-auto">
                  <button className="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
                    <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Template 1 (Classic)</span>
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
                    <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Template 2 (Modern)</span>
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
                  </button>
                </div>
              </div>

              {/* Motivation Letter Card */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Anschreiben</h3>
                <p className="font-body-md text-body-md text-secondary mb-6 flex-1">Structure your motivation letter perfectly for German employers.</p>
                <div className="space-y-3 mt-auto">
                  <button className="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
                    <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Pflege (Nursing) PDF</span>
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
                    <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">IT & Tech PDF</span>
                    <span className="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
                  </button>
                </div>
              </div>

              {/* Cultural Tips */}
              <div className="bg-primary text-white p-6 rounded-2xl ambient-shadow-lvl2 interactive-card flex flex-col relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-white">
                  <span className="material-symbols-outlined text-2xl">public</span>
                </div>
                <h3 className="font-title-lg text-title-lg mb-2">Interkulturelles Training</h3>
                <p className="font-body-md text-body-md text-white/80 mb-6 flex-1">Understand German workplace culture, punctuality, and communication styles.</p>
                <button className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  Watch Video Guide
                </button>
              </div>

              {/* Interview Prep */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant lg:col-span-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">forum</span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-on-surface mb-1">Vorbereitung Vorstellungsgespräch</h3>
                    <p className="font-body-md text-body-md text-secondary">Practice common questions and learn how to present yourself confidently in German.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-surface-variant">
                    <span className="material-symbols-outlined text-secondary">mic</span>
                    <div className="flex-1">
                      <p className="font-label-md text-label-md text-on-surface">Mock Interview Audio</p>
                      <p className="font-label-sm text-label-sm text-secondary">15 mins</p>
                    </div>
                    <button className="text-primary hover:bg-surface-container-low p-2 rounded-full"><span className="material-symbols-outlined icon-filled">play_arrow</span></button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-surface-variant">
                    <span className="material-symbols-outlined text-secondary">quiz</span>
                    <div className="flex-1">
                      <p className="font-label-md text-label-md text-on-surface">Top 50 Questions</p>
                      <p className="font-label-sm text-label-sm text-secondary">Interactive QCM</p>
                    </div>
                    <button className="text-primary hover:bg-surface-container-low p-2 rounded-full"><span className="material-symbols-outlined">arrow_forward</span></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="pb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">Success Stories</h2>
              <Link to="/" className="font-label-md text-label-md text-primary flex items-center hover:underline">View all <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 border border-surface-variant flex gap-4">
                <img alt="Success Story" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCICrQU1eRXdQS5s9i5x0Eyc9cOAD8oivEKf-pKgsj3HgwkJURF39PFHBdIKgo2ewYHg3ohvhn3t_chttNTRKdpRdrrRtbemrRsoAuEY7retPkhJS4pI6y89Vv0kb-KcYazKfLQAUEtqsxBDfTj0ZNGz3uHMoqP98idW9s7B7RvEiVSQVfEhhxnEYlLH3aT9ninwiANPv1wzyH_GAEQ2cvnYKwH1o18judYd14xro66XL7m_H1ar5jG4Y5RTG_0HiS2LrvNhrcbbCKJ"/>
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface">Tsiry R.</h4>
                  <p className="font-label-sm text-label-sm text-secondary mb-2">Ausbildung: Pflegefachkraft in München</p>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">"The CV templates here helped me secure 3 interviews in my first week of applying. The cultural tips were spot on!"</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 border border-surface-variant flex gap-4">
                <img alt="Success Story" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEzd2F9Cnpvw0p4ExrPQb1ee-_yq2FWZ_ZZUT-sXqeI7bKEtNlNhEY7AfUyW0afZuWjsHMtrmB4hezcmnLBGshsK_mPQEMB5TXIQvjx5e6-ZKZugueaU0wW2iB0d9UcpApkYmjcBFdG3gEAXLRbxnKt3EWf9AwVTgRyXvMT8kGZxg3YaFxmXzPMitLXPsl34TNqJBRAdQJrH2x8bFrEYRit7NJCkf40fboJBE-MyiqhD5UBNilguO7pOvIFRfbHlwfdHRWSj91Ac8"/>
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface">Andry M.</h4>
                  <p className="font-label-sm text-label-sm text-secondary mb-2">Ausbildung: Fachinformatiker in Berlin</p>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">"The interview preparation audio tracks gave me the confidence to speak clearly during my technical assessment."</p>
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  );
}
