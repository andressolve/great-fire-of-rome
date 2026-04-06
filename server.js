require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Anthropic = require("@anthropic-ai/sdk");
const scenario = require("./scenario");
const { buildSystemPrompt } = require("./prompts");

const app = express();
app.use(express.json());
app.use(express.static("public", { etag: false, lastModified: false, setHeaders: (res) => { res.set("Cache-Control", "no-store"); } }));

const anthropic = new Anthropic();
const sessions = new Map();

// Clean up sessions older than 24 hours
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.createdAt > 24 * 60 * 60 * 1000) {
      sessions.delete(id);
    }
  }
}, 10 * 60 * 1000);

// Create a new game session
app.post("/api/session", (req, res) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    witnesses: { nero: [], tigellinus: [], miriam: [] },
    verdict: null,
    createdAt: Date.now()
  });
  res.json({ sessionId });
});

// Get scenario data
app.get("/api/scenario", (req, res) => {
  const witnesses = {};
  for (const [id, w] of Object.entries(scenario.witnesses)) {
    witnesses[id] = {
      id: w.id,
      name: w.name,
      title: w.title,
      age: w.age,
      portrait: w.portrait,
      claims: w.claims,
      profile: w.profile
    };
  }
  res.json({
    title: scenario.title,
    setting: scenario.setting,
    briefing: scenario.briefing,
    assignment: scenario.assignment,
    witnesses,
    caseFile: scenario.caseFile,
    theories: Object.values(scenario.theories).map(t => ({
      id: t.id,
      label: t.label,
      description: t.description
    }))
  });
});

// Chat with a witness
app.post("/api/chat", async (req, res) => {
  const { sessionId, witnessId, message } = req.body;

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (!session.witnesses[witnessId]) return res.status(400).json({ error: "Invalid witness" });
  if (session.verdict) return res.status(400).json({ error: "Investigation closed — verdict already submitted" });

  session.witnesses[witnessId].push({ role: "user", content: message });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: buildSystemPrompt(witnessId),
      messages: session.witnesses[witnessId]
    });

    const reply = response.content[0].text;
    session.witnesses[witnessId].push({ role: "assistant", content: reply });
    res.json({ message: reply });
  } catch (err) {
    console.error("Claude API error:", err.message);
    session.witnesses[witnessId].pop();
    res.status(500).json({ error: "Failed to get response from witness" });
  }
});

// Submit verdict
app.post("/api/verdict", (req, res) => {
  const { sessionId, theoryId } = req.body;

  const session = sessions.get(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (session.verdict) return res.status(400).json({ error: "Verdict already submitted" });

  const theory = scenario.theories[theoryId];
  if (!theory) return res.status(400).json({ error: "Invalid theory" });

  session.verdict = theoryId;

  const interrogationStats = {};
  for (const [id, messages] of Object.entries(session.witnesses)) {
    interrogationStats[id] = {
      name: scenario.witnesses[id].name,
      questionsAsked: messages.filter(m => m.role === "user").length
    };
  }

  res.json({
    theory: theory.response,
    strength: theory.strength,
    keyClues: scenario.keyClues,
    interrogationStats
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  The Great Fire of Rome — 64 AD`);
  console.log(`  Server running at http://localhost:${PORT}\n`);
});
