import { useTheme } from '../../context/useTheme';
import { getThemeColor } from '../../config/themeConfig';

export default function SidebarNavigasi({ halamanAktif, setHalamanAktif, sidebarBuka, currentUser }) {
  const { isDarkMode } = useTheme();
  const theme = getThemeColor(isDarkMode);

  const role = currentUser?.role || "KASIR";

  const tombolMenu = (idMenu, icon, label) => {
    const isAktif = halamanAktif === idMenu;
    return (
      <button 
        onClick={() => setHalamanAktif(idMenu)}
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
          isAktif ? theme.menu.active : theme.menu.inactive
        }`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="font-bold tracking-widest text-sm uppercase whitespace-nowrap">{label}</span>
      </button>
    );
  };

  return (
    <nav 
      className={`z-40 print:hidden transition-all duration-300 ease-in-out overflow-hidden flex flex-col backdrop-blur-xl border-r ${theme.sidebar.bg} ${theme.sidebar.border} ${
        sidebarBuka ? 'w-[280px]' : 'w-0 border-transparent'
      }`}
    >
      <div className="w-[280px] flex flex-col h-full">
        <div className={`p-8 border-b flex items-center gap-4 ${theme.sidebar.border}`}>
          <div className={`w-12 h-12 rounded-2xl flex justify-center items-center shrink-0 shadow-lg bg-gradient-to-br ${theme.sidebar.logoGradient} ${theme.sidebar.logoShadow}`}>
            <span className="text-2xl font-black text-white">M</span>
          </div>
          <div>
            <h1 className={`text-xl font-black tracking-widest whitespace-nowrap ${theme.sidebar.logoText}`}>NEXUS POS</h1>
            <p className={`text-xs font-mono whitespace-nowrap ${theme.sidebar.logoSubtext}`}>Halo, {currentUser?.name || "Kasir"}</p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2 mt-4 overflow-hidden">
          {(role === "CEO" || role === "KASIR") && tombolMenu("KASIR", "💳", "Mesin Kasir")}
          {(role === "CEO" || role === "INVESTOR") && tombolMenu("TRANSAKSI", "📈", "Arus Kas")}
          {(role === "CEO" || role === "INVESTOR") && tombolMenu("LAPORAN", "📓", "Buku Catatan")}
          {(role === "CEO" || role === "KASIR") && tombolMenu("GUDANG", "📦", "Database Gudang")}
        </div>
      </div>
    </nav>
  );
}