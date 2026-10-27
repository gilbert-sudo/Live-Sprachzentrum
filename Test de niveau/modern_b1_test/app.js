/**
 * Cornelsen DaF Einstufungstest Niveau A2 — Modern Application Controller
 * Handles application lifecycle, question rendering, audio player,
 * state persistence, CEFR evaluation, review mode, and certificate generation.
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
    selectedAssociateLeft: null,  // For Q16 associate interaction
    selectedGapToken: null,       // For Q14 gap match interaction
    results: null
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
    btnPrintCert: document.getElementById('btnPrintCert'),
    btnToggleReview: document.getElementById('btnToggleReview'),
    toggleReviewText: document.getElementById('toggleReviewText'),
    btnRestartTest: document.getElementById('btnRestartTest'),
    reviewSection: document.getElementById('reviewSection'),
    reviewList: document.getElementById('reviewList'),

    // Modals
    modalConfirmSubmit: document.getElementById('modalConfirmSubmit'),
    unansweredWarningBox: document.getElementById('unansweredWarningBox'),
    unansweredCount: document.getElementById('unansweredCount'),
    unansweredChips: document.getElementById('unansweredChips'),
    btnConfirmSubmitFinal: document.getElementById('btnConfirmSubmitFinal'),
    modalHelp: document.getElementById('modalHelp'),
    modalHelpBody: document.getElementById('modalHelpBody'),
    modalQuellen: document.getElementById('modalQuellen'),
    quellenTextDisplay: document.getElementById('quellenTextDisplay'),
    imageLightbox: document.getElementById('imageLightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    btnCloseLightbox: document.getElementById('btnCloseLightbox')
  };

  /* ==========================================================================
     Theme Management (Light / Dark)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('daf_a2_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('daf_a2_theme', newTheme);
  }

  /* ==========================================================================
     Timer Functions
     ========================================================================== */
  function startTimer() {
    state.startTime = Date.now();
    state.timerInterval = setInterval(() => {
      state.totalSeconds = Math.floor((Date.now() - state.startTime) / 1000);
      const mins = Math.floor(state.totalSeconds / 60);
      const secs = state.totalSeconds % 60;
      elements.timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  /* ==========================================================================
     Audio Player Management
     ========================================================================== */
  function initAudioControls() {
    const audio = elements.globalAudioPlayer;

    elements.audioPlayBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(e => console.log('Playback error:', e));
      } else {
        audio.pause();
      }
    });

    elements.audioRestartBtn.addEventListener('click', () => {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Playback error:', e));
    });

    audio.addEventListener('play', () => {
      elements.audioPlayBtn.querySelector('.play-svg').style.display = 'none';
      elements.audioPlayBtn.querySelector('.pause-svg').style.display = 'block';
    });

    audio.addEventListener('pause', () => {
      elements.audioPlayBtn.querySelector('.play-svg').style.display = 'block';
      elements.audioPlayBtn.querySelector('.pause-svg').style.display = 'none';
    });

    audio.addEventListener('timeupdate', () => {
      if (!isNaN(audio.duration)) {
        const pct = (audio.currentTime / audio.duration) * 100;
        elements.audioProgressSlider.value = pct;
        elements.audioCurrentTime.textContent = formatTime(audio.currentTime);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      elements.audioDuration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
      elements.audioPlayBtn.querySelector('.play-svg').style.display = 'block';
      elements.audioPlayBtn.querySelector('.pause-svg').style.display = 'none';
      elements.audioProgressSlider.value = 0;
    });

    elements.audioProgressSlider.addEventListener('input', (e) => {
      if (!isNaN(audio.duration)) {
        const targetTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = targetTime;
      }
    });

    // Speed Selector Buttons
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        audio.playbackRate = parseFloat(btn.dataset.speed);
      });
    });

    // Sound Check on Welcome Screen
    elements.btnSoundCheck.addEventListener('click', () => {
      const sc = elements.soundCheckAudio;
      if (sc.paused) {
        sc.currentTime = 0;
        sc.play().then(() => {
          elements.btnSoundCheck.innerHTML = `<span>Läuft... (Klicken zum Stoppen)</span>`;
        }).catch(err => {
          console.log('Audio test error:', err);
          alert('Bitte erlauben Sie die Audiowiedergabe in Ihrem Browser.');
        });
      } else {
        sc.pause();
        elements.btnSoundCheck.innerHTML = `<span>Hörprobe abspielen</span>`;
      }
    });

    elements.soundCheckAudio.addEventListener('ended', () => {
      elements.btnSoundCheck.innerHTML = `<span>Hörprobe abspielen</span>`;
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function loadAudioForQuestion(audioSrc) {
    const audio = elements.globalAudioPlayer;
    if (audioSrc) {
      elements.qAudioContainer.style.display = 'block';
      audio.src = audioSrc;
      audio.playbackRate = 1.0;
      elements.audioProgressSlider.value = 0;
      elements.audioCurrentTime.textContent = '0:00';
      elements.audioDuration.textContent = '0:00';
      elements.audioPlayBtn.querySelector('.play-svg').style.display = 'block';
      elements.audioPlayBtn.querySelector('.pause-svg').style.display = 'none';
      document.querySelectorAll('.speed-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.speed === '1.0');
      });
      elements.audioTrackName.textContent = audioSrc.split('/').pop();
    } else {
      elements.qAudioContainer.style.display = 'none';
      audio.pause();
      audio.removeAttribute('src');
    }
  }

  /* ==========================================================================
     Question Drawer & Matrix (1 to 29)
     ========================================================================== */
  function initDrawer() {
    elements.drawerGrid.innerHTML = '';
    TEST_DATA.questions.forEach((q, idx) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'drawer-node';
      node.id = `drawerNode-${q.id}`;
      node.dataset.index = idx;

      node.innerHTML = `
        <span class="node-number">${q.id}</span>
        <span class="node-indicator"></span>
      `;

      node.addEventListener('click', () => {
        closeDrawer();
        goToQuestion(idx);
      });

      elements.drawerGrid.appendChild(node);
    });

    elements.btnToggleDrawer.addEventListener('click', toggleDrawer);
    elements.btnCloseDrawer.addEventListener('click', closeDrawer);
    elements.drawerBackdrop.addEventListener('click', closeDrawer);
    elements.btnMatrixQuick.addEventListener('click', toggleDrawer);
  }

  function toggleDrawer() {
    elements.questionDrawer.classList.toggle('open');
    elements.drawerBackdrop.classList.toggle('visible');
  }

  function closeDrawer() {
    elements.questionDrawer.classList.remove('open');
    elements.drawerBackdrop.classList.remove('visible');
  }

  function updateDrawerNodeStatus() {
    TEST_DATA.questions.forEach((q, idx) => {
      const node = document.getElementById(`drawerNode-${q.id}`);
      if (!node) return;

      node.classList.remove('current', 'answered', 'flagged', 'empty');

      if (idx === state.currentIndex) {
        node.classList.add('current');
      }

      if (state.flaggedQuestions.has(q.id)) {
        node.classList.add('flagged');
      }

      const ans = state.userAnswers[q.id];
      const isAnswered = checkAnswerComplete(q, ans);

      if (isAnswered) {
        node.classList.add('answered');
      } else {
        node.classList.add('empty');
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
      return q.groups.every(g => typeof ans[g.responseId] === 'string' && ans[g.responseId].length > 0);
    }
    if (q.type === 'inline-dropdown') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.dropdowns).every(k => typeof ans[k] === 'string' && ans[k].length > 0);
    }
    if (q.type === 'text-gap') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.gaps).every(k => typeof ans[k] === 'string' && ans[k].trim().length > 0);
    }
    if (q.type === 'order-sequence') {
      return Array.isArray(ans) && ans.length === q.items.length;
    }
    if (q.type === 'gap-match') {
      if (typeof ans !== 'object') return false;
      return q.slots.every(s => typeof ans[s.slotId] === 'string' && ans[s.slotId].length > 0);
    }
    if (q.type === 'associate-pairs') {
      if (typeof ans !== 'object') return false;
      return q.leftItems.every(item => typeof ans[item.id] === 'string' && ans[item.id].length > 0);
    }
    return false;
  }

  /* ==========================================================================
     Lightbox Image Modal
     ========================================================================== */
  function initLightbox() {
    elements.btnCloseLightbox.addEventListener('click', () => {
      elements.imageLightbox.style.display = 'none';
    });
    elements.imageLightbox.addEventListener('click', (e) => {
      if (e.target === elements.imageLightbox) {
        elements.imageLightbox.style.display = 'none';
      }
    });
  }

  function openLightbox(imgSrc) {
    elements.lightboxImg.src = imgSrc;
    elements.imageLightbox.style.display = 'flex';
  }

  /* ==========================================================================
     Start Test & Transitions
     ========================================================================== */
  window.startTest = function () {
    const v = elements.inputVorname.value.trim();
    const n = elements.inputNachname.value.trim();
    state.userName.vorname = v || 'Lerner/in';
    state.userName.nachname = n || '';

    // Switch views
    elements.viewWelcome.classList.remove('active');
    elements.viewWelcome.style.display = 'none';

    elements.viewTest.classList.add('active');
    elements.viewTest.style.display = 'block';

    elements.headerTestInfo.style.display = 'flex';
    elements.btnToggleDrawer.style.display = 'inline-flex';

    startTimer();
    goToQuestion(0);
  };

  function goToQuestion(index) {
    if (index < 0 || index >= TEST_DATA.questions.length) return;

    // Pause audio when switching
    elements.globalAudioPlayer.pause();

    state.currentIndex = index;
    renderQuestion(index);
    updateDrawerNodeStatus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     Question Rendering Engine
     ========================================================================== */
  function renderQuestion(index) {
    const q = TEST_DATA.questions[index];
    const totalQ = TEST_DATA.totalQuestions;

    // 1. Header Information
    elements.questionCounterText.textContent = `Frage ${q.id} von ${totalQ}`;
    elements.navQuestionText.textContent = `Frage ${q.id} von ${totalQ}`;
    elements.qBadgeNumber.textContent = `Frage ${q.id}`;
    elements.qBadgeCategory.textContent = q.category;

    // Progress Bar Fill
    const pct = ((index + 1) / totalQ) * 100;
    elements.progressBarFill.style.width = `${pct}%`;

    // Flag button state
    elements.btnFlagQuestion.classList.toggle('active', state.flaggedQuestions.has(q.id));

    // Next button label
    elements.btnNextText.textContent = (index === totalQ - 1) ? 'Test abgeben' : 'Weiter';
    elements.btnPrevQuestion.disabled = (index === 0);

    // 2. Instructions / Rubric
    elements.qRubric.innerHTML = q.rubricHtml || '';

    // 3. Audio Component
    loadAudioForQuestion(q.audio);

    // 4. Images Component
    renderQuestionImages(q.images);

    // 5. Interactive Tasks
    elements.qInteractiveArea.innerHTML = '';
    state.selectedAssociateLeft = null;
    state.selectedGapToken = null;

    switch (q.type) {
      case 'single-choice':
        renderSingleChoiceTask(q);
        elements.taskHintChip.textContent = 'Wählen Sie eine Antwortoption';
        break;
      case 'multiple-choice':
        renderMultipleChoiceTask(q);
        elements.taskHintChip.textContent = `Wählen Sie ${q.maxSelect || 2} Möglichkeiten aus`;
        break;
      case 'grouped-choice':
        renderGroupedChoiceTask(q);
        elements.taskHintChip.textContent = 'Beantworten Sie alle Teilfragen';
        break;
      case 'inline-dropdown':
        renderInlineDropdownTask(q);
        elements.taskHintChip.textContent = 'Wählen Sie die passenden Wörter im Dialog';
        break;
      case 'text-gap':
        renderTextGapTask(q);
        elements.taskHintChip.textContent = 'Geben Sie die passenden Angaben in die Lücken ein';
        break;
      case 'order-sequence':
        renderOrderSequenceTask(q);
        elements.taskHintChip.textContent = 'Bringen Sie die Sätze in die richtige Reihenfolge';
        break;
      case 'gap-match':
        renderGapMatchTask(q);
        elements.taskHintChip.textContent = 'Klicken Sie auf eine Kategorie und ordnen Sie sie zu';
        break;
      case 'associate-pairs':
        renderAssociatePairsTask(q);
        elements.taskHintChip.textContent = 'Klicken Sie auf Frage links und passende Antwort rechts';
        break;
      default:
        elements.qInteractiveArea.innerHTML = `<p class="alert-box">Unbekannter Aufgabentyp.</p>`;
    }
  }

  function renderQuestionImages(images) {
    elements.qImagesContainer.innerHTML = '';
    if (!images || images.length === 0) {
      elements.qImagesContainer.style.display = 'none';
      return;
    }
    elements.qImagesContainer.style.display = 'flex';

    images.forEach(imgSrc => {
      const wrap = document.createElement('div');
      wrap.className = 'question-img-card img-card';

      wrap.innerHTML = `
        <img src="${imgSrc}" alt="Aufgabenabbildung" loading="lazy">
        <div class="img-zoom-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>Klicken für Großansicht</span>
        </div>
      `;

      wrap.addEventListener('click', () => openLightbox(imgSrc));
      elements.qImagesContainer.appendChild(wrap);
    });
  }

  /* ==========================================================================
     Task Renderers for All 8 Types
     ========================================================================== */

  /* 1. Single Choice */
  function renderSingleChoiceTask(q) {
    const qId = q.id;
    const currentVal = state.userAnswers[qId] || null;

    if (q.promptHtml) {
      const p = document.createElement('div');
      p.className = 'task-prompt-lead';
      p.innerHTML = q.promptHtml;
      elements.qInteractiveArea.appendChild(p);
    }

    const list = document.createElement('div');
    list.className = 'choice-options-list';

    q.options.forEach((opt, idx) => {
      const isSelected = (currentVal === opt.id);
      const card = document.createElement('div');
      card.className = `choice-option-card ${isSelected ? 'selected' : ''}`;
      card.dataset.id = opt.id;

      card.innerHTML = `
        <div class="choice-indicator"></div>
        <span class="choice-text">${opt.text}</span>
        <span class="choice-key-hint">${idx + 1}</span>
      `;

      card.addEventListener('click', () => {
        list.querySelectorAll('.choice-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.userAnswers[qId] = opt.id;
        updateDrawerNodeStatus();
      });

      list.appendChild(card);
    });

    elements.qInteractiveArea.appendChild(list);
  }

  /* 2. Multiple Choice (Checkboxes, e.g. Q10) */
  function renderMultipleChoiceTask(q) {
    const qId = q.id;
    if (!Array.isArray(state.userAnswers[qId])) {
      state.userAnswers[qId] = [];
    }
    const currentVals = new Set(state.userAnswers[qId]);
    const maxAllowed = q.maxSelect || 2;

    const counterBox = document.createElement('div');
    counterBox.className = 'multichoice-counter';
    function updateCounter() {
      const selectedCount = state.userAnswers[qId].length;
      counterBox.innerHTML = `<strong>${selectedCount} von ${maxAllowed}</strong> ausgewählt`;
    }
    updateCounter();
    elements.qInteractiveArea.appendChild(counterBox);

    const list = document.createElement('div');
    list.className = 'choice-options-list';

    q.options.forEach((opt) => {
      const isChecked = currentVals.has(opt.id);
      const card = document.createElement('div');
      card.className = `choice-option-card ${isChecked ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="choice-indicator-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="choice-text">${opt.text}</span>
      `;

      card.addEventListener('click', () => {
        const arr = state.userAnswers[qId];
        const idx = arr.indexOf(opt.id);

        if (idx > -1) {
          arr.splice(idx, 1);
          card.classList.remove('selected');
        } else {
          if (arr.length >= maxAllowed) {
            const first = arr.shift();
            const firstCard = list.querySelector(`[data-id="${first}"]`);
            if (firstCard) firstCard.classList.remove('selected');
          }
          arr.push(opt.id);
          card.classList.add('selected');
        }
        updateCounter();
        updateDrawerNodeStatus();
      });

      card.dataset.id = opt.id;
      list.appendChild(card);
    });

    elements.qInteractiveArea.appendChild(list);
  }

  /* 3. Grouped Choice (e.g. Q5, Q19, Q21) */
  function renderGroupedChoiceTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId] || typeof state.userAnswers[qId] !== 'object') {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'grouped-choice-container';

    let htmlContent = q.templateHtml || '';

    q.groups.forEach((group) => {
      const rId = group.responseId;
      const currentVal = state.userAnswers[qId][rId] || '';

      let groupHtml = `<div class="sub-choice-group" data-response-id="${rId}">`;
      group.options.forEach((opt, oIdx) => {
        const isSel = (currentVal === opt.id);
        groupHtml += `
          <div class="choice-option-card choice-card-sm ${isSel ? 'selected' : ''}" data-opt-id="${opt.id}">
            <div class="choice-indicator"></div>
            <span class="choice-text">${opt.text}</span>
          </div>
        `;
      });
      groupHtml += `</div>`;

      htmlContent = htmlContent.replace(`[[CHOICE_GROUP:${rId}]]`, groupHtml);
    });

    container.innerHTML = htmlContent;

    // Attach listeners
    container.querySelectorAll('.sub-choice-group').forEach(groupEl => {
      const rId = groupEl.dataset.responseId;
      groupEl.querySelectorAll('.choice-option-card').forEach(card => {
        card.addEventListener('click', () => {
          groupEl.querySelectorAll('.choice-option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          state.userAnswers[qId][rId] = card.dataset.optId;
          updateDrawerNodeStatus();
        });
      });
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* 4. Inline Dropdowns (e.g. Q3, Q8, Q13, Q26, Q28) */
  function renderInlineDropdownTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId] || typeof state.userAnswers[qId] !== 'object') {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'inline-cloze-box';

    let htmlContent = q.templateHtml;

    Object.keys(q.dropdowns).forEach((rId) => {
      const drop = q.dropdowns[rId];
      const currentVal = state.userAnswers[qId][rId] || '';

      let selHtml = `
        <span class="inline-select-wrapper">
          <select class="inline-select" data-response-id="${rId}">
            <option value="" disabled ${!currentVal ? 'selected' : ''}>--- Bitte wählen ---</option>
      `;

      drop.options.forEach((opt) => {
        const isSel = (currentVal === opt.id);
        selHtml += `<option value="${opt.id}" ${isSel ? 'selected' : ''}>${opt.text}</option>`;
      });

      selHtml += `
          </select>
        </span>
      `;

      htmlContent = htmlContent.replace(`[[SELECT:${rId}]]`, selHtml);
    });

    container.innerHTML = htmlContent;

    container.querySelectorAll('.inline-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const rId = e.target.dataset.responseId;
        state.userAnswers[qId][rId] = e.target.value;
        sel.classList.toggle('filled', !!e.target.value);
        updateDrawerNodeStatus();
      });
      if (sel.value) sel.classList.add('filled');
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* 5. Text Gaps (e.g. Q6, Q7, Q9, Q12, Q20, Q24, Q29) */
  function renderTextGapTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId] || typeof state.userAnswers[qId] !== 'object') {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'text-gap-box';

    let htmlContent = q.templateHtml;

    Object.keys(q.gaps).forEach((rId) => {
      const currentVal = state.userAnswers[qId][rId] || '';
      const inputHtml = `
        <span class="gap-input-wrapper">
          <input type="text" class="gap-input" data-response-id="${rId}" value="${escapeHtml(currentVal)}" placeholder="..." autocomplete="off" spellcheck="false">
        </span>
      `;
      htmlContent = htmlContent.replace(`[[INPUT:${rId}]]`, inputHtml);
    });

    container.innerHTML = htmlContent;

    container.querySelectorAll('.gap-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const rId = e.target.dataset.responseId;
        state.userAnswers[qId][rId] = e.target.value;
        inp.classList.toggle('filled', e.target.value.trim().length > 0);
        updateDrawerNodeStatus();
      });
      if (inp.value.trim().length > 0) inp.classList.add('filled');
    });

    elements.qInteractiveArea.appendChild(container);
  }

  /* 6. Order Sequence (e.g. Q4) */
  function renderOrderSequenceTask(q) {
    const qId = q.id;
    if (!Array.isArray(state.userAnswers[qId]) || state.userAnswers[qId].length !== q.items.length) {
      // Default initial order
      state.userAnswers[qId] = q.items.map(it => it.id);
    }

    const currentOrderIds = state.userAnswers[qId];
    const itemsMap = {};
    q.items.forEach(it => { itemsMap[it.id] = it.text; });

    const list = document.createElement('div');
    list.className = 'order-sequence-list';

    function renderOrderItems() {
      list.innerHTML = '';
      currentOrderIds.forEach((id, idx) => {
        const card = document.createElement('div');
        card.className = 'order-item-card';
        card.draggable = true;
        card.dataset.index = idx;
        card.dataset.id = id;

        card.innerHTML = `
          <div class="order-drag-handle" title="Ziehen zum Verschieben">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="6" r="1"></circle>
              <circle cx="15" cy="6" r="1"></circle>
              <circle cx="9" cy="12" r="1"></circle>
              <circle cx="15" cy="12" r="1"></circle>
              <circle cx="9" cy="18" r="1"></circle>
              <circle cx="15" cy="18" r="1"></circle>
            </svg>
          </div>
          <span class="order-item-index">${idx + 1}</span>
          <span class="order-item-text">${itemsMap[id]}</span>
          <div class="order-item-actions">
            <button type="button" class="order-step-btn btn-step-up" title="Nach oben" ${idx === 0 ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button type="button" class="order-step-btn btn-step-down" title="Nach unten" ${idx === currentOrderIds.length - 1 ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        `;

        card.querySelector('.btn-step-up').addEventListener('click', (e) => {
          e.stopPropagation();
          if (idx > 0) {
            const temp = currentOrderIds[idx];
            currentOrderIds[idx] = currentOrderIds[idx - 1];
            currentOrderIds[idx - 1] = temp;
            renderOrderItems();
            updateDrawerNodeStatus();
          }
        });

        card.querySelector('.btn-step-down').addEventListener('click', (e) => {
          e.stopPropagation();
          if (idx < currentOrderIds.length - 1) {
            const temp = currentOrderIds[idx];
            currentOrderIds[idx] = currentOrderIds[idx + 1];
            currentOrderIds[idx + 1] = temp;
            renderOrderItems();
            updateDrawerNodeStatus();
          }
        });

        // HTML5 Drag and Drop
        card.addEventListener('dragstart', (e) => {
          card.classList.add('dragging');
          e.dataTransfer.setData('text/plain', idx);
        });

        card.addEventListener('dragend', () => {
          card.classList.remove('dragging');
        });

        card.addEventListener('dragover', (e) => {
          e.preventDefault();
        });

        card.addEventListener('drop', (e) => {
          e.preventDefault();
          const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
          const toIdx = idx;
          if (fromIdx !== toIdx) {
            const movedId = currentOrderIds.splice(fromIdx, 1)[0];
            currentOrderIds.splice(toIdx, 0, movedId);
            renderOrderItems();
            updateDrawerNodeStatus();
          }
        });

        list.appendChild(card);
      });
    }

    renderOrderItems();
    elements.qInteractiveArea.appendChild(list);
  }

  /* 7. Gap Match (Category Chips to Table Slots, e.g. Q14) */
  function renderGapMatchTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId] || typeof state.userAnswers[qId] !== 'object') {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'gap-match-container';

    // 1. Tokens pool
    const poolBox = document.createElement('div');
    poolBox.className = 'gap-tokens-pool';
    poolBox.innerHTML = `<div class="gap-tokens-label">Verfügbare Kategorien (Klicken zum Auswählen):</div>`;

    const tokenMap = {};
    q.tokens.forEach(tok => { tokenMap[tok.id] = tok.text; });

    function isTokenPlaced(tokId) {
      return Object.values(state.userAnswers[qId]).includes(tokId);
    }

    function renderTokensPool() {
      // Clear token buttons (keep label)
      poolBox.querySelectorAll('.gap-token-chip').forEach(c => c.remove());

      q.tokens.forEach(tok => {
        const placed = isTokenPlaced(tok.id);
        const isSelected = (state.selectedGapToken === tok.id);
        const chip = document.createElement('div');
        chip.className = `gap-token-chip ${placed ? 'placed' : ''} ${isSelected ? 'selected' : ''}`;
        chip.dataset.tokenId = tok.id;
        chip.innerHTML = `<span>${tok.text}</span>`;

        if (!placed) {
          chip.addEventListener('click', () => {
            if (state.selectedGapToken === tok.id) {
              state.selectedGapToken = null;
            } else {
              state.selectedGapToken = tok.id;
            }
            renderTokensPool();
            renderTableSlots();
          });
        }

        poolBox.appendChild(chip);
      });
    }

    // 2. Table slots
    const table = document.createElement('table');
    table.className = 'gap-match-table';
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    function renderTableSlots() {
      tbody.innerHTML = '';
      q.slots.forEach(slot => {
        const tr = document.createElement('tr');
        tr.className = 'gap-match-row';

        const assignedTokenId = state.userAnswers[qId][slot.slotId];
        const isFilled = !!assignedTokenId;

        const tdSlot = document.createElement('td');
        tdSlot.className = 'gap-slot-cell';

        const targetBtn = document.createElement('div');
        targetBtn.className = `gap-slot-target ${isFilled ? 'filled' : ''} ${state.selectedGapToken ? 'highlight' : ''}`;

        if (isFilled) {
          targetBtn.innerHTML = `
            <span>${tokenMap[assignedTokenId] || assignedTokenId}</span>
            <button type="button" class="gap-slot-remove-btn" title="Kategorie entfernen">✕</button>
          `;
          targetBtn.querySelector('.gap-slot-remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            delete state.userAnswers[qId][slot.slotId];
            renderTokensPool();
            renderTableSlots();
            updateDrawerNodeStatus();
          });
        } else {
          targetBtn.innerHTML = `<span>${state.selectedGapToken ? 'Hier platzieren' : 'Offen'}</span>`;
          targetBtn.addEventListener('click', () => {
            if (state.selectedGapToken) {
              // Unset if token was placed elsewhere
              Object.keys(state.userAnswers[qId]).forEach(sid => {
                if (state.userAnswers[qId][sid] === state.selectedGapToken) {
                  delete state.userAnswers[qId][sid];
                }
              });
              state.userAnswers[qId][slot.slotId] = state.selectedGapToken;
              state.selectedGapToken = null;
              renderTokensPool();
              renderTableSlots();
              updateDrawerNodeStatus();
            }
          });
        }

        tdSlot.appendChild(targetBtn);

        const tdDesc = document.createElement('td');
        tdDesc.className = 'gap-desc-cell';
        tdDesc.innerHTML = `<p>${slot.description}</p>`;

        tr.appendChild(tdSlot);
        tr.appendChild(tdDesc);
        tbody.appendChild(tr);
      });
    }

    container.appendChild(poolBox);
    container.appendChild(table);

    renderTokensPool();
    renderTableSlots();

    elements.qInteractiveArea.appendChild(container);
  }

  /* 8. Associate Pairs (Dialogue Matching, e.g. Q16) */
  function renderAssociatePairsTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId] || typeof state.userAnswers[qId] !== 'object') {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'associate-pairs-container';

    // Status / Reset bar
    const statusBar = document.createElement('div');
    statusBar.className = 'associate-status-bar';

    function updateStatusBar() {
      const pairedCount = Object.keys(state.userAnswers[qId]).length;
      statusBar.innerHTML = `
        <span><strong>${pairedCount} von ${q.leftItems.length}</strong> Paaren verknüpft</span>
        <button type="button" class="associate-reset-btn" id="btnResetPairs">Verknüpfungen zurücksetzen</button>
      `;
      statusBar.querySelector('#btnResetPairs').addEventListener('click', () => {
        state.userAnswers[qId] = {};
        state.selectedAssociateLeft = null;
        renderPairGrid();
        updateDrawerNodeStatus();
      });
    }

    const grid = document.createElement('div');
    grid.className = 'associate-columns-grid';

    function renderPairGrid() {
      updateStatusBar();
      grid.innerHTML = '';

      // Left Column: Questions
      const colLeft = document.createElement('div');
      colLeft.className = 'associate-col';
      colLeft.innerHTML = `<div class="associate-col-title">Frage / Aussage (Spalte A):</div>`;

      q.leftItems.forEach((item, lIdx) => {
        const pairedRightId = state.userAnswers[qId][item.id];
        const isSelected = (state.selectedAssociateLeft === item.id);
        const card = document.createElement('div');
        card.className = `associate-card ${pairedRightId ? 'paired' : ''} ${isSelected ? 'active-select' : ''}`;

        // Find pairing index
        const pairNum = pairedRightId ? (Object.keys(state.userAnswers[qId]).indexOf(item.id) + 1) : null;

        card.innerHTML = `
          <span class="associate-card-text">${item.text}</span>
          ${pairedRightId ? `<span class="pair-badge">Paar #${pairNum} (✕)</span>` : ''}
        `;

        card.addEventListener('click', () => {
          if (pairedRightId) {
            // Click paired card to remove pairing
            delete state.userAnswers[qId][item.id];
            state.selectedAssociateLeft = null;
          } else {
            // Select as source
            state.selectedAssociateLeft = (state.selectedAssociateLeft === item.id) ? null : item.id;
          }
          renderPairGrid();
          updateDrawerNodeStatus();
        });

        colLeft.appendChild(card);
      });

      // Right Column: Answers
      const colRight = document.createElement('div');
      colRight.className = 'associate-col';
      colRight.innerHTML = `<div class="associate-col-title">Passende Antwort (Spalte B):</div>`;

      // Find which right items are paired
      const rightToLeftMap = {};
      Object.keys(state.userAnswers[qId]).forEach(lId => {
        rightToLeftMap[state.userAnswers[qId][lId]] = lId;
      });

      q.rightItems.forEach((item) => {
        const matchedLeftId = rightToLeftMap[item.id];
        const card = document.createElement('div');
        card.className = `associate-card ${matchedLeftId ? 'paired' : ''}`;

        const pairNum = matchedLeftId ? (Object.keys(state.userAnswers[qId]).indexOf(matchedLeftId) + 1) : null;

        card.innerHTML = `
          <span class="associate-card-text">${item.text}</span>
          ${matchedLeftId ? `<span class="pair-badge">Paar #${pairNum} (✕)</span>` : ''}
        `;

        card.addEventListener('click', () => {
          if (matchedLeftId) {
            delete state.userAnswers[qId][matchedLeftId];
            state.selectedAssociateLeft = null;
          } else if (state.selectedAssociateLeft) {
            state.userAnswers[qId][state.selectedAssociateLeft] = item.id;
            state.selectedAssociateLeft = null;
          }
          renderPairGrid();
          updateDrawerNodeStatus();
        });

        colRight.appendChild(card);
      });

      grid.appendChild(colLeft);
      grid.appendChild(colRight);
    }

    container.appendChild(statusBar);
    container.appendChild(grid);
    renderPairGrid();

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
        <p>${q.help || 'Lesen bzw. hören Sie die Aufgabe aufmerksam durch und wählen Sie die passende Lösung aus.'}</p>
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

    // Keyboard Shortcuts (Arrow Left/Right, 1-5 for single choice)
    window.addEventListener('keydown', (e) => {
      if (elements.viewTest.style.display !== 'block') return;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        elements.btnNextQuestion.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        elements.btnPrevQuestion.click();
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
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
          uList.push(found ? found.text : '(offen)');
          cList.push(g.correctAnswerText);
          if (selected !== g.correctAnswer) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join(' | ');
        correctDisplayAnswer = cList.join(' | ');
      }
      else if (q.type === 'inline-dropdown') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        Object.keys(q.dropdowns).forEach(rId => {
          const drop = q.dropdowns[rId];
          const selected = uObj[rId];
          const found = drop.options.find(o => o.id === selected);
          uList.push(found ? found.text : '(offen)');
          cList.push(drop.correctText);
          if (selected !== drop.correct) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join(' | ');
        correctDisplayAnswer = cList.join(' | ');
      }
      else if (q.type === 'text-gap') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        Object.keys(q.gaps).forEach(rId => {
          const gap = q.gaps[rId];
          const rawVal = (uObj[rId] || '').trim();
          const normVal = rawVal.toLowerCase().replace(/[\s\.\:\-\_]/g, '');
          const normExpected = gap.correctAnswers.map(e => e.toLowerCase().replace(/[\s\.\:\-\_]/g, ''));

          if (!normExpected.includes(normVal) || normVal === '') {
            allRight = false;
          }
          uList.push(rawVal || '(leer)');
          cList.push(gap.primaryAnswer);
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join(' | ');
        correctDisplayAnswer = cList.join(' | ');
      }
      else if (q.type === 'order-sequence') {
        const uOrder = userAns || [];
        isCorrect = (uOrder.length === q.correctOrder.length && uOrder.every((id, i) => id === q.correctOrder[i]));

        const itemsMap = {};
        q.items.forEach(it => { itemsMap[it.id] = it.text; });

        userDisplayAnswer = uOrder.map((id, i) => `${i + 1}. ${itemsMap[id]}`).join('<br>');
        correctDisplayAnswer = q.correctOrderTexts.map((txt, i) => `${i + 1}. ${txt}`).join('<br>');
      }
      else if (q.type === 'gap-match') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        const tokenMap = {};
        q.tokens.forEach(t => { tokenMap[t.id] = t.text; });

        q.slots.forEach(slot => {
          const placedTokenId = uObj[slot.slotId];
          uList.push(`${slot.description.slice(0, 20)}...: <strong>${tokenMap[placedTokenId] || '(leer)'}</strong>`);
          cList.push(`${slot.description.slice(0, 20)}...: <strong>${slot.correctText}</strong>`);
          if (placedTokenId !== slot.correctTokenId) {
            allRight = false;
          }
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join('<br>');
        correctDisplayAnswer = cList.join('<br>');
      }
      else if (q.type === 'associate-pairs') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = q.correctPairTexts;

        const leftMap = {};
        q.leftItems.forEach(it => { leftMap[it.id] = it.text; });
        const rightMap = {};
        q.rightItems.forEach(it => { rightMap[it.id] = it.text; });

        q.leftItems.forEach(item => {
          const matchedRightId = uObj[item.id];
          if (matchedRightId) {
            uList.push(`${item.text} ➔ ${rightMap[matchedRightId] || matchedRightId}`);
          } else {
            uList.push(`${item.text} ➔ (offen)`);
          }
          if (matchedRightId !== q.correctPairs[item.id]) {
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

    // Find Level Band in Cornelsen A2 evaluation scale
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
    stopTimer();
    elements.globalAudioPlayer.pause();

    const res = evaluateTest();

    elements.viewTest.classList.remove('active');
    elements.viewTest.style.display = 'none';

    elements.viewResult.classList.add('active');
    elements.viewResult.style.display = 'block';

    elements.headerTestInfo.style.display = 'none';
    elements.btnToggleDrawer.style.display = 'none';

    // Format current German date
    const now = new Date();
    const strDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
    elements.certDateDisplay.textContent = strDate;
    elements.certDateInline.textContent = strDate;

    // Learner Name
    const fullName = `${state.userName.vorname} ${state.userName.nachname}`.trim() || 'Lerner/in';
    elements.certUserName.textContent = fullName;
    elements.certScoreDisplay.textContent = `${res.percentage} %`;

    // Radial Score Chart Animation
    elements.radialScoreNumber.textContent = res.percentage;
    const circumference = 2 * Math.PI * 52; // ~326.7
    const offset = circumference - (res.percentage / 100) * circumference;
    setTimeout(() => {
      elements.radialScoreBar.style.strokeDashoffset = offset;
    }, 150);

    // Metrics
    elements.metricCorrectAnswers.textContent = `${res.correctCount} / ${res.totalQuestions}`;
    elements.metricTimeTaken.textContent = `${res.timeTakenMin} min.`;
    elements.metricLevelBadge.textContent = res.band.level;

    // Recommendation Banner
    elements.recHeadline.textContent = `Ergebnis: ${res.band.level} (${res.band.badge})`;
    elements.recDescription.textContent = res.band.description;

    // Highlight row in interpretation table
    document.querySelectorAll('.cert-table tbody tr').forEach(row => row.classList.remove('highlight-row'));
    if (res.percentage >= 90) {
      document.getElementById('rowBand1').classList.add('highlight-row');
    } else if (res.percentage >= 70) {
      document.getElementById('rowBand2').classList.add('highlight-row');
    } else if (res.percentage >= 50) {
      document.getElementById('rowBand3').classList.add('highlight-row');
    } else if (res.percentage >= 30) {
      document.getElementById('rowBand4').classList.add('highlight-row');
    } else {
      document.getElementById('rowBand5').classList.add('highlight-row');
    }

    // Build Review Cards
    buildReviewCards(res.reviewDetails);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function buildReviewCards(details) {
    elements.reviewList.innerHTML = '';

    details.forEach(item => {
      const card = document.createElement('div');
      card.className = `review-item-card ${item.isCorrect ? 'review-correct' : 'review-incorrect'}`;

      card.innerHTML = `
        <div class="review-item-header">
          <div class="review-title-group">
            <span class="review-badge ${item.isCorrect ? 'badge-success' : 'badge-danger'}">
              ${item.isCorrect ? 'Richtig gelöst' : 'Falsch'}
            </span>
            <span class="review-q-title">Frage ${item.questionNumber}: ${item.category}</span>
          </div>
        </div>

        <div class="review-rubric-snippet">${item.rubric || ''}</div>

        <div class="review-answers-grid">
          <div class="review-answer-box user-answer-box">
            <span class="ans-label">Ihre Antwort:</span>
            <div class="ans-content">${item.userAnswer}</div>
          </div>
          <div class="review-answer-box correct-answer-box">
            <span class="ans-label">Musterlösung:</span>
            <div class="ans-content">${item.correctAnswer}</div>
          </div>
        </div>
      `;

      elements.reviewList.appendChild(card);
    });
  }

  function initResultActions() {
    elements.btnPrintCert.addEventListener('click', () => {
      window.print();
    });

    elements.btnToggleReview.addEventListener('click', () => {
      const isHidden = (elements.reviewSection.style.display === 'none');
      if (isHidden) {
        elements.reviewSection.style.display = 'block';
        elements.toggleReviewText.textContent = 'Detailauswertung ausblenden';
        elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        elements.reviewSection.style.display = 'none';
        elements.toggleReviewText.textContent = 'Antworten ansehen (Detailauswertung)';
      }
    });

    elements.btnRestartTest.addEventListener('click', () => {
      if (confirm('Möchten Sie den Einstufungstest wirklich neu starten? Ihre bisherigen Eingaben werden zurückgesetzt.')) {
        stopTimer();
        state.currentIndex = 0;
        state.totalSeconds = 0;
        state.userAnswers = {};
        state.flaggedQuestions.clear();
        state.selectedAssociateLeft = null;
        state.selectedGapToken = null;
        state.results = null;

        elements.viewResult.classList.remove('active');
        elements.viewResult.style.display = 'none';
        elements.reviewSection.style.display = 'none';
        elements.toggleReviewText.textContent = 'Antworten ansehen (Detailauswertung)';

        elements.viewWelcome.classList.add('active');
        elements.viewWelcome.style.display = 'block';

        elements.headerTestInfo.style.display = 'none';
        elements.btnToggleDrawer.style.display = 'none';
        elements.timerText.textContent = '00:00';

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ==========================================================================
     Helper Utilities
     ========================================================================== */
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     Application Bootstrap
     ========================================================================== */
  function initApp() {
    initTheme();
    elements.btnThemeToggle.addEventListener('click', toggleTheme);

    initAudioControls();
    initDrawer();
    initLightbox();
    initNavigation();
    initResultActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
