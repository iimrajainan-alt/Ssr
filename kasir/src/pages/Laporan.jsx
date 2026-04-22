import { useState } from 'react';
import TabZakat from '../components/laporan/TabZakat';
import TabFinansial from '../components/laporan/TabFinansial';

export default function Laporan({ 
  riwayatTransaksi, 
  setStrukCetak, 
  gudang,
  bukuKerugian, 
  riwayatBagiHasil, 
  setRiwayatBagiHasil,
  riwayatOperasional,
  setRiwayatOperasional
}) {
  const [tabAktif, setTabAktif] = useState("FINANSIAL");

  const sekarang = new Date();
  const tglSekarang = sekarang.toLocaleDateString('id-ID');
  const blnSekarang = sekarang.getMonth();
  const thnSekarang = sekarang.getFullYear();

  // Harian
  const omzetHarian = riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    if (tglNota === tglSekarang) {
      return sum + (nota.total || nota.totalPendapatan || 0);
    }
    return sum;
  }, 0);

  // Bulanan
  const omzetBulanan = riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    const parts = tglNota.split('/');
    if (parts.length === 3) {
      const b = parseInt(parts[1]) - 1;
      const t = parseInt(parts[2]);
      if (b === blnSekarang && t === thnSekarang) {
        return sum + (nota.total || nota.totalPendapatan || 0);
      }
    }
    return sum;
  }, 0);

  // Tahunan
  const omzetTahunan = riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    const parts = tglNota.split('/');
    if (parts.length === 3) {
      const t = parseInt(parts[2]);
      if (t === thnSekarang) {
        return sum + (nota.total || nota.totalPendapatan || 0);
      }
    }
    return sum;
  }, 0);

  let labaKotorTotal = 0;
  riwayatTransaksi.forEach(nota => {
    if (nota.items && Array.isArray(nota.items)) {
      nota.items.forEach(item => {
        const barang = gudang.find(g => g.id === item.id);
        if (barang) {
          const labaPerItem = (item.harga - barang.modal) * item.qty;
          labaKotorTotal += labaPerItem;
        }
      });
    }
  });

  const totalRugiGudang = bukuKerugian.reduce((sum, kerugian) => {
    return sum + (kerugian.totalRugiModal || 0);
  }, 0);

  const totalOperasional = (riwayatOperasional || []).reduce((sum, op) => {
    return sum + (op.nominal || 0);
  }, 0);

  const porsiCeo = 0.6;
  const porsiInv = 0.4;

  return (
    <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-out] overflow-hidden">
      
      {/* 🏷️ NAVIGASI TAB */}
      <div className="flex gap-3 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => setTabAktif("FINANSIAL")}
          className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${
            tabAktif === "FINANSIAL"
              ? "bg-violet-600 text-white shadow-lg"
              : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          📊 Finansial
        </button>
        <button
          onClick={() => setTabAktif("ZAKAT")}
          className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${
            tabAktif === "ZAKAT"
              ? "bg-emerald-600 text-white shadow-lg"
              : "bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          🕌 Zakat
        </button>
      </div>

      {/* 📄 KONTEN TAB */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {tabAktif === "FINANSIAL" && (
          <TabFinansial
            harian={omzetHarian}
            bulanan={omzetBulanan}
            tahunan={omzetTahunan}
            labaKotorTotal={labaKotorTotal}
            totalRugiGudang={totalRugiGudang}
            porsiCeo={porsiCeo}
            porsiInv={porsiInv}
            bukuKerugian={bukuKerugian}
            riwayatBagiHasil={riwayatBagiHasil}
            setRiwayatBagiHasil={setRiwayatBagiHasil}
            riwayatOperasional={riwayatOperasional}
            setRiwayatOperasional={setRiwayatOperasional}
            totalOperasional={totalOperasional}
          />
        )}
        
        {tabAktif === "ZAKAT" && (
          <TabZakat
            harian={omzetHarian}
            bulanan={omzetBulanan}
            tahunan={omzetTahunan}
          />
        )}
      </div>
    </div>
  );
}