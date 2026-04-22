import { useState, useEffect } from 'react';
import { databaseGudang } from './data/DataGudang';
import Kasir from './pages/Kasir';
import Transaksi from './pages/Transaksi';
import Laporan from './pages/Laporan';
import Gudang from './pages/Gudang';
import Login from './pages/Login';
import ModalPreviewStruk from './components/global/ModalPreviewStruk';
import PrinterSiluman from './components/global/PrinterSiluman';
import SidebarNavigasi from './components/global/SidebarNavigasi';
import { useTheme } from './context/useTheme';
import { getThemeColor } from './config/themeConfig';

function App() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const [currentUser, setCurrentUser] = useState(() => {
    const sesi = localStorage.getItem("NEXUS_USER_SESSION");
    return sesi && sesi !== "null" ? JSON.parse(sesi) : null;
  });
  const [halamanAktif, setHalamanAktif] = useState("KASIR");
  const [strukCetak, setStrukCetak] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [sidebarBuka, setSidebarBuka] = useState(true);

  const [gudang, setGudang] = useState(() => {
    const dataGudang = localStorage.getItem("BRANKAS_GUDANG");
    return dataGudang ? JSON.parse(dataGudang) : databaseGudang;
  });

  const [riwayatTransaksi, setRiwayatTransaksi] = useState(() => {
    const dataBrankas = localStorage.getItem("BRANKAS_MUDHARABAH");
    return (dataBrankas && dataBrankas !== "null") ? JSON.parse(dataBrankas) : [];
  });

  const [bukuKerugian, setBukuKerugian] = useState(() => {
    const dataRugi = localStorage.getItem("BRANKAS_KERUGIAN");
    return (dataRugi && dataRugi !== "null") ? JSON.parse(dataRugi) : [];
  });

  const [riwayatBagiHasil, setRiwayatBagiHasil] = useState(() => {
    const dataDiv = localStorage.getItem("BRANKAS_DIVIDEN");
    return (dataDiv && dataDiv !== "null") ? JSON.parse(dataDiv) : [];
  });

  const [riwayatOperasional, setRiwayatOperasional] = useState(() => {
    const dataOp = localStorage.getItem("BRANKAS_OPERASIONAL");
    return (dataOp && dataOp !== "null") ? JSON.parse(dataOp) : [];
  });

  // --- AGEN AUTO-SAVE ---
  useEffect(() => { localStorage.setItem("BRANKAS_MUDHARABAH", JSON.stringify(riwayatTransaksi)); }, [riwayatTransaksi]);
  useEffect(() => { localStorage.setItem("BRANKAS_GUDANG", JSON.stringify(gudang)); }, [gudang]);
  useEffect(() => { localStorage.setItem("BRANKAS_KERUGIAN", JSON.stringify(bukuKerugian)); }, [bukuKerugian]);
  useEffect(() => { localStorage.setItem("BRANKAS_DIVIDEN", JSON.stringify(riwayatBagiHasil)); }, [riwayatBagiHasil]);
  useEffect(() => { localStorage.setItem("BRANKAS_OPERASIONAL", JSON.stringify(riwayatOperasional)); }, [riwayatOperasional]);
  useEffect(() => { localStorage.setItem("NEXUS_USER_SESSION", JSON.stringify(currentUser)); }, [currentUser]);

  const theme = getThemeColor(isDarkMode);

  const handleLogout = () => {
    setCurrentUser(null);
    setHalamanAktif("KASIR");
  };

  if (!currentUser) {
    return <Login setCurrentUser={setCurrentUser} setHalamanAktif={setHalamanAktif} />;
  }

  return (
    <div className={`flex h-screen overflow-hidden font-sans relative latar-kosmik transition-colors duration-500 ${theme.bg.main} ${theme.bg.text}`}>

      {previewMode && <ModalPreviewStruk strukCetak={strukCetak} setPreviewMode={setPreviewMode} />}
      <PrinterSiluman strukCetak={strukCetak} />

      {/* 🌌 DEKORASI LATAR BELAKANG */}
      <div className={`absolute top-[-10%] ${isDarkMode ? 'left-[-10%]' : 'right-[-10%]'} w-[40%] h-[40%] ${theme.decoration.glow1} rounded-full pointer-events-none`}></div>
      <div className={`absolute bottom-[-10%] ${isDarkMode ? 'right-[-10%]' : 'left-[-10%]'} w-[30%] h-[30%] ${theme.decoration.glow2} rounded-full pointer-events-none`}></div>

      {/* 🧭 SIDEBAR NAVIGASI (Menerima perintah Buka/Tutup) */}
      <SidebarNavigasi halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} sidebarBuka={sidebarBuka} currentUser={currentUser} />

      {/* 🎭 PANGGUNG UTAMA */}
      <main className="flex-1 overflow-hidden z-10 flex flex-col relative print:hidden">

        {/* 🍔 TOMBOL HAMBURGER & THEME TOGGLE */}
        <div className="p-4 md:px-8 md:pt-8 flex items-center gap-4 relative z-50">
          <button
            onClick={() => setSidebarBuka(!sidebarBuka)}
            className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center cursor-pointer border ${theme.button.hamburger}`}
          >
            {sidebarBuka ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>

          {/* 🎨 THEME TOGGLE BUTTON */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center cursor-pointer border ml-auto ${theme.button.theme}`}
            title={isDarkMode ? "Beralih ke tema terang" : "Beralih ke tema gelap"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 110-8 4 4 0 010 8zm0-9V1m0 22v-6m6-6h6m-22 0h6m4.22-7.22l4.24-4.24m-11.92 11.92l4.24-4.24M20.22 4.78l-4.24 4.24m-11.92 11.92l-4.24 4.24"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1 .12-11.36 1 1 0 1 0 1.09-1.63 10 10 0 1 0-.17 14.09 1 1 0 0 0 .01 1.04z"></path></svg>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="p-3 ml-2 rounded-xl transition-all shadow-lg flex items-center justify-center cursor-pointer border bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white"
            title="Keluar / Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
          
          {!sidebarBuka && <h2 className={`text-xl font-black tracking-widest animate-[fadeIn_0.5s_ease-out] ${theme.accent.title} ml-4`}>NEXUS POS</h2>}
        </div>

        <div className="flex-1 overflow-hidden p-4 md:px-8 md:pb-8">
          {halamanAktif === "KASIR" && (
            <Kasir gudang={gudang} setGudang={setGudang} setRiwayatTransaksi={setRiwayatTransaksi} setStrukCetak={setStrukCetak} setPreviewMode={setPreviewMode} currentUser={currentUser} />
          )}
          {halamanAktif === "TRANSAKSI" && (
            <Transaksi riwayatTransaksi={riwayatTransaksi} setStrukCetak={setStrukCetak} setPreviewMode={setPreviewMode} setRiwayatTransaksi={setRiwayatTransaksi} />
          )}
          {halamanAktif === "LAPORAN" && (
            <Laporan
              riwayatTransaksi={riwayatTransaksi}
              setStrukCetak={setStrukCetak}
              gudang={gudang}
              bukuKerugian={bukuKerugian}
              riwayatBagiHasil={riwayatBagiHasil}
              setRiwayatBagiHasil={setRiwayatBagiHasil}
              riwayatOperasional={riwayatOperasional}
              setRiwayatOperasional={setRiwayatOperasional}
            />
          )}
          {halamanAktif === "GUDANG" && (
            <Gudang gudang={gudang} setGudang={setGudang} bukuKerugian={bukuKerugian} setBukuKerugian={setBukuKerugian} />
          )}
        </div>
      </main>

    </div>
  );
}

export default App;