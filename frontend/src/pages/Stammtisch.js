import React from 'react';

export default function Stammtisch() {
  return (
    <div className="h-[calc(100vh-102px)] md:h-[calc(100vh-64px)] w-full max-w-[1120px] mx-auto flex flex-col bg-surface-container-lowest relative -mt-4 md:-mt-8 rounded-none md:rounded-t-2xl md:rounded-b-none overflow-hidden border-x border-t border-surface-variant shadow-sm">
      {/* Chat Header */}
      <header className="bg-surface-container-lowest shadow-sm p-3 md:p-4 border-b border-surface-subtle flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
            B1
          </div>
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-bold leading-tight">B1 Projekt - Janvier</h2>
            <div className="flex items-center gap-1 text-secondary text-xs">
              <span className="material-symbols-outlined text-[14px]">group</span>
              <span>24 Mitglieder</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">call</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">videocam</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container-low transition-colors md:hidden">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </header>

      {/* Scrollable Message History */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 flex flex-col gap-4 bg-surface-container-low/30 hide-scrollbar">
        {/* Post 1: Official Announcement (Highlighted) */}
        <article className="bg-surface-container-lowest rounded-xl shadow-sm p-4 border border-surface-subtle shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-[2.5px] border-primary bg-surface">
                  <img alt="Frau Luisa" className="w-full h-full object-cover" src="/frau-luisa.png" />
                </div>
                {/* Admin/Verified Badge */}
                <div className="absolute -bottom-0.5 -right-0.5 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-label-md text-label-md font-bold text-on-surface">Frau Luisa</h3>
                  <span className="bg-primary-container text-on-primary-container font-label-sm text-[10px] md:text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>campaign</span>
                    Ankündigung
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary">Vor 2 Stunden</span>
              </div>
            </div>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="mt-3">
            <p className="text-on-surface">
              Guten Morgen zusammen! ☀️<br /><br />
              Bitte denkt daran, die Hausaufgaben für Kapitel 4 bis diesen Freitag hochzuladen. Ich habe außerdem ein neues Übungsblatt zum Konjunktiv II im Bereich "Lernen" hinzugefügt. <br /><br />
              Viel Erfolg bei der Vorbereitung!
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
              <span className="font-label-md text-label-md">12</span>
            </button>
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
              <span className="font-label-md text-label-md">4</span>
            </button>
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors ml-auto">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>translate</span>
              <span className="font-label-sm text-label-sm">Übersetzen</span>
            </button>
          </div>
        </article>

        {/* Post 2: Message with file attachment */}
        <article className="bg-surface-container-lowest rounded-xl shadow-sm p-4 border border-surface-subtle">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
                <img alt="Mikajy Ranaivo" className="w-full h-full object-cover" src="/mikajy-ranaivo.png" />
              </div>
              <div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface">Mikajy ranaivo</h3>
                <span className="font-label-sm text-label-sm text-secondary">Heute, 09:15</span>
              </div>
            </div>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="mt-3">
            <p className="text-on-surface mb-3">
              Hallo zusammen, hier ist die Zusammenfassung der Grammatikregeln von letzter Woche. Hoffe, es hilft euch beim Lernen! 📚
            </p>
            {/* File Attachment Template */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-surface-variant bg-surface-container-low hover:bg-surface-variant transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-label-md text-label-md font-bold text-on-surface truncate group-hover:text-primary transition-colors">Grammatik_Zusammenfassung_Woche3.pdf</h4>
                  <span className="font-label-sm text-label-sm text-secondary">PDF Datei • 2.4 MB</span>
                </div>
                <button className="text-secondary hover:text-primary p-2 rounded-full hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
              <span className="font-label-md text-label-md">5</span>
            </button>
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
              <span className="font-label-md text-label-md">Antworten</span>
            </button>
          </div>
        </article>

        {/* Post 3: Student Post with Media */}
        <article className="bg-surface-container-lowest rounded-xl shadow-sm p-4 border border-surface-subtle">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
                <img alt="Student Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsY3L4LiRmOB-SIYLtXvKPdN8m6Iy6DbyQAJCUmd_GbJLUOK_6N7xJubIRXoZH_1jo1H5BNywq683cRnzW67FvlhCSMo8AfqpH71G7jSzV2K8J_9hU1_1uI2hc2cDuZZKvm2p22rCuuDxsyUbiHz6O_nCAiJugDRxF8FMsm-ANmLHQzPz-aXsvWM6MNA6386I4uQUctCNPytFQ-PaYA20nYWjmAiIzys7lWwEX0qMheNca1fUpJjwo6gathnT8lBXAdeHSA87u-tJr" />
              </div>
              <div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface">Marie Rasoa</h3>
                <span className="font-label-sm text-label-sm text-secondary">Gestern, 18:30</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-on-surface mb-3">
              Mein Arbeitsplatz heute Abend. Ich bin fast fertig mit dem Dossier für die Ausbildungsvorbereitung. Wer ist noch am Lernen? ☕📚
            </p>
            
            {/* Multiple Photos Stacked UI */}
            <div className="mt-3 mb-2 flex flex-col ml-4 w-fit">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 cursor-pointer group">
                {/* Stack Layer 3 (Bottom) */}
                <div className="absolute inset-0 bg-surface-variant rounded-xl border-2 border-surface shadow-sm rotate-[6deg] translate-x-3 translate-y-2 overflow-hidden transition-transform group-hover:rotate-[8deg] group-hover:translate-x-5">
                  <img alt="Study photo 3" className="w-full h-full object-cover opacity-80" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" />
                </div>
                
                {/* Stack Layer 2 (Middle) */}
                <div className="absolute inset-0 bg-surface-container-high rounded-xl border-2 border-surface shadow-sm -rotate-[4deg] -translate-x-1 -translate-y-1 overflow-hidden transition-transform group-hover:-rotate-[6deg] group-hover:-translate-x-3">
                  <img alt="Study photo 2" className="w-full h-full object-cover opacity-90" src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80" />
                </div>
                
                {/* Stack Layer 1 (Top) */}
                <div className="absolute inset-0 bg-surface-container-lowest rounded-xl border-[3px] border-surface shadow-md z-10 overflow-hidden transform group-hover:scale-[1.02] transition-transform">
                  <img alt="Study space" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-i9EI8tOhDfhGBSxG0qQpP1c6t1CsBAfezLslNEW2R1dj255DC7dGB0En6AYah6g7XlAR-oolmB5Nx5cEqPYxZpqpKRA0mkb1iVpgeL3xfGS5CTOX1JneCNeUSRj-aJa7-FmSLypDqbY-M-D_rRwmgbwoYZIIuNUQy0x2NeDtXsrNo26Z121LxAizZHe4-vbL0N3cDhF36Q0n0xo1197YIWCZHOQyOrynchE3_NYawxuAk_xvVybCs3NPxBLcwCgwse3wuLXRpYQ_" />
                  
                  {/* Photo Count Overlay Badge */}
                  <div className="absolute top-2 right-2 bg-germany-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[12px]">photo_library</span>
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
              <span className="font-label-md text-label-md">8</span>
            </button>
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
              <span className="font-label-md text-label-md">1</span>
            </button>
          </div>
        </article>

        {/* Post 4: Standard Student Post */}
        <article className="bg-surface-container-lowest rounded-xl shadow-sm p-4 border border-surface-subtle">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
                <img alt="Mikajy Ranaivo" className="w-full h-full object-cover" src="/mikajy-ranaivo.png" />
              </div>
              <div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface">Mikajy ranaivo</h3>
                <span className="font-label-sm text-label-sm text-secondary">Vor 5 Stunden</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-on-surface">
              Hallo Leute! Hat jemand gute Notizen zur gestrigen Lektion? Ich war leider krank und möchte den Stoff für das Projekt am Wochenende nachholen. Danke im Voraus! 🙏
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
            <button className="flex items-center gap-1.5 text-primary group">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <span className="font-label-md text-label-md">3</span>
            </button>
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
              <span className="font-label-md text-label-md">2 Antworten</span>
            </button>
          </div>
        </article>
      </div>

      {/* Message Input Bar */}
      <div className="p-2 md:p-3 bg-surface-container-lowest border-t border-surface-variant flex items-end gap-1.5 md:gap-2 flex-shrink-0 z-10 pb-1 md:pb-3">
        <div className="flex gap-0.5 md:gap-1 mb-0.5 md:mb-1">
          <button className="p-1.5 md:p-2 text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">add_circle</span>
          </button>
          <button className="hidden sm:flex p-1.5 md:p-2 text-primary hover:bg-primary/10 rounded-full transition-colors items-center justify-center">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">image</span>
          </button>
          <button className="hidden sm:flex p-1.5 md:p-2 text-primary hover:bg-primary/10 rounded-full transition-colors items-center justify-center">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">attach_file</span>
          </button>
        </div>
        <div className="flex-1 bg-surface-container-high rounded-3xl flex items-end overflow-hidden border border-surface-variant min-h-[36px] md:min-h-[44px]">
          <textarea
            placeholder="Nachricht..."
            className="w-full bg-transparent resize-none outline-none py-2 px-3 md:py-3 md:px-4 max-h-32 text-on-surface text-sm md:text-base"
            rows="1"
          ></textarea>
          <button className="p-1.5 m-0.5 md:p-2 md:m-1 text-primary hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">sentiment_satisfied</span>
          </button>
        </div>
        <button className="p-2 md:p-3 bg-primary text-on-primary hover:bg-primary/90 rounded-full transition-colors flex items-center justify-center shadow-sm shrink-0 mb-0.5 md:mb-0.5">
          <span className="material-symbols-outlined text-[18px] md:text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
        </button>
      </div>
    </div>
  );
}
