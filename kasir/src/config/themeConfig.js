// Semua warna tema terpusat di sini!

export const themeConfig = {
  dark: {
    bg: {
      main: 'bg-[#05050b]',            // Latar belakang paling dasar
      card: 'bg-[#0a0a12]/80',         // Latar belakang kotak/kartu
      input: 'bg-slate-900/50',        // Latar belakang kolom ketik (form)
    },

    text: {
      primary: 'text-slate-200',       // Teks utama (paragraf, nama barang)
      secondary: 'text-slate-400',     // Teks redup (label, deskripsi kecil)
      tertiary: 'text-slate-500',      // Teks sangat redup (placeholder input)
      heading: 'text-indigo-100',      // Judul Halaman / Teks Besar
      highlight: 'text-indigo-400',    // Teks yang disorot (Harga, dll)
      success: 'text-emerald-400',     // Teks Untung / Lunas
      danger: 'text-rose-500',         // Teks Rugi / Hapus
      warning: 'text-amber-400',       // Teks Kasbon / Peringatan
    },

    sidebar: {
      bg: 'bg-[#0a0a12]/80 backdrop-blur-xl',
      border: 'border-white/5',
      logoGradient: 'from-indigo-500 to-violet-600',
      logoShadow: 'shadow-[0_0_15px_rgba(99,102,241,0.4)]',
      logoText: 'text-slate-100',
      logoSubtext: 'text-indigo-400',
    },

    button: {
      hamburger: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300',
      theme: 'bg-white/5 hover:bg-white/10 border-white/10 text-yellow-300',
      primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',         // Tombol Utama (Simpan/Tambah)
      danger: 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-500',     // Tombol Berbahaya (Hapus)
    },

    menu: {
      active: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]',
      inactive: 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
    },

    accent: {
      primary: 'from-indigo-500 to-violet-600',
      border: 'border-white/5',                // Garis pembatas standar
      borderFocus: 'border-indigo-500/50',     // Garis menyala saat input diklik
    },

    decoration: {
      glow1: 'bg-indigo-600/20 blur-[120px]',
      glow2: 'bg-violet-600/10 blur-[100px]',
    },
  },

  light: {
    bg: {
      main: 'bg-slate-50',             // Putih tulang mewah
      card: 'bg-white',                // Putih bersih untuk kotak/kartu
      input: 'bg-slate-100',           // Abu-abu terang untuk input
    },

    text: {
      primary: 'text-slate-900',       // Teks utama hitam pekat
      secondary: 'text-slate-600',     // Teks abu-abu gelap
      tertiary: 'text-slate-400',      // Placeholder
      heading: 'text-slate-800',       // Judul halaman
      highlight: 'text-indigo-600',    // Sorotan warna indigo terang
      success: 'text-emerald-600',     // Teks Untung / Lunas (Hijau pekat)
      danger: 'text-rose-600',         // Teks Rugi / Hapus (Merah pekat)
      warning: 'text-amber-600',       // Teks Kasbon (Kuning tua)
    },

    sidebar: {
      bg: 'bg-white/80 backdrop-blur-xl',
      border: 'border-slate-200',
      logoGradient: 'from-indigo-600 to-violet-600', 
      logoShadow: 'shadow-[0_4px_20px_rgba(99,102,241,0.2)]',
      logoText: 'text-slate-900',
      logoSubtext: 'text-indigo-600',
    },

    button: {
      hamburger: 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-sm transition-all',
      theme: 'bg-white hover:bg-slate-100 border border-slate-200 text-amber-500 shadow-sm transition-all',
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md', // Tombol utama tebal
      danger: 'bg-rose-100 hover:bg-rose-200 border border-rose-200 text-rose-700', // Tombol hapus
    },

    menu: {
      active: 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm',
      inactive: 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors',
    },

    accent: {
      primary: 'from-indigo-600 to-violet-600',
      border: 'border-slate-200',              // Garis abu-abu lembut
      borderFocus: 'border-indigo-500',        // Garis indigo saat fokus
    },

    decoration: {
      glow1: 'bg-indigo-400/10 blur-[120px]',
      glow2: 'bg-violet-400/10 blur-[100px]',
    },
  },
};

export function getThemeColor(isDarkMode) {
  return isDarkMode ? themeConfig.dark : themeConfig.light;
}