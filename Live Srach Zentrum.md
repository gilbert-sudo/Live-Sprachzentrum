<!-- image.png -->
Cahier des Charges Fonctionnel &
Technique
Plateforme E-learning "Live-Sprachzentrum"

1. Contexte et Vision du Projet
Le présent document définit les spécifications pour le développement de la plateforme numérique de
l'école Live-Sprachzentrum. Reconnue à Madagascar pour son excellence dans l'enseignement de
l'allemand et son orientation vers les programmes d'Ausbildung en Allemagne, l'école souhaite se doter
d'un outil digital sur mesure.
La vision centrale est de créer une synergie parfaite entre les cours en présentiel et l'écosystème
numérique, en digitalisant l'intégralité du matériel pédagogique exclusif (les manuels de l'école) et en
fédérant la communauté des apprenants et des professeurs.

2. Architecture Pédagogique (L'Approche "Miroir")
L'application se distinguera par une intégration complète du matériel pédagogique existant. Elle ne
proposera pas un contenu générique, mais sera le reflet interactif des manuels physiques de l'école.

Niveau

Durée
estimée

Spécificités du parcours

Acquisition des bases, vocabulaire de survie et introduction à la

A1

2.5 - 3 mois

A2

2.5 - 3 mois

Communication intermédiaire et consolidation des acquis.

2.5 - 3 mois

Parcours classique pour la maîtrise générale de la langue.

B1
Standard

B1 Projekt

2.5 - 3 mois

grammaire.

Parcours spécifique orienté Ausbildung (vocabulaire professionnel,
monde de l'entreprise).

1

Niveau

B2

Durée
estimée
2.5 - 3 mois

Spécificités du parcours

Maîtrise avancée et fluidité de la communication complexe.

2.1. Digitalisation Interactive des Manuels
• Navigation Structurée : L'arborescence de l'application suivra scrupuleusement la table des
matières des livres (ex: Niveau > Chapitre > Leçon du jour > Exercices).
• Composants Interactifs : Les exercices traditionnels (déclinaisons, conjugaisons) seront
transformés en modules web (textes à trous, QCM, glisser-déposer) avec un système d'autocorrection pour un retour immédiat.
• Centralisation Multimédia : Les pistes audio (Hörverstehen) nécessaires aux leçons seront
intégrées directement dans les chapitres numériques correspondants.

3. Fonctionnalités Clés et Espaces Utilisateurs
3.1. Espace Apprentissage (Blended Learning)
L'application agit comme le prolongement du cours en présentiel. Les professeurs peuvent animer leur
classe avec le manuel physique, puis assigner des devoirs sur l'application en lien direct avec la leçon
étudiée.

3.2. Hub "Objectif Ausbildung" & Carrière
Étant donné l'orientation forte de l'école vers la formation professionnelle en Allemagne, ce module
proposera :
• Des ressources téléchargeables et modèles pour la création de Lebenslauf (CV) et Anschreiben
(Lettre de motivation) aux normes allemandes.
• Des modules d'information sur la culture d'entreprise allemande et la préparation aux entretiens.

3.3. Préparation TELC
Pour garantir la réussite aux examens certifiants, la plateforme inclura des simulateurs d'examens
chronométrés reproduisant les conditions réelles du TELC (Hören, Lesen, Schreiben, Sprechen), avec
un module d'enregistrement vocal pour l'expression orale.

2

3.4. Espace Communautaire (Le Stammtisch Virtuel)
Création de groupes de discussion privés par cohorte (ex. le groupe "B1 Projekt - Janvier") facilitant les
échanges entre élèves et professeurs, ainsi qu'un fil d'actualités global pour les annonces de
l'administration.

4. Spécifications Techniques et Architecture SaaS

Approche "Mobile-First" et PWA : Le public cible naviguant majoritairement sur
smartphone, l'application sera conçue comme une Progressive Web App (PWA). Cela
garantit une installation facile sans passer par les stores, une fluidité d'utilisation, et une
résilience face aux variations de connectivité internet.

• Back-Office & CMS : Une interface d'administration intuitive permettant à l'équipe pédagogique de
gérer les inscriptions, suivre la progression des élèves et mettre à jour le contenu des exercices
interactifs en toute autonomie.
• Protection des Données : Système de sécurité rigoureux pour protéger la propriété intellectuelle
(blocage de l'extraction des manuels numériques) et sécuriser les données personnelles des
apprenants.
• Intégration FinTech Locale : Intégration des API de Mobile Money (MVola, Airtel Money, Orange
Money) pour simplifier le paiement en ligne des écolages et modules additionnels.

5. Identité Visuelle et UI/UX
Le design global sera l'extension numérique de l'image de marque de "Live-Sprachzentrum" :
• Palette de couleurs : Utilisation stratégique du Rouge, du Noir et du Jaune/Or (en rappel du drapeau
allemand présent sur le logo).
• Typographie : Une police chaleureuse et identitaire pour les grands titres, contrastée avec une
typographie sans-serif moderne, épurée et très lisible pour les contenus d'apprentissage.

3



<!-- Cahier_des_Charges_Live_Sprachzentrum_V2.txt -->
<!DOCTYPE html>

<html class="light" lang="de"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Kurse - Live-Sprachzentrum</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-container-lowest": "#ffffff",
                      "secondary": "#5f5e5e",
                      "germany-red": "#D51F26",
                      "background": "#f8f9fb",
                      "germany-black": "#000000",
                      "on-secondary": "#ffffff",
                      "tertiary-container": "#d0a600",
                      "outline-variant": "#e6bdb9",
                      "on-background": "#191c1e",
                      "surface-variant": "#e0e3e5",
                      "tertiary-fixed-dim": "#f1c100",
                      "on-error": "#ffffff",
                      "on-primary-container": "#ffecea",
                      "secondary-container": "#e2dfde",
                      "primary-fixed": "#ffdad6",
                      "error": "#ba1a1a",
                      "surface-container-high": "#e6e8ea",
                      "on-error-container": "#93000a",
                      "inverse-surface": "#2d3133",
                      "secondary-fixed": "#e5e2e1",
                      "on-tertiary-container": "#4f3d00",
                      "on-primary-fixed": "#410003",
                      "surface-container-highest": "#e0e3e5",
                      "surface-container-low": "#f2f4f6",
                      "surface": "#f8f9fb",
                      "error-container": "#ffdad6",
                      "on-tertiary-fixed-variant": "#584400",
                      "outline": "#916f6b",
                      "inverse-on-surface": "#eff1f3",
                      "surface-bright": "#f8f9fb",
                      "on-surface": "#191c1e",
                      "on-primary-fixed-variant": "#930010",
                      "surface-container": "#eceef0",
                      "success-green": "#2D8A4E",
                      "on-secondary-fixed": "#1b1c1c",
                      "on-secondary-container": "#636262",
                      "tertiary": "#745b00",
                      "primary-fixed-dim": "#ffb3ac",
                      "on-secondary-fixed-variant": "#474746",
                      "surface-dim": "#d8dadc",
                      "on-tertiary": "#ffffff",
                      "surface-subtle": "#EDF0F3",
                      "tertiary-fixed": "#ffe08b",
                      "germany-gold": "#FFCC00",
                      "primary": "#ae0015",
                      "surface-tint": "#bf0519",
                      "on-primary": "#ffffff",
                      "on-surface-variant": "#5c3f3d",
                      "on-tertiary-fixed": "#241a00",
                      "inverse-primary": "#ffb3ac",
                      "secondary-fixed-dim": "#c8c6c5",
                      "primary-container": "#d51f26"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "gutter": "16px",
                      "container-max-width": "1120px",
                      "margin-mobile": "16px",
                      "margin-desktop": "32px",
                      "base-unit": "4px"
              },
              "fontFamily": {
                      "headline-lg": ["Be Vietnam Pro"],
                      "headline-md": ["Be Vietnam Pro"],
                      "body-md": ["Inter"],
                      "label-sm": ["Inter"],
                      "label-md": ["Inter"],
                      "display-lg": ["Be Vietnam Pro"],
                      "title-lg": ["Inter"],
                      "body-lg": ["Inter"],
                      "headline-lg-mobile": ["Be Vietnam Pro"]
              },
              "fontSize": {
                      "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "title-lg": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "headline-lg-mobile": ["28px", {"lineHeight": "34px", "fontWeight": "700"}]
              }
            }
          }
        }
      </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0">
<!-- TopAppBar -->
<header class="bg-surface border-b border-surface-variant shadow-sm docked full-width top-0 sticky z-50">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-container-max-width mx-auto">
<div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 cursor-pointer">
<img alt="User profile photo" class="object-cover w-full h-full" data-alt="A professional headshot of a young student in a modern educational setting, soft lighting, warm corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl2-AtlCMJumlWzJWBFjSJHoDmDbHIV1EIhIZ--ckyaTK1O3cQc8Pl1woKjY8P6b-B80hHe7a6JepSWx-DLMCzEfSUbgJZavI8UHpN9OSJpjofPixj7X0RlA-n_1qPjZGBLHZeqk0Dt3SPFW31DxIpyZjvY__mXSBCpy7kWZqXC0viLF4FUR4qkU8CGYy3zMyxlxBqqqQFA_9rLvsi75JgGMTuh-CXNc4ao9lBFNJLI8t7aHBddFj77KSzMA97D9Sm0re8slvnVllj"/>
</div>
<h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-germany-red truncate text-center flex-1 px-4">
                Live-Sprachzentrum
            </h1>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors duration-200 flex-shrink-0 text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">notifications</span>
</button>
</div>
</header>
<!-- Main Content -->
<main class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-6">
<!-- Course Header -->
<div class="mb-8 bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-6 border border-surface-variant">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-germany-gold">star</span>
<span class="font-label-md text-label-md text-secondary">AKTUELLER KURS</span>
</div>
<h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-germany-black">Mein Kurs: B1 Standard</h2>
<div class="mt-4 flex items-center gap-4">
<div class="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-germany-red w-[45%] rounded-full"></div>
</div>
<span class="font-label-md text-label-md text-secondary">45% Abgeschlossen</span>
</div>
</div>
<!-- Chapters List -->
<div class="space-y-4">
<!-- Chapter 1: Completed -->
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant overflow-hidden group">
<div class="p-4 md:p-6 flex items-center gap-4 cursor-pointer hover:bg-surface-subtle transition-colors">
<div class="w-10 h-10 rounded-full bg-[#E8F3EB] flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-success-green">check_circle</span>
</div>
<div class="flex-1">
<h3 class="font-title-lg text-title-lg text-germany-black">Kapitel 1: Wohnformen</h3>
<p class="font-body-md text-body-md text-secondary">10/10 Lektionen</p>
</div>
<span class="material-symbols-outlined text-secondary transition-transform group-hover:translate-x-1">chevron_right</span>
</div>
</div>
<!-- Chapter 2: In Progress (Expanded state mockup) -->
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-germany-red overflow-hidden">
<div class="p-4 md:p-6 flex items-center gap-4 border-b border-surface-variant bg-surface-subtle">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-germany-red">play_arrow</span>
</div>
<div class="flex-1">
<h3 class="font-title-lg text-title-lg text-germany-black">Kapitel 2: Arbeitswelt</h3>
<div class="mt-2 flex items-center gap-3">
<div class="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden max-w-[200px]">
<div class="h-full bg-germany-red w-[40%] rounded-full"></div>
</div>
<span class="font-label-sm text-label-sm text-secondary">40%</span>
</div>
</div>
<span class="material-symbols-outlined text-germany-red rotate-90">chevron_right</span>
</div>
<!-- Expanded Lessons -->
<div class="bg-surface-container-lowest py-2">
<a class="flex items-center gap-4 px-6 py-3 hover:bg-surface-subtle transition-colors" href="#">
<span class="material-symbols-outlined text-success-green text-[20px]">check_circle</span>
<div class="flex-1">
<h4 class="font-body-md text-body-md text-germany-black">Lektion 2.1: Berufe und Tätigkeiten</h4>
</div>
</a>
<a class="flex items-center gap-4 px-6 py-3 bg-surface-container-low hover:bg-surface-subtle transition-colors" href="#">
<span class="material-symbols-outlined text-germany-red text-[20px]">play_circle</span>
<div class="flex-1">
<h4 class="font-body-md text-body-md text-germany-black font-semibold">Lektion 2.2: Bewerbungsgespräch</h4>
</div>
</a>
<div class="flex items-center gap-4 px-6 py-3 opacity-50">
<span class="material-symbols-outlined text-secondary text-[20px]">lock</span>
<div class="flex-1">
<h4 class="font-body-md text-body-md text-secondary">Lektion 2.3: Arbeitsvertrag verstehen</h4>
</div>
</div>
</div>
</div>
<!-- Chapter 3: Locked -->
<div class="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-variant overflow-hidden opacity-75">
<div class="p-4 md:p-6 flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0">
<span class="material-symbols-outlined text-secondary">lock</span>
</div>
<div class="flex-1">
<h3 class="font-title-lg text-title-lg text-secondary">Kapitel 3: Feste und Traditionen</h3>
<p class="font-body-md text-body-md text-secondary">0/8 Lektionen</p>
</div>
</div>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden bg-surface-container-lowest shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.04)] docked full-width bottom-0 fixed z-50 rounded-t-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe">
<a class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">home</span>
<span class="font-label-sm text-label-sm mt-1">Lernen</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5 scale-90 transition-transform duration-150" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">menu_book</span>
<span class="font-label-sm text-label-sm mt-1">Kurse</span>
</a>
<a class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">work</span>
<span class="font-label-sm text-label-sm mt-1">Karriere</span>
</a>
<a class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">groups</span>
<span class="font-label-sm text-label-sm mt-1">Stammtisch</span>
</a>
<a class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">person</span>
<span class="font-label-sm text-label-sm mt-1">Profil</span>
</a>
</nav>
</body></html>

<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="de"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Dashboard - Live-Sprachzentrum</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-lowest": "#ffffff",
                        "secondary": "#5f5e5e",
                        "germany-red": "#D51F26",
                        "background": "#f8f9fb",
                        "germany-black": "#000000",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#d0a600",
                        "outline-variant": "#e6bdb9",
                        "on-background": "#191c1e",
                        "surface-variant": "#e0e3e5",
                        "tertiary-fixed-dim": "#f1c100",
                        "on-error": "#ffffff",
                        "on-primary-container": "#ffecea",
                        "secondary-container": "#e2dfde",
                        "primary-fixed": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8ea",
                        "on-error-container": "#93000a",
                        "inverse-surface": "#2d3133",
                        "secondary-fixed": "#e5e2e1",
                        "on-tertiary-container": "#4f3d00",
                        "on-primary-fixed": "#410003",
                        "surface-container-highest": "#e0e3e5",
                        "surface-container-low": "#f2f4f6",
                        "surface": "#f8f9fb",
                        "error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#584400",
                        "outline": "#916f6b",
                        "inverse-on-surface": "#eff1f3",
                        "surface-bright": "#f8f9fb",
                        "on-surface": "#191c1e",
                        "on-primary-fixed-variant": "#930010",
                        "surface-container": "#eceef0",
                        "success-green": "#2D8A4E",
                        "on-secondary-fixed": "#1b1c1c",
                        "on-secondary-container": "#636262",
                        "tertiary": "#745b00",
                        "primary-fixed-dim": "#ffb3ac",
                        "on-secondary-fixed-variant": "#474746",
                        "surface-dim": "#d8dadc",
                        "on-tertiary": "#ffffff",
                        "surface-subtle": "#EDF0F3",
                        "tertiary-fixed": "#ffe08b",
                        "germany-gold": "#FFCC00",
                        "primary": "#ae0015",
                        "surface-tint": "#bf0519",
                        "on-primary": "#ffffff",
                        "on-surface-variant": "#5c3f3d",
                        "on-tertiary-fixed": "#241a00",
                        "inverse-primary": "#ffb3ac",
                        "secondary-fixed-dim": "#c8c6c5",
                        "primary-container": "#d51f26"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "16px",
                        "container-max-width": "1120px",
                        "margin-mobile": "16px",
                        "margin-desktop": "32px",
                        "base-unit": "4px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Be Vietnam Pro"],
                        "headline-md": ["Be Vietnam Pro"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "display-lg": ["Be Vietnam Pro"],
                        "title-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-lg-mobile": ["Be Vietnam Pro"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "title-lg": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "34px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col pb-24 md:pb-0">
<!-- TopAppBar Mobile / Full Nav Desktop -->
<header class="bg-surface border-b border-surface-variant shadow-sm docked full-width top-0 sticky z-50">
<div class="flex justify-between items-center px-margin-mobile h-16 w-full max-w-container-max-width mx-auto">
<!-- Leading: Avatar / Logo -->
<div class="flex items-center gap-4">
<img alt="Live-Sprachzentrum Logo" class="h-10 w-10 object-contain rounded-full bg-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajzHZvIVHyGtzpaTOMfCYoh2qcqvZc2mxKP4qdffIhO6axfheodHm4nRwZT3bnQ3CP_iQdTyzj_brGF9rgKXKdkGNfFKtlFQ7vnwRycAwr2AcYQ68Z-2dY7t8s6N0_M3Fg-rIP4HnDaH-rfbqFLfC6Ok4Ts_63iwGCtOeQSpWRKitw4XzXCbth14E7fwEgCyLeBhC-4wCYYL8n3Zx1OOTFSArzAjjJSAW4UqV2QRUTZJqHpagPoouhP5QnKjUgDQtj4GPUnT_x1vN"/>
<h1 class="font-headline-md text-headline-md font-bold text-primary hidden md:block">Live-Sprachzentrum</h1>
</div>
<!-- Desktop Nav (Hidden on Mobile) -->
<nav class="hidden md:flex gap-8">
<a class="text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
                    Lernen
                </a>
<a class="text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span class="material-symbols-outlined">menu_book</span>
                    Kurse
                </a>
<a class="text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span class="material-symbols-outlined">work</span>
                    Karriere
                </a>
<a class="text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span class="material-symbols-outlined">groups</span>
                    Stammtisch
                </a>
<a class="text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200 px-4 py-2 rounded-lg flex items-center gap-2" href="#">
<span class="material-symbols-outlined">person</span>
                    Profil
                </a>
</nav>
<!-- Trailing: Notifications -->
<div class="flex items-center">
<button class="p-2 text-secondary hover:bg-surface-container-low transition-colors duration-200 rounded-full relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1 right-1 w-2.5 h-2.5 bg-germany-red rounded-full border border-surface"></span>
</button>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col gap-6 md:gap-8">
<!-- Welcome Header -->
<section class="mb-4">
<h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Hallo, Julian!</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">Bereit für deine nächste Lektion?</p>
</section>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Main Course Card (Spans 2 columns on desktop) -->
<div class="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
<div>
<div class="flex justify-between items-start mb-6">
<div>
<span class="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded-full mb-3">Aktueller Kurs</span>
<h3 class="font-title-lg text-title-lg text-on-surface">B1 Standard</h3>
</div>
<!-- Circular Progress Indicator -->
<div class="relative w-16 h-16 flex items-center justify-center">
<svg class="w-full h-full transform -rotate-90" viewbox="0 0 36 36">
<!-- Track -->
<path class="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4"></path>
<!-- Fill (65%) -->
<path class="text-germany-red" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="65, 100" stroke-linecap="round" stroke-width="4"></path>
</svg>
<span class="absolute font-label-md text-label-md text-on-surface">65%</span>
</div>
</div>
<div class="mb-6">
<p class="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-1">Nächste Lektion</p>
<p class="font-body-lg text-body-lg text-on-surface">Passiv mit Modalverben</p>
</div>
</div>
<button class="w-full md:w-auto bg-germany-red text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg shadow-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
                    Lektion fortsetzen
                    <span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<!-- Quick Stats Column -->
<div class="flex flex-col gap-6">
<!-- Daily Streak -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
<div class="w-12 h-12 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
</div>
<div>
<p class="font-headline-md text-headline-md text-on-surface">12 <span class="font-body-md text-body-md text-on-surface-variant font-normal">Tage</span></p>
<p class="font-label-sm text-label-sm text-secondary">Lernserie</p>
</div>
</div>
<!-- Vocabulary -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-subtle flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
<div class="w-12 h-12 rounded-full bg-success-green/10 text-success-green flex items-center justify-center">
<span class="material-symbols-outlined">spellcheck</span>
</div>
<div>
<p class="font-headline-md text-headline-md text-on-surface">450 <span class="font-body-md text-body-md text-on-surface-variant font-normal">Wörter</span></p>
<p class="font-label-sm text-label-sm text-secondary">Gelerntes Vokabular</p>
</div>
</div>
</div>
</div>
<!-- Career Shortcut (Objectif Ausbildung) -->
<div class="mt-2 bg-gradient-to-r from-germany-black via-germany-black to-surface-container-highest rounded-xl p-[1px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-transform duration-200">
<div class="bg-surface-container-lowest rounded-xl p-6 h-full flex items-center justify-between relative overflow-hidden">
<!-- Abstract Flag Accent -->
<div class="absolute right-0 top-0 bottom-0 w-32 opacity-10 flex flex-col">
<div class="flex-1 bg-germany-black"></div>
<div class="flex-1 bg-germany-red"></div>
<div class="flex-1 bg-germany-gold"></div>
</div>
<div class="flex items-center gap-4 relative z-10">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-surface-variant">
<!-- Simplified German Flag Icon -->
<div class="w-6 h-4 flex flex-col rounded-sm overflow-hidden">
<div class="flex-1 bg-germany-black"></div>
<div class="flex-1 bg-germany-red"></div>
<div class="flex-1 bg-germany-gold"></div>
</div>
</div>
<div>
<h4 class="font-title-lg text-title-lg text-on-surface">Objectif Ausbildung</h4>
<p class="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Dein Weg zur Karriere in Deutschland</p>
</div>
</div>
<button class="text-germany-red hover:text-primary transition-colors relative z-10 p-2 rounded-full hover:bg-surface-container-low">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</main>
<!-- BottomNavBar Mobile -->
<nav class="md:hidden bg-surface-container-lowest shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.04)] docked full-width bottom-0 fixed z-50 rounded-t-xl pb-safe">
<div class="flex justify-around items-center px-4 py-2 w-full">
<!-- Active: Lernen -->
<button class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5 scale-90 transition-transform duration-150">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-label-sm text-label-sm mt-1">Lernen</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined">menu_book</span>
<span class="font-label-sm text-label-sm mt-1">Kurse</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined">work</span>
<span class="font-label-sm text-label-sm mt-1">Karriere</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined">groups</span>
<span class="font-label-sm text-label-sm mt-1">Stammtisch</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined">person</span>
<span class="font-label-sm text-label-sm mt-1">Profil</span>
</button>
</div>
</nav>
</body></html>

<!-- Kurs-Navigator -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Objectif Ausbildung &amp; Karriere - Live-Sprachzentrum</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-lowest": "#ffffff",
                        "secondary": "#5f5e5e",
                        "germany-red": "#D51F26",
                        "background": "#f8f9fb",
                        "germany-black": "#000000",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#d0a600",
                        "outline-variant": "#e6bdb9",
                        "on-background": "#191c1e",
                        "surface-variant": "#e0e3e5",
                        "tertiary-fixed-dim": "#f1c100",
                        "on-error": "#ffffff",
                        "on-primary-container": "#ffecea",
                        "secondary-container": "#e2dfde",
                        "primary-fixed": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8ea",
                        "on-error-container": "#93000a",
                        "inverse-surface": "#2d3133",
                        "secondary-fixed": "#e5e2e1",
                        "on-tertiary-container": "#4f3d00",
                        "on-primary-fixed": "#410003",
                        "surface-container-highest": "#e0e3e5",
                        "surface-container-low": "#f2f4f6",
                        "surface": "#f8f9fb",
                        "error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#584400",
                        "outline": "#916f6b",
                        "inverse-on-surface": "#eff1f3",
                        "surface-bright": "#f8f9fb",
                        "on-surface": "#191c1e",
                        "on-primary-fixed-variant": "#930010",
                        "surface-container": "#eceef0",
                        "success-green": "#2D8A4E",
                        "on-secondary-fixed": "#1b1c1c",
                        "on-secondary-container": "#636262",
                        "tertiary": "#745b00",
                        "primary-fixed-dim": "#ffb3ac",
                        "on-secondary-fixed-variant": "#474746",
                        "surface-dim": "#d8dadc",
                        "on-tertiary": "#ffffff",
                        "surface-subtle": "#EDF0F3",
                        "tertiary-fixed": "#ffe08b",
                        "germany-gold": "#FFCC00",
                        "primary": "#ae0015",
                        "surface-tint": "#bf0519",
                        "on-primary": "#ffffff",
                        "on-surface-variant": "#5c3f3d",
                        "on-tertiary-fixed": "#241a00",
                        "inverse-primary": "#ffb3ac",
                        "secondary-fixed-dim": "#c8c6c5",
                        "primary-container": "#d51f26"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "16px",
                        "container-max-width": "1120px",
                        "margin-mobile": "16px",
                        "margin-desktop": "32px",
                        "base-unit": "4px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Be Vietnam Pro"],
                        "headline-md": ["Be Vietnam Pro"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "display-lg": ["Be Vietnam Pro"],
                        "title-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-lg-mobile": ["Be Vietnam Pro"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "title-lg": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "headline-lg-mobile": ["28px", {"lineHeight": "34px", "fontWeight": "700"}]
                    }
                }
            }
        }
    </script>
<style>
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Ambient shadows for Level 1 & 2 cards */
        .ambient-shadow-lvl1 {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
        }
        .ambient-shadow-lvl2 {
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.08);
        }
        
        /* Micro-interactions */
        .interactive-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .interactive-card:hover {
            transform: translateY(-2px);
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.08);
        }
        
        /* Germany Flag Accent */
        .germany-accent-bar {
            background: linear-gradient(to right, #000000 33.3%, #D51F26 33.3%, #D51F26 66.6%, #FFCC00 66.6%);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface min-h-screen font-body-md flex flex-col md:flex-row">
<!-- Desktop Sidebar (Hidden on mobile) -->
<aside class="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-surface-variant min-h-screen sticky top-0">
<div class="p-margin-desktop flex items-center gap-3">
<span class="material-symbols-outlined fill text-primary text-3xl">school</span>
<span class="font-headline-md text-headline-md font-bold text-primary">Live-Sprachzentrum</span>
</div>
<nav class="flex-1 px-4 py-6 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-low transition-colors duration-200" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-label-md text-label-md">Lernen</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-low transition-colors duration-200" href="#">
<span class="material-symbols-outlined">menu_book</span>
<span class="font-label-md text-label-md">Kurse</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-medium" href="#">
<span class="material-symbols-outlined fill">work</span>
<span class="font-label-md text-label-md">Karriere</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-low transition-colors duration-200" href="#">
<span class="material-symbols-outlined">groups</span>
<span class="font-label-md text-label-md">Stammtisch</span>
</a>
</nav>
<div class="p-4 border-t border-surface-variant">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-low transition-colors duration-200" href="#">
<img class="w-8 h-8 rounded-full object-cover" data-alt="A small, professional circular avatar portrait of a Malagasy student smiling warmly in a bright, modern studio setting with soft lighting. The image should convey an academic and ambitious mood, matching the light-mode UI aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwfu_OUkbKkOCK0jJb5hbUem4TCjdJo7qRNtLie9EnkWVeHdP1sDmIbTBwQDzQ7ssG-lM4bBoC_R6e11MElkmiAyz2qiQyfmra46_VGImCPS5Eo7UJNL7CyUB9nn1xYBKhb03cJ_x3B3z5H8rfvqyaILWuWOv28zGon5B_w7VkdcPPf7_v_-18HBKhcc-jEo3_ffD-vr5OT9TAvaH8A6vElZiM84eBfaRuiOTwXfzN7cVrNG9z1vJPNLy_ybZ7cAaDrb7vC42mEgrY"/>
<span class="font-label-md text-label-md">Profil</span>
</a>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="flex-1 pb-24 md:pb-8">
<!-- TopAppBar (Mobile) -->
<header class="md:hidden bg-surface flex justify-between items-center px-margin-mobile h-16 w-full sticky top-0 z-50 shadow-sm border-b border-surface-variant">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-full object-cover" data-alt="A small, professional circular avatar portrait of a Malagasy student smiling warmly in a bright, modern studio setting with soft lighting. The image should convey an academic and ambitious mood, matching the light-mode UI aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu5SrDN13JYSxmODGOyQYuj2xdWuaTdq5PIztnr4Qux__zRjeKt48td3G9wz87UdaUZZ68ixmeRFr8L5m-oB4OgRNwF9e5KdvUiGkzdway3E95LnqTFa29M1hZLdCAuWikMpGB8zxT96R1HN7Jqa5mav5kOTdJgrNL5LgFn27bPBUAclQSYCrBCUR3j0N1bL2Sx3PICjwav8BUijgmKSEbDc80cj7ppPCPrDM46nZCu-rbdisEbhO7emaJK83TYk5C6vPFL11r4Ndb"/>
</div>
<div class="font-headline-md text-headline-md font-bold text-primary">Live-Sprachzentrum</div>
<button class="text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
</header>
<div class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-6 md:pt-10 space-y-8">
<!-- Hero Section -->
<section class="relative rounded-2xl overflow-hidden bg-germany-black text-white ambient-shadow-lvl2">
<div class="absolute inset-0 opacity-20 bg-[url('placeholder')]" data-alt="An expansive, abstract digital artwork showing dynamic, flowing pathways integrating the colors of the German flag (black, red, gold) leading towards a bright, luminous horizon. The style is modern, professional, and optimistic, symbolizing career progression and intercultural bridging. High-key lighting accents the gold."></div>
<div class="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
<div class="space-y-4 max-w-xl">
<span class="inline-block px-3 py-1 rounded-full bg-germany-red text-white font-label-sm text-label-sm uppercase tracking-wider">Objectif Ausbildung &amp; Karriere</span>
<h1 class="font-display-lg text-display-lg md:text-[56px] leading-tight text-white">Dein Weg nach <span class="text-germany-gold">Deutschland</span> starts here.</h1>
<p class="font-body-lg text-body-lg text-surface-container-high max-w-md">Master the language, prepare your documents, and ace your interviews with our tailored resources for Malagasy students.</p>
</div>
<div class="w-full md:w-1/3 flex justify-center">
<div class="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
<span class="material-symbols-outlined text-[80px] text-germany-gold font-light">flight_takeoff</span>
</div>
</div>
</div>
<div class="h-2 w-full germany-accent-bar absolute bottom-0 left-0"></div>
</section>
<!-- Resource Categories (Bento Grid) -->
<section>
<h2 class="font-headline-md text-headline-md text-on-surface mb-6">Career Resources</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- CV Card -->
<div class="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant">
<div class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4 text-primary">
<span class="material-symbols-outlined text-2xl">description</span>
</div>
<h3 class="font-title-lg text-title-lg text-on-surface mb-2">Lebenslauf (CV)</h3>
<p class="font-body-md text-body-md text-secondary mb-6 flex-1">Standardized German CV templates optimized for Ausbildung applications.</p>
<div class="space-y-3 mt-auto">
<button class="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Template 1 (Classic)</span>
<span class="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
</button>
<button class="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Template 2 (Modern)</span>
<span class="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
</button>
</div>
</div>
<!-- Motivation Letter Card -->
<div class="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant">
<div class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center mb-4 text-primary">
<span class="material-symbols-outlined text-2xl">mail</span>
</div>
<h3 class="font-title-lg text-title-lg text-on-surface mb-2">Anschreiben</h3>
<p class="font-body-md text-body-md text-secondary mb-6 flex-1">Structure your motivation letter perfectly for German employers.</p>
<div class="space-y-3 mt-auto">
<button class="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Pflege (Nursing) PDF</span>
<span class="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
</button>
<button class="w-full flex items-center justify-between px-4 py-2 bg-surface hover:bg-surface-container-low border border-surface-variant rounded-lg transition-colors group">
<span class="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">IT &amp; Tech PDF</span>
<span class="material-symbols-outlined text-secondary group-hover:text-primary">download</span>
</button>
</div>
</div>
<!-- Cultural Tips (Spans 2 rows on Desktop if needed, keeping simple here) -->
<div class="bg-primary text-white p-6 rounded-2xl ambient-shadow-lvl2 interactive-card flex flex-col relative overflow-hidden">
<div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
<div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-white">
<span class="material-symbols-outlined text-2xl">public</span>
</div>
<h3 class="font-title-lg text-title-lg mb-2">Interkulturelles Training</h3>
<p class="font-body-md text-body-md text-white/80 mb-6 flex-1">Understand German workplace culture, punctuality, and communication styles.</p>
<button class="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]">play_circle</span>
                            Watch Video Guide
                        </button>
</div>
<!-- Interview Prep -->
<div class="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 interactive-card flex flex-col border border-surface-variant lg:col-span-2">
<div class="flex items-start gap-4 mb-4">
<div class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary flex-shrink-0">
<span class="material-symbols-outlined text-2xl">forum</span>
</div>
<div>
<h3 class="font-title-lg text-title-lg text-on-surface mb-1">Vorbereitung Vorstellungsgespräch</h3>
<p class="font-body-md text-body-md text-secondary">Practice common questions and learn how to present yourself confidently in German.</p>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
<div class="flex items-center gap-3 p-3 bg-surface rounded-lg border border-surface-variant">
<span class="material-symbols-outlined text-secondary">mic</span>
<div class="flex-1">
<p class="font-label-md text-label-md text-on-surface">Mock Interview Audio</p>
<p class="font-label-sm text-label-sm text-secondary">15 mins</p>
</div>
<button class="text-primary hover:bg-surface-container-low p-2 rounded-full"><span class="material-symbols-outlined fill">play_arrow</span></button>
</div>
<div class="flex items-center gap-3 p-3 bg-surface rounded-lg border border-surface-variant">
<span class="material-symbols-outlined text-secondary">quiz</span>
<div class="flex-1">
<p class="font-label-md text-label-md text-on-surface">Top 50 Questions</p>
<p class="font-label-sm text-label-sm text-secondary">Interactive QCM</p>
</div>
<button class="text-primary hover:bg-surface-container-low p-2 rounded-full"><span class="material-symbols-outlined">arrow_forward</span></button>
</div>
</div>
</div>
</div>
</section>
<!-- Success Stories -->
<section class="pb-10">
<div class="flex items-center justify-between mb-6">
<h2 class="font-headline-md text-headline-md text-on-surface">Success Stories</h2>
<a class="font-label-md text-label-md text-primary flex items-center hover:underline" href="#">View all <span class="material-symbols-outlined text-[18px] ml-1">arrow_forward</span></a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 border border-surface-variant flex gap-4">
<img class="w-20 h-20 rounded-xl object-cover flex-shrink-0" data-alt="A medium close-up portrait of an inspiring young Malagasy woman in a modern German hospital setting, wearing professional nurse attire. She looks confident and successful. Bright, clean lighting, light-mode UI style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCICrQU1eRXdQS5s9i5x0Eyc9cOAD8oivEKf-pKgsj3HgwkJURF39PFHBdIKgo2ewYHg3ohvhn3t_chttNTRKdpRdrrRtbemrRsoAuEY7retPkhJS4pI6y89Vv0kb-KcYazKfLQAUEtqsxBDfTj0ZNGz3uHMoqP98idW9s7B7RvEiVSQVfEhhxnEYlLH3aT9ninwiANPv1wzyH_GAEQ2cvnYKwH1o18judYd14xro66XL7m_H1ar5jG4Y5RTG_0HiS2LrvNhrcbbCKJ"/>
<div>
<h4 class="font-title-lg text-title-lg text-on-surface">Tsiry R.</h4>
<p class="font-label-sm text-label-sm text-secondary mb-2">Ausbildung: Pflegefachkraft in München</p>
<p class="font-body-md text-body-md text-on-surface-variant italic">"The CV templates here helped me secure 3 interviews in my first week of applying. The cultural tips were spot on!"</p>
</div>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl ambient-shadow-lvl1 border border-surface-variant flex gap-4">
<img class="w-20 h-20 rounded-xl object-cover flex-shrink-0" data-alt="A medium close-up portrait of an ambitious young Malagasy man working at a modern tech desk in Germany. He is casually dressed in business casual attire, smiling at the camera. Bright, modern lighting, light-mode UI style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtEzd2F9Cnpvw0p4ExrPQb1ee-_yq2FWZ_ZZUT-sXqeI7bKEtNlNhEY7AfUyW0afZuWjsHMtrmB4hezcmnLBGshsK_mPQEMB5TXIQvjx5e6-ZKZugueaU0wW2iB0d9UcpApkYmjcBFdG3gEAXLRbxnKt3EWf9AwVTgRyXvMT8kGZxg3YaFxmXzPMitLXPsl34TNqJBRAdQJrH2x8bFrEYRit7NJCkf40fboJBE-MyiqhD5UBNilguO7pOvIFRfbHlwfdHRWSj91Ac8"/>
<div>
<h4 class="font-title-lg text-title-lg text-on-surface">Andry M.</h4>
<p class="font-label-sm text-label-sm text-secondary mb-2">Ausbildung: Fachinformatiker in Berlin</p>
<p class="font-body-md text-body-md text-on-surface-variant italic">"The interview preparation audio tracks gave me the confidence to speak clearly during my technical assessment."</p>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- BottomNavBar (Mobile only) -->
<nav class="md:hidden bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.04)] docked full-width bottom-0 fixed z-50 rounded-t-xl fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe">
<button class="flex flex-col items-center justify-center text-secondary dark:text-on-secondary-fixed-variant px-3 py-1.5 hover:bg-surface-variant dark:hover:bg-on-secondary-fixed-variant rounded-xl transition-all">
<span class="material-symbols-outlined">home</span>
<span class="font-label-sm text-label-sm-mobile mt-1">Lernen</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary dark:text-on-secondary-fixed-variant px-3 py-1.5 hover:bg-surface-variant dark:hover:bg-on-secondary-fixed-variant rounded-xl transition-all">
<span class="material-symbols-outlined">menu_book</span>
<span class="font-label-sm text-label-sm-mobile mt-1">Kurse</span>
</button>
<button class="flex flex-col items-center justify-center bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-xl px-3 py-1.5 Active: scale-90 transition-transform duration-150">
<span class="material-symbols-outlined fill">work</span>
<span class="font-label-sm text-label-sm-mobile mt-1">Karriere</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary dark:text-on-secondary-fixed-variant px-3 py-1.5 hover:bg-surface-variant dark:hover:bg-on-secondary-fixed-variant rounded-xl transition-all">
<span class="material-symbols-outlined">groups</span>
<span class="font-label-sm text-label-sm-mobile mt-1">Stammtisch</span>
</button>
<button class="flex flex-col items-center justify-center text-secondary dark:text-on-secondary-fixed-variant px-3 py-1.5 hover:bg-surface-variant dark:hover:bg-on-secondary-fixed-variant rounded-xl transition-all">
<span class="material-symbols-outlined">person</span>
<span class="font-label-sm text-label-sm-mobile mt-1">Profil</span>
</button>
</nav>
</body></html>

<!-- Dashboard -->
<!DOCTYPE html>

<html class="light" lang="de"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
<title>TELC B1 Prüfungssimulator</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-lowest": "#ffffff",
                        "secondary": "#5f5e5e",
                        "germany-red": "#D51F26",
                        "background": "#f8f9fb",
                        "germany-black": "#000000",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#d0a600",
                        "outline-variant": "#e6bdb9",
                        "on-background": "#191c1e",
                        "surface-variant": "#e0e3e5",
                        "tertiary-fixed-dim": "#f1c100",
                        "on-error": "#ffffff",
                        "on-primary-container": "#ffecea",
                        "secondary-container": "#e2dfde",
                        "primary-fixed": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8ea",
                        "on-error-container": "#93000a",
                        "inverse-surface": "#2d3133",
                        "secondary-fixed": "#e5e2e1",
                        "on-tertiary-container": "#4f3d00",
                        "on-primary-fixed": "#410003",
                        "surface-container-highest": "#e0e3e5",
                        "surface-container-low": "#f2f4f6",
                        "surface": "#f8f9fb",
                        "error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#584400",
                        "outline": "#916f6b",
                        "inverse-on-surface": "#eff1f3",
                        "surface-bright": "#f8f9fb",
                        "on-surface": "#191c1e",
                        "on-primary-fixed-variant": "#930010",
                        "surface-container": "#eceef0",
                        "success-green": "#2D8A4E",
                        "on-secondary-fixed": "#1b1c1c",
                        "on-secondary-container": "#636262",
                        "tertiary": "#745b00",
                        "primary-fixed-dim": "#ffb3ac",
                        "on-secondary-fixed-variant": "#474746",
                        "surface-dim": "#d8dadc",
                        "on-tertiary": "#ffffff",
                        "surface-subtle": "#EDF0F3",
                        "tertiary-fixed": "#ffe08b",
                        "germany-gold": "#FFCC00",
                        "primary": "#ae0015",
                        "surface-tint": "#bf0519",
                        "on-primary": "#ffffff",
                        "on-surface-variant": "#5c3f3d",
                        "on-tertiary-fixed": "#241a00",
                        "inverse-primary": "#ffb3ac",
                        "secondary-fixed-dim": "#c8c6c5",
                        "primary-container": "#d51f26"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "16px",
                        "container-max-width": "1120px",
                        "margin-mobile": "16px",
                        "margin-desktop": "32px",
                        "base-unit": "4px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Be Vietnam Pro"],
                        "headline-md": ["Be Vietnam Pro"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "display-lg": ["Be Vietnam Pro"],
                        "title-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-lg-mobile": ["Be Vietnam Pro"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "title-lg": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "34px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
        body {
            -webkit-tap-highlight-color: transparent;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-filled {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
<!-- Top Navigation Area (Transactional/Task Focused - Suppressed main nav, using specific header) -->
<header class="bg-surface border-b border-surface-variant sticky top-0 z-50 shadow-sm">
<div class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
<div class="flex items-center gap-4">
<button aria-label="Beenden" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-secondary">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
<h1 class="font-headline-md text-headline-md text-primary truncate max-w-[200px] md:max-w-none">
                    TELC B1 Prüfungssimulator
                </h1>
</div>
<div class="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-2 rounded-full font-label-md text-label-md font-bold">
<span class="material-symbols-outlined text-xl" data-icon="timer">timer</span>
<span>01:45:00</span>
</div>
</div>
</header>
<!-- Warning Banner -->
<div class="bg-tertiary-container text-on-tertiary-container px-margin-mobile py-2 md:px-margin-desktop flex items-center gap-2 font-label-md text-label-md justify-center shadow-sm">
<span class="material-symbols-outlined text-sm" data-icon="warning">warning</span>
<span>Bitte achten Sie auf die Zeit. Der Teil "Leseverstehen" endet in 45 Minuten.</span>
</div>
<!-- Main Exam Canvas -->
<main class="flex-1 max-w-container-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop py-6 flex flex-col gap-6 relative">
<!-- Section Tabs (Mirroring the TELC structure) -->
<div class="flex overflow-x-auto hide-scrollbar gap-2 pb-2 border-b border-surface-variant -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
<button class="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-surface-container-low text-secondary font-label-md text-label-md opacity-50 cursor-not-allowed whitespace-nowrap">
<span class="material-symbols-outlined text-sm" data-icon="headphones">headphones</span>
                Hören
            </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-surface text-primary border-b-2 border-primary font-label-md text-label-md whitespace-nowrap">
<span class="material-symbols-outlined icon-filled text-sm" data-icon="menu_book">menu_book</span>
                Lesen
            </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors whitespace-nowrap">
<span class="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                Schreiben
            </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-t-lg bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors whitespace-nowrap">
<span class="material-symbols-outlined text-sm" data-icon="mic">mic</span>
                Sprechen
            </button>
</div>
<!-- Progress Indicator -->
<div class="flex flex-col gap-2">
<div class="flex justify-between items-center font-label-sm text-label-sm text-secondary">
<span>Teil 1: Leseverstehen</span>
<span>Frage 4 von 20</span>
</div>
<div class="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-germany-red w-[20%] rounded-full"></div>
</div>
</div>
<!-- Question Area - Two Column Layout on Desktop -->
<div class="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1">
<!-- Left Column: Reading Text -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.04)] border border-surface-subtle lg:w-3/5 overflow-y-auto max-h-[530px] lg:max-h-[618px]">
<h2 class="font-title-lg text-title-lg mb-4 text-on-surface">Lesen Sie den Text und lösen Sie die Aufgaben.</h2>
<div class="prose prose-sm md:prose-base text-on-surface-variant space-y-4 font-body-lg text-body-lg leading-relaxed">
<p>
                        Sehr geehrte Damen und Herren,
                    </p>
<p>
                        ich wende mich an Sie bezüglich der Stellenausschreibung als IT-Support Mitarbeiter in Ihrem Unternehmen. Mit großem Interesse habe ich Ihre Anzeige auf dem Online-Portal gelesen und möchte mich hiermit um diese Position bewerben.
                    </p>
<p>
                        In den letzten drei Jahren war ich bei einer mittelständischen Firma in München tätig, wo ich umfangreiche Erfahrungen im First- und Second-Level-Support sammeln konnte. Zu meinen Hauptaufgaben gehörte die Betreuung der internen Netzwerkinfrastruktur sowie die Lösung von Hard- und Softwareproblemen der Mitarbeiter.
                    </p>
<p>
                        Besonders reizt mich an der von Ihnen ausgeschriebenen Stelle die Möglichkeit, in einem internationalen Team zu arbeiten und meine Englischkenntnisse täglich anwenden zu können. Ich bin es gewohnt, selbstständig zu arbeiten, schätze aber auch den Austausch im Team sehr.
                    </p>
<p>
                        Für ein persönliches Gespräch stehe ich Ihnen jederzeit gerne zur Verfügung.
                    </p>
<p>
                        Mit freundlichen Grüßen<br/>
                        Max Mustermann
                    </p>
</div>
</div>
<!-- Right Column: Question and Options -->
<div class="bg-surface-container-lowest rounded-xl p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.04)] border border-surface-subtle lg:w-2/5 flex flex-col gap-6">
<div class="flex flex-col gap-4">
<h3 class="font-title-lg text-title-lg text-on-surface">Aufgabe 4</h3>
<p class="font-body-md text-body-md text-on-surface-variant font-medium">
                        Warum bewirbt sich Max Mustermann auf die Stelle?
                    </p>
</div>
<div class="flex flex-col gap-3">
<!-- Option A -->
<label class="flex items-start gap-4 p-4 rounded-lg border-2 border-surface-variant hover:border-primary/50 hover:bg-surface transition-all cursor-pointer group">
<div class="mt-0.5">
<input class="w-5 h-5 text-germany-red focus:ring-germany-red border-surface-variant bg-surface-container-lowest" name="q4" type="radio"/>
</div>
<span class="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                            a) Weil er nach München umziehen möchte.
                        </span>
</label>
<!-- Option B - Selected State -->
<label class="flex items-start gap-4 p-4 rounded-lg border-2 border-germany-red bg-primary-fixed/20 cursor-pointer">
<div class="mt-0.5">
<input checked="" class="w-5 h-5 text-germany-red focus:ring-germany-red border-germany-red bg-surface-container-lowest" name="q4" type="radio"/>
</div>
<span class="font-body-md text-body-md text-on-primary-fixed-variant font-medium">
                            b) Weil er in einem internationalen Team arbeiten möchte.
                        </span>
</label>
<!-- Option C -->
<label class="flex items-start gap-4 p-4 rounded-lg border-2 border-surface-variant hover:border-primary/50 hover:bg-surface transition-all cursor-pointer group">
<div class="mt-0.5">
<input class="w-5 h-5 text-germany-red focus:ring-germany-red border-surface-variant bg-surface-container-lowest" name="q4" type="radio"/>
</div>
<span class="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                            c) Weil er keine Erfahrungen im IT-Support hat.
                        </span>
</label>
</div>
</div>
</div>
</main>
<!-- Footer / Action Area -->
<footer class="bg-surface border-t border-surface-variant sticky bottom-0 z-40 pb-safe">
<div class="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop h-20 flex items-center justify-between gap-4">
<button class="px-6 py-3 rounded-lg border border-germany-black text-germany-black font-label-md text-label-md font-bold hover:bg-surface-container-low transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-sm" data-icon="arrow_back">arrow_back</span>
                Zurück
            </button>
<!-- Grid indicating question map could go here on larger screens -->
<div class="hidden md:flex gap-1">
<div class="w-2 h-2 rounded-full bg-germany-red"></div>
<div class="w-2 h-2 rounded-full bg-germany-red"></div>
<div class="w-2 h-2 rounded-full bg-germany-red"></div>
<div class="w-2 h-2 rounded-full bg-germany-red ring-2 ring-primary-fixed ring-offset-2 ring-offset-surface"></div>
<div class="w-2 h-2 rounded-full bg-surface-variant"></div>
<div class="w-2 h-2 rounded-full bg-surface-variant"></div>
</div>
<button class="px-6 py-3 rounded-lg bg-germany-red text-white font-label-md text-label-md font-bold hover:bg-primary transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-center gap-2">
                Weiter
                <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</footer>
</body></html>

<!-- Ausbildung Hub -->
<!DOCTYPE html>

<html class="antialiased" lang="de"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Kapitel 2: Lektion 2.2 - Übung</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS with Config -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container-lowest": "#ffffff",
                        "secondary": "#5f5e5e",
                        "germany-red": "#D51F26",
                        "background": "#f8f9fb",
                        "germany-black": "#000000",
                        "on-secondary": "#ffffff",
                        "tertiary-container": "#d0a600",
                        "outline-variant": "#e6bdb9",
                        "on-background": "#191c1e",
                        "surface-variant": "#e0e3e5",
                        "tertiary-fixed-dim": "#f1c100",
                        "on-error": "#ffffff",
                        "on-primary-container": "#ffecea",
                        "secondary-container": "#e2dfde",
                        "primary-fixed": "#ffdad6",
                        "error": "#ba1a1a",
                        "surface-container-high": "#e6e8ea",
                        "on-error-container": "#93000a",
                        "inverse-surface": "#2d3133",
                        "secondary-fixed": "#e5e2e1",
                        "on-tertiary-container": "#4f3d00",
                        "on-primary-fixed": "#410003",
                        "surface-container-highest": "#e0e3e5",
                        "surface-container-low": "#f2f4f6",
                        "surface": "#f8f9fb",
                        "error-container": "#ffdad6",
                        "on-tertiary-fixed-variant": "#584400",
                        "outline": "#916f6b",
                        "inverse-on-surface": "#eff1f3",
                        "surface-bright": "#f8f9fb",
                        "on-surface": "#191c1e",
                        "on-primary-fixed-variant": "#930010",
                        "surface-container": "#eceef0",
                        "success-green": "#2D8A4E",
                        "on-secondary-fixed": "#1b1c1c",
                        "on-secondary-container": "#636262",
                        "tertiary": "#745b00",
                        "primary-fixed-dim": "#ffb3ac",
                        "on-secondary-fixed-variant": "#474746",
                        "surface-dim": "#d8dadc",
                        "on-tertiary": "#ffffff",
                        "surface-subtle": "#EDF0F3",
                        "tertiary-fixed": "#ffe08b",
                        "germany-gold": "#FFCC00",
                        "primary": "#ae0015",
                        "surface-tint": "#bf0519",
                        "on-primary": "#ffffff",
                        "on-surface-variant": "#5c3f3d",
                        "on-tertiary-fixed": "#241a00",
                        "inverse-primary": "#ffb3ac",
                        "secondary-fixed-dim": "#c8c6c5",
                        "primary-container": "#d51f26"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "16px",
                        "container-max-width": "1120px",
                        "margin-mobile": "16px",
                        "margin-desktop": "32px",
                        "base-unit": "4px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Be Vietnam Pro"],
                        "headline-md": ["Be Vietnam Pro"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "display-lg": ["Be Vietnam Pro"],
                        "title-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-lg-mobile": ["Be Vietnam Pro"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "title-lg": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "34px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface flex flex-col min-h-screen">
<!-- TopAppBar from JSON -->
<header class="docked full-width top-0 sticky z-50 bg-surface border-b border-surface-variant shadow-sm transition-colors duration-200">
<div class="flex justify-between items-center px-margin-mobile h-16 w-full max-w-container-max-width mx-auto">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover" data-alt="A small, professional profile photograph of a diverse young adult learning German, bright, clear lighting, modern corporate style, conveying ambition and focus against a neutral light background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpSL8AVnJidTZJTKjnuymJq7ZhHwfFGisi7YQj4xHqrDvW1g-gA1Is3MhJ0-mY-sAx6YnWmRhT3g6ys0OlRliYAZZDP5kpDidAM2fMWW_QQbuLJs0hOCLUhDz3MSExjqbiMJukf6O9cQ8jMjVeAN5WqXbx6d04wVGQftVc89IIHEwAdBuNk4O4_JiaVKQHr3VlMEEJzZ2LO9N-ewNkNiZqmICmFOcfU77Ge6Kf-TXoU7YUaId5gsBKYf6PPcrj4LRiaiBzSWCGwLfh"/>
</div>
<h1 class="font-headline-md text-headline-md font-bold text-primary">Live-Sprachzentrum</h1>
</div>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:bg-surface-container-low transition-colors duration-200 hover:scale-95 active:opacity-80">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<!-- Main Learning Canvas -->
<main class="flex-grow w-full max-w-container-max-width mx-auto px-margin-mobile py-6 md:py-margin-desktop pb-32">
<!-- Progress Track -->
<div class="w-full h-1 bg-surface-variant rounded-full overflow-hidden mb-6">
<div class="h-full bg-germany-red w-3/4 rounded-full transition-all duration-500"></div>
</div>
<!-- Lesson Meta -->
<div class="mb-8">
<span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-1">Kapitel 2</span>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Lektion 2.2 - Übung</h2>
</div>
<!-- Audio Player Component -->
<section class="bg-surface-container-lowest rounded-xl p-4 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 mb-8 relative overflow-hidden group">
<div class="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"></div>
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-secondary">headphones</span>
<h3 class="font-title-lg text-title-lg text-on-surface">Hörtext: Arbeiten in Deutschland</h3>
</div>
<div class="flex items-center gap-4">
<button class="w-12 h-12 flex-shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all z-10">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</button>
<div class="flex-grow flex flex-col justify-center gap-1.5 z-10">
<div class="w-full h-2.5 bg-surface-container-high rounded-full relative cursor-pointer hover:h-3 transition-all flex items-center">
<div class="absolute left-0 h-full bg-germany-red rounded-full w-[45%]"></div>
<div class="absolute left-[45%] -translate-x-1/2 w-4 h-4 bg-germany-red rounded-full shadow border-2 border-surface-container-lowest opacity-0 group-hover:opacity-100 transition-opacity"></div>
</div>
<div class="flex justify-between font-label-sm text-label-sm text-secondary">
<span>0:42</span>
<span>2:15</span>
</div>
</div>
</div>
</section>
<!-- Interactive Exercise: Textes à trous -->
<section class="bg-surface-container-lowest rounded-xl p-5 md:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-surface-variant/40 relative">
<div class="absolute top-0 left-0 w-1.5 h-full bg-tertiary-container rounded-l-xl"></div>
<div class="flex items-start justify-between mb-6">
<div>
<h3 class="font-title-lg text-title-lg text-on-surface mb-1">Ergänzen Sie den Text</h3>
<p class="font-body-md text-body-md text-secondary">Hören Sie genau zu und füllen Sie die fehlenden Wörter ein.</p>
</div>
<span class="material-symbols-outlined text-tertiary-container text-opacity-50 text-4xl hidden md:block">edit_note</span>
</div>
<div class="font-body-lg text-body-lg text-on-surface leading-loose md:leading-[2.5]">
                In Deutschland ist Pünktlichkeit am Arbeitsplatz sehr 
                
                <span class="relative inline-block mx-1 group">
<input autocomplete="off" class="exercise-input w-28 md:w-32 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" data-answer="wichtig" spellcheck="false" type="text"/>
</span>
                
                . Man sollte immer 
                
                <span class="relative inline-block mx-1 group">
<input autocomplete="off" class="exercise-input w-32 md:w-36 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" data-answer="pünktlich" spellcheck="false" type="text"/>
</span>
                
                zum Meeting erscheinen. Wenn man krank ist, muss man dem Arbeitgeber sofort 
                
                <span class="relative inline-block mx-1 group">
<input autocomplete="off" class="exercise-input w-32 md:w-36 bg-surface border-b-2 border-surface-variant text-center font-title-lg text-title-lg text-primary focus:border-primary focus:bg-primary-fixed/20 focus:outline-none transition-all px-2 py-1 rounded-t-md" data-answer="bescheid" spellcheck="false" type="text"/>
</span>
                
                geben.
            </div>
</section>
</main>
<!-- Contextual Action Bar (Replaces BottomNav for Task Focus) -->
<div class="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-variant p-4 pb-safe z-40 shadow-[0_-8px_16px_rgba(0,0,0,0.05)] md:static md:bg-transparent md:border-none md:shadow-none md:p-0 md:max-w-container-max-width md:mx-auto md:px-margin-desktop md:pb-12">
<div class="flex flex-col-reverse md:flex-row gap-3 max-w-md mx-auto md:max-w-none md:justify-end md:items-center">
<button class="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border-2 border-germany-black text-germany-black font-label-md text-label-md hover:bg-surface-variant/30 active:scale-95 transition-all w-full md:w-auto" id="hilfeBtn">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">lightbulb</span>
                Hilfe
            </button>
<button class="flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-surface-tint active:scale-95 hover:-translate-y-0.5 transition-all shadow-md w-full md:w-auto" id="prufenBtn">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                Prüfen
            </button>
</div>
</div>
<!-- Micro-interaction Scripts -->
<script>
        document.addEventListener('DOMContentLoaded', () => {
            const inputs = document.querySelectorAll('.exercise-input');
            const prufenBtn = document.getElementById('prufenBtn');
            const hilfeBtn = document.getElementById('hilfeBtn');

            prufenBtn.addEventListener('click', () => {
                inputs.forEach(input => {
                    const userAnswer = input.value.trim().toLowerCase();
                    const correctAnswer = input.dataset.answer.toLowerCase();
                    
                    // Reset classes
                    input.classList.remove('border-surface-variant', 'border-primary', 'text-primary', 'bg-surface', 'bg-error-container', 'bg-success-green', 'text-success-green', 'text-error', 'border-error', 'border-success-green');

                    if (userAnswer === correctAnswer) {
                        input.classList.add('border-success-green', 'text-success-green', 'bg-success-green', 'bg-opacity-10');
                    } else if (userAnswer !== '') {
                        input.classList.add('border-error', 'text-error', 'bg-error-container', 'bg-opacity-30');
                        // Optional shake animation could be added here
                    } else {
                        input.classList.add('border-surface-variant', 'text-primary', 'bg-surface');
                    }
                });
            });

            hilfeBtn.addEventListener('click', () => {
                // Find first empty or incorrect input and reveal first letter
                for (let input of inputs) {
                    const userAnswer = input.value.trim().toLowerCase();
                    const correctAnswer = input.dataset.answer.toLowerCase();
                    
                    if (userAnswer !== correctAnswer) {
                        const correctWord = input.dataset.answer;
                        input.value = correctWord.charAt(0);
                        input.focus();
                        
                        // Briefly highlight to draw attention
                        input.classList.add('ring-2', 'ring-tertiary-container', 'ring-opacity-50');
                        setTimeout(() => {
                            input.classList.remove('ring-2', 'ring-tertiary-container', 'ring-opacity-50');
                        }, 1000);
                        break; // Only help with one at a time
                    }
                }
            });

            // Clear styling on input to allow re-entry
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('border-error', 'text-error', 'bg-error-container', 'bg-opacity-30', 'border-success-green', 'text-success-green', 'bg-success-green', 'bg-opacity-10');
                    input.classList.add('border-primary', 'text-primary', 'bg-primary-fixed', 'bg-opacity-20');
                });
            });
        });
    </script>
</body></html>

<!-- TELC Simulator -->
<!DOCTYPE html>

<html class="light" lang="de"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Stammtisch - B1 Projekt Janvier</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config injected from instructions -->
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-primary-container": "#ffecea",
                      "surface": "#f8f9fb",
                      "surface-container-lowest": "#ffffff",
                      "on-error-container": "#93000a",
                      "surface-tint": "#bf0519",
                      "secondary-fixed-dim": "#c8c6c5",
                      "secondary-container": "#e2dfde",
                      "success-green": "#2D8A4E",
                      "primary-container": "#d51f26",
                      "germany-black": "#000000",
                      "on-secondary": "#ffffff",
                      "on-primary-fixed-variant": "#930010",
                      "on-primary": "#ffffff",
                      "germany-gold": "#FFCC00",
                      "secondary": "#5f5e5e",
                      "on-tertiary-fixed": "#241a00",
                      "on-tertiary-container": "#4f3d00",
                      "primary-fixed-dim": "#ffb3ac",
                      "surface-container-highest": "#e0e3e5",
                      "germany-red": "#D51F26",
                      "on-surface-variant": "#5c3f3d",
                      "outline": "#916f6b",
                      "on-background": "#191c1e",
                      "surface-variant": "#e0e3e5",
                      "surface-bright": "#f8f9fb",
                      "tertiary-fixed": "#ffe08b",
                      "tertiary-fixed-dim": "#f1c100",
                      "on-error": "#ffffff",
                      "primary": "#ae0015",
                      "on-surface": "#191c1e",
                      "inverse-on-surface": "#eff1f3",
                      "surface-dim": "#d8dadc",
                      "on-primary-fixed": "#410003",
                      "primary-fixed": "#ffdad6",
                      "on-secondary-fixed-variant": "#474746",
                      "surface-subtle": "#EDF0F3",
                      "error": "#ba1a1a",
                      "tertiary-container": "#d0a600",
                      "surface-container": "#eceef0",
                      "inverse-surface": "#2d3133",
                      "inverse-primary": "#ffb3ac",
                      "secondary-fixed": "#e5e2e1",
                      "outline-variant": "#e6bdb9",
                      "on-tertiary-fixed-variant": "#584400",
                      "tertiary": "#745b00",
                      "background": "#f8f9fb",
                      "surface-container-low": "#f2f4f6",
                      "surface-container-high": "#e6e8ea",
                      "on-tertiary": "#ffffff",
                      "error-container": "#ffdad6",
                      "on-secondary-fixed": "#1b1c1c",
                      "on-secondary-container": "#636262"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "gutter": "16px",
                      "base-unit": "4px",
                      "margin-mobile": "16px",
                      "container-max-width": "1120px",
                      "margin-desktop": "32px"
              },
              "fontFamily": {
                      "label-md": ["Inter"],
                      "body-md": ["Inter"],
                      "title-lg": ["Inter"],
                      "headline-md": ["Be Vietnam Pro"],
                      "headline-lg": ["Be Vietnam Pro"],
                      "headline-lg-mobile": ["Be Vietnam Pro"],
                      "label-sm": ["Inter"],
                      "body-lg": ["Inter"],
                      "display-lg": ["Be Vietnam Pro"]
              },
              "fontSize": {
                      "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "500" }],
                      "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                      "title-lg": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                      "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                      "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                      "headline-lg-mobile": ["28px", { "lineHeight": "34px", "fontWeight": "700" }],
                      "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                      "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                      "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
              }
            }
          }
        }
    </script>
<style>
        /* Ambient Shadows based on guidelines */
        .ambient-shadow-lvl1 {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
        }
        .ambient-shadow-lvl2 {
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.08);
        }
        /* Fluid Typography scaling utilities if needed */
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface antialiased min-h-screen relative font-body-md text-body-md">
<!-- TopAppBar from JSON -->
<header class="bg-surface border-b border-surface-variant fixed top-0 w-full z-50">
<div class="flex justify-between items-center px-margin-mobile h-16 w-full max-w-container-max-width mx-auto">
<!-- Leading Avatar -->
<button class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary">
<img alt="Profile" class="w-full h-full object-cover" data-alt="A professional, warm headshot of an ambitious Malagasy student in a clean, brightly lit modern setting. They are wearing casual yet smart attire, looking approachable. High key lighting, vibrant clear colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxTsEH9B0zKkP6gODT3euc7s5RLC2Oijq1EhBe5IROWEhHKDK7rvIqWwU1FoVo1aDbx3ca7t6S6A_E2cWFBXTkJwKOO2u1a8uPNVSRZy8CfosiJgBAm1QP8NGGL7vYEkMrIMK6pQAXddrzQBSk8E81STLn1uxRez1kDe-RrQ5lJJnHs9fUXbDNW0-5yFbxE_VrmMvBfYEFkPTkJTBIdNlhogawYv8VaJ9J1uL2tHPnSP7bCUSqFgrW8Lhtpj8o4GgmDKNz4XhV9Y0E"/>
</button>
<!-- Headline / Brand -->
<h1 class="font-headline-md text-headline-md font-bold text-primary truncate flex-1 text-center px-4">
                Stammtisch
            </h1>
<!-- Trailing Icon -->
<button class="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors duration-200 focus:outline-none">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<!-- Main Content Canvas -->
<main class="max-w-container-max-width mx-auto pt-20 pb-32 px-margin-mobile md:px-margin-desktop flex flex-col gap-6">
<!-- Group Header Card -->
<section class="bg-surface-container-lowest rounded-xl ambient-shadow-lvl1 p-5 border border-surface-subtle relative overflow-hidden">
<!-- Subtle decorative top bar reflecting German flag colors subtly -->
<div class="absolute top-0 left-0 w-full h-1 flex">
<div class="flex-1 bg-germany-black"></div>
<div class="flex-1 bg-germany-red"></div>
<div class="flex-1 bg-germany-gold"></div>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface mt-2">B1 Projekt - Janvier</h2>
<div class="flex items-center gap-2 mt-2 text-secondary">
<span class="material-symbols-outlined" style="font-size: 20px;">group</span>
<span class="font-label-md text-label-md">24 Mitglieder</span>
</div>
<p class="mt-3 text-on-surface-variant">
                Le Stammtisch virtuel pour votre cohorte B1 Projekt. Posez vos questions, partagez des ressources et pratiquez votre allemand ensemble !
            </p>
</section>
<!-- Feed Container -->
<div class="flex flex-col gap-5">
<!-- Post 1: Official Announcement (Highlighted) -->
<article class="bg-surface-container-low border border-primary-fixed rounded-xl ambient-shadow-lvl1 p-4 relative">
<!-- Highlight Indicator -->
<div class="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
<div class="flex justify-between items-start ml-2">
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
<img alt="Prof. Müller" class="w-full h-full object-cover" data-alt="A professional portrait of a German language professor in their 40s. They have a warm, encouraging smile, wearing a neat blazer. The background is a slightly blurred academic office setting with bookshelves. Soft, natural lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCmIMCgsDaZof8DEC76voLScwWOTcL7cJeraHrfGoSkfGzMlfIBtQ8ARvf3_gvsabxVAA-pvXQ0Ic1_TtrGdITi0uWKEAuRZCVQ1bLB3CMMH8dGsxfdSeO9v-I1i92hRPySNzPIRu_vul61apy0bM5y3TkpC7HJnrbFTyXgutQglZ9bT7kV1ZMmvONddVPbC5581UvkZ_2ji3JgqcGrs-g_xOKcN2es77tMkD141CUO1RWZKURiEhsYXNkbEpKej1TgSsBTwvzG5o7"/>
</div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-label-md text-label-md font-bold text-on-surface">Prof. Müller</h3>
<span class="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full flex items-center gap-1">
<span class="material-symbols-outlined" data-weight="fill" style="font-size: 14px;">campaign</span>
                                    Ankündigung
                                </span>
</div>
<span class="font-label-sm text-label-sm text-secondary">Vor 2 Stunden</span>
</div>
</div>
<button class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<div class="mt-3 ml-2">
<p class="text-on-surface">
                        Guten Morgen zusammen! ☀️<br/><br/>
                        Bitte denkt daran, die Hausaufgaben für Kapitel 4 bis diesen Freitag hochzuladen. Ich habe außerdem ein neues Übungsblatt zum Konjunktiv II im Bereich "Lernen" hinzugefügt. <br/><br/>
                        Viel Erfolg bei der Vorbereitung!
                    </p>
</div>
<div class="mt-4 ml-2 flex items-center gap-4 border-t border-surface-variant pt-3">
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
<span class="font-label-md text-label-md">12</span>
</button>
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
<span class="font-label-md text-label-md">4</span>
</button>
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors ml-auto">
<span class="material-symbols-outlined" style="font-size: 20px;">translate</span>
<span class="font-label-sm text-label-sm">Übersetzen</span>
</button>
</div>
</article>
<!-- Post 2: Standard Student Post -->
<article class="bg-surface-container-lowest rounded-xl ambient-shadow-lvl1 p-4 border border-surface-subtle">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img alt="Student Avatar" class="w-full h-full object-cover" data-alt="A candid, well-lit headshot of an enthusiastic young Malagasy student. They look focused and friendly, wearing a comfortable hoodie. The background is a clean, minimalist wall. High quality, crisp details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzeGHJLB-SacsRAoNrnUvRKmfA3u2AHP3RHg8hpXJFGQShDDOEAewQdr0qaDRf5De3eWzbbikNJTp4yOc5qDEuNhSj50Ub0l7K-oPeyLVBSVa0dllFMz72wmdm6PwJhe0h4wmBFm1A8uy2lttMoHl8kGEKg6UIYzQR_VPKIn8ENFoD0glnam58gQo8a0WHCCTRyb5RlvujcueAJr58s28OfnMSIhnRixvgTWNE7LVkgbF-cufa067zAHIKeUtvjfdcE-lgT2kQD4qw"/>
</div>
<div>
<h3 class="font-label-md text-label-md font-bold text-on-surface">Jean Dupont</h3>
<span class="font-label-sm text-label-sm text-secondary">Vor 5 Stunden</span>
</div>
</div>
</div>
<div class="mt-3">
<p class="text-on-surface">
                        Hallo Leute! Hat jemand gute Notizen zur gestrigen Lektion? Ich war leider krank und möchte den Stoff für das Projekt am Wochenende nachholen. Danke im Voraus! 🙏
                    </p>
</div>
<div class="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
<button class="flex items-center gap-1.5 text-primary group">
<span class="material-symbols-outlined" data-weight="fill">favorite</span>
<span class="font-label-md text-label-md">3</span>
</button>
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
<span class="font-label-md text-label-md">2 Antworten</span>
</button>
</div>
</article>
<!-- Post 3: Student Post with Media -->
<article class="bg-surface-container-lowest rounded-xl ambient-shadow-lvl1 p-4 border border-surface-subtle">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img alt="Student Avatar" class="w-full h-full object-cover" data-alt="A friendly profile picture of a young woman from Madagascar. She is smiling warmly at the camera. Soft, diffuse natural lighting highlighting her features against a neutral light grey background. Clean corporate modern aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsY3L4LiRmOB-SIYLtXvKPdN8m6Iy6DbyQAJCUmd_GbJLUOK_6N7xJubIRXoZH_1jo1H5BNywq683cRnzW67FvlhCSMo8AfqpH71G7jSzV2K8J_9hU1_1uI2hc2cDuZZKvm2p22rCuuDxsyUbiHz6O_nCAiJugDRxF8FMsm-ANmLHQzPz-aXsvWM6MNA6386I4uQUctCNPytFQ-PaYA20nYWjmAiIzys7lWwEX0qMheNca1fUpJjwo6gathnT8lBXAdeHSA87u-tJr"/>
</div>
<div>
<h3 class="font-label-md text-label-md font-bold text-on-surface">Marie Rasoa</h3>
<span class="font-label-sm text-label-sm text-secondary">Gestern, 18:30</span>
</div>
</div>
</div>
<div class="mt-3">
<p class="text-on-surface mb-3">
                        Mein Arbeitsplatz heute Abend. Ich bin fast fertig mit dem Dossier für die Ausbildungsvorbereitung. Wer ist noch am Lernen? ☕📚
                    </p>
<div class="w-full h-48 rounded-lg overflow-hidden bg-surface-container-high border border-surface-variant">
<img alt="Study space" class="w-full h-full object-cover" data-alt="A neat, organized study desk captured from a first-person perspective. A modern laptop is open next to a steaming cup of coffee and highlighted German language textbooks. Natural sunset light is streaming through a nearby window, creating a warm, focused, and academic mood. The scene is bright and clean." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-i9EI8tOhDfhGBSxG0qQpP1c6t1CsBAfezLslNEW2R1dj255DC7dGB0En6AYah6g7XlAR-oolmB5Nx5cEqPYxZpqpKRA0mkb1iVpgeL3xfGS5CTOX1JneCNeUSRj-aJa7-FmSLypDqbY-M-D_rRwmgbwoYZIIuNUQy0x2NeDtXsrNo26Z121LxAizZHe4-vbL0N3cDhF36Q0n0xo1197YIWCZHOQyOrynchE3_NYawxuAk_xvVybCs3NPxBLcwCgwse3wuLXRpYQ_"/>
</div>
</div>
<div class="mt-4 flex items-center gap-4 border-t border-surface-subtle pt-3">
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
<span class="font-label-md text-label-md">8</span>
</button>
<button class="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform">chat_bubble</span>
<span class="font-label-md text-label-md">1</span>
</button>
</div>
</article>
</div>
</main>
<!-- Floating Action Button (FAB) for writing a post -->
<button class="fixed bottom-24 right-4 md:right-auto md:left-[calc(50%+480px-70px)] bg-primary text-on-primary w-14 h-14 rounded-full ambient-shadow-lvl2 flex items-center justify-center hover:bg-surface-tint hover:-translate-y-0.5 transition-all duration-200 z-40 focus:outline-none focus:ring-4 focus:ring-primary-fixed">
<span class="material-symbols-outlined" style="font-size: 24px;">edit_square</span>
</button>
<!-- BottomNavBar from JSON -->
<nav class="bg-surface-container-lowest shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.04)] fixed bottom-0 left-0 w-full z-50 rounded-t-xl md:hidden">
<div class="flex justify-around items-center px-4 py-2 pb-safe w-full">
<!-- Item 1: Lernen (Inactive) -->
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined mb-1">home</span>
<span class="font-label-sm text-label-sm">Lernen</span>
</button>
<!-- Item 2: Kurse (Inactive) -->
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined mb-1">menu_book</span>
<span class="font-label-sm text-label-sm">Kurse</span>
</button>
<!-- Item 3: Karriere (Inactive) -->
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined mb-1">work</span>
<span class="font-label-sm text-label-sm">Karriere</span>
</button>
<!-- Item 4: Stammtisch (Active) -->
<button class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5 scale-90 transition-transform duration-150">
<span class="material-symbols-outlined mb-1" data-weight="fill">groups</span>
<span class="font-label-sm text-label-sm">Stammtisch</span>
</button>
<!-- Item 5: Profil (Inactive) -->
<button class="flex flex-col items-center justify-center text-secondary px-3 py-1.5 hover:bg-surface-variant rounded-xl transition-all">
<span class="material-symbols-outlined mb-1">person</span>
<span class="font-label-sm text-label-sm">Profil</span>
</button>
</div>
</nav>
<!-- Desktop Sidebar Placeholder (Hidden on mobile, visible on md+) 
         Since prompt asks for BottomNav focus, we primarily show mobile layout, 
         but keeping the responsive pivot rule in mind, we hide bottom nav on md+ 
         and would ideally have a sidebar. For this snippet, just hiding bottom nav is sufficient to respect rules. -->
<style>
        @media (min-width: 768px) {
            nav { display: none !important; }
            /* Adjust main padding when bottom nav is gone */
            main { padding-bottom: 2rem; }
        }
    </style>
</body></html>