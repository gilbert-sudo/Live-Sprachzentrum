import React from 'react';

export default function Stammtisch() {
  return (
    <div className="max-w-[1120px] mx-auto px-4 md:px-8 flex flex-col gap-6 relative">
      {/* Group Header Card */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm p-5 border border-surface-subtle relative overflow-hidden">
        {/* Subtle decorative top bar reflecting German flag colors subtly */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-2 font-bold">B1 Projekt - Janvier</h2>
        <div className="flex items-center gap-2 mt-2 text-secondary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>group</span>
          <span className="font-label-md text-label-md">24 Mitglieder</span>
        </div>
        <p className="mt-3 text-on-surface-variant">
          Le Stammtisch virtuel pour votre cohorte B1 Projekt. Posez vos questions, partagez des ressources et pratiquez votre allemand ensemble !
        </p>
      </section>

      {/* Feed Container */}
      <div className="flex flex-col gap-5">
        {/* Post 1: Official Announcement (Highlighted) */}
        <article className="bg-surface-container-low border border-primary-fixed rounded-xl shadow-sm p-4 relative">
          {/* Highlight Indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
          <div className="flex justify-between items-start ml-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
                <img alt="Frau Luisa" className="w-full h-full object-cover" src="/frau-luisa.png"/>
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
          <div className="mt-3 ml-2">
            <p className="text-on-surface">
              Guten Morgen zusammen! ☀️<br/><br/>
              Bitte denkt daran, die Hausaufgaben für Kapitel 4 bis diesen Freitag hochzuladen. Ich habe außerdem ein neues Übungsblatt zum Konjunktiv II im Bereich "Lernen" hinzugefügt. <br/><br/>
              Viel Erfolg bei der Vorbereitung!
            </p>
          </div>
          <div className="mt-4 ml-2 flex items-center gap-4 border-t border-surface-variant pt-3">
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
                <img alt="Mikajy Ranaivo" className="w-full h-full object-cover" src="/mikajy-ranaivo.png"/>
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
                <img alt="Student Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsY3L4LiRmOB-SIYLtXvKPdN8m6Iy6DbyQAJCUmd_GbJLUOK_6N7xJubIRXoZH_1jo1H5BNywq683cRnzW67FvlhCSMo8AfqpH71G7jSzV2K8J_9hU1_1uI2hc2cDuZZKvm2p22rCuuDxsyUbiHz6O_nCAiJugDRxF8FMsm-ANmLHQzPz-aXsvWM6MNA6386I4uQUctCNPytFQ-PaYA20nYWjmAiIzys7lWwEX0qMheNca1fUpJjwo6gathnT8lBXAdeHSA87u-tJr"/>
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
            <div className="w-full h-48 rounded-lg overflow-hidden bg-surface-container-high border border-surface-variant">
              <img alt="Study space" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-i9EI8tOhDfhGBSxG0qQpP1c6t1CsBAfezLslNEW2R1dj255DC7dGB0En6AYah6g7XlAR-oolmB5Nx5cEqPYxZpqpKRA0mkb1iVpgeL3xfGS5CTOX1JneCNeUSRj-aJa7-FmSLypDqbY-M-D_rRwmgbwoYZIIuNUQy0x2NeDtXsrNo26Z121LxAizZHe4-vbL0N3cDhF36Q0n0xo1197YIWCZHOQyOrynchE3_NYawxuAk_xvVybCs3NPxBLcwCgwse3wuLXRpYQ_"/>
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
                <img alt="Mikajy Ranaivo" className="w-full h-full object-cover" src="/mikajy-ranaivo.png"/>
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


      {/* Floating Action Button (FAB) for writing a post */}
      <button className="fixed bottom-24 right-4 md:bottom-8 md:right-8 lg:right-12 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-surface-tint hover:-translate-y-0.5 transition-all duration-200 z-40 focus:outline-none focus:ring-4 focus:ring-primary-fixed">
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>edit_square</span>
      </button>
    </div>
  );
}
