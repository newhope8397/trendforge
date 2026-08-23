// js/formula-decks.js

let currentDeckMode = 'key';
let currentDeckIndex = 0;
let activeDeckData = [];

function loadFormulaDeck(deckData) {
  activeDeckData = deckData;
  currentDeckIndex = 0;
  renderFormulaCard();
}

function setDeckType(type) {
  currentDeckMode = type;
  document.getElementById('deck-type-key').className = type === 'key' ? "flex-1 py-1.5 rounded text-indigo-400 font-bold" : "flex-1 py-1.5 rounded text-slate-400";
  document.getElementById('deck-type-full').className = type === 'full' ? "flex-1 py-1.5 rounded text-indigo-400 font-bold" : "flex-1 py-1.5 rounded text-slate-400";
  
  const payload = window.currentTopicData;
  if (payload) {
    activeDeckData = type === 'key' ? payload.keyFormulas : payload.fullFormulas;
    currentDeckIndex = 0;
    renderFormulaCard();
  }
}

function renderFormulaCard() {
  if (!activeDeckData || activeDeckData.length === 0) return;
  const card = activeDeckData[currentDeckIndex];

  document.getElementById('formula-tag').innerText = card.tag;
  document.getElementById('formula-title').innerText = card.title;
  document.getElementById('formula-math').innerText = card.formula;
  document.getElementById('formula-desc').innerText = card.description;
  document.getElementById('formula-counter').innerText = `Card ${currentDeckIndex + 1} of ${activeDeckData.length}`;

  renderSchematic(card.svgType);
}

function renderSchematic(type) {
  const container = document.getElementById('schematic-container');
  if (type === 'circuit') {
    container.innerHTML = `
      <svg class="schematic-svg" viewBox="0 0 200 80" stroke="#818cf8" stroke-width="2" fill="none">
        <rect x="20" y="10" width="160" height="60" rx="5" />
        <line x1="100" y1="10" x2="100" y2="25" />
        <circle cx="100" cy="35" r="10" fill="#1e1b4b" stroke="#38bdf8" />
        <text x="96" y="39" fill="#38bdf8" font-size="10" font-weight="bold">R</text>
        <path d="M 15 35 L 25 35 M 17 40 L 23 40" stroke="#f43f5e" stroke-width="3"/>
      </svg>`;
  } else if (type === 'parabola') {
    container.innerHTML = `
      <svg class="schematic-svg" viewBox="0 0 200 80" stroke="#38bdf8" stroke-width="2" fill="none">
        <path d="M 20 70 Q 100 0 180 70" />
        <line x1="20" y1="70" x2="60" y2="30" stroke="#f43f5e" stroke-linecap="round" stroke-dasharray="3,3" />
        <text x="65" y="25" fill="#f43f5e" font-size="10">v⃗</text>
      </svg>`;
  } else {
    container.innerHTML = `
      <svg class="schematic-svg" viewBox="0 0 200 80" stroke="#a78bfa" stroke-width="2" fill="none">
        <line x1="30" y1="40" x2="170" y2="40" stroke-width="3" />
        <polygon points="170,35 180,40 170,45" fill="#a78bfa" />
        <text x="95" y="30" fill="#a78bfa" font-size="10">E⃗ Field</text>
      </svg>`;
  }
}

function nextFormulaCard() {
  if (activeDeckData.length === 0) return;
  currentDeckIndex = (currentDeckIndex + 1) % activeDeckData.length;
  renderFormulaCard();
}

function prevFormulaCard() {
  if (activeDeckData.length === 0) return;
  currentDeckIndex = (currentDeckIndex - 1 + activeDeckData.length) % activeDeckData.length;
  renderFormulaCard();
}
