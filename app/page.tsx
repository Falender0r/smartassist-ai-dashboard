"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Translations (Lengkap) ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    // Navigation
    appName: "SmartAssist", version: "Enterprise v3.0", platform: "Platform",
    conversations: "Conversations", tickets: "Tickets", analytics: "Analytics", settings: "Settings",
    darkMode: "Dark Mode", lightMode: "Light Mode", live: "Live",
    search: "Search", notifications: "Notifications", noNotifications: "No notifications",
    poweredBy: "Powered by SmartAssist AI v3.0 · Built by falender0r",
    send: "Send", typeMessage: "Type a message or describe a customer issue…",
    suggestions: ["refund request", "ticket status", "analytics", "reset password", "API status", "help"],
    // Chat
    aiOnline: "👋 SmartAssist AI v3.0 online. I'm your intelligent support coordinator. Ask about tickets, analytics, integrations, or type a customer issue for instant triage.",
    aiTyping: "AI is thinking",
    // Tickets
    ticketId: "ID", ticketCustomer: "Customer", ticketSubject: "Subject", 
    ticketStatus: "Status", ticketPriority: "Priority", ticketOpened: "Opened",
    allTickets: "All", ticketOpen: "Open", ticketProgress: "In Progress", ticketResolved: "Resolved",
    newTicket: "New Ticket", createTicket: "Create Ticket", cancel: "Cancel",
    customerName: "Customer name", issueSubject: "Issue subject",
    // Analytics
    conversations: "Conversations", resolutionRate: "Resolution Rate", avgResponse: "Avg Response", csat: "CSAT Score",
    weeklyConversations: "Weekly Conversations", liveActivity: "Live Activity", channelBreakdown: "Channel Breakdown",
    aiPerformance: "AI Engine Performance", autoResolution: "Auto-resolution rate", intentRecognition: "Intent recognition",
    sentimentAccuracy: "Sentiment accuracy", spamFiltering: "Spam filtering", firstContact: "First-contact resolution",
    // Settings
    appearance: "Appearance", language: "Language / Bahasa", accountProfile: "Account Profile",
    displayName: "Display Name", email: "Email", github: "GitHub", timezone: "Timezone",
    notificationPrefs: "Notification Preferences", emailAlerts: "Email alerts", slackNotif: "Slack notifications",
    smsAlert: "SMS for High priority", dailyDigest: "Daily digest", saveChanges: "Save Changes",
    settingsSaved: "Settings Saved!", verified: "Verified Developer",
    // AI Responses
    aiHelpEn: "I can help with: tickets, analytics, API, refunds, password reset, and integrations.",
    aiPasswordEn: "🔐 To reset password: Login page → Forgot Password → Check email. Type 'send reset link' to receive email.",
    aiResetLinkEn: "✅ Reset link sent to farasdakalfaris@gmail.com. Check inbox/spam.",
    aiRefundEn: "💰 Refund initiated. Processing 3-5 days. Ticket #REF-",
    aiTicketEn: "🎫 6 active tickets: 3 Open, 2 In Progress, 1 Review. Want details?",
    aiAnalyticsEn: "📊 Live metrics: 1,247 conversations (+23%), 94% satisfaction, 2.4 min avg response.",
    aiApiEn: "⚡ API status: Operational. Rate limit: 500 req/min (23% used). Docs: api.smartassist.io",
    aiStatusEn: "🟢 All systems operational. Uptime: 99.97% over 30 days.",
    aiHelpId: "Saya bisa bantu: tiket, analitik, API, refund, reset password, dan integrasi.",
    aiPasswordId: "🔐 Reset password: Halaman Login → Lupa Password → Cek email. Ketik 'kirim link reset' untuk menerima email.",
    aiResetLinkId: "✅ Link reset telah dikirim ke farasdakalfaris@gmail.com. Cek inbox/spam.",
    aiRefundId: "💰 Refund diproses 3-5 hari. Tiket #REF-",
    aiTicketId: "🎫 6 tiket aktif: 3 Terbuka, 2 Diproses, 1 Ditinjau. Mau detail?",
    aiAnalyticsId: "📊 Metrik langsung: 1,247 percakapan (+23%), 94% kepuasan, 2.4 menit rata-rata respon.",
    aiApiId: "⚡ Status API: Operasional. Rate limit: 500 req/min (23% terpakai). Docs: api.smartassist.io",
    aiStatusId: "🟢 Semua sistem operasional. Uptime: 99.97% selama 30 hari.",
  },
  id: {
    appName: "SmartAssist", version: "Enterprise v3.0", platform: "Platform",
    conversations: "Percakapan", tickets: "Tiket", analytics: "Analitik", settings: "Pengaturan",
    darkMode: "Mode Gelap", lightMode: "Mode Terang", live: "Aktif",
    search: "Cari", notifications: "Notifikasi", noNotifications: "Tidak ada notifikasi",
    poweredBy: "Didukung oleh SmartAssist AI v3.0 · Dibuat oleh falender0r",
    send: "Kirim", typeMessage: "Ketik pesan atau deskripsikan masalah pelanggan…",
    suggestions: ["permintaan refund", "status tiket", "analitik", "reset password", "status API", "bantuan"],
    aiOnline: "👋 SmartAssist AI v3.0 online. Saya asisten cerdas Anda. Tanya tentang tiket, analitik, integrasi, atau ketik masalah pelanggan.",
    aiTyping: "AI sedang mengetik",
    ticketId: "ID", ticketCustomer: "Pelanggan", ticketSubject: "Subjek",
    ticketStatus: "Status", ticketPriority: "Prioritas", ticketOpened: "Dibuka",
    allTickets: "Semua", ticketOpen: "Terbuka", ticketProgress: "Diproses", ticketResolved: "Selesai",
    newTicket: "Tiket Baru", createTicket: "Buat Tiket", cancel: "Batal",
    customerName: "Nama pelanggan", issueSubject: "Subjek masalah",
    conversations: "Percakapan", resolutionRate: "Tingkat Resolusi", avgResponse: "Rata-rata Respon", csat: "Skor CSAT",
    weeklyConversations: "Percakapan Mingguan", liveActivity: "Aktivitas Langsung", channelBreakdown: "Rincian Saluran",
    aiPerformance: "Kinerja AI", autoResolution: "Tingkat resolusi otomatis", intentRecognition: "Pengenalan maksud",
    sentimentAccuracy: "Akurasi sentimen", spamFiltering: "Penyaringan spam", firstContact: "Respon pertama tertutup",
    appearance: "Tampilan", language: "Bahasa", accountProfile: "Profil Akun",
    displayName: "Nama Tampilan", email: "Email", github: "GitHub", timezone: "Zona Waktu",
    notificationPrefs: "Preferensi Notifikasi", emailAlerts: "Peringatan email", slackNotif: "Notifikasi Slack",
    smsAlert: "SMS untuk prioritas Tinggi", dailyDigest: "Ringkasan harian", saveChanges: "Simpan Perubahan",
    settingsSaved: "Pengaturan Tersimpan!", verified: "Developer Tervalidasi",
    aiHelpEn: "I can help with: tickets, analytics, API, refunds, password reset, and integrations.",
    aiPasswordEn: "🔐 To reset password: Login page → Forgot Password → Check email. Type 'send reset link' to receive email.",
    aiResetLinkEn: "✅ Reset link sent to farasdakalfaris@gmail.com. Check inbox/spam.",
    aiRefundEn: "💰 Refund initiated. Processing 3-5 days. Ticket #REF-",
    aiTicketEn: "🎫 6 active tickets: 3 Open, 2 In Progress, 1 Review. Want details?",
    aiAnalyticsEn: "📊 Live metrics: 1,247 conversations (+23%), 94% satisfaction, 2.4 min avg response.",
    aiApiEn: "⚡ API status: Operational. Rate limit: 500 req/min (23% used). Docs: api.smartassist.io",
    aiStatusEn: "🟢 All systems operational. Uptime: 99.97% over 30 days.",
    aiHelpId: "Saya bisa bantu: tiket, analitik, API, refund, reset password, dan integrasi.",
    aiPasswordId: "🔐 Reset password: Halaman Login → Lupa Password → Cek email. Ketik 'kirim link reset' untuk menerima email.",
    aiResetLinkId: "✅ Link reset telah dikirim ke farasdakalfaris@gmail.com. Cek inbox/spam.",
    aiRefundId: "💰 Refund diproses 3-5 hari. Tiket #REF-",
    aiTicketId: "🎫 6 tiket aktif: 3 Terbuka, 2 Diproses, 1 Ditinjau. Mau detail?",
    aiAnalyticsId: "📊 Metrik langsung: 1,247 percakapan (+23%), 94% kepuasan, 2.4 menit rata-rata respon.",
    aiApiId: "⚡ Status API: Operasional. Rate limit: 500 req/min (23% terpakai). Docs: api.smartassist.io",
    aiStatusId: "🟢 Semua sistem operasional. Uptime: 99.97% selama 30 hari.",
  },
};

// ─── AI Response Engine (Lengkap dengan switch bahasa) ────────────────────────────────────
function getAIReply(text, lang, t) {
  const m = text.toLowerCase();
  const isEn = lang === 'en';
  
  // Password related
  if (m.includes("password") || m.includes("ganti password") || m.includes("reset") || m.includes("kata sandi")) {
    return isEn ? t.aiPasswordEn : t.aiPasswordId;
  }
  if (m.includes("send reset link") || m.includes("kirim link") || m.includes("reset link")) {
    return isEn ? t.aiResetLinkEn : t.aiResetLinkId;
  }
  
  // Help
  if (m.includes("help") || m.includes("bantuan") || m.includes("tolong")) {
    return isEn ? t.aiHelpEn : t.aiHelpId;
  }
  
  // Refund
  if (m.includes("refund") || m.includes("return") || m.includes("money back") || m.includes("kembalikan")) {
    return (isEn ? t.aiRefundEn : t.aiRefundId) + (Math.floor(Math.random() * 9000) + 1000);
  }
  
  // Ticket
  if (m.includes("ticket") || m.includes("tiket") || m.includes("issue") || m.includes("open")) {
    return isEn ? t.aiTicketEn : t.aiTicketId;
  }
  
  // Analytics / metrics
  if (m.includes("analytic") || m.includes("metric") || m.includes("stat") || m.includes("data") || m.includes("analitik")) {
    return isEn ? t.aiAnalyticsEn : t.aiAnalyticsId;
  }
  
  // API
  if (m.includes("api") || m.includes("endpoint") || m.includes("rate limit")) {
    return isEn ? t.aiApiEn : t.aiApiId;
  }
  
  // Status
  if (m.includes("status") || m.includes("uptime") || m.includes("system") || m.includes("health")) {
    return isEn ? t.aiStatusEn : t.aiStatusId;
  }
  
  // Greeting
  if (m.includes("hi") || m.includes("halo") || m.includes("hello") || m.includes("hey") || m.includes("selamat") || m.includes("hai")) {
    return isEn ? "Hello! 👋 How can I help you today? Type 'help' to see what I can do." : "Halo! 👋 Ada yang bisa saya bantu? Ketik 'help' untuk melihat kemampuan saya.";
  }
  
  // Default
  return isEn 
    ? `🤔 I understand you're asking about: "${text.slice(0, 50)}". Type "help" for assistance or ask about: tickets, analytics, API, password reset.`
    : `🤔 Saya memahami pertanyaan Anda tentang: "${text.slice(0, 50)}". Ketik "help" untuk bantuan atau tanya tentang: tiket, analitik, API, reset password.`;
}

// ─── Data ────────────────────────────────────────────────────────────────────────────────
const TICKETS_DATA = [
  { id: "#TKT-4421", customer: "Acme Corp", subject: "API rate limit exceeded", status: "Open", priority: "High", agent: "Unassigned", opened: "2h ago", channel: "API" },
  { id: "#TKT-4422", customer: "TechStart Inc", subject: "Refund request", status: "In Progress", priority: "Medium", agent: "Rina S.", opened: "5h ago", channel: "WhatsApp" },
  { id: "#TKT-4423", customer: "Global Solutions", subject: "Login issue", status: "Resolved", priority: "Low", agent: "Budi P.", opened: "1d ago", channel: "Slack" },
  { id: "#TKT-4424", customer: "Creative Studio", subject: "Billing discrepancy", status: "Open", priority: "High", agent: "Unassigned", opened: "3h ago", channel: "Email" },
  { id: "#TKT-4425", customer: "E-Shop Retail", subject: "Feature request", status: "Review", priority: "Medium", agent: "Maya R.", opened: "1d ago", channel: "API" },
  { id: "#TKT-4426", customer: "NovaTech GmbH", subject: "Webhook not firing", status: "In Progress", priority: "High", agent: "Rina S.", opened: "6h ago", channel: "Slack" },
];

const ACTIVITY = [
  { textEn: "Ticket #4421 auto-escalated by AI", textId: "Tiket #4421 di-eskalasi otomatis oleh AI", time: "1m ago", type: "warn" },
  { textEn: "Acme Corp API integration verified", textId: "Integrasi API Acme Corp diverifikasi", time: "14m ago", type: "ok" },
  { textEn: "WhatsApp channel: 234 msgs routed", textId: "Saluran WhatsApp: 234 pesan dirutekan", time: "32m ago", type: "ok" },
  { textEn: "New ticket from Creative Studio", textId: "Tiket baru dari Creative Studio", time: "3h ago", type: "info" },
  { textEn: "AI model retrained on 500 new tickets", textId: "Model AI dilatih ulang dengan 500 tiket baru", time: "5h ago", type: "info" },
  { textEn: "SLA breach alert: #TKT-4424", textId: "Peringatan pelanggaran SLA: #TKT-4424", time: "6h ago", type: "warn" },
  { textEn: "Monthly report generated", textId: "Laporan bulanan dibuat", time: "1d ago", type: "ok" },
];

const BAR_DATA = [
  { label: "Mon", val: 87 }, { label: "Tue", val: 134 }, { label: "Wed", val: 112 },
  { label: "Thu", val: 198 }, { label: "Fri", val: 224 }, { label: "Sat", val: 76 }, { label: "Sun", val: 43 },
];

// ─── Utilities ───────────────────────────────────────────────────────────────────────────
const fmt = (ts) => ts ? new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "";
const fmtDate = () => new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const statusCfg = {
  "Open": { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-700 dark:text-red-400", dot: "bg-red-500 dark:bg-red-400" },
  "In Progress": { bg: "bg-amber-100 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500 dark:bg-amber-400" },
  "Resolved": { bg: "bg-emerald-100 dark:bg-emerald-500/10", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500 dark:bg-emerald-400" },
  "Review": { bg: "bg-violet-100 dark:bg-violet-500/10", text: "text-violet-700 dark:text-violet-400", dot: "bg-violet-500 dark:bg-violet-400" },
};

const priorityCfg = {
  "High": { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-700 dark:text-red-400" },
  "Medium": { bg: "bg-amber-100 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-400" },
  "Low": { bg: "bg-sky-100 dark:bg-sky-500/10", text: "text-sky-700 dark:text-sky-400" },
};

function Badge({ cfg, text }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.dot && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />}
      {text}
    </span>
  );
}

function StatCard({ label, value, trend, icon, darkMode }) {
  return (
    <div className={`relative overflow-hidden rounded-xl p-5 transition-all duration-300 ${darkMode ? "border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]" : "border border-gray-200 bg-white shadow-sm hover:shadow-md"}`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium tracking-wide uppercase ${darkMode ? "text-white/40" : "text-gray-500"}`}>{label}</span>
        <span className="text-lg text-violet-500 dark:text-violet-400">{icon}</span>
      </div>
      <div className={`text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</div>
      <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><span>↑</span>{trend}</div>
    </div>
  );
}

// ─── Chat Section ────────────────────────────────────────────────────────────────────────
function ChatSection({ darkMode, lang, t }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: "ai", content: t.aiOnline, ts: Date.now() }]);
  }, [lang, t]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = useCallback((text) => {
    const txt = (text || input).trim();
    if (!txt) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: txt, ts: Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "ai", content: getAIReply(txt, lang, t), ts: Date.now() }]);
    }, 600);
  }, [input, lang, t]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "ai" && (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${darkMode ? "bg-violet-500/20 border border-violet-500/30" : "bg-violet-100 border border-violet-200"}`}>
                <span className={`text-xs font-bold ${darkMode ? "text-violet-400" : "text-violet-600"}`}>AI</span>
              </div>
            )}
            <div className={`max-w-[75%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-violet-600 text-white rounded-br-sm"
                  : darkMode 
                    ? "bg-white/[0.05] border border-white/[0.08] text-white/90 rounded-bl-sm"
                    : "bg-gray-100 border border-gray-200 text-gray-800 rounded-bl-sm"
              }`}>
                {m.content}
              </div>
              <span className={`text-[10px] mt-1 px-1 ${darkMode ? "text-white/30" : "text-gray-400"}`}>{fmt(m.ts)}</span>
            </div>
            {m.role === "user" && (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${darkMode ? "bg-white/[0.06] border border-white/10" : "bg-gray-200 border border-gray-300"}`}>
                <span className={`text-xs font-bold ${darkMode ? "text-white/40" : "text-gray-600"}`}>U</span>
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-violet-500/20 border border-violet-500/30" : "bg-violet-100 border border-violet-200"}`}>
              <span className={`text-xs font-bold ${darkMode ? "text-violet-400" : "text-violet-600"}`}>AI</span>
            </div>
            <div className={`rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center ${darkMode ? "bg-white/[0.05] border border-white/[0.08]" : "bg-gray-100 border border-gray-200"}`}>
              {[0, 150, 300].map(d => <span key={d} style={{ animationDelay: `${d}ms` }} className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 animate-bounce" />)}
              <span className={`text-xs ml-1 ${darkMode ? "text-white/40" : "text-gray-400"}`}>{t.aiTyping}</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-5 pb-2 flex gap-2 flex-wrap">
        {t.suggestions.map(s => (
          <button key={s} onClick={() => send(s)} className={`text-xs px-3 py-1 rounded-lg border transition-all ${darkMode ? "border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-violet-500/40" : "border-gray-300 bg-white text-gray-600 hover:text-violet-600 hover:border-violet-400 hover:bg-violet-50"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="px-5 pb-5 pt-2">
        <div className={`flex gap-2 p-1 rounded-xl transition-all ${darkMode ? "border border-white/[0.08] bg-white/[0.03] focus-within:border-violet-500/50" : "border border-gray-300 bg-white focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t.typeMessage}
            className={`flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none ${darkMode ? "text-white/80 placeholder-white/30" : "text-gray-800 placeholder-gray-400"}`}
          />
          <button onClick={() => send()} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span className="hidden sm:inline">{t.send}</span>
          </button>
        </div>
        <p className={`text-[10px] mt-2 text-center ${darkMode ? "text-white/30" : "text-gray-400"}`}>{t.poweredBy}</p>
      </div>
    </div>
  );
}

// ─── Tickets Section ────────────────────────────────────────────────────────────────────
function TicketsSection({ darkMode, t }) {
  const [tickets, setTickets] = useState(TICKETS_DATA);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newTicket, setNewTicket] = useState({ customer: "", subject: "", priority: "Medium" });

  const statuses = ["All", t.ticketOpen, t.ticketProgress, t.ticketResolved];
  const statusMap = { [t.ticketOpen]: "Open", [t.ticketProgress]: "In Progress", [t.ticketResolved]: "Resolved" };
  
  const filtered = tickets.filter(ticket => {
    const matchStatus = filter === "All" || ticket.status === (statusMap[filter] || filter);
    const matchSearch = !search || ticket.customer.toLowerCase().includes(search.toLowerCase()) || ticket.subject.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const addTicket = () => {
    if (!newTicket.customer || !newTicket.subject) return;
    const id = `#TKT-${Math.floor(Math.random() * 9000) + 1000}`;
    setTickets(prev => [{ id, customer: newTicket.customer, subject: newTicket.subject, status: "Open", priority: newTicket.priority, agent: "Unassigned", opened: "just now", channel: "API" }, ...prev]);
    setNewTicket({ customer: "", subject: "", priority: "Medium" });
    setShowNew(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className={`px-5 py-4 border-b flex-shrink-0 ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <svg width="13" height="13" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder={t.search} value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full rounded-lg pl-8 pr-3 py-2 text-sm transition-all ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder-white/25 focus:border-violet-500/50" : "bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-400 focus:border-violet-500"}`} />
          </div>
          <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {t.newTicket}
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${filter === s ? "bg-violet-600 text-white" : darkMode ? "bg-white/[0.04] text-white/50 hover:text-white/80 border border-white/[0.08]" : "bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-200 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {showNew && (
        <div className="mx-5 mt-4 p-4 rounded-xl border border-violet-500/30 bg-violet-500/5 flex-shrink-0">
          <p className="text-xs font-medium text-violet-500 dark:text-violet-400 mb-3">{t.createTicket}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input placeholder={t.customerName} value={newTicket.customer} onChange={(e) => setNewTicket(p => ({ ...p, customer: e.target.value }))} className={`rounded-lg px-3 py-2 text-sm transition-all ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder-white/25" : "bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-400"}`} />
            <input placeholder={t.issueSubject} value={newTicket.subject} onChange={(e) => setNewTicket(p => ({ ...p, subject: e.target.value }))} className={`rounded-lg px-3 py-2 text-sm transition-all ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder-white/25" : "bg-gray-100 border border-gray-200 text-gray-700 placeholder-gray-400"}`} />
            <select value={newTicket.priority} onChange={(e) => setNewTicket(p => ({ ...p, priority: e.target.value }))} className={`rounded-lg px-3 py-2 text-sm transition-all ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/60" : "bg-gray-100 border border-gray-200 text-gray-600"}`}>
              <option value="High">High Priority</option><option value="Medium">Medium Priority</option><option value="Low">Low Priority</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addTicket} className="px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-medium">{t.createTicket}</button>
            <button onClick={() => setShowNew(false)} className={`px-4 py-1.5 rounded-lg text-xs ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80" : "bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700"}`}>{t.cancel}</button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto px-5 py-4">
        <table className="w-full min-w-[600px]">
          <thead><tr className={`border-b ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
            {[t.ticketId, t.ticketCustomer, t.ticketSubject, t.ticketStatus, t.ticketPriority, t.ticketOpened].map(h => <th key={h} className={`text-left text-[10px] font-semibold uppercase tracking-widest pb-3 pr-4 ${darkMode ? "text-white/30" : "text-gray-500"}`}>{h}</th>)}
          </tr></thead>
          <tbody>{filtered.map(ticket => (
            <tr key={ticket.id} className={`border-b transition-all ${darkMode ? "border-white/[0.04] hover:bg-white/[0.02]" : "border-gray-100 hover:bg-gray-50"}`}>
              <td className={`py-3 pr-4 font-mono text-[11px] ${darkMode ? "text-white/40" : "text-gray-500"}`}>{ticket.id}</td>
              <td className={`py-3 pr-4 text-sm font-medium ${darkMode ? "text-white/80" : "text-gray-800"}`}>{ticket.customer}</td>
              <td className={`py-3 pr-4 text-sm max-w-[180px] truncate ${darkMode ? "text-white/60" : "text-gray-600"}`}>{ticket.subject}</td>
              <td className="py-3 pr-4"><Badge cfg={statusCfg[ticket.status]} text={ticket.status} /></td>
              <td className="py-3 pr-4"><Badge cfg={priorityCfg[ticket.priority]} text={ticket.priority} /></td>
              <td className={`py-3 text-xs ${darkMode ? "text-white/40" : "text-gray-500"}`}>{ticket.opened}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Analytics Section ──────────────────────────────────────────────────────────────────
function AnalyticsSection({ darkMode, t, lang }) {
  const [liveCount, setLiveCount] = useState(1247);
  useEffect(() => { const interval = setInterval(() => setLiveCount(n => n + Math.floor(Math.random() * 3)), 3000); return () => clearInterval(interval); }, []);
  const maxBar = Math.max(...BAR_DATA.map(b => b.val));
  const today = new Date().getDay();

  return (
    <div className="flex-1 overflow-auto px-5 py-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label={t.conversations} value={liveCount.toLocaleString()} trend="+23%" icon="💬" darkMode={darkMode} />
        <StatCard label={t.resolutionRate} value="71%" trend="+5%" icon="✓" darkMode={darkMode} />
        <StatCard label={t.avgResponse} value="2.4 min" trend="−0.8" icon="⏱️" darkMode={darkMode} />
        <StatCard label={t.csat} value="94%" trend="+12%" icon="⭐" darkMode={darkMode} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
          <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.weeklyConversations}</p>
          <div className="flex items-end gap-2 h-28">
            {BAR_DATA.map((b, i) => (<div key={b.label} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className={`w-full rounded-t-md transition-all duration-700 ${i === today ? "bg-violet-500" : darkMode ? "bg-white/[0.08] group-hover:bg-violet-500/50" : "bg-gray-200 group-hover:bg-violet-400"}`} style={{ height: `${(b.val / maxBar) * 100}%` }} />
              <span className={`text-[10px] ${i === today ? "text-violet-500 dark:text-violet-400" : darkMode ? "text-white/30" : "text-gray-500"}`}>{b.label}</span>
            </div>))}
          </div>
        </div>
        <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
          <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.liveActivity}</p>
          <div className="space-y-3">{ACTIVITY.map((a, i) => (
            <div key={i} className={`flex items-start gap-2.5 py-2 border-b last:border-0 ${darkMode ? "border-white/[0.04]" : "border-gray-100"}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${a.type === "ok" ? "bg-emerald-500 dark:bg-emerald-400" : "bg-amber-500 dark:bg-amber-400 animate-pulse"}`} />
              <span className={`text-xs flex-1 leading-relaxed ${darkMode ? "text-white/60" : "text-gray-600"}`}>{lang === 'en' ? a.textEn : a.textId}</span>
              <span className={`text-[10px] flex-shrink-0 ${darkMode ? "text-white/30" : "text-gray-400"}`}>{a.time}</span>
            </div>))}
          </div>
        </div>
      </div>
      <div className={`mt-4 rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
        <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.aiPerformance}</p>
        <div className="space-y-3">
          {[
            { label: t.autoResolution, val: 78, color: "bg-violet-500" },
            { label: t.intentRecognition, val: 92, color: "bg-sky-500" },
            { label: t.sentimentAccuracy, val: 87, color: "bg-emerald-500" },
            { label: t.spamFiltering, val: 99, color: "bg-amber-500" },
            { label: t.firstContact, val: 68, color: "bg-pink-500" },
          ].map((item, i) => (<div key={i} className="mb-3"><div className="flex justify-between text-xs mb-1.5"><span className={darkMode ? "text-white/50" : "text-gray-600"}>{item.label}</span><span className={darkMode ? "text-white" : "text-gray-800"}>{item.val}%</span></div><div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/[0.08] overflow-hidden"><div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }} /></div></div>))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Section ───────────────────────────────────────────────────────────────────
function SettingsSection({ darkMode, setDarkMode, lang, setLang, t }) {
  const [saved, setSaved] = useState(false);
  const [notif, setNotif] = useState({ email: true, slack: true, sms: false, digest: true });
  
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex-1 overflow-auto px-5 py-5 space-y-5">
      {/* Language Toggle - Switch Bahasa */}
      <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
        <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.language}</p>
        <div className="flex gap-3">
          <button onClick={() => setLang('en')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${lang === 'en' ? "bg-violet-600 text-white" : darkMode ? "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            🇬🇧 English
          </button>
          <button onClick={() => setLang('id')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${lang === 'id' ? "bg-violet-600 text-white" : darkMode ? "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            🇮🇩 Indonesia
          </button>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
        <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.appearance}</p>
        <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center justify-between w-full p-3 rounded-lg transition-all ${darkMode ? "bg-white/[0.04]" : "bg-gray-100"}`}>
          <span className={`text-sm ${darkMode ? "text-white/80" : "text-gray-700"}`}>{darkMode ? t.lightMode : t.darkMode}</span>
          <span className={`w-10 h-5 rounded-full transition-all ${darkMode ? "bg-violet-600" : "bg-gray-300"}`}>
            <span className={`block w-4 h-4 rounded-full bg-white transition-all mt-0.5 ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
          </span>
        </button>
      </div>

      {/* Notification Preferences */}
      <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
        <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.notificationPrefs}</p>
        <div className="space-y-3">
          {[
            { key: "email", label: t.emailAlerts, sub: "Receive ticket updates via email" },
            { key: "slack", label: t.slackNotif, sub: "Route alerts to Slack channel" },
            { key: "sms", label: t.smsAlert, sub: "Urgent ticket SMS alerts" },
            { key: "digest", label: t.dailyDigest, sub: "Summary report at 9:00 AM" },
          ].map(({ key, label, sub }) => (
            <div key={key} className={`flex items-center justify-between py-2 border-b last:border-0 ${darkMode ? "border-white/[0.04]" : "border-gray-100"}`}>
              <div><p className={`text-sm ${darkMode ? "text-white/70" : "text-gray-700"}`}>{label}</p><p className={`text-xs ${darkMode ? "text-white/30" : "text-gray-400"}`}>{sub}</p></div>
              <button onClick={() => setNotif(p => ({ ...p, [key]: !p[key] }))} className={`w-10 h-5 rounded-full transition-all relative flex-shrink-0 ${notif[key] ? "bg-violet-600" : darkMode ? "bg-white/[0.08]" : "bg-gray-300"}`}>
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${notif[key] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile */}
      <div className={`rounded-xl p-5 ${darkMode ? "border border-white/[0.06] bg-white/[0.02]" : "border border-gray-200 bg-white shadow-sm"}`}>
        <p className={`text-sm font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.accountProfile}</p>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-violet-600 flex items-center justify-center text-white text-xl font-bold">F0</div>
          <div><p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>falender0r</p><p className={`text-xs ${darkMode ? "text-white/40" : "text-gray-500"}`}>Enterprise · farasdakalfaris@gmail.com</p></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: t.displayName, val: "falender0r" },
            { label: t.email, val: "farasdakalfaris@gmail.com" },
            { label: t.github, val: "github.com/Falender0r" },
            { label: t.timezone, val: "Asia/Jakarta (WIB)" },
          ].map(({ label, val }) => (
            <div key={label}>
              <label className={`block text-[10px] uppercase tracking-widest mb-1 ${darkMode ? "text-white/30" : "text-gray-500"}`}>{label}</label>
              <input defaultValue={val} className={`w-full rounded-lg px-3 py-2 text-sm transition-all ${darkMode ? "bg-white/[0.04] border border-white/[0.08] text-white/70" : "bg-gray-50 border border-gray-200 text-gray-700"}`} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={save} className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${saved ? "bg-emerald-600 text-white" : "bg-violet-600 hover:bg-violet-500 text-white"}`}>
        {saved ? `✓ ${t.settingsSaved}` : t.saveChanges}
      </button>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('en');
  const [tab, setTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, textEn: "New ticket #TKT-4424 from Creative Studio", textId: "Tiket baru #TKT-4424 dari Creative Studio", time: "3h ago", read: false },
    { id: 2, textEn: "System update scheduled for 2 AM", textId: "Pembaruan sistem dijadwalkan jam 2 pagi", time: "5h ago", read: false },
  ]);

  useEffect(() => {
    setMounted(true);
    const handler = () => { if (window.innerWidth < 768) setSidebarOpen(false); else setSidebarOpen(true); };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const t = translations[lang];
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!mounted) return null;

  const navItems = [
    { id: "chat", label: t.conversations, icon: "💬" },
    { id: "tickets", label: t.tickets, icon: "🎫" },
    { id: "analytics", label: t.analytics, icon: "📊" },
    { id: "settings", label: t.settings, icon: "⚙️" },
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`flex h-screen overflow-hidden ${darkMode ? "bg-[#0A0A0F]" : "bg-gray-50"}`}>
        
        {mobileSidebar && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setMobileSidebar(false)} />}

        {/* SIDEBAR */}
        <aside className={`fixed md:relative z-30 h-full flex flex-col transition-all duration-300 ${mobileSidebar ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"} ${sidebarOpen ? "w-56" : "md:w-[54px] w-56"} ${darkMode ? "bg-[#0D0D14] border-white/[0.06]" : "bg-white border-gray-200"} border-r`}>
          <div className={`flex items-center gap-3 px-3 py-4 border-b ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0"><span className="text-white text-xs font-bold">AI</span></div>
            {sidebarOpen && (<div><div className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{t.appName}</div><div className={`text-[10px] ${darkMode ? "text-white/30" : "text-gray-400"}`}>{t.version}</div></div>)}
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {sidebarOpen && <p className={`text-[9px] font-semibold uppercase tracking-widest px-3 mb-2 ${darkMode ? "text-white/20" : "text-gray-400"}`}>{t.platform}</p>}
            {navItems.map(({ id, label, icon }) => (
              <button key={id} onClick={() => { setTab(id); setMobileSidebar(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${tab === id ? darkMode ? "bg-violet-600/20 text-violet-300 border border-violet-500/25" : "bg-violet-100 text-violet-700" : darkMode ? "text-white/40 hover:text-white/70 hover:bg-white/[0.04]" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}>
                <span className="text-base">{icon}</span>
                {sidebarOpen && <span className="flex-1 text-left">{label}</span>}
                {tab === id && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r-full" />}
              </button>
            ))}
          </nav>

          {/* Language Switch di Sidebar */}
          <div className={`p-3 border-t ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
            <div className="flex gap-1">
              <button onClick={() => setLang('en')} className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${lang === 'en' ? "bg-violet-600 text-white" : darkMode ? "text-white/40 hover:text-white/60" : "text-gray-500 hover:text-gray-700"}`}>EN</button>
              <button onClick={() => setLang('id')} className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${lang === 'id' ? "bg-violet-600 text-white" : darkMode ? "text-white/40 hover:text-white/60" : "text-gray-500 hover:text-gray-700"}`}>ID</button>
            </div>
          </div>

          <div className={`p-3 border-t ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
            <div className="flex items-center gap-2.5 px-1 py-1">
              <div className="w-7 h-7 rounded-lg bg-violet-600/70 flex items-center justify-center text-white text-[11px] font-bold">F0</div>
              {sidebarOpen && <div><p className={`text-xs font-semibold ${darkMode ? "text-white/80" : "text-gray-700"}`}>falender0r</p><p className={`text-[10px] ${darkMode ? "text-white/30" : "text-gray-400"}`}>Enterprise</p></div>}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className={`flex items-center gap-3 px-4 h-12 border-b flex-shrink-0 ${darkMode ? "border-white/[0.06] bg-[#0D0D14]/80" : "border-gray-200 bg-white/80"} backdrop-blur-sm`}>
            <button onClick={() => { if (window.innerWidth < 768) setMobileSidebar(true); else setSidebarOpen(!sidebarOpen); }} className={`p-1.5 rounded-lg ${darkMode ? "text-white/40 hover:text-white/70 hover:bg-white/[0.05]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <h1 className={`text-sm font-semibold flex-1 ${darkMode ? "text-white/80" : "text-gray-800"}`}>{navItems.find(i => i.id === tab)?.label}</h1>
            
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className={`relative p-1.5 rounded-lg ${darkMode ? "text-white/40 hover:text-white/70 hover:bg-white/[0.05]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center">{unreadCount}</span>}
              </button>
              {showNotifications && (
                <div className={`absolute right-0 top-full mt-2 w-72 rounded-xl shadow-xl z-50 border ${darkMode ? "bg-[#0D0D14] border-white/[0.06]" : "bg-white border-gray-200"}`}>
                  <div className={`p-3 border-b ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}><h3 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{t.notifications}</h3></div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (<div key={n.id} className={`p-3 border-b ${darkMode ? "border-white/[0.04]" : "border-gray-100"}`}>
                      <p className={`text-xs ${darkMode ? "text-white/70" : "text-gray-700"}`}>{lang === 'en' ? n.textEn : n.textId}</p>
                      <p className={`text-[10px] mt-1 ${darkMode ? "text-white/30" : "text-gray-400"}`}>{n.time}</p>
                    </div>))}
                  </div>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-hidden flex flex-col">
            {tab === "chat" && <ChatSection darkMode={darkMode} lang={lang} t={t} />}
            {tab === "tickets" && <TicketsSection darkMode={darkMode} t={t} />}
            {tab === "analytics" && <AnalyticsSection darkMode={darkMode} t={t} lang={lang} />}
            {tab === "settings" && <SettingsSection darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} t={t} />}
          </main>
        </div>
      </div>
    </div>
  );
}