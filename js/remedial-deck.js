// js/remedial-deck.js

window.generateRemedialCards = function(missedList) {
  const container = document.getElementById('remedial-cards-container');
  container.innerHTML = '';

  if (!missedList || missedList.length === 0) {
    container.innerHTML = `
      <div class="bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl text-xs text-emerald-300">
        🎉 Excellent! You scored 100% on this tier. Ready to move to the next difficulty level!
      </div>`;
    return;
  }

  missedList.forEach((qItem, idx) => {
    const card = document.createElement('div');
    card.className = "bg-slate-950 border border-amber-800/80 p-3 rounded-xl flex flex-col gap-1.5";
    card.innerHTML = `
      <span class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Concept Gap #${idx + 1}: ${qItem.conceptKey || 'Core Concept'}</span>
      <p class="text-xs text-slate-300 font-medium">Question Missed: "${qItem.q}"</p>
      <div class="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
        <strong class="text-indigo-300">Remedial Proof / Fix:</strong> ${qItem.exp}
      </div>
    `;
    container.appendChild(card);
  });
};
