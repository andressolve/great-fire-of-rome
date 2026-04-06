let sessionId = null;
let scenarioData = null;
let selectedTheory = null;

// --- INIT ---

async function init() {
  // Create session and load scenario in parallel
  const [sessionRes, scenarioRes] = await Promise.all([
    fetch("/api/session", { method: "POST" }).then(r => r.json()),
    fetch("/api/scenario").then(r => r.json())
  ]);

  sessionId = sessionRes.sessionId;
  scenarioData = scenarioRes;

  renderBriefing();
  buildInterrogation();
  buildVerdictModal();
}

// --- ACT 1: BRIEFING ---

function renderBriefing() {
  const container = document.getElementById("briefing-pages");

  scenarioData.briefing.forEach((page, i) => {
    const div = document.createElement("div");
    div.className = "briefing-page";
    div.innerHTML = `
      <h2>${page.title}</h2>
      <img class="page-image" src="${page.image}" alt="${page.title}">
      <div class="page-text">${page.text}</div>
    `;
    container.appendChild(div);
  });

  // Witnesses introduction page
  const witnessIntro = document.createElement("div");
  witnessIntro.className = "briefing-page witnesses-intro-page";
  witnessIntro.innerHTML = `
    <h2>Three Witnesses</h2>
    <div class="page-text" style="margin-bottom: 32px;">Two thousand years of politics, bias, and legend stand between you and the truth. These three were there that night. Each has a story. Each has something to hide.</div>
    <div class="witness-cards">
      ${Object.values(scenarioData.witnesses).map(w => `
        <div class="witness-intro-card">
          <img class="witness-intro-portrait" src="${w.portrait}" alt="${w.name}">
          <h3>${w.name}</h3>
          <div class="witness-intro-title">${w.title} &middot; Age ${w.age}</div>
          <p class="witness-intro-profile">${w.profile}</p>
        </div>
      `).join("")}
    </div>
  `;
  container.appendChild(witnessIntro);

  // Assignment section
  const assignment = document.getElementById("assignment-section");
  assignment.innerHTML = `
    <h2>Your Assignment</h2>
    <img class="page-image" src="${scenarioData.assignment.image}" alt="Your Assignment">
    <div class="page-text">${scenarioData.assignment.text}</div>
    <button class="btn" id="begin-btn">Begin Investigation</button>
  `;

  document.getElementById("begin-btn").addEventListener("click", () => {
    showScreen("interrogation-screen");
  });
}

// --- ACT 2: INTERROGATION ---

function buildInterrogation() {
  const panel = document.getElementById("witnesses-panel");

  for (const [id, witness] of Object.entries(scenarioData.witnesses)) {
    const col = document.createElement("div");
    col.className = "witness-column";
    col.id = `col-${id}`;
    col.innerHTML = `
      <div class="witness-header" id="header-${id}">
        <img class="witness-portrait" src="${witness.portrait}" alt="${witness.name}">
        <h3>${witness.name}</h3>
        <div class="witness-title">${witness.title} &middot; Age ${witness.age}</div>
        <div class="witness-claims">Claims: ${witness.claims}</div>
        <div class="witness-profile">${witness.profile}</div>
      </div>
      <div class="chat-area" id="chat-${id}">
        <div class="chat-message system">Begin questioning ${witness.name}...</div>
      </div>
      <div class="chat-input-row">
        <input type="text" id="input-${id}" placeholder="Ask ${witness.name}..." />
        <button id="send-${id}">Ask</button>
      </div>
    `;
    panel.appendChild(col);

    // Wire up send button and enter key
    const input = col.querySelector(`#input-${id}`);
    const sendBtn = col.querySelector(`#send-${id}`);

    sendBtn.addEventListener("click", () => sendMessage(id));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(id);
      }
    });
  }

  // Build case file sidebar
  buildCaseFile();

  // Verdict button
  document.getElementById("verdict-btn").addEventListener("click", () => {
    document.getElementById("verdict-modal").classList.add("active");
  });
}

function buildCaseFile() {
  const sidebar = document.getElementById("case-file");
  const cf = scenarioData.caseFile;

  for (const section of [cf.fire, cf.keyFacts, cf.sources]) {
    const div = document.createElement("div");
    div.className = "case-section";
    div.innerHTML = `
      <h3>${section.title}</h3>
      <ul>${section.facts.map(f => `<li>${f}</li>`).join("")}</ul>
    `;
    sidebar.appendChild(div);
  }
}

async function sendMessage(witnessId) {
  const input = document.getElementById(`input-${witnessId}`);
  const message = input.value.trim();
  if (!message) return;

  const chatArea = document.getElementById(`chat-${witnessId}`);
  const sendBtn = document.getElementById(`send-${witnessId}`);

  // Show user message
  appendMessage(chatArea, message, "user");
  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;

  // Show typing indicator
  const typing = document.createElement("div");
  typing.className = "typing-indicator";
  typing.innerHTML = "<span></span><span></span><span></span>";
  chatArea.appendChild(typing);
  chatArea.scrollTop = chatArea.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, witnessId, message })
    });

    const data = await res.json();
    typing.remove();

    if (data.error) {
      appendMessage(chatArea, data.error, "system");
    } else {
      appendMessage(chatArea, data.message, "witness");
    }
  } catch (err) {
    typing.remove();
    appendMessage(chatArea, "Connection lost. Try again.", "system");
  }

  input.disabled = false;
  sendBtn.disabled = false;
  input.focus();
}

function appendMessage(chatArea, text, type) {
  const div = document.createElement("div");
  div.className = `chat-message ${type}`;
  div.textContent = text;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// --- VERDICT MODAL ---

function buildVerdictModal() {
  const container = document.getElementById("theory-options");

  scenarioData.theories.forEach(theory => {
    const btn = document.createElement("button");
    btn.className = "theory-option";
    btn.innerHTML = `<h3>${theory.label}</h3><p>${theory.description}</p>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".theory-option").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedTheory = theory.id;
      document.getElementById("submit-verdict").disabled = false;
    });
    container.appendChild(btn);
  });

  document.getElementById("cancel-verdict").addEventListener("click", () => {
    document.getElementById("verdict-modal").classList.remove("active");
  });

  document.getElementById("submit-verdict").addEventListener("click", submitVerdict);
}

async function submitVerdict() {
  if (!selectedTheory) return;

  const submitBtn = document.getElementById("submit-verdict");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const res = await fetch("/api/verdict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, theoryId: selectedTheory })
    });

    const data = await res.json();
    document.getElementById("verdict-modal").classList.remove("active");
    renderReveal(data);
    showScreen("reveal-screen");
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Verdict";
  }
}

// --- ACT 3: REVEAL ---

function renderReveal(data) {
  const screen = document.getElementById("reveal-screen");
  const theory = data.theory;
  const strength = data.strength;

  // Strength label
  const strengthLabels = {
    strong: "Strongest Theory",
    moderate: "Debated Theory",
    weak: "Weakest Theory"
  };

  // Determine which evidence sections to show
  let evidenceSections = "";

  if (theory.forEvidence) {
    evidenceSections += `
      <div class="reveal-section">
        <h2>Evidence For This Theory</h2>
        <ul>${theory.forEvidence.map(e => `<li>${e}</li>`).join("")}</ul>
      </div>
    `;
  }

  if (theory.againstEvidence) {
    evidenceSections += `
      <div class="reveal-section">
        <h2>Evidence Against</h2>
        <ul>${theory.againstEvidence.map(e => `<li>${e}</li>`).join("")}</ul>
      </div>
    `;
  }

  if (theory.exploitationEvidence) {
    evidenceSections += `
      <div class="reveal-section">
        <h2>Evidence of Exploitation</h2>
        <ul>${theory.exploitationEvidence.map(e => `<li>${e}</li>`).join("")}</ul>
      </div>
    `;
  }

  // Interrogation stats
  const statsHtml = Object.entries(data.interrogationStats).map(([id, s]) => `
    <div class="stat-card">
      <div class="stat-name">${s.name}</div>
      <div class="stat-value">${s.questionsAsked}</div>
    </div>
  `).join("");

  // Clues — mark as "found" if the player talked to that witness, "missed" otherwise
  const cluesHtml = data.keyClues.map(c => {
    const talked = data.interrogationStats[c.witness]?.questionsAsked > 0;
    const cls = talked ? "found" : "missed";
    const witnessName = scenarioData.witnesses[c.witness]?.name || c.witness;
    return `
      <div class="clue-item ${cls}">
        <div class="clue-witness">${witnessName}</div>
        ${c.clue}
      </div>
    `;
  }).join("");

  screen.innerHTML = `
    <div class="reveal-header">
      <div class="reveal-strength ${strength}">${strengthLabels[strength]}</div>
      <h1>${theory.headline}</h1>
      <p class="reveal-summary">${theory.summary}</p>
    </div>

    <div class="stats-row">${statsHtml}</div>

    ${evidenceSections}

    <div class="reveal-consensus">
      <h3>What Modern Historians Think</h3>
      <p>${theory.modernConsensus}</p>
    </div>

    <div class="reveal-section">
      <h2>Clues From Your Investigation</h2>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
        Witnesses you questioned may have revealed these — witnesses you skipped hold clues you missed.
      </p>
      ${cluesHtml}
    </div>

    <div class="key-insight">
      <p>"The ancient sources were all written by senators who hated Nero. The truth about the Great Fire of Rome may never be known — but learning to question your sources is how you get closer to it."</p>
    </div>

    <div class="reveal-footer">
      <button class="btn" onclick="location.reload()">Investigate Again</button>
    </div>
  `;
}

// --- UTILS ---

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// --- GO ---
init();
