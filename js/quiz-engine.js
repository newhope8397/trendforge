// js/quiz-engine.js

let activeTier = 1;
let currentQuizIndex = 0;
let activeQuizList = [];
let missedQuestions = [];

function setQuizTier(tier) {
  activeTier = tier;
  [1, 2, 3].forEach(t => {
    document.getElementById(`tier-${t}`).className = t === tier ? "flex-1 py-1.5 rounded bg-indigo-600 text-white" : "flex-1 py-1.5 rounded text-slate-400";
  });

  const payload = window.currentTopicData;
  if (payload && payload.quizzes) {
    activeQuizList = payload.quizzes[`tier${tier}`] || [];
    currentQuizIndex = 0;
    missedQuestions = [];
    document.getElementById('diagnostic-report').classList.add('hidden');
    renderQuizQuestion();
  }
}

function renderQuizQuestion() {
  if (!activeQuizList || activeQuizList.length === 0) return;
  const qData = activeQuizList[currentQuizIndex];

  const labels = ["NCERT / Boards Level", "JEE Main Level PYQ", "JEE Advanced / HC Verma Level"];
  document.getElementById('quiz-tier-label').innerText = labels[activeTier - 1];
  document.getElementById('quiz-progress').innerText = `Q ${currentQuizIndex + 1} of ${activeQuizList.length}`;
  document.getElementById('quiz-question-text').innerText = qData.q;
  document.getElementById('quiz-solution-box').classList.add('hidden');
  document.getElementById('next-q-btn').classList.add('hidden');

  const optionsContainer = document.getElementById('quiz-options-list');
  optionsContainer.innerHTML = '';

  qData.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = "w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-xs text-slate-200 transition";
    btn.innerText = `${String.fromCharCode(65 + idx)}. ${optText}`;
    btn.onclick = () => handleAnswer(idx, qData.ans, qData.exp, qData);
    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(selectedIdx, correctIdx, explanation, qData) {
  const buttons = document.querySelectorAll('#quiz-options-list button');
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.className = "w-full text-left p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-xs text-emerald-200 font-semibold";
    } else if (idx === selectedIdx) {
      btn.className = "w-full text-left p-3 rounded-xl bg-rose-950 border border-rose-500 text-xs text-rose-200";
    }
  });

  if (selectedIdx !== correctIdx) {
    missedQuestions.push(qData);
  }

  const solBox = document.getElementById('quiz-solution-box');
  solBox.innerHTML = `<strong>Solution:</strong> ${explanation}`;
  solBox.classList.remove('hidden');

  document.getElementById('next-q-btn').classList.remove('hidden');
}

function nextQuizQuestion() {
  currentQuizIndex++;
  if (currentQuizIndex < activeQuizList.length) {
    renderQuizQuestion();
  } else {
    showDiagnosticReport();
  }
}

function showDiagnosticReport() {
  document.getElementById('question-box').classList.add('hidden');
  document.getElementById('next-q-btn').classList.add('hidden');
  const reportBox = document.getElementById('diagnostic-report');
  reportBox.classList.remove('hidden');

  if (window.generateRemedialCards) {
    window.generateRemedialCards(missedQuestions);
  }
}
