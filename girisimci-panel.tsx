import { useState, useEffect, useRef } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0D1B2A;
    color: #E8EDF2;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  .panel {
    display: flex;
    min-height: 100vh;
  }

  /* SIDEBAR */
  .sidebar {
    width: 220px;
    min-width: 220px;
    background: #0A1520;
    border-right: 1px solid #1A2D42;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #F4A32B;
    letter-spacing: -0.5px;
    margin-bottom: 32px;
    padding-left: 4px;
  }

  .logo span { color: #E8EDF2; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13.5px;
    font-weight: 500;
    color: #6B8299;
    transition: all 0.15s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: #1A2D42; color: #E8EDF2; }
  .nav-item.active { background: #1A2D42; color: #F4A32B; }

  .nav-divider {
    height: 1px;
    background: #1A2D42;
    margin: 12px 0;
  }

  .sidebar-bottom {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #1A2D42;
  }

  .user-tag {
    font-size: 12px;
    color: #4A6580;
    padding: 0 4px;
  }

  .user-name {
    font-size: 14px;
    font-weight: 600;
    color: #E8EDF2;
    padding: 0 4px;
    margin-top: 2px;
  }

  /* MAIN */
  .main {
    flex: 1;
    padding: 36px 40px;
    overflow-y: auto;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  .page-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #E8EDF2;
    letter-spacing: -0.5px;
  }

  .page-subtitle {
    font-size: 13px;
    color: #4A6580;
    margin-top: 4px;
  }

  .date-badge {
    background: #1A2D42;
    border: 1px solid #243C56;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 12px;
    color: #6B8299;
    font-weight: 500;
  }

  /* PROJECT CARDS */
  .projects-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }

  .project-card {
    background: #0F2235;
    border: 1px solid #1A2D42;
    border-radius: 14px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }

  .project-card.velmora::before { background: linear-gradient(90deg, #F4A32B, #FF7E5F); }
  .project-card.trading::before { background: linear-gradient(90deg, #3DD9B3, #1E90FF); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .card-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #4A6580;
    margin-bottom: 4px;
  }

  .card-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #E8EDF2;
  }

  .momentum-score {
    text-align: right;
  }

  .momentum-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }

  .velmora .momentum-num { color: #F4A32B; }
  .trading .momentum-num { color: #3DD9B3; }

  .momentum-label {
    font-size: 10px;
    color: #4A6580;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 2px;
  }

  .progress-bar {
    background: #1A2D42;
    height: 4px;
    border-radius: 4px;
    margin-bottom: 16px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.8s ease;
  }

  .velmora .progress-fill { background: linear-gradient(90deg, #F4A32B, #FF7E5F); }
  .trading .progress-fill { background: linear-gradient(90deg, #3DD9B3, #1E90FF); }

  .card-stats {
    display: flex;
    gap: 20px;
  }

  .stat {
    flex: 1;
  }

  .stat-val {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #E8EDF2;
  }

  .stat-key {
    font-size: 11px;
    color: #4A6580;
    margin-top: 2px;
  }

  /* STATUS CHIPS */
  .chip {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .chip-orange { background: rgba(244,163,43,0.15); color: #F4A32B; }
  .chip-mint { background: rgba(61,217,179,0.15); color: #3DD9B3; }
  .chip-blue { background: rgba(30,144,255,0.15); color: #1E90FF; }

  /* BOTTOM ROW */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 20px;
  }

  /* TASKS */
  .section-card {
    background: #0F2235;
    border: 1px solid #1A2D42;
    border-radius: 14px;
    padding: 24px;
  }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #E8EDF2;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .task-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #1A2D42;
    cursor: pointer;
  }

  .task-item:last-child { border-bottom: none; }

  .task-check {
    width: 16px;
    height: 16px;
    border: 2px solid #2A4060;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .task-check.done {
    background: #3DD9B3;
    border-color: #3DD9B3;
  }

  .task-text {
    font-size: 13px;
    color: #C4D4E0;
    line-height: 1.4;
    flex: 1;
  }

  .task-text.done { color: #4A6580; text-decoration: line-through; }

  .task-tag {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .tag-velmora { background: rgba(244,163,43,0.12); color: #F4A32B; }
  .tag-trading { background: rgba(61,217,179,0.12); color: #3DD9B3; }

  /* AI ASSISTANT */
  .ai-section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ai-messages {
    flex: 1;
    overflow-y: auto;
    max-height: 260px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 14px;
    padding-right: 4px;
  }

  .ai-messages::-webkit-scrollbar { width: 4px; }
  .ai-messages::-webkit-scrollbar-track { background: #0D1B2A; }
  .ai-messages::-webkit-scrollbar-thumb { background: #2A4060; border-radius: 4px; }

  .msg {
    max-width: 88%;
    padding: 10px 13px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.5;
  }

  .msg.user {
    align-self: flex-end;
    background: #1A3A5C;
    color: #C4D4E0;
    border-bottom-right-radius: 3px;
  }

  .msg.ai {
    align-self: flex-start;
    background: #132A1F;
    color: #C4D4E0;
    border-bottom-left-radius: 3px;
    border-left: 2px solid #3DD9B3;
  }

  .msg.ai.loading {
    color: #4A6580;
    font-style: italic;
  }

  .ai-input-row {
    display: flex;
    gap: 8px;
  }

  .ai-input {
    flex: 1;
    background: #1A2D42;
    border: 1px solid #243C56;
    border-radius: 8px;
    padding: 9px 13px;
    color: #E8EDF2;
    font-size: 13px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.15s;
  }

  .ai-input:focus { border-color: #3DD9B3; }
  .ai-input::placeholder { color: #4A6580; }

  .ai-btn {
    background: #3DD9B3;
    color: #0D1B2A;
    border: none;
    border-radius: 8px;
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
  }

  .ai-btn:hover { opacity: 0.85; }
  .ai-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* QUICK ACTIONS */
  .quick-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .quick-btn {
    background: #1A2D42;
    border: 1px solid #243C56;
    color: #6B8299;
    font-size: 11px;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.15s;
  }

  .quick-btn:hover { border-color: #3DD9B3; color: #3DD9B3; }

  @media (max-width: 900px) {
    .projects-row { grid-template-columns: 1fr; }
    .bottom-row { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .main { padding: 20px; }
  }
`;

const INITIAL_TASKS = [
  { id: 1, text: "FCC sertifikasyon başvurusunu araştır", tag: "velmora", done: false },
  { id: 2, text: "Amazon listing fotoğraflarını hazırla", tag: "velmora", done: false },
  { id: 3, text: "Tuya entegrasyon dökümanını incele", tag: "velmora", done: true },
  { id: 4, text: "Python — Kaggle kurs modülü 3'ü bitir", tag: "trading", done: false },
  { id: 5, text: "Freqtrade demo ortamını kur", tag: "trading", done: false },
  { id: 6, text: "DDP vs DAP maliyet karşılaştırması yap", tag: "velmora", done: false },
];

const SYSTEM_PROMPT = `Sen İbrahim'in kişisel girişimcilik asistanısın. İbrahim'in iki aktif projesi var:

1. VELMORA (e-ticaret): Amazon FBA için kameralı smart pet feeder ürünü. Çin'den tedarik ediliyor, ABD pazarı hedefleniyor. FCC sertifikasyonu lazım, Tuya app entegrasyonu var. Rakipler: PETLIBRO, WOPET. Helium 10 araştırma aracı kullanılıyor.

2. QUANT TRADING (algo trading): Python öğrenerek başlıyor (Kaggle), sonra Freqtrade backtesting, ardından AI layer (Scikit-learn). Sıfırdan öğreniyor.

Kısa, net, Türkçe cevap ver. Girişimci ruhunu destekle, pratik öneriler sun. Maksimum 3 paragraf.`;

export default function GirisimciPanel() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Merhaba İbrahim! Bugün hangi projeye odaklanıyoruz — Velmora mı, trading mi?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const messagesEndRef = useRef(null);

  const today = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });

  const doneCount = tasks.filter(t => t.done).length;
  const velmoraProgress = 42;
  const tradingProgress = 18;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);
    setMessages(prev => [...prev, { role: "ai", text: "Düşünüyorum...", loading: true }]);

    try {
      const history = messages
        .filter(m => !m.loading)
        .map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: userText }]
        })
      });

      const data = await res.json();
      const reply = data.content?.map(c => c.text || "").join("") || "Bir hata oluştu.";
      setMessages(prev => [...prev.slice(0, -1), { role: "ai", text: reply }]);
    } catch {
      setMessages(prev => [...prev.slice(0, -1), { role: "ai", text: "Bağlantı hatası oluştu." }]);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Panel" },
    { id: "velmora", icon: "🛍", label: "Velmora" },
    { id: "trading", icon: "📈", label: "Trading" },
    { id: "tasks", icon: "✓", label: "Görevler" },
  ];

  const quickQuestions = [
    "Bugün ne yapmalıyım?",
    "FCC sürecini anlat",
    "Trading'e nasıl başlarım?",
    "Velmora rakip analizi",
  ];

  return (
    <>
      <style>{STYLE}</style>
      <div className="panel">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">İ<span>.</span>HUB</div>
          {navItems.map(n => (
            <button
              key={n.id}
              className={`nav-item ${activeNav === n.id ? "active" : ""}`}
              onClick={() => setActiveNav(n.id)}
            >
              <span>{n.icon}</span> {n.label}
            </button>
          ))}
          <div className="nav-divider" />
          <button className="nav-item">
            <span>⚙</span> Ayarlar
          </button>
          <div className="sidebar-bottom">
            <div className="user-tag">Girişimci</div>
            <div className="user-name">İbrahim</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="page-header">
            <div>
              <div className="page-title">Komuta Merkezi</div>
              <div className="page-subtitle">İki projen, tek bakış</div>
            </div>
            <div className="date-badge">{today}</div>
          </div>

          {/* PROJECT CARDS */}
          <div className="projects-row">
            {/* VELMORA */}
            <div className="project-card velmora">
              <div className="card-header">
                <div>
                  <div className="card-label">E-Ticaret</div>
                  <div className="card-name">Velmora</div>
                  <div style={{ marginTop: 8 }}>
                    <span className="chip chip-orange">FCC Bekliyor</span>
                  </div>
                </div>
                <div className="momentum-score">
                  <div className="momentum-num">42</div>
                  <div className="momentum-label">Momentum</div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${velmoraProgress}%` }} />
              </div>
              <div className="card-stats">
                <div className="stat">
                  <div className="stat-val">Smart Feeder</div>
                  <div className="stat-key">Ürün</div>
                </div>
                <div className="stat">
                  <div className="stat-val">ABD</div>
                  <div className="stat-key">Hedef Pazar</div>
                </div>
                <div className="stat">
                  <div className="stat-val">Amazon FBA</div>
                  <div className="stat-key">Kanal</div>
                </div>
              </div>
            </div>

            {/* TRADING */}
            <div className="project-card trading">
              <div className="card-header">
                <div>
                  <div className="card-label">Algo Trading</div>
                  <div className="card-name">Quant Sistemi</div>
                  <div style={{ marginTop: 8 }}>
                    <span className="chip chip-mint">Öğrenme Aşaması</span>
                  </div>
                </div>
                <div className="momentum-score">
                  <div className="momentum-num">18</div>
                  <div className="momentum-label">Momentum</div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${tradingProgress}%` }} />
              </div>
              <div className="card-stats">
                <div className="stat">
                  <div className="stat-val">Python</div>
                  <div className="stat-key">Şu An</div>
                </div>
                <div className="stat">
                  <div className="stat-val">Freqtrade</div>
                  <div className="stat-key">Sonraki Adım</div>
                </div>
                <div className="stat">
                  <div className="stat-val">AI Layer</div>
                  <div className="stat-key">Hedef</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="bottom-row">
            {/* TASKS */}
            <div className="section-card">
              <div className="section-title">
                <span>✓</span>
                Görevler
                <span style={{ marginLeft: "auto", fontSize: 12, color: "#4A6580", fontWeight: 400 }}>
                  {doneCount}/{tasks.length} tamamlandı
                </span>
              </div>
              {tasks.map(task => (
                <div key={task.id} className="task-item" onClick={() => toggleTask(task.id)}>
                  <div className={`task-check ${task.done ? "done" : ""}`}>
                    {task.done && <span style={{ color: "#0D1B2A", fontSize: 10, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div className={`task-text ${task.done ? "done" : ""}`}>{task.text}</div>
                  <div className={`task-tag ${task.tag === "velmora" ? "tag-velmora" : "tag-trading"}`}>
                    {task.tag === "velmora" ? "V" : "T"}
                  </div>
                </div>
              ))}
            </div>

            {/* AI ASSISTANT */}
            <div className="section-card">
              <div className="section-title">
                <span style={{ color: "#3DD9B3" }}>◈</span>
                AI Danışman
              </div>
              <div className="ai-section">
                <div className="quick-btns">
                  {quickQuestions.map(q => (
                    <button key={q} className="quick-btn" onClick={() => sendMessage(q)}>{q}</button>
                  ))}
                </div>
                <div className="ai-messages">
                  {messages.map((m, i) => (
                    <div key={i} className={`msg ${m.role} ${m.loading ? "loading" : ""}`}>
                      {m.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="ai-input-row">
                  <input
                    className="ai-input"
                    placeholder="Bir şey sor..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    disabled={loading}
                  />
                  <button className="ai-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                    Sor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
