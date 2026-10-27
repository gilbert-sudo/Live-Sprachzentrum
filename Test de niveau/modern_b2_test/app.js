/**
 * Cornelsen DaF Einstufungstest Niveau B1 — Modern Application Controller
 * Handles application lifecycle, question rendering (7 interaction types),
 * multi-audio players, state persistence, CEFR B1/B2 evaluation, review mode,
 * and certificate generation.
 */

(function () {
  'use strict';

  /* ==========================================================================
     Application State
     ========================================================================== */
  const state = {
    currentIndex: 0,
    userName: {
      vorname: '',
      nachname: ''
    },
    startTime: null,
    totalSeconds: 0,
    timerInterval: null,
    userAnswers: {},       // qId -> answer payload
    flaggedQuestions: new Set(),
    results: null,
    currentPlayingClipId: null
  };

  /* ==========================================================================
     DOM Element References
     ========================================================================== */
  const elements = {
    // Views
    viewWelcome: document.getElementById('viewWelcome'),
    viewTest: document.getElementById('viewTest'),
    viewResult: document.getElementById('viewResult'),

    // Header & Navigation
    appHeader: document.getElementById('appHeader'),
    headerTestInfo: document.getElementById('headerTestInfo'),
    questionCounterChip: document.getElementById('questionCounterChip'),
    questionCounterText: document.getElementById('questionCounterText'),
    testTimerChip: document.getElementById('testTimerChip'),
    timerText: document.getElementById('timerText'),
    progressBarFill: document.getElementById('progressBarFill'),
    btnToggleDrawer: document.getElementById('btnToggleDrawer'),
    btnQuellen: document.getElementById('btnQuellen'),
    btnThemeToggle: document.getElementById('btnThemeToggle'),

    // Question Drawer
    questionDrawer: document.getElementById('questionDrawer'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    btnCloseDrawer: document.getElementById('btnCloseDrawer'),
    drawerGrid: document.getElementById('drawerGrid'),

    // Welcome Screen
    welcomeForm: document.getElementById('welcomeForm'),
    inputVorname: document.getElementById('inputVorname'),
    inputNachname: document.getElementById('inputNachname'),
    btnStartTest: document.getElementById('btnStartTest'),
    btnSoundCheck: document.getElementById('btnSoundCheck'),
    soundCheckAudio: document.getElementById('soundCheckAudio'),

    // Test Runner Screen
    qBadgeNumber: document.getElementById('qBadgeNumber'),
    qBadgeCategory: document.getElementById('qBadgeCategory'),
    btnFlagQuestion: document.getElementById('btnFlagQuestion'),
    btnQuestionHelp: document.getElementById('btnQuestionHelp'),
    qRubric: document.getElementById('qRubric'),
    qImagesContainer: document.getElementById('qImagesContainer'),
    qInteractiveArea: document.getElementById('qInteractiveArea'),
    taskHintChip: document.getElementById('taskHintChip'),

    // Custom Audio Player
    qAudioContainer: document.getElementById('qAudioContainer'),
    audioTrackName: document.getElementById('audioTrackName'),
    audioPlayBtn: document.getElementById('audioPlayBtn'),
    audioProgressSlider: document.getElementById('audioProgressSlider'),
    audioCurrentTime: document.getElementById('audioCurrentTime'),
    audioDuration: document.getElementById('audioDuration'),
    audioRestartBtn: document.getElementById('audioRestartBtn'),
    globalAudioPlayer: document.getElementById('globalAudioPlayer'),

    // Multi-Audio Panel
    qMultiAudioContainer: document.getElementById('qMultiAudioContainer'),
    multiAudioButtons: document.getElementById('multiAudioButtons'),

    // Navigation Buttons
    btnPrevQuestion: document.getElementById('btnPrevQuestion'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),
    btnNextText: document.getElementById('btnNextText'),
    btnMatrixQuick: document.getElementById('btnMatrixQuick'),
    navQuestionText: document.getElementById('navQuestionText'),

    // Results & Certificate Screen
    certDateDisplay: document.getElementById('certDateDisplay'),
    certDateInline: document.getElementById('certDateInline'),
    certUserName: document.getElementById('certUserName'),
    certScoreDisplay: document.getElementById('certScoreDisplay'),
    radialScoreNumber: document.getElementById('radialScoreNumber'),
    radialScoreBar: document.getElementById('radialScoreBar'),
    metricCorrectAnswers: document.getElementById('metricCorrectAnswers'),
    metricTimeTaken: document.getElementById('metricTimeTaken'),
    metricLevelBadge: document.getElementById('metricLevelBadge'),
    recHeadline: document.getElementById('recHeadline'),
    recDescription: document.getElementById('recDescription'),
    levelRecommendationCard: document.getElementById('levelRecommendationCard'),
    btnPrintCert: document.getElementById('btnPrintCert'),
    btnToggleReview: document.getElementById('btnToggleReview'),
    btnRetakeTest: document.getElementById('btnRetakeTest'),
    reviewSection: document.getElementById('reviewSection'),
    reviewList: document.getElementById('reviewList'),

    // Modals
    modalLightbox: document.getElementById('modalLightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    modalHelp: document.getElementById('modalHelp'),
    modalHelpBody: document.getElementById('modalHelpBody'),
    modalQuellen: document.getElementById('modalQuellen'),
    quellenTextDisplay: document.getElementById('quellenTextDisplay'),
    modalConfirmSubmit: document.getElementById('modalConfirmSubmit'),
    unansweredWarningBox: document.getElementById('unansweredWarningBox'),
    unansweredCount: document.getElementById('unansweredCount'),
    unansweredChips: document.getElementById('unansweredChips'),
    btnConfirmSubmitFinal: document.getElementById('btnConfirmSubmitFinal')
  };

  /* ==========================================================================
     Initialization & Lifecycle
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAudioController();
    initDrawer();
    initWelcomeForm();
    initNavigation();
    initReviewFilters();
    initCertificateActions();
  });

  /* ==========================================================================
     Theme Controller (Light / Dark)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('cornelsen_theme_b1') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    elements.btnThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cornelsen_theme_b1', theme);
  }

  /* ==========================================================================
     Audio Controller (Single and Multi Audio)
     ========================================================================== */
  function initAudioController() {
    const player = elements.globalAudioPlayer;

    elements.audioPlayBtn.addEventListener('click', toggleAudioPlayback);
    elements.audioRestartBtn.addEventListener('click', () => {
      player.currentTime = 0;
      player.play().catch(() => {});
      updatePlayBtnState(true);
    });

    elements.audioProgressSlider.addEventListener('input', (e) => {
      if (player.duration) {
        player.currentTime = (e.target.value / 100) * player.duration;
      }
    });

    player.addEventListener('timeupdate', () => {
      if (player.duration) {
        const progress = (player.currentTime / player.duration) * 100;
        elements.audioProgressSlider.value = progress;
        elements.audioCurrentTime.textContent = formatTime(player.currentTime);
      }
    });

    player.addEventListener('loadedmetadata', () => {
      elements.audioDuration.textContent = formatTime(player.duration);
    });

    player.addEventListener('ended', () => {
      updatePlayBtnState(false);
      elements.audioProgressSlider.value = 0;
      elements.audioCurrentTime.textContent = '0:00';
    });

    // Speed Selector Buttons
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        player.playbackRate = parseFloat(btn.dataset.speed);
      });
    });

    // Welcome Sound Check
    elements.btnSoundCheck.addEventListener('click', () => {
      const soundAudio = elements.soundCheckAudio;
      if (soundAudio.paused) {
        soundAudio.currentTime = 0;
        soundAudio.play().then(() => {
          elements.btnSoundCheck.classList.add('playing');
          elements.btnSoundCheck.querySelector('span').textContent = 'Wiedergabe läuft...';
        }).catch(err => {
          alert('Hinweis: Der Browser hat die Audiowiedergabe blockiert. Bitte Interaktion erlauben.');
        });
      } else {
        soundAudio.pause();
        soundAudio.currentTime = 0;
        elements.btnSoundCheck.classList.remove('playing');
        elements.btnSoundCheck.querySelector('span').textContent = 'Hörprobe abspielen';
      }
    });

    elements.soundCheckAudio.addEventListener('ended', () => {
      elements.btnSoundCheck.classList.remove('playing');
      elements.btnSoundCheck.querySelector('span').textContent = 'Hörprobe abspielen';
    });
  }

  function toggleAudioPlayback() {
    const player = elements.globalAudioPlayer;
    if (player.paused) {
      player.play().then(() => {
        updatePlayBtnState(true);
      }).catch(err => console.warn('Audio play prevented:', err));
    } else {
      player.pause();
      updatePlayBtnState(false);
    }
  }

  function updatePlayBtnState(isPlaying) {
    const playSvg = elements.audioPlayBtn.querySelector('.play-svg');
    const pauseSvg = elements.audioPlayBtn.querySelector('.pause-svg');
    if (isPlaying) {
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'block';
    } else {
      playSvg.style.display = 'block';
      pauseSvg.style.display = 'none';
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadAudioTrack(url, trackLabel) {
    const player = elements.globalAudioPlayer;
    player.pause();
    updatePlayBtnState(false);
    elements.audioProgressSlider.value = 0;
    elements.audioCurrentTime.textContent = '0:00';
    elements.audioDuration.textContent = '0:00';
    elements.audioTrackName.textContent = trackLabel || 'Hörbeispiel';
    player.src = url;
    player.load();
  }

  /* ==========================================================================
     Question Drawer / Matrix (1 to 30)
     ========================================================================== */
  function initDrawer() {
    elements.btnToggleDrawer.addEventListener('click', toggleDrawer);
    elements.btnCloseDrawer.addEventListener('click', closeDrawer);
    elements.drawerBackdrop.addEventListener('click', closeDrawer);
    elements.btnMatrixQuick.addEventListener('click', toggleDrawer);

    // Build 30 grid buttons
    elements.drawerGrid.innerHTML = '';
    TEST_DATA.questions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'drawer-node';
      btn.id = `drawerNode_${q.id}`;
      btn.textContent = q.id;
      btn.title = `Frage ${q.id}: ${q.category}`;
      btn.addEventListener('click', () => {
        closeDrawer();
        goToQuestion(idx);
      });
      elements.drawerGrid.appendChild(btn);
    });
  }

  function toggleDrawer() {
    elements.questionDrawer.classList.toggle('open');
    elements.drawerBackdrop.classList.toggle('open');
  }

  function closeDrawer() {
    elements.questionDrawer.classList.remove('open');
    elements.drawerBackdrop.classList.remove('open');
  }

  function updateDrawerNodeStatus() {
    TEST_DATA.questions.forEach((q, idx) => {
      const node = document.getElementById(`drawerNode_${q.id}`);
      if (!node) return;

      node.classList.remove('current', 'answered', 'flagged');

      if (idx === state.currentIndex) {
        node.classList.add('current');
      }

      if (state.flaggedQuestions.has(q.id)) {
        node.classList.add('flagged');
      }

      const ans = state.userAnswers[q.id];
      if (checkAnswerComplete(q, ans)) {
        node.classList.add('answered');
      }
    });
  }

  function checkAnswerComplete(q, ans) {
    if (ans === undefined || ans === null) return false;

    if (q.type === 'single-choice') {
      return typeof ans === 'string' && ans.length > 0;
    }
    if (q.type === 'multiple-choice') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.type === 'grouped-choice') {
      if (typeof ans !== 'object') return false;
      return q.groups.every(g => ans[g.responseId] !== undefined);
    }
    if (q.type === 'inline-dropdown') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.dropdowns).every(k => ans[k] !== undefined && ans[k] !== '');
    }
    if (q.type === 'text-gap') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.gaps).every(k => (ans[k] || '').trim().length > 0);
    }
    if (q.type === 'dialogue-order') {
      return Array.isArray(ans) && ans.length === q.correctOrder.length;
    }
    if (q.type === 'audio-gap-match') {
      if (typeof ans !== 'object') return false;
      return q.slots.every(s => ans[s.slotId] !== undefined && ans[s.slotId] !== '');
    }
    return false;
  }

  /* ==========================================================================
     Welcome Screen & Test Initiation
     ========================================================================== */
  function initWelcomeForm() {
    window.startTest = startTest;
    elements.welcomeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      startTest();
    });
  }

  function startTest() {
    // Stop sound check audio if playing
    elements.soundCheckAudio.pause();

    state.userName.vorname = elements.inputVorname.value.trim() || 'Teilnehmer/in';
    state.userName.nachname = elements.inputNachname.value.trim() || '';

    // Switch view
    elements.viewWelcome.classList.remove('active');
    elements.viewWelcome.style.display = 'none';

    elements.viewTest.style.display = 'block';
    elements.viewTest.classList.add('active');

    // Header updates
    elements.headerTestInfo.style.display = 'flex';
    elements.btnToggleDrawer.style.display = 'inline-flex';

    // Timer
    state.startTime = Date.now();
    startTimer();

    // Render first question
    goToQuestion(0);
  }

  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.totalSeconds = 0;
    state.timerInterval = setInterval(() => {
      state.totalSeconds++;
      elements.timerText.textContent = formatTimer(state.totalSeconds);
    }, 1000);
  }

  function formatTimer(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  /* ==========================================================================
     Question Navigation & Rendering Engine
     ========================================================================== */
  function goToQuestion(index) {
    if (index < 0 || index >= TEST_DATA.questions.length) return;

    state.currentIndex = index;
    const q = TEST_DATA.questions[index];

    // Scroll to top of main content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Stop global audio
    elements.globalAudioPlayer.pause();
    updatePlayBtnState(false);

    // Update Header Progress
    const total = TEST_DATA.questions.length;
    elements.questionCounterText.textContent = `Frage ${q.id} von ${total}`;
    elements.navQuestionText.textContent = `Frage ${q.id} von ${total}`;
    const percentProgress = ((index + 1) / total) * 100;
    elements.progressBarFill.style.width = `${percentProgress}%`;

    // Update Question Badges & Header
    elements.qBadgeNumber.textContent = `Frage ${q.id}`;
    elements.qBadgeCategory.textContent = q.category;

    // Flag button state
    if (state.flaggedQuestions.has(q.id)) {
      elements.btnFlagQuestion.classList.add('active');
    } else {
      elements.btnFlagQuestion.classList.remove('active');
    }

    // Rubric
    elements.qRubric.innerHTML = q.rubricHtml || '';

    // Images
    renderImages(q);

    // Audio setup
    setupAudio(q);

    // Task Hint
    updateTaskHint(q);

    // Render Task Interactive Area
    renderInteractiveArea(q);

    // Update Nav Buttons
    elements.btnPrevQuestion.disabled = (index === 0);
    if (index === total - 1) {
      elements.btnNextText.textContent = 'Test abschließen';
      elements.btnNextQuestion.classList.add('btn-finish');
    } else {
      elements.btnNextText.textContent = 'Weiter';
      elements.btnNextQuestion.classList.remove('btn-finish');
    }

    updateDrawerNodeStatus();
  }

  function updateTaskHint(q) {
    const hints = {
      'single-choice': 'Wählen Sie eine zutreffende Antwort aus.',
      'multiple-choice': 'Wählen Sie alle unpassenden Begriffe aus.',
      'grouped-choice': 'Beantworten Sie bitte alle Teilfragen.',
      'inline-dropdown': 'Wählen Sie im Text die passende Ergänzung aus den Menüs.',
      'text-gap': 'Tragen Sie die gesuchten Nummern bzw. Wörter in die Felder ein.',
      'dialogue-order': 'Bringen Sie die Dialogteile in die richtige Reihenfolge.',
      'audio-gap-match': 'Hören Sie die Audioclips und ordnen Sie sie den Ratschlägen zu.'
    };
    elements.taskHintChip.textContent = hints[q.type] || 'Bearbeiten Sie die Aufgabe.';
  }

  function renderImages(q) {
    elements.qImagesContainer.innerHTML = '';
    if (!q.images || q.images.length === 0) {
      elements.qImagesContainer.style.display = 'none';
      return;
    }

    elements.qImagesContainer.style.display = 'flex';
    q.images.forEach((imgSrc) => {
      const card = document.createElement('div');
      card.className = 'image-card';
      card.title = 'Klicken zum Vergrößern';

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `Illustration zu Frage ${q.id}`;
      img.loading = 'lazy';

      const zoomOverlay = document.createElement('div');
      zoomOverlay.className = 'image-zoom-overlay';
      zoomOverlay.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
        <span>Großansicht</span>
      `;

      card.appendChild(img);
      card.appendChild(zoomOverlay);

      card.addEventListener('click', () => {
        elements.lightboxImage.src = imgSrc;
        elements.modalLightbox.style.display = 'flex';
      });

      elements.qImagesContainer.appendChild(card);
    });
  }

  function setupAudio(q) {
    // Single Audio
    if (q.audio && !q.audios) {
      elements.qAudioContainer.style.display = 'block';
      elements.qMultiAudioContainer.style.display = 'none';
      loadAudioTrack(q.audio, `Hörtext zu Frage ${q.id}`);
    } 
    // Multi-Audio (e.g. Q17, Q22)
    else if (q.audios && q.audios.length > 0) {
      elements.qAudioContainer.style.display = 'block';
      elements.qMultiAudioContainer.style.display = 'flex';
      elements.multiAudioButtons.innerHTML = '';

      q.audios.forEach((audioUrl, aIdx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `btn-audio-track ${aIdx === 0 ? 'active' : ''}`;
        
        // Derive clean label
        let trackLabel = `Hörtext ${String.fromCharCode(65 + aIdx)}`;
        if (q.id === 22) trackLabel = `Hörbeispiel ${aIdx + 1}`;
        if (q.id === 17) trackLabel = `Hörtext ${String.fromCharCode(65 + aIdx)}`;

        btn.innerHTML = `
          <svg class="track-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>${trackLabel}</span>
        `;

        btn.addEventListener('click', () => {
          elements.multiAudioButtons.querySelectorAll('.btn-audio-track').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          loadAudioTrack(audioUrl, trackLabel);
          elements.globalAudioPlayer.play().then(() => {
            updatePlayBtnState(true);
          }).catch(() => {});
        });

        elements.multiAudioButtons.appendChild(btn);
      });

      // Load first track by default
      const firstLabel = (q.id === 22) ? 'Hörbeispiel 1' : 'Hörtext A';
      loadAudioTrack(q.audios[0], firstLabel);
    } 
    // No Audio on main player (e.g. Q3 handles audios inside its interactive area)
    else {
      elements.qAudioContainer.style.display = 'none';
      elements.qMultiAudioContainer.style.display = 'none';
    }
  }

  /* ==========================================================================
     Dynamic Interactive Area Renderer
     ========================================================================== */
  function renderInteractiveArea(q) {
    elements.qInteractiveArea.innerHTML = '';

    switch (q.type) {
      case 'single-choice':
        renderSingleChoice(q);
        break;
      case 'multiple-choice':
        renderMultipleChoice(q);
        break;
      case 'grouped-choice':
        renderGroupedChoice(q);
        break;
      case 'inline-dropdown':
        renderInlineDropdown(q);
        break;
      case 'text-gap':
        renderTextGap(q);
        break;
      case 'dialogue-order':
        renderDialogueOrder(q);
        break;
      case 'audio-gap-match':
        renderAudioGapMatch(q);
        break;
      default:
        console.warn('Unknown question type:', q.type);
    }
  }

  /* --------------------------------------------------------------------------
     1. Single Choice Renderer
     -------------------------------------------------------------------------- */
  function renderSingleChoice(q) {
    const container = document.createElement('div');
    container.className = 'choice-list';

    const currentAnswer = state.userAnswers[q.id];

    q.options.forEach((opt, oIdx) => {
      const card = document.createElement('div');
      card.className = 'choice-option-card';
      if (currentAnswer === opt.id) card.classList.add('selected');

      const letter = String.fromCharCode(65 + oIdx);

      card.innerHTML = `
        <div class="choice-radio"></div>
        <div class="choice-text">${opt.text}</div>
        <div class="choice-hotkey-badge">${letter}</div>
      `;

      card.addEventListener('click', () => {
        state.userAnswers[q.id] = opt.id;
        container.querySelectorAll('.choice-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateDrawerNodeStatus();
      });

      container.appendChild(card);
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     2. Multiple Choice Renderer (Q23)
     -------------------------------------------------------------------------- */
  function renderMultipleChoice(q) {
    const container = document.createElement('div');
    container.className = 'choice-list multi-select-grid';

    if (!Array.isArray(state.userAnswers[q.id])) {
      state.userAnswers[q.id] = [];
    }

    q.options.forEach((opt) => {
      const card = document.createElement('div');
      card.className = 'choice-option-card multi-select-card';
      const isSelected = state.userAnswers[q.id].includes(opt.id);
      if (isSelected) card.classList.add('selected');

      card.innerHTML = `
        <div class="choice-checkbox ${isSelected ? 'checked' : ''}">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="choice-text">${opt.text}</div>
      `;

      card.addEventListener('click', () => {
        let currentArr = state.userAnswers[q.id] || [];
        if (currentArr.includes(opt.id)) {
          currentArr = currentArr.filter(id => id !== opt.id);
          card.classList.remove('selected');
          card.querySelector('.choice-checkbox').classList.remove('checked');
        } else {
          currentArr.push(opt.id);
          card.classList.add('selected');
          card.querySelector('.choice-checkbox').classList.add('checked');
        }
        state.userAnswers[q.id] = currentArr;
        updateDrawerNodeStatus();
      });

      container.appendChild(card);
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     3. Grouped Choice Renderer
     -------------------------------------------------------------------------- */
  function renderGroupedChoice(q) {
    const container = document.createElement('div');
    container.className = 'grouped-choice-container';

    if (!state.userAnswers[q.id] || typeof state.userAnswers[q.id] !== 'object') {
      state.userAnswers[q.id] = {};
    }

    q.groups.forEach((group, gIdx) => {
      const groupCard = document.createElement('div');
      groupCard.className = 'grouped-question-block';

      const titleEl = document.createElement('h4');
      titleEl.className = 'group-prompt-title';
      titleEl.innerHTML = `<strong>${gIdx + 1}.</strong> ${group.title}`;
      groupCard.appendChild(titleEl);

      const listEl = document.createElement('div');
      listEl.className = 'choice-list group-options-list';

      const currentGroupVal = state.userAnswers[q.id][group.responseId];

      group.options.forEach((opt, oIdx) => {
        const card = document.createElement('div');
        card.className = 'choice-option-card';
        if (currentGroupVal === opt.id) card.classList.add('selected');

        const letter = String.fromCharCode(65 + oIdx);

        card.innerHTML = `
          <div class="choice-radio"></div>
          <div class="choice-text">${opt.text}</div>
          <div class="choice-hotkey-badge">${letter}</div>
        `;

        card.addEventListener('click', () => {
          state.userAnswers[q.id][group.responseId] = opt.id;
          listEl.querySelectorAll('.choice-option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          updateDrawerNodeStatus();
        });

        listEl.appendChild(card);
      });

      groupCard.appendChild(listEl);
      container.appendChild(groupCard);
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     4. Inline Dropdown Renderer
     -------------------------------------------------------------------------- */
  function renderInlineDropdown(q) {
    const container = document.createElement('div');
    container.className = 'inline-task-content';

    if (!state.userAnswers[q.id] || typeof state.userAnswers[q.id] !== 'object') {
      state.userAnswers[q.id] = {};
    }

    let parsedHtml = q.templateHtml || '';

    // Replace all inlineChoiceInteraction tags with styled HTML select elements
    Object.keys(q.dropdowns).forEach(rId => {
      const dropData = q.dropdowns[rId];
      const currentVal = state.userAnswers[q.id][rId] || '';

      let selectHtml = `<select class="task-inline-select" data-rid="${rId}">`;
      selectHtml += `<option value="" disabled ${!currentVal ? 'selected' : ''}>— Bitte wählen —</option>`;
      dropData.options.forEach(opt => {
        const isSel = (currentVal === opt.id);
        selectHtml += `<option value="${opt.id}" ${isSel ? 'selected' : ''}>${opt.text}</option>`;
      });
      selectHtml += `</select>`;

      // Regex replace either the whole <inlineChoiceInteraction ...> tag or placeholder
      const reg = new RegExp(`<inlineChoiceInteraction[^>]*responseIdentifier=["']${rId}["'][^>]*>([\s\S]*?)<\/inlineChoiceInteraction>`, 'gi');
      if (reg.test(parsedHtml)) {
        parsedHtml = parsedHtml.replace(reg, selectHtml);
      } else {
        // Fallback replacement
        parsedHtml += `<p class="dropdown-fallback-row"><strong>Auswahl (${rId}):</strong> ${selectHtml}</p>`;
      }
    });

    container.innerHTML = parsedHtml;

    // Attach change event listeners to selects
    container.querySelectorAll('.task-inline-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const rid = sel.dataset.rid;
        state.userAnswers[q.id][rid] = e.target.value;
        sel.classList.add('answered');
        updateDrawerNodeStatus();
      });
      if (sel.value) sel.classList.add('answered');
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     5. Text / Number Gap Renderer
     -------------------------------------------------------------------------- */
  function renderTextGap(q) {
    const container = document.createElement('div');
    container.className = 'text-gap-container';

    if (!state.userAnswers[q.id] || typeof state.userAnswers[q.id] !== 'object') {
      state.userAnswers[q.id] = {};
    }

    // Word Bank if applicable (Q4)
    if (q.id === 4) {
      const wordBank = ["angenehm", "freundlich", "praktisch", "sportlich", "modern", "schön", "kulturell"];
      const wbDiv = document.createElement('div');
      wbDiv.className = 'word-bank-wrapper';
      wbDiv.innerHTML = `
        <div class="word-bank-label">Wortauswahl zur Verfügung:</div>
        <div class="word-bank-chips-list">
          ${wordBank.map(w => `<span class="word-bank-chip" data-word="${w}">${w}</span>`).join('')}
        </div>
      `;
      container.appendChild(wbDiv);

      // Clicking chip inserts into active input
      wbDiv.querySelectorAll('.word-bank-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const activeInput = container.querySelector('.gap-input-field:focus') || 
                              container.querySelector('.gap-input-field');
          if (activeInput) {
            activeInput.value = chip.dataset.word;
            activeInput.dispatchEvent(new Event('input'));
          }
        });
      });
    }

    let parsedHtml = q.templateHtml || '';

    // Replace textEntryInteraction tags with inputs
    Object.keys(q.gaps).forEach(rId => {
      const gapVal = state.userAnswers[q.id][rId] || '';
      const inputHtml = `<input type="text" class="gap-input-field" data-rid="${rId}" value="${gapVal}" placeholder="Nr. / Text" autocomplete="off" spellcheck="false">`;

      const reg = new RegExp(`<textEntryInteraction[^>]*responseIdentifier=["']${rId}["'][^>]*>(<\/textEntryInteraction>)?`, 'gi');
      if (reg.test(parsedHtml)) {
        parsedHtml = parsedHtml.replace(reg, inputHtml);
      } else {
        parsedHtml += `<p><strong>Feld ${rId}:</strong> ${inputHtml}</p>`;
      }
    });

    const contentDiv = document.createElement('div');
    contentDiv.className = 'text-gap-body';
    contentDiv.innerHTML = parsedHtml;

    contentDiv.querySelectorAll('.gap-input-field').forEach(input => {
      input.addEventListener('input', (e) => {
        const rid = input.dataset.rid;
        state.userAnswers[q.id][rid] = e.target.value.trim();
        updateDrawerNodeStatus();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const allInputs = Array.from(contentDiv.querySelectorAll('.gap-input-field'));
          const idx = allInputs.indexOf(input);
          if (idx < allInputs.length - 1) {
            allInputs[idx + 1].focus();
          } else {
            elements.btnNextQuestion.focus();
          }
        }
      });
    });

    container.appendChild(contentDiv);
    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     6. Dialogue Order Renderer (Q2)
     -------------------------------------------------------------------------- */
  function renderDialogueOrder(q) {
    const container = document.createElement('div');
    container.className = 'dialogue-order-container';

    container.innerHTML = `
      <div class="dialogue-order-hint">
        <strong>Aufgabe:</strong> Bringen Sie die Aussagen des Dialogs in die richtige Reihenfolge. 
        Nutzen Sie die Pfeiltasten (▲ / ▼), um eine Aussage nach oben oder unten zu verschieben.
      </div>
    `;

    // Fixed speaker turn sequence:
    // Turn 1: Sie -> SC1
    // Turn 2: Krankenschwester -> SC3
    // Turn 3: Sie -> SC5
    // Turn 4: Krankenschwester -> SC7
    // Turn 5: Sie -> SC9

    const movableItemMap = {
      "SC1": "Guten Tag. Ich möchte zu Barbara Lange, aber ich weiß nicht wo sie liegt.",
      "SC3": "Im Zimmer 11.05. Sie ist gestern umgezogen.",
      "SC5": "Alles klar, 11.05. Und wie komme ich da hin?",
      "SC7": "Sie müssen den Gang bis ganz nach hinten gehen. Dann gehen Sie durch die Glastür und die zweite Tür auf der linken Seite ist das Zimmer 11.05. Brauchen Sie eine Vase für die Blumen?",
      "SC9": "Ja, das wäre sehr nett. Aber nur eine kleine. Danke."
    };

    const speakers = [
      { role: "Sie:", class: "speaker-sie" },
      { role: "Krankenschwester:", class: "speaker-schwester" },
      { role: "Sie:", class: "speaker-sie" },
      { role: "Krankenschwester:", class: "speaker-schwester" },
      { role: "Sie:", class: "speaker-sie" }
    ];

    // Current order of movable item IDs
    let currentOrder = state.userAnswers[q.id];
    if (!Array.isArray(currentOrder) || currentOrder.length !== 5) {
      // Default initial shuffled order
      currentOrder = ["SC3", "SC1", "SC7", "SC9", "SC5"];
      state.userAnswers[q.id] = currentOrder;
    }

    const threadDiv = document.createElement('div');
    threadDiv.className = 'dialogue-thread';

    function renderThread() {
      threadDiv.innerHTML = '';
      currentOrder.forEach((itemId, idx) => {
        const turnRow = document.createElement('div');
        turnRow.className = 'dialogue-turn-row';

        const spk = speakers[idx];
        turnRow.innerHTML = `
          <div class="dialogue-speaker-badge ${spk.class}">${spk.role}</div>
          <div class="dialogue-turn-body">${movableItemMap[itemId]}</div>
          <div class="dialogue-reorder-controls">
            <button type="button" class="btn-reorder-move btn-move-up" ${idx === 0 ? 'disabled' : ''} title="Nach oben verschieben">▲</button>
            <button type="button" class="btn-reorder-move btn-move-down" ${idx === 4 ? 'disabled' : ''} title="Nach unten verschieben">▼</button>
          </div>
        `;

        turnRow.querySelector('.btn-move-up').addEventListener('click', () => {
          if (idx > 0) {
            const temp = currentOrder[idx];
            currentOrder[idx] = currentOrder[idx - 1];
            currentOrder[idx - 1] = temp;
            state.userAnswers[q.id] = [...currentOrder];
            renderThread();
            updateDrawerNodeStatus();
          }
        });

        turnRow.querySelector('.btn-move-down').addEventListener('click', () => {
          if (idx < 4) {
            const temp = currentOrder[idx];
            currentOrder[idx] = currentOrder[idx + 1];
            currentOrder[idx + 1] = temp;
            state.userAnswers[q.id] = [...currentOrder];
            renderThread();
            updateDrawerNodeStatus();
          }
        });

        threadDiv.appendChild(turnRow);
      });
    }

    renderThread();
    container.appendChild(threadDiv);

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn-outline-sm';
    resetBtn.style.marginTop = '14px';
    resetBtn.innerHTML = '↺ Reihenfolge zurücksetzen';
    resetBtn.addEventListener('click', () => {
      currentOrder = ["SC3", "SC1", "SC7", "SC9", "SC5"];
      state.userAnswers[q.id] = [...currentOrder];
      renderThread();
      updateDrawerNodeStatus();
    });
    container.appendChild(resetBtn);

    elements.qInteractiveArea.appendChild(container);
  }

  /* --------------------------------------------------------------------------
     7. Audio Gap Match Renderer (Q3)
     -------------------------------------------------------------------------- */
  function renderAudioGapMatch(q) {
    const container = document.createElement('div');
    container.className = 'audio-match-container';

    if (!state.userAnswers[q.id] || typeof state.userAnswers[q.id] !== 'object') {
      state.userAnswers[q.id] = {};
    }

    container.innerHTML = `
      <div class="audio-match-header">
        <strong>Aufgabe:</strong> Hören Sie die 3 Aussagen von Barbara an und wählen Sie bei jedem Ratschlag aus, zu welchem Hörtext er als Antwort passt.
      </div>
    `;

    // 1. Audio Clips Palette
    const palette = document.createElement('div');
    palette.className = 'audio-clips-palette';

    q.audioCards.forEach((clip) => {
      const clipCard = document.createElement('div');
      clipCard.className = 'audio-clip-card';
      clipCard.id = `clipCard_${clip.id}`;

      clipCard.innerHTML = `
        <div class="audio-clip-info">
          <span class="audio-clip-badge">${clip.label}</span>
          <span class="clip-title">Barbara</span>
        </div>
        <button type="button" class="audio-mini-btn" title="${clip.label} abspielen">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      `;

      clipCard.querySelector('.audio-mini-btn').addEventListener('click', () => {
        loadAudioTrack(clip.audio, `Barbara (${clip.label})`);
        elements.globalAudioPlayer.play().then(() => {
          updatePlayBtnState(true);
        }).catch(() => {});
      });

      palette.appendChild(clipCard);
    });

    container.appendChild(palette);

    // 2. Advice Target Slots
    const slotsDiv = document.createElement('div');
    slotsDiv.className = 'audio-match-slots';

    q.slots.forEach((slot, sIdx) => {
      const slotCard = document.createElement('div');
      slotCard.className = 'audio-slot-card';

      const currentVal = state.userAnswers[q.id][slot.slotId] || '';

      slotCard.innerHTML = `
        <div class="audio-slot-text"><strong>Ratschlag ${sIdx + 1}:</strong> „${slot.text}“</div>
        <div class="audio-slot-select-row">
          <label class="audio-slot-label">Passende Aussage von Barbara:</label>
          <select class="audio-slot-select" data-slot="${slot.slotId}">
            <option value="" disabled ${!currentVal ? 'selected' : ''}>— Bitte Hörtext wählen —</option>
            ${q.audioCards.map(c => `<option value="${c.id}" ${currentVal === c.id ? 'selected' : ''}>${c.label}</option>`).join('')}
          </select>
        </div>
      `;

      slotCard.querySelector('.audio-slot-select').addEventListener('change', (e) => {
        state.userAnswers[q.id][slot.slotId] = e.target.value;
        updateDrawerNodeStatus();
      });

      slotsDiv.appendChild(slotCard);
    });

    container.appendChild(slotsDiv);
    elements.qInteractiveArea.appendChild(container);
  }

  /* ==========================================================================
     Navigation Controls
     ========================================================================== */
  function initNavigation() {
    elements.btnPrevQuestion.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        goToQuestion(state.currentIndex - 1);
      }
    });

    elements.btnNextQuestion.addEventListener('click', () => {
      const isLast = (state.currentIndex === TEST_DATA.questions.length - 1);
      if (isLast) {
        promptConfirmFinish();
      } else {
        goToQuestion(state.currentIndex + 1);
      }
    });

    elements.btnFlagQuestion.addEventListener('click', () => {
      const currentQId = TEST_DATA.questions[state.currentIndex].id;
      if (state.flaggedQuestions.has(currentQId)) {
        state.flaggedQuestions.delete(currentQId);
        elements.btnFlagQuestion.classList.remove('active');
      } else {
        state.flaggedQuestions.add(currentQId);
        elements.btnFlagQuestion.classList.add('active');
      }
      updateDrawerNodeStatus();
    });

    elements.btnQuestionHelp.addEventListener('click', () => {
      const q = TEST_DATA.questions[state.currentIndex];
      elements.modalHelpBody.innerHTML = `
        <p><strong>Aufgabe ${q.id} (${q.category}):</strong></p>
        <p>${q.help || 'Lesen bzw. hören Sie die Aufgabe aufmerksam durch und tragen Sie die richtige Lösung ein.'}</p>
      `;
      elements.modalHelp.style.display = 'flex';
    });

    elements.btnQuellen.addEventListener('click', () => {
      elements.quellenTextDisplay.textContent = TEST_DATA.quellen;
      elements.modalQuellen.style.display = 'flex';
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.closeModal;
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
      });
    });

    elements.btnConfirmSubmitFinal.addEventListener('click', () => {
      elements.modalConfirmSubmit.style.display = 'none';
      showResultsView();
    });

    // Keyboard Shortcuts (Arrow Left/Right, 1-4 for options)
    window.addEventListener('keydown', (e) => {
      if (elements.viewTest.style.display !== 'block') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        elements.btnNextQuestion.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        elements.btnPrevQuestion.click();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const q = TEST_DATA.questions[state.currentIndex];
        if (q.type === 'single-choice') {
          const num = parseInt(e.key, 10) - 1;
          const cards = elements.qInteractiveArea.querySelectorAll('.choice-option-card');
          if (cards[num]) cards[num].click();
        }
      }
    });
  }

  function promptConfirmFinish() {
    const unanswered = [];
    TEST_DATA.questions.forEach((q) => {
      const ans = state.userAnswers[q.id];
      if (!checkAnswerComplete(q, ans)) {
        unanswered.push(q.id);
      }
    });

    if (unanswered.length > 0) {
      elements.unansweredWarningBox.style.display = 'flex';
      elements.unansweredCount.textContent = unanswered.length;
      elements.unansweredChips.innerHTML = unanswered.map(id => `<span class="unanswered-chip" onclick="window.jumpToQuestion(${id - 1})">Frage ${id}</span>`).join('');
    } else {
      elements.unansweredWarningBox.style.display = 'none';
    }

    elements.modalConfirmSubmit.style.display = 'flex';
  }

  window.jumpToQuestion = function (idx) {
    elements.modalConfirmSubmit.style.display = 'none';
    goToQuestion(idx);
  };

  /* ==========================================================================
     Grading & Evaluation Engine
     ========================================================================== */
  function evaluateTest() {
    let correctCount = 0;
    const reviewDetails = [];

    TEST_DATA.questions.forEach((q) => {
      const userAns = state.userAnswers[q.id];
      let isCorrect = false;
      let userDisplayAnswer = '';
      let correctDisplayAnswer = '';

      if (q.type === 'single-choice') {
        isCorrect = (userAns === q.correctAnswer);
        const opt = q.options.find(o => o.id === userAns);
        userDisplayAnswer = opt ? opt.text : '(Nicht beantwortet)';
        correctDisplayAnswer = q.correctAnswerText || '';
      }
      else if (q.type === 'multiple-choice') {
        const uArr = Array.isArray(userAns) ? [...userAns].sort() : [];
        const cArr = [...q.correctAnswers].sort();
        isCorrect = (uArr.length === cArr.length && uArr.every((v, i) => v === cArr[i]));

        const uTexts = uArr.map(id => {
          const found = q.options.find(o => o.id === id);
          return found ? found.text : id;
        });
        userDisplayAnswer = uTexts.length ? uTexts.join(' &bull; ') : '(Keine Auswahl)';
        correctDisplayAnswer = (q.correctAnswersText || []).join(' &bull; ');
      }
      else if (q.type === 'grouped-choice') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        q.groups.forEach(g => {
          const selected = uObj[g.responseId];
          const found = g.options.find(o => o.id === selected);
          uList.push(`<strong>${g.title}:</strong> ${found ? found.text : '(offen)'}`);
          cList.push(`<strong>${g.title}:</strong> ${g.correctAnswerText}`);
          if (selected !== g.correctAnswer) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join('<br>');
        correctDisplayAnswer = cList.join('<br>');
      }
      else if (q.type === 'inline-dropdown') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        Object.keys(q.dropdowns).forEach((rId, idx) => {
          const drop = q.dropdowns[rId];
          const selected = uObj[rId];
          const found = drop.options.find(o => o.id === selected);
          uList.push(`Lücke ${idx + 1}: <strong>${found ? found.text : '(offen)'}</strong>`);
          cList.push(`Lücke ${idx + 1}: <strong>${drop.correctText}</strong>`);
          if (selected !== drop.correct) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join('<br>');
        correctDisplayAnswer = cList.join('<br>');
      }
      else if (q.type === 'text-gap') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        Object.keys(q.gaps).forEach((rId, idx) => {
          const gap = q.gaps[rId];
          const rawVal = (uObj[rId] || '').trim();
          const normVal = rawVal.toLowerCase().replace(/[\s\.\:\-\_]/g, '');
          const normExpected = gap.validAnswers.map(e => e.toLowerCase().replace(/[\s\.\:\-\_]/g, ''));

          if (!normExpected.includes(normVal) || normVal === '') {
            allRight = false;
          }
          uList.push(`Feld ${idx + 1}: <strong>${rawVal || '(leer)'}</strong>`);
          cList.push(`Feld ${idx + 1}: <strong>${gap.expected}</strong>`);
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join('<br>');
        correctDisplayAnswer = cList.join('<br>');
      }
      else if (q.type === 'dialogue-order') {
        const uOrder = userAns || [];
        isCorrect = (uOrder.length === q.correctOrder.length && uOrder.every((id, i) => id === q.correctOrder[i]));

        const itemsMap = {
          "SC1": "Guten Tag. Ich möchte zu Barbara Lange, aber ich weiß nicht wo sie liegt.",
          "SC3": "Im Zimmer 11.05. Sie ist gestern umgezogen.",
          "SC5": "Alles klar, 11.05. Und wie komme ich da hin?",
          "SC7": "Sie müssen den Gang bis ganz nach hinten gehen. Dann gehen Sie durch die Glastür...",
          "SC9": "Ja, das wäre sehr nett. Aber nur eine kleine. Danke."
        };

        userDisplayAnswer = uOrder.map((id, i) => `${i + 1}. ${itemsMap[id] || id}`).join('<br>');
        correctDisplayAnswer = q.correctOrderTexts.join('<br>');
      }
      else if (q.type === 'audio-gap-match') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        const cardMap = {};
        q.audioCards.forEach(c => { cardMap[c.id] = c.label; });

        q.slots.forEach((slot, idx) => {
          const placedAudioId = uObj[slot.slotId];
          uList.push(`Ratschlag ${idx + 1}: <strong>${cardMap[placedAudioId] || '(nicht zugeordnet)'}</strong>`);
          cList.push(`Ratschlag ${idx + 1}: <strong>${slot.correctAudioLabel}</strong>`);
          if (placedAudioId !== slot.correctAudioId) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join('<br>');
        correctDisplayAnswer = cList.join('<br>');
      }

      if (isCorrect) correctCount++;

      reviewDetails.push({
        questionNumber: q.id,
        category: q.category,
        rubric: q.rubricHtml,
        image: q.images && q.images.length ? q.images[0] : null,
        audio: q.audio,
        isCorrect: isCorrect,
        userAnswer: userDisplayAnswer,
        correctAnswer: correctDisplayAnswer
      });
    });

    const totalQuestions = TEST_DATA.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const timeTakenMin = Math.max(1, Math.round(state.totalSeconds / 60));

    // Find Level Band in Cornelsen B1 evaluation scale
    let band = TEST_DATA.evaluationScale.find(b => percentage >= b.min && percentage <= b.max);
    if (!band) band = TEST_DATA.evaluationScale[TEST_DATA.evaluationScale.length - 1];

    state.results = {
      correctCount,
      totalQuestions,
      percentage,
      timeTakenMin,
      band,
      reviewDetails
    };

    return state.results;
  }

  /* ==========================================================================
     Display Results & Certificate
     ========================================================================== */
  function showResultsView() {
    clearInterval(state.timerInterval);
    elements.globalAudioPlayer.pause();
    updatePlayBtnState(false);

    const res = evaluateTest();

    // Switch view
    elements.viewTest.style.display = 'none';
    elements.viewTest.classList.remove('active');

    elements.viewResult.style.display = 'block';
    elements.viewResult.classList.add('active');

    elements.headerTestInfo.style.display = 'none';
    elements.btnToggleDrawer.style.display = 'none';

    // Populate Certificate Metadata
    const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    elements.certDateDisplay.textContent = today;
    elements.certDateInline.textContent = today;

    const fullName = `${state.userName.vorname} ${state.userName.nachname}`.trim();
    elements.certUserName.textContent = fullName;
    elements.certScoreDisplay.textContent = `${res.percentage} %`;

    // Radial Gauge Animation
    elements.radialScoreNumber.textContent = res.percentage;
    const circumference = 326.7;
    const offset = circumference - (res.percentage / 100) * circumference;
    setTimeout(() => {
      elements.radialScoreBar.style.strokeDashoffset = offset;
    }, 150);

    // Metrics
    elements.metricCorrectAnswers.textContent = `${res.correctCount} / ${res.totalQuestions}`;
    elements.metricTimeTaken.textContent = `${res.timeTakenMin} min.`;
    elements.metricLevelBadge.textContent = res.band.level;

    // Recommendation card
    elements.recHeadline.textContent = `Empfehlung: ${res.band.level}`;
    elements.recDescription.textContent = res.band.description;

    // Highlight row in official interpretation table
    document.querySelectorAll('.cert-table tbody tr').forEach(row => row.classList.remove('active-band'));
    if (res.percentage >= 90) document.getElementById('rowBand1').classList.add('active-band');
    else if (res.percentage >= 70) document.getElementById('rowBand2').classList.add('active-band');
    else if (res.percentage >= 60) document.getElementById('rowBand3').classList.add('active-band');
    else if (res.percentage >= 30) document.getElementById('rowBand4').classList.add('active-band');
    else document.getElementById('rowBand5').classList.add('active-band');

    // Populate Detailed Review List
    renderReviewList('all');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderReviewList(filter) {
    const list = elements.reviewList;
    list.innerHTML = '';

    const details = state.results.reviewDetails;
    const filtered = details.filter(item => {
      if (filter === 'correct') return item.isCorrect;
      if (filter === 'incorrect') return !item.isCorrect;
      return true;
    });

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `review-item-card ${item.isCorrect ? 'correct' : 'incorrect'}`;

      card.innerHTML = `
        <div class="review-item-header">
          <div class="review-item-badges">
            <span class="review-q-num">Frage ${item.questionNumber}</span>
            <span class="review-q-category">${item.category}</span>
          </div>
          <span class="review-status-pill ${item.isCorrect ? 'pill-success' : 'pill-danger'}">
            ${item.isCorrect ? '✓ Richtig' : '✗ Falsch'}
          </span>
        </div>

        <div class="review-rubric-box">${item.rubric}</div>

        <div class="review-answers-grid">
          <div class="review-answer-col ${item.isCorrect ? 'ans-success' : 'ans-danger'}">
            <span class="answer-col-label">Ihre Antwort:</span>
            <div class="answer-col-val">${item.userAnswer}</div>
          </div>
          <div class="review-answer-col ans-expected">
            <span class="answer-col-label">Richtige Lösung:</span>
            <div class="answer-col-val">${item.correctAnswer}</div>
          </div>
        </div>
      `;

      list.appendChild(card);
    });
  }

  function initReviewFilters() {
    document.querySelectorAll('.review-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.review-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderReviewList(btn.dataset.filter);
      });
    });
  }

  function initCertificateActions() {
    elements.btnPrintCert.addEventListener('click', () => {
      window.print();
    });

    elements.btnToggleReview.addEventListener('click', () => {
      const isHidden = (elements.reviewSection.style.display === 'none');
      elements.reviewSection.style.display = isHidden ? 'block' : 'none';
      elements.btnToggleReview.querySelector('span').textContent = isHidden ? 
        'Aufgabenübersicht verbergen' : 'Antworten überprüfen';
      if (isHidden) {
        elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    elements.btnRetakeTest.addEventListener('click', () => {
      if (confirm('Möchten Sie den Test wirklich neu starten? Ihre bisherigen Eingaben werden zurückgesetzt.')) {
        state.currentIndex = 0;
        state.userAnswers = {};
        state.flaggedQuestions.clear();
        state.results = null;

        elements.viewResult.style.display = 'none';
        elements.viewResult.classList.remove('active');

        elements.viewWelcome.style.display = 'block';
        elements.viewWelcome.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

})();
