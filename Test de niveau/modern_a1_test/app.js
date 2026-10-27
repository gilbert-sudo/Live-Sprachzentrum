/**
 * Cornelsen DaF Niveau A1 Einstufungstest — Application Logic
 */

(function () {
  'use strict';

  // State
  const state = {
    userName: { vorname: '', nachname: '' },
    currentQuestionIndex: 0,
    userAnswers: {},         // qId -> answer data
    flaggedQuestions: new Set(),
    startTime: null,
    timerInterval: null,
    totalSeconds: 0,
    playbackSpeed: 1.0,
    isCompleted: false,
    results: null
  };

  // DOM Elements Cache
  const elements = {
    appHeader: document.getElementById('appHeader'),
    headerTestInfo: document.getElementById('headerTestInfo'),
    questionCounterText: document.getElementById('questionCounterText'),
    timerText: document.getElementById('timerText'),
    progressBarFill: document.getElementById('progressBarFill'),
    btnToggleDrawer: document.getElementById('btnToggleDrawer'),
    btnQuellen: document.getElementById('btnQuellen'),
    btnThemeToggle: document.getElementById('btnThemeToggle'),
    questionDrawer: document.getElementById('questionDrawer'),
    drawerGrid: document.getElementById('drawerGrid'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    btnCloseDrawer: document.getElementById('btnCloseDrawer'),

    // Views
    viewWelcome: document.getElementById('viewWelcome'),
    viewTest: document.getElementById('viewTest'),
    viewResult: document.getElementById('viewResult'),

    // Welcome Elements
    welcomeForm: document.getElementById('welcomeForm'),
    inputVorname: document.getElementById('inputVorname'),
    inputNachname: document.getElementById('inputNachname'),
    btnSoundCheck: document.getElementById('btnSoundCheck'),
    soundCheckAudio: document.getElementById('soundCheckAudio'),

    // Test Elements
    qBadgeNumber: document.getElementById('qBadgeNumber'),
    qBadgeCategory: document.getElementById('qBadgeCategory'),
    qRubric: document.getElementById('qRubric'),
    btnFlagQuestion: document.getElementById('btnFlagQuestion'),
    btnQuestionHelp: document.getElementById('btnQuestionHelp'),
    qAudioContainer: document.getElementById('qAudioContainer'),
    globalAudioPlayer: document.getElementById('globalAudioPlayer'),
    audioPlayBtn: document.getElementById('audioPlayBtn'),
    audioRestartBtn: document.getElementById('audioRestartBtn'),
    audioProgressSlider: document.getElementById('audioProgressSlider'),
    audioCurrentTime: document.getElementById('audioCurrentTime'),
    audioDuration: document.getElementById('audioDuration'),
    audioTrackName: document.getElementById('audioTrackName'),
    qImagesContainer: document.getElementById('qImagesContainer'),
    qInteractiveArea: document.getElementById('qInteractiveArea'),
    taskHintChip: document.getElementById('taskHintChip'),

    // Bottom Navigation
    btnPrevQuestion: document.getElementById('btnPrevQuestion'),
    btnNextQuestion: document.getElementById('btnNextQuestion'),
    btnNextText: document.getElementById('btnNextText'),
    btnMatrixQuick: document.getElementById('btnMatrixQuick'),
    navQuestionText: document.getElementById('navQuestionText'),

    // Results & Certificate
    certDateDisplay: document.getElementById('certDateDisplay'),
    certDateInline: document.getElementById('certDateInline'),
    certUserName: document.getElementById('certUserName'),
    certScoreDisplay: document.getElementById('certScoreDisplay'),
    radialScoreBar: document.getElementById('radialScoreBar'),
    radialScoreNumber: document.getElementById('radialScoreNumber'),
    metricCorrectAnswers: document.getElementById('metricCorrectAnswers'),
    metricTimeTaken: document.getElementById('metricTimeTaken'),
    metricLevelBadge: document.getElementById('metricLevelBadge'),
    recHeadline: document.getElementById('recHeadline'),
    recDescription: document.getElementById('recDescription'),
    recIconBadge: document.getElementById('recIconBadge'),
    rowBand1: document.getElementById('rowBand1'),
    rowBand2: document.getElementById('rowBand2'),
    rowBand3: document.getElementById('rowBand3'),
    rowBand4: document.getElementById('rowBand4'),
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
     Theme & Initialization
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem('daf_theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('daf_theme', newTheme);
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
        elements.audioDuration.textContent = formatTime(audio.duration);
      }
    });

    elements.audioProgressSlider.addEventListener('input', (e) => {
      if (!isNaN(audio.duration)) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
      }
    });

    // Speed Selector Pills (0.8x, 1.0x, 1.2x)
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.playbackSpeed = parseFloat(e.target.dataset.speed);
        audio.playbackRate = state.playbackSpeed;
      });
    });
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function loadAudioForQuestion(audioFile, questionNumber) {
    const audio = elements.globalAudioPlayer;
    audio.pause();
    audio.currentTime = 0;
    elements.audioProgressSlider.value = 0;
    elements.audioCurrentTime.textContent = '0:00';
    elements.audioDuration.textContent = '0:00';

    if (audioFile) {
      audio.src = audioFile;
      audio.playbackRate = state.playbackSpeed;
      elements.audioTrackName.textContent = `Hörbeispiel zu Aufgabe ${questionNumber}`;
      elements.qAudioContainer.style.display = 'flex';
    } else {
      elements.qAudioContainer.style.display = 'none';
      audio.removeAttribute('src');
    }
  }

  /* ==========================================================================
     Start Test Flow
     ========================================================================== */
  window.startTest = function () {
    const v = elements.inputVorname.value.trim();
    const n = elements.inputNachname.value.trim();
    state.userName.vorname = v || '';
    state.userName.nachname = n || (v ? '' : 'Lerner/in');

    elements.viewWelcome.classList.remove('active');
    elements.viewWelcome.style.display = 'none';

    elements.viewTest.classList.add('active');
    elements.viewTest.style.display = 'block';

    elements.headerTestInfo.style.display = 'flex';
    elements.btnToggleDrawer.style.display = 'inline-flex';

    startTimer();
    buildDrawerGrid();
    goToQuestion(0);
  };

  /* ==========================================================================
     Drawer Grid (Questions 1 to 30)
     ========================================================================== */
  function buildDrawerGrid() {
    elements.drawerGrid.innerHTML = '';
    TEST_DATA.questions.forEach((q, idx) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.className = 'drawer-node';
      node.id = `drawerNode_${idx}`;
      node.textContent = q.id;
      node.title = `Aufgabe ${q.id}: ${q.category}`;
      node.addEventListener('click', () => {
        goToQuestion(idx);
        closeDrawer();
      });
      elements.drawerGrid.appendChild(node);
    });
  }

  function updateDrawerNodeStatus() {
    TEST_DATA.questions.forEach((q, idx) => {
      const node = document.getElementById(`drawerNode_${idx}`);
      if (!node) return;

      node.classList.remove('current', 'answered', 'flagged');

      if (idx === state.currentQuestionIndex) {
        node.classList.add('current');
      }
      if (isQuestionAnswered(q.id)) {
        node.classList.add('answered');
      }
      if (state.flaggedQuestions.has(q.id)) {
        node.classList.add('flagged');
      }
    });
  }

  function openDrawer() {
    updateDrawerNodeStatus();
    elements.questionDrawer.classList.add('open');
    elements.drawerBackdrop.classList.add('show');
  }

  function closeDrawer() {
    elements.questionDrawer.classList.remove('open');
    elements.drawerBackdrop.classList.remove('show');
  }

  /* ==========================================================================
     Check If Question Is Answered
     ========================================================================== */
  function isQuestionAnswered(qId) {
    const ans = state.userAnswers[qId];
    if (ans === undefined || ans === null) return false;

    const q = TEST_DATA.questions.find(item => item.id === qId);
    if (!q) return false;

    if (q.type === 'single-choice') {
      return typeof ans === 'string' && ans.length > 0;
    }
    if (q.type === 'multiple-choice') {
      return Array.isArray(ans) && ans.length > 0;
    }
    if (q.type === 'inline-dropdown') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.dropdowns).every(rId => ans[rId] !== undefined && ans[rId] !== '');
    }
    if (q.type === 'grouped-choice') {
      if (typeof ans !== 'object') return false;
      return q.groups.every(g => ans[g.responseId] !== undefined && ans[g.responseId] !== '');
    }
    if (q.type === 'text-gap') {
      if (typeof ans !== 'object') return false;
      return Object.keys(q.gaps).every(rId => typeof ans[rId] === 'string' && ans[rId].trim().length > 0);
    }
    if (q.type === 'order-sequence') {
      return Array.isArray(ans) && ans.length === q.items.length;
    }
    return false;
  }

  /* ==========================================================================
     Navigation (Question Transition)
     ========================================================================== */
  function goToQuestion(index) {
    if (index < 0 || index >= TEST_DATA.questions.length) return;
    state.currentQuestionIndex = index;
    const q = TEST_DATA.questions[index];

    // Update Progress and Header Info
    const totalQ = TEST_DATA.questions.length;
    const currentNum = index + 1;
    elements.questionCounterText.textContent = `Frage ${currentNum} von ${totalQ}`;
    elements.navQuestionText.textContent = `Frage ${currentNum} von ${totalQ}`;
    const pct = (currentNum / totalQ) * 100;
    elements.progressBarFill.style.width = `${pct}%`;

    // Update Question Badges & Rubric
    elements.qBadgeNumber.textContent = `Frage ${currentNum}`;
    elements.qBadgeCategory.textContent = q.category;
    elements.qRubric.innerHTML = q.rubricHtml;

    // Flag Button State
    if (state.flaggedQuestions.has(q.id)) {
      elements.btnFlagQuestion.classList.add('active');
    } else {
      elements.btnFlagQuestion.classList.remove('active');
    }

    // Audio Setup
    loadAudioForQuestion(q.audio, q.id);

    // Images Setup
    renderImages(q.images);

    // Render Question Inputs
    renderInteractiveArea(q);

    // Nav Buttons State
    elements.btnPrevQuestion.disabled = (index === 0);
    if (index === totalQ - 1) {
      elements.btnNextText.textContent = 'Test abschließen';
      elements.btnNextQuestion.classList.add('finish-btn');
    } else {
      elements.btnNextText.textContent = 'Weiter';
      elements.btnNextQuestion.classList.remove('finish-btn');
    }

    updateDrawerNodeStatus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderImages(images) {
    elements.qImagesContainer.innerHTML = '';
    if (!images || images.length === 0) return;

    if (images.length > 1) {
      elements.qImagesContainer.className = 'images-gallery multi-images';
    } else {
      elements.qImagesContainer.className = 'images-gallery';
    }

    images.forEach(imgSrc => {
      const card = document.createElement('div');
      card.className = 'question-img-card';
      card.title = 'Klicken zum Vergrößern';

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'Aufgabenabbildung';
      img.loading = 'lazy';

      const hint = document.createElement('span');
      hint.className = 'img-zoom-hint';
      hint.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg> Vergrößern`;

      card.appendChild(img);
      card.appendChild(hint);

      card.addEventListener('click', () => openLightbox(imgSrc));
      elements.qImagesContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     Interactive Question Rendering
     ========================================================================== */
  function renderInteractiveArea(q) {
    elements.qInteractiveArea.innerHTML = '';
    const qId = q.id;

    if (q.type === 'inline-dropdown') {
      elements.taskHintChip.textContent = 'Wählen Sie die passende Option aus dem Menü';
      renderInlineDropdownTask(q);
    } else if (q.type === 'single-choice') {
      elements.taskHintChip.textContent = 'Wählen Sie 1 richtige Antwort aus';
      renderSingleChoiceTask(q);
    } else if (q.type === 'multiple-choice') {
      const count = q.maxChoices || q.correctAnswers.length;
      elements.taskHintChip.textContent = `Wählen Sie ${count} richtige Antworten aus`;
      renderMultipleChoiceTask(q);
    } else if (q.type === 'grouped-choice') {
      elements.taskHintChip.textContent = 'Beantworten Sie alle Teilfragen';
      renderGroupedChoiceTask(q);
    } else if (q.type === 'text-gap') {
      elements.taskHintChip.textContent = 'Schreiben Sie die passende Antwort in das Feld';
      renderTextGapTask(q);
    } else if (q.type === 'order-sequence') {
      elements.taskHintChip.textContent = 'Bringen Sie die Sätze in die richtige Reihenfolge';
      renderOrderSequenceTask(q);
    }
  }

  /* 1. Inline Dropdown */
  function renderInlineDropdownTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId]) {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'task-template-content';
    let htmlContent = q.templateHtml;

    // Replace [[SELECT:rId]] with select tags
    Object.keys(q.dropdowns).forEach(rId => {
      const dd = q.dropdowns[rId];
      const savedVal = state.userAnswers[qId][rId] || '';

      let selectHtml = `<span class="inline-select-wrapper"><select class="inline-custom-select ${savedVal ? 'has-value' : ''}" data-qid="${qId}" data-rid="${rId}">`;
      selectHtml += `<option value="" disabled ${!savedVal ? 'selected' : ''}>--- Bitte wählen ---</option>`;
      dd.options.forEach(opt => {
        selectHtml += `<option value="${opt.id}" ${savedVal === opt.id ? 'selected' : ''}>${opt.text}</option>`;
      });
      selectHtml += `</select></span>`;

      htmlContent = htmlContent.replace(`[[SELECT:${rId}]]`, selectHtml);
    });

    container.innerHTML = htmlContent;
    elements.qInteractiveArea.appendChild(container);

    // Event listeners
    container.querySelectorAll('.inline-custom-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const rid = e.target.dataset.rid;
        state.userAnswers[qId][rid] = e.target.value;
        e.target.classList.add('has-value');
        updateDrawerNodeStatus();
      });
    });
  }

  /* 2. Single Choice (Radio) */
  function renderSingleChoiceTask(q) {
    const qId = q.id;
    const currentVal = state.userAnswers[qId] || '';

    const list = document.createElement('div');
    list.className = 'choice-options-list';

    q.options.forEach((opt, idx) => {
      const card = document.createElement('div');
      card.className = `choice-option-card ${currentVal === opt.id ? 'selected' : ''}`;
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

  /* 3. Multiple Choice (Checkboxes) */
  function renderMultipleChoiceTask(q) {
    const qId = q.id;
    if (!Array.isArray(state.userAnswers[qId])) {
      state.userAnswers[qId] = [];
    }
    const currentVals = new Set(state.userAnswers[qId]);
    const maxAllowed = q.maxChoices || q.correctAnswers.length;

    // Counter Banner
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
            // Remove first selected if max exceeded or alert
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

  /* 4. Grouped Choice */
  function renderGroupedChoiceTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId]) {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'grouped-choice-container';

    // If templateHtml has text, render text and sub-choice groups
    let htmlContent = q.templateHtml;

    q.groups.forEach((group, gIdx) => {
      const rId = group.responseId;
      const currentVal = state.userAnswers[qId][rId] || '';

      let groupHtml = `<div class="choice-group-box" data-rid="${rId}">`;
      groupHtml += `<div class="choice-group-options">`;
      group.options.forEach(opt => {
        const isSel = (currentVal === opt.id);
        groupHtml += `
          <div class="choice-option-card ${isSel ? 'selected' : ''}" data-opt-id="${opt.id}" data-rid="${rId}">
            <div class="choice-indicator"></div>
            <span class="choice-text">${opt.text}</span>
          </div>
        `;
      });
      groupHtml += `</div></div>`;

      htmlContent = htmlContent.replace(`[[CHOICE_GROUP:${rId}]]`, groupHtml);
    });

    container.innerHTML = htmlContent;
    elements.qInteractiveArea.appendChild(container);

    // Event listeners
    container.querySelectorAll('.choice-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const rId = card.dataset.rid;
        const optId = card.dataset.optId;
        const parentGroup = card.closest('.choice-group-box');
        parentGroup.querySelectorAll('.choice-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.userAnswers[qId][rId] = optId;
        updateDrawerNodeStatus();
      });
    });
  }

  /* 5. Text Gap (Fill in the blanks) */
  function renderTextGapTask(q) {
    const qId = q.id;
    if (!state.userAnswers[qId]) {
      state.userAnswers[qId] = {};
    }

    const container = document.createElement('div');
    container.className = 'task-template-content';
    let htmlContent = q.templateHtml;

    Object.keys(q.gaps).forEach(rId => {
      const savedVal = state.userAnswers[qId][rId] || '';
      const inputHtml = `<input type="text" class="inline-gap-input ${savedVal ? 'has-value' : ''}" data-qid="${qId}" data-rid="${rId}" value="${savedVal}" placeholder="Antwort..." autocomplete="off" spellcheck="false">`;
      htmlContent = htmlContent.replace(`[[INPUT:${rId}]]`, inputHtml);
    });

    container.innerHTML = htmlContent;
    elements.qInteractiveArea.appendChild(container);

    // Event listeners
    container.querySelectorAll('.inline-gap-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const rid = e.target.dataset.rid;
        state.userAnswers[qId][rid] = e.target.value;
        if (e.target.value.trim().length > 0) {
          e.target.classList.add('has-value');
        } else {
          e.target.classList.remove('has-value');
        }
        updateDrawerNodeStatus();
      });
    });
  }

  /* 6. Order Sequence */
  function renderOrderSequenceTask(q) {
    const qId = q.id;
    // Default shuffled or saved order
    if (!Array.isArray(state.userAnswers[qId]) || state.userAnswers[qId].length !== q.items.length) {
      // shuffle initial items
      const initialShuffled = [...q.items].sort(() => Math.random() - 0.5).map(it => it.id);
      state.userAnswers[qId] = initialShuffled;
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

        // Up/down buttons
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

  /* ==========================================================================
     Grading & Evaluation Engine
     ========================================================================== */
  function evaluateTest() {
    let correctCount = 0;
    const reviewDetails = [];

    TEST_DATA.questions.forEach((q) => {
      const qId = q.id;
      const userAns = state.userAnswers[qId];
      let isCorrect = false;
      let userDisplayAnswer = '';
      let correctDisplayAnswer = '';

      if (q.type === 'single-choice') {
        isCorrect = (userAns === q.correctAnswer);
        const userOpt = q.options.find(o => o.id === userAns);
        userDisplayAnswer = userOpt ? userOpt.text : 'Keine Antwort';
        correctDisplayAnswer = q.correctAnswerText;
      }
      else if (q.type === 'multiple-choice') {
        const uSet = new Set(userAns || []);
        const cSet = new Set(q.correctAnswers);
        isCorrect = (uSet.size === cSet.size && [...uSet].every(x => cSet.has(x)));
        
        const userTexts = (userAns || []).map(id => {
          const opt = q.options.find(o => o.id === id);
          return opt ? opt.text : id;
        });
        userDisplayAnswer = userTexts.length > 0 ? userTexts.join(', ') : 'Keine Antwort';
        correctDisplayAnswer = q.correctAnswerTexts.join(', ');
      }
      else if (q.type === 'inline-dropdown') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        Object.keys(q.dropdowns).forEach(rId => {
          const dd = q.dropdowns[rId];
          const val = uObj[rId];
          if (val !== dd.correct) {
            allRight = false;
          }
          const uOpt = dd.options.find(o => o.id === val);
          uList.push(uOpt ? uOpt.text : '(offen)');
          cList.push(dd.correctText);
        });

        isCorrect = allRight;
        userDisplayAnswer = uList.join(' | ');
        correctDisplayAnswer = cList.join(' | ');
      }
      else if (q.type === 'grouped-choice') {
        const uObj = userAns || {};
        let allRight = true;
        const uList = [];
        const cList = [];

        q.groups.forEach(g => {
          const val = uObj[g.responseId];
          if (val !== g.correctAnswer) {
            allRight = false;
          }
          const uOpt = g.options.find(o => o.id === val);
          uList.push(uOpt ? uOpt.text : '(offen)');
          cList.push(g.correctAnswerText);
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
          // Normalize comparison: remove spaces, lowercase
          const normVal = rawVal.toLowerCase().replace(/\s+/g, '');
          const normExpected = gap.correctAnswers.map(e => e.toLowerCase().replace(/\s+/g, ''));

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

    // Find Level Band
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

    // Metrics
    elements.metricCorrectAnswers.textContent = `${res.correctCount} / ${res.totalQuestions}`;
    elements.metricTimeTaken.textContent = `${res.timeTakenMin} min.`;
    elements.metricLevelBadge.textContent = res.band.level;

    // Recommendation card
    elements.recHeadline.textContent = `Ihr Ergebnis: ${res.percentage} % • Empfohlenes Niveau: ${res.band.level}`;
    elements.recDescription.textContent = res.band.description;

    // Highlight active row in Cornelsen interpretation table
    [elements.rowBand1, elements.rowBand2, elements.rowBand3, elements.rowBand4].forEach(r => r.classList.remove('active-band'));
    if (res.percentage >= 90) elements.rowBand1.classList.add('active-band');
    else if (res.percentage >= 70) elements.rowBand2.classList.add('active-band');
    else if (res.percentage >= 50) elements.rowBand3.classList.add('active-band');
    else elements.rowBand4.classList.add('active-band');

    // Animate Radial Score Circle
    const circumference = 326.7; // 2 * PI * 52
    const offset = circumference - (res.percentage / 100) * circumference;
    setTimeout(() => {
      elements.radialScoreBar.style.strokeDashoffset = offset;
    }, 200);

    // Number counting animation
    let count = 0;
    const dur = 1000;
    const step = dur / (res.percentage || 1);
    if (res.percentage > 0) {
      const counterTimer = setInterval(() => {
        count++;
        elements.radialScoreNumber.textContent = count;
        if (count >= res.percentage) clearInterval(counterTimer);
      }, step);
    } else {
      elements.radialScoreNumber.textContent = '0';
    }

    renderReviewList(res.reviewDetails);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderReviewList(reviews) {
    elements.reviewList.innerHTML = '';
    reviews.forEach(item => {
      const card = document.createElement('div');
      card.className = `review-card ${item.isCorrect ? 'correct' : 'incorrect'}`;

      card.innerHTML = `
        <div class="review-card-top">
          <div class="review-q-title">
            <span>Aufgabe ${item.questionNumber}:</span>
            <span class="text-secondary" style="font-weight: 500;">${item.category}</span>
          </div>
          <span class="review-status-badge ${item.isCorrect ? 'correct' : 'incorrect'}">
            ${item.isCorrect ? '✓ Richtig gelöst (+1)' : '✗ Falsch (0)'}
          </span>
        </div>

        <div class="review-rubric" style="font-size: 0.92rem; color: var(--text-secondary);">
          ${item.rubric}
        </div>

        <div class="review-answers-grid">
          <div class="review-user-ans">
            <strong>Ihre Antwort:</strong>
            <span>${item.userAnswer}</span>
          </div>
          <div class="review-corr-ans">
            <strong>Musterlösung:</strong>
            <span>${item.correctAnswer}</span>
          </div>
        </div>
      `;

      elements.reviewList.appendChild(card);
    });
  }

  /* ==========================================================================
     Submission Confirmation Modal
     ========================================================================== */
  function showConfirmSubmitModal() {
    // Check unanswered questions
    const unanswered = [];
    TEST_DATA.questions.forEach((q, idx) => {
      if (!isQuestionAnswered(q.id)) {
        unanswered.push(idx + 1);
      }
    });

    if (unanswered.length > 0) {
      elements.unansweredWarningBox.style.display = 'flex';
      elements.unansweredCount.textContent = unanswered.length;
      elements.unansweredChips.innerHTML = '';
      unanswered.forEach(num => {
        const chip = document.createElement('span');
        chip.className = 'chip-unanswered-q';
        chip.textContent = `Aufgabe ${num}`;
        chip.title = `Zu Aufgabe ${num} springen`;
        chip.addEventListener('click', () => {
          closeModal('modalConfirmSubmit');
          goToQuestion(num - 1);
        });
        elements.unansweredChips.appendChild(chip);
      });
    } else {
      elements.unansweredWarningBox.style.display = 'none';
    }

    openModal('modalConfirmSubmit');
  }

  /* ==========================================================================
     Modals & Lightbox Utilities
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }

  function openLightbox(src) {
    elements.lightboxImg.src = src;
    elements.imageLightbox.style.display = 'flex';
  }

  function closeLightbox() {
    elements.imageLightbox.style.display = 'none';
    elements.lightboxImg.removeAttribute('src');
  }

  /* ==========================================================================
     Event Handlers Binding
     ========================================================================== */
  function initEventListeners() {
    // Theme toggle
    elements.btnThemeToggle.addEventListener('click', toggleTheme);

    // Sound Check
    elements.btnSoundCheck.addEventListener('click', () => {
      const snd = elements.soundCheckAudio;
      if (snd.paused) {
        snd.currentTime = 0;
        snd.play().catch(e => console.log('Audio test play error:', e));
        elements.btnSoundCheck.textContent = 'Ton läuft...';
        snd.onended = () => { elements.btnSoundCheck.textContent = 'Hörprobe abspielen'; };
      } else {
        snd.pause();
        elements.btnSoundCheck.textContent = 'Hörprobe abspielen';
      }
    });

    // Drawer Toggles
    elements.btnToggleDrawer.addEventListener('click', openDrawer);
    elements.btnMatrixQuick.addEventListener('click', openDrawer);
    elements.btnCloseDrawer.addEventListener('click', closeDrawer);
    elements.drawerBackdrop.addEventListener('click', closeDrawer);

    // Help Modal
    elements.btnQuestionHelp.addEventListener('click', () => {
      const q = TEST_DATA.questions[state.currentQuestionIndex];
      elements.modalHelpBody.innerHTML = `<p>${q.help || 'Beantworten Sie die Aufgabe anhand des Texts, Audios oder Bildes.'}</p>`;
      openModal('modalHelp');
    });

    // Quellen Modal
    elements.btnQuellen.addEventListener('click', () => {
      elements.quellenTextDisplay.textContent = TEST_DATA.quellen;
      openModal('modalQuellen');
    });

    // Close Modal buttons (data-close-modal)
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.dataset.closeModal);
      });
    });

    // Lightbox Close
    elements.btnCloseLightbox.addEventListener('click', closeLightbox);
    elements.imageLightbox.addEventListener('click', (e) => {
      if (e.target === elements.imageLightbox) closeLightbox();
    });

    // Flag Question Button
    elements.btnFlagQuestion.addEventListener('click', () => {
      const qId = TEST_DATA.questions[state.currentQuestionIndex].id;
      if (state.flaggedQuestions.has(qId)) {
        state.flaggedQuestions.delete(qId);
        elements.btnFlagQuestion.classList.remove('active');
      } else {
        state.flaggedQuestions.add(qId);
        elements.btnFlagQuestion.classList.add('active');
      }
      updateDrawerNodeStatus();
    });

    // Prev / Next Navigation
    elements.btnPrevQuestion.addEventListener('click', () => {
      goToQuestion(state.currentQuestionIndex - 1);
    });

    elements.btnNextQuestion.addEventListener('click', () => {
      if (state.currentQuestionIndex === TEST_DATA.questions.length - 1) {
        showConfirmSubmitModal();
      } else {
        goToQuestion(state.currentQuestionIndex + 1);
      }
    });

    // Final Submit in Confirmation Modal
    elements.btnConfirmSubmitFinal.addEventListener('click', () => {
      closeModal('modalConfirmSubmit');
      showResultsView();
    });

    // Print Certificate
    elements.btnPrintCert.addEventListener('click', () => {
      window.print();
    });

    // Toggle Review Section
    elements.btnToggleReview.addEventListener('click', () => {
      const isVisible = (elements.reviewSection.style.display !== 'none');
      if (isVisible) {
        elements.reviewSection.style.display = 'none';
        elements.toggleReviewText.textContent = 'Antworten ansehen (Detailauswertung)';
      } else {
        elements.reviewSection.style.display = 'flex';
        elements.toggleReviewText.textContent = 'Detailauswertung ausblenden';
        elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Restart Test
    elements.btnRestartTest.addEventListener('click', () => {
      if (confirm('Möchten Sie den Test wirklich neu starten? Ihre bisherigen Ergebnisse werden zurückgesetzt.')) {
        state.userAnswers = {};
        state.flaggedQuestions.clear();
        state.currentQuestionIndex = 0;
        state.isCompleted = false;

        elements.viewResult.classList.remove('active');
        elements.viewResult.style.display = 'none';
        elements.reviewSection.style.display = 'none';

        elements.viewWelcome.classList.add('active');
        elements.viewWelcome.style.display = 'block';

        elements.headerTestInfo.style.display = 'none';
        elements.btnToggleDrawer.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Escape to close modals/lightbox/drawer
      if (e.key === 'Escape') {
        closeDrawer();
        closeLightbox();
        closeModal('modalConfirmSubmit');
        closeModal('modalHelp');
        closeModal('modalQuellen');
      }

      // Left / Right arrows for test navigation (if not typing in text input)
      if (elements.viewTest.classList.contains('active')) {
        const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
        if (!isInputFocused) {
          if (e.key === 'ArrowRight') {
            elements.btnNextQuestion.click();
          } else if (e.key === 'ArrowLeft') {
            elements.btnPrevQuestion.click();
          } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
            // Number key select for single choice
            const cards = elements.qInteractiveArea.querySelectorAll('.choice-option-card');
            const idx = parseInt(e.key, 10) - 1;
            if (cards[idx]) cards[idx].click();
          }
        }
      }
    });
  }

  // Initialization on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAudioControls();
    initEventListeners();
  });

})();
