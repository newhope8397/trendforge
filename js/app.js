// js/app.js

window.currentTopicData = null;

async function loadCustomTopic() {
  const topic = document.getElementById('topic-input').value.trim() || "Class 12 Electrostatics";
  console.log("Generating payload for topic:", topic);
  
  const payload = await fetchTopicPayload(topic);
  if (payload) {
    window.currentTopicData = payload;
    loadFormulaDeck(payload.keyFormulas);
    setQuizTier(1);
    alert(`Loaded complete study engine for: ${topic}`);
  } else {
    alert("Failed to load topic. Please check your API key or network connection.");
  }
}

function switchStudyTab(tab) {
  const formulaControls = document.getElementById('formula-controls');
  const quizControls = document.getElementById('quiz-controls');
  const tabFormulas = document.getElementById('tab-formulas');
  const tabQuiz = document.getElementById('tab-quiz');

  if (tab === 'formulas') {
    formulaControls.classList.remove('hidden');
    quizControls.classList.add('hidden');
    tabFormulas.className = "flex-1 py-2 rounded-lg bg-indigo-600 text-white";
    tabQuiz.className = "flex-1 py-2 rounded-lg text-slate-400 hover:text-slate-200";
  } else {
    formulaControls.classList.add('hidden');
    quizControls.classList.remove('hidden');
    tabQuiz.className = "flex-1 py-2 rounded-lg bg-indigo-600 text-white";
    tabFormulas.className = "flex-1 py-2 rounded-lg text-slate-400 hover:text-slate-200";
  }
}

// Default Fallback Initializer
document.addEventListener('DOMContentLoaded', () => {
  window.currentTopicData = {
    keyFormulas: [
      {
        tag: "Coulomb's Law",
        title: "Electrostatic Force Equation",
        formula: "F = k · (|q₁ · q₂| / r²)",
        description: "Measures attraction/repulsion between point charges. Inverse-square relationship with distance.",
        svgType: "circuit"
      }
    ],
    fullFormulas: [
      {
        tag: "Vector Form",
        title: "Coulomb's Law in Vector Form",
        formula: "F₁₂ = k · (q₁ · q₂ / |r₁₂|³) · r₁₂",
        description: "Obeys Newton's Third Law: F₁₂ = -F₂₁. Valid in vacuum conditions.",
        svgType: "vector"
      }
    ],
    quizzes: {
      tier1: [
        {
          q: "What happens to the electrostatic force if the distance between two charges is doubled?",
          options: ["Doubles", "Quadruples", "Halved", "Reduces to 1/4th"],
          ans: 3,
          exp: "Force follows inverse-square law: F ∝ 1/r². Doubling r yields F' = 1/(2)² = 1/4th.",
          conceptKey: "Inverse Square Dependence"
        }
      ],
      tier2: [],
      tier3: []
    }
  };

  loadFormulaDeck(window.currentTopicData.keyFormulas);
});
