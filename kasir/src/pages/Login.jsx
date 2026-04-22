import { useState } from 'react';
import { useTheme } from '../context/useTheme';
import { getThemeColor } from '../config/themeConfig';

export default function Login({ setCurrentUser, setHalamanAktif }) {
  const { isDarkMode } = useTheme();
  const theme = getThemeColor(isDarkMode);
  
  const [tabMode, setTabMode] = useState("KASIR"); // "KASIR" atau "MANAJEMEN"
  
  // State form kasir
  const [namaKasir, setNamaKasir] = useState("");
  
  // State form manajemen
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginKasir = (e) => {
    e.preventDefault();
    if (namaKasir.trim().length < 3) {
      setErrorMsg("Nama kasir minimal 3 karakter!");
      return;
    }
    
    // Sukses login kasir
    setCurrentUser({ role: "KASIR", name: namaKasir.trim() });
    setHalamanAktif("KASIR"); // Kasir langsung ke mesin kasir
  };

  const handleLoginManajemen = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // HARDCODED CREDENTIALS (Sesuai Rencana)
    if (username === "ceo" && password === "123") {
      setCurrentUser({ role: "CEO", name: "Bapak CEO" });
      setHalamanAktif("LAPORAN"); // CEO biasanya ngecek laporan
    } 
    else if (username === "investor" && password === "123") {
      setCurrentUser({ role: "INVESTOR", name: "Bapak Investor" });
      setHalamanAktif("TRANSAKSI"); // Investor biasanya ngecek arus kas
    } 
    else {
      setErrorMsg("Username atau Password salah!");
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${theme.bg.main} ${theme.bg.text}`}>
      {/* 🌌 DEKORASI LATAR BELAKANG */}
      <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] ${theme.decoration.glow1} rounded-full pointer-events-none opacity-50`}></div>
      <div className={`absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] ${theme.decoration.glow2} rounded-full pointer-events-none opacity-50`}></div>

      <div className="z-10 w-full max-w-md p-6">
        {/* LOGO */}
        <div className="text-center mb-10 animate-[fadeIn_0.5s_ease-out]">
          <div className={`w-20 h-20 mx-auto rounded-3xl flex justify-center items-center shadow-2xl mb-6 bg-gradient-to-br ${theme.sidebar.logoGradient} ${theme.sidebar.logoShadow}`}>
            <span className="text-4xl font-black text-white">M</span>
          </div>
          <h1 className="text-4xl font-black tracking-widest mb-2 drop-shadow-lg">NEXUS POS</h1>
          <p className="text-sm font-mono opacity-60 tracking-widest uppercase">Sistem Manajemen ERP</p>
        </div>

        {/* BOX LOGIN */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
          
          {/* TAB NAVIGASI */}
          <div className="flex gap-2 mb-8 bg-black/20 p-2 rounded-2xl border border-white/5">
            <button 
              onClick={() => {setTabMode("KASIR"); setErrorMsg("");}}
              className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                tabMode === "KASIR" 
                ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                : "text-slate-400 hover:bg-white/5"
              }`}
            >
              Absen Kasir
            </button>
            <button 
              onClick={() => {setTabMode("MANAJEMEN"); setErrorMsg("");}}
              className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                tabMode === "MANAJEMEN" 
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]" 
                : "text-slate-400 hover:bg-white/5"
              }`}
            >
              Manajemen
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-500/20 border border-rose-500/50 rounded-2xl text-center">
              <p className="text-rose-400 text-xs font-bold">{errorMsg}</p>
            </div>
          )}

          {/* FORM KASIR */}
          {tabMode === "KASIR" && (
            <form onSubmit={handleLoginKasir} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-2 px-1">Nama Panggilan Anda</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</span>
                  <input 
                    required 
                    type="text" 
                    placeholder="Ketik nama Anda (Cth: Santi)"
                    value={namaKasir}
                    onChange={(e) => setNamaKasir(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all uppercase tracking-widest text-sm"
              >
                Mulai Shift
              </button>
            </form>
          )}

          {/* FORM MANAJEMEN */}
          {tabMode === "MANAJEMEN" && (
            <form onSubmit={handleLoginManajemen} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-2 px-1">Username (ceo / investor)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👑</span>
                  <input 
                    required 
                    type="text" 
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-2 px-1">Kata Sandi</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔑</span>
                  <input 
                    required 
                    type="password" 
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all uppercase tracking-widest text-sm"
              >
                Akses Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
