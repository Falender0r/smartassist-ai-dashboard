"use client";
import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    appName: "SmartAssist", version: "v1.0",
    navChat: "Chat", navTickets: "Tickets", navSettings: "Settings",
    darkMode: "Dark Mode", lightMode: "Light Mode",
    send: "Send", typeMessage: "Type a message...",
    aiOnline: "👋 Hello! I'm SmartAssist AI. How can I help you?",
    suggestions: ["reset password", "refund", "ticket status", "help"],
    ticketId: "ID", ticketCustomer: "Customer", ticketSubject: "Subject",
    ticketStatus: "Status", ticketPriority: "Priority", ticketOpened: "Opened",
    poweredBy: "Powered by SmartAssist AI",
    notifications: "Notifications",
    account: "Account",
    username: "Username",
    email: "Email",
    saveChanges: "Save Changes",
  },
  id: {
    appName: "SmartAssist", version: "v1.0",
    navChat: "Percakapan", navTickets: "Tiket", navSettings: "Pengaturan",
    darkMode: "Mode Gelap", lightMode: "Mode Terang",
    send: "Kirim", typeMessage: "Ketik pesan...",
    aiOnline: "👋 Halo! Saya SmartAssist AI. Ada yang bisa saya bantu?",
    suggestions: ["reset password", "refund", "status tiket", "bantuan"],
    ticketId: "ID", ticketCustomer: "Pelanggan", ticketSubject: "Subjek",
    ticketStatus: "Status", ticketPriority: "Prioritas", ticketOpened: "Dibuka",
    poweredBy: "Didukung oleh SmartAssist AI",
    notifications: "Notifikasi",
    account: "Akun",
    username: "Nama Pengguna",
    email: "Email",
    saveChanges: "Simpan Perubahan",
  },
};

function getReply(msg: string, lang: string) {
  const m = msg.toLowerCase();
  const isEn = lang === "en";
  if (m.includes("password") || m.includes("reset")) return isEn ? "🔐 To reset password: Go to Login → Forgot Password" : "🔐 Reset password: Buka Login → Lupa Password";
  if (m.includes("refund")) return isEn ? "💰 Refund request received. Processing 3-5 days." : "💰 Permintaan refund diterima. Diproses 3-5 hari.";
  if (m.includes("ticket")) return isEn ? "🎫 You have 4 active tickets." : "🎫 Anda memiliki 4 tiket aktif.";
  if (m.includes("help")) return isEn ? "I can help with: password reset, refund, tickets." : "Saya bisa bantu: reset password, refund, tiket.";
  return isEn ? "Type 'help' to see what I can do!" : "Ketik 'help' untuk melihat kemampuan saya!";
}

const ticketsData = [
  { id: "#TKT-4421", customer: "Acme Corp", subject: "API rate limit", status: "Open", priority: "High", opened: "2h ago" },
  { id: "#TKT-4422", customer: "TechStart Inc", subject: "Refund request", status: "In Progress", priority: "Medium", opened: "5h ago" },
  { id: "#TKT-4423", customer: "Global Solutions", subject: "Login issue", status: "Resolved", priority: "Low", opened: "1d ago" },
  { id: "#TKT-4424", customer: "Creative Studio", subject: "Billing error", status: "Open", priority: "High", opened: "3h ago" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: string; content: string; time: number }[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    setMounted(true);
    setMessages([{ role: "ai", content: t.aiOnline, time: Date.now() }]);
    
    // Deteksi ukuran layar untuk sidebar
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lang, t.aiOnline]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg, time: Date.now() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "ai", content: getReply(msg, lang), time: Date.now() }]);
    }, 600);
  };

  if (!mounted) return null;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        
        {/* Mobile overlay */}
        {sidebarOpen && window.innerWidth < 768 && (
          <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <aside className={`
          fixed md:relative z-30 h-full flex flex-col transition-all duration-300
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r
        `}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h1 className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{t.appName}</h1>
                <p className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.version}</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <button onClick={() => { setActiveTab("chat"); if (window.innerWidth < 768) setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === "chat" ? "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300" : darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>
              <span className="text-lg">💬</span><span>{t.navChat}</span>
            </button>
            <button onClick={() => { setActiveTab("tickets"); if (window.innerWidth < 768) setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === "tickets" ? "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300" : darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>
              <span className="text-lg">🎫</span><span>{t.navTickets}</span>
            </button>
            <button onClick={() => { setActiveTab("settings"); if (window.innerWidth < 768) setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeTab === "settings" ? "bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-300" : darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>
              <span className="text-lg">⚙️</span><span>{t.navSettings}</span>
            </button>
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-1">
              <button onClick={() => setLang("en")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${lang === "en" ? "bg-purple-600 text-white" : darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>English</button>
              <button onClick={() => setLang("id")} className={`flex-1 py-2 rounded-lg text-sm font-medium ${lang === "id" ? "bg-purple-600 text-white" : darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>Indonesia</button>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>
              <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
              <span>{darkMode ? t.lightMode : t.darkMode}</span>
            </button>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-lg bg-purple-600/70 flex items-center justify-center text-white text-sm font-bold">U</div>
              <div>
                <p className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Guest User</p>
                <p className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Free Plan</p>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className={`flex items-center gap-3 px-4 py-3 border-b ${darkMode ? "border-gray-700 bg-gray-800/80" : "border-gray-200 bg-white/80"} backdrop-blur-sm`}>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <h1 className={`text-base font-semibold flex-1 ${darkMode ? "text-white" : "text-gray-800"}`}>
              {activeTab === "chat" ? "💬 Chat" : activeTab === "tickets" ? "🎫 Tickets" : "⚙️ Settings"}
            </h1>
          </header>

          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "ai" && <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0"><span className="text-white text-[10px] font-bold">AI</span></div>}
                    <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${m.role === "user" ? "bg-purple-600 text-white" : darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800"}`}>{m.content}</div>
                    {m.role === "user" && <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0"><span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold">U</span></div>}
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center"><span className="text-white text-[10px]">AI</span></div>
                    <div className={`rounded-lg px-3 py-2 flex gap-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: "150ms"}}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: "300ms"}}></span>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {t.suggestions.map((s: string) => (
                  <button key={s} onClick={() => sendMessage(s)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${darkMode ? "border-gray-600 text-gray-400 hover:border-purple-500 hover:text-purple-400" : "border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600"}`}>{s}</button>
                ))}
              </div>

              <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex gap-2">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder={t.typeMessage} className={`flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-purple-500 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"}`} />
                  <button onClick={() => sendMessage()} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium">{t.send}</button>
                </div>
                <p className={`text-[10px] mt-3 text-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{t.poweredBy}</p>
              </div>
            </div>
          )}

          {activeTab === "tickets" && (
            <div className="flex-1 overflow-auto p-4">
              <div className={`rounded-xl border overflow-hidden ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <tr className="text-left text-xs">
                        <th className={`px-4 py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.ticketId}</th>
                        <th className={`px-4 py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.ticketCustomer}</th>
                        <th className={`px-4 py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.ticketSubject}</th>
                        <th className={`px-4 py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.ticketStatus}</th>
                        <th className={`px-4 py-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.ticketPriority}</th>
                       </tr>
                    </thead>
                    <tbody>
                      {ticketsData.map((t) => (
                        <tr key={t.id} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                          <td className={`px-4 py-3 text-xs font-mono ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.id}</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{t.customer}</td>
                          <td className={`px-4 py-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{t.subject}</td>
                          <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${t.status === "Open" ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400" : t.status === "Resolved" ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"}`}>{t.status}</span></td>
                          <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${t.priority === "High" ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>{t.priority}</span></td>
                         </tr>
                      ))}
                    </tbody>
                   </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="max-w-md mx-auto space-y-4">
                <div className={`p-5 rounded-xl border ${darkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"}`}>
                  <h3 className={`text-base font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.account}</h3>
                  <div className="space-y-3">
                    <div><label className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.username}</label><input defaultValue="user_demo" className={`w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`} /></div>
                    <div><label className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{t.email}</label><input defaultValue="user@example.com" className={`w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`} /></div>
                  </div>
                </div>
                <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all">{t.saveChanges}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}