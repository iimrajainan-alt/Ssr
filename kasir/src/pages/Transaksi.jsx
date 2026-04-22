import { useState } from 'react';
import DashboardArusKas from '../components/transaksi/DashboardArusKas';
import TabelRiwayatTransaksi from '../components/transaksi/TabelRiwayatTransaksi';

export default function Transaksi({ riwayatTransaksi, setStrukCetak, setPreviewMode, setRiwayatTransaksi }) {
  const [filterMetode, setFilterMetode] = useState("SEMUA");
  const [kataKunciTransaksi, setKataKunciTransaksi] = useState(""); 
  const [rentangTop5, setRentangTop5] = useState("BULAN_INI"); // ⏳ State Rentang Waktu

  const sekarang = new Date();
  const tglSekarang = sekarang.toLocaleDateString('id-ID');
  const blnSekarang = sekarang.getMonth();
  const thnSekarang = sekarang.getFullYear();

  // Filter khusus untuk Status Arus Kas (HANYA HARI INI)
  const transaksiHariIni = riwayatTransaksi.filter(nota => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    return tglNota === tglSekarang;
  });

  const kasMasukHarian = transaksiHariIni.reduce((sum, nota) => {
    if (nota.metodePembayaran === "TUNAI" || !nota.metodePembayaran) {
      return sum + (nota.total || nota.totalPendapatan || 0);
    }
    return sum + (nota.jumlahTerbayar || 0); // Jika kasbon dicicil HARI INI
  }, 0);
    
  const piutangHarian = transaksiHariIni.reduce((sum, nota) => {
    if (nota.metodePembayaran === "KASBON") {
      const totalTagihan = nota.total || nota.totalPendapatan || 0;
      const terbayar = nota.jumlahTerbayar || 0;
      return sum + (totalTagihan - terbayar);
    }
    return sum;
  }, 0);

  const riwayatTersaring = riwayatTransaksi.filter((nota) => {
    const matchMetode = 
      filterMetode === "SEMUA" ? true :
      filterMetode === "TUNAI" ? (nota.metodePembayaran === "TUNAI" || !nota.metodePembayaran) :
      (nota.metodePembayaran === "KASBON");

    const keyword = kataKunciTransaksi.toLowerCase();
    const nama = (nota.pelanggan || "").toLowerCase();
    const idNota = (nota.id || "").toLowerCase();
    const matchSearch = nama.includes(keyword) || idNota.includes(keyword);

    return matchMetode && matchSearch;
  });

  const transaksiTop5 = riwayatTransaksi.filter(nota => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    const parts = tglNota.split('/');
    if (parts.length !== 3) return false;

    const b = parseInt(parts[1]) - 1;
    const t = parseInt(parts[2]);

    if (rentangTop5 === "TAHUN_INI") return t === thnSekarang;
    if (rentangTop5 === "BULAN_INI") return b === blnSekarang && t === thnSekarang;
    if (rentangTop5 === "MINGGU_INI") {
      // Logic 7 Hari Terakhir
      const dateNota = new Date(t, b, parseInt(parts[0]));
      const diffTime = Math.abs(sekarang - dateNota);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7; 
    }
    return true;
  });

  const penjualanItem = {};
  transaksiTop5.forEach(nota => {
    if (nota.items && Array.isArray(nota.items)) {
      nota.items.forEach(item => {
        if (penjualanItem[item.nama]) {
          penjualanItem[item.nama] += item.qty;
        } else {
          penjualanItem[item.nama] = item.qty;
        }
      });
    }
  });

  const top5Barang = Object.entries(penjualanItem)
    .map(([nama, qty]) => ({ nama, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  const maxQty = top5Barang.length > 0 ? Math.max(...top5Barang.map(b => b.qty)) : 1;

  return (
    <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-out] overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-cyan-100 drop-shadow-md">📈 BUKU TRANSAKSI</h2>
        <button 
          onClick={() => { setFilterMetode("SEMUA"); setKataKunciTransaksi(""); }}
          className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg text-xs font-mono hover:bg-cyan-500/20 transition-all"
        >
          Reset Filter: {riwayatTersaring.length} Transaksi
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10 space-y-6">
        <DashboardArusKas 
          kasMasuk={kasMasukHarian} 
          piutang={piutangHarian} 
          top5Barang={top5Barang} 
          maxQty={maxQty}
          filterMetode={filterMetode} 
          setFilterMetode={setFilterMetode} 
          rentangTop5={rentangTop5} // 🔌 Kabel Baru!
          setRentangTop5={setRentangTop5} // 🔌 Kabel Baru!
        />

        <TabelRiwayatTransaksi 
          riwayatTransaksi={riwayatTersaring} 
          setStrukCetak={setStrukCetak} 
          setPreviewMode={setPreviewMode} 
          kataKunciTransaksi={kataKunciTransaksi}
          setKataKunciTransaksi={setKataKunciTransaksi}
          setRiwayatTransaksi={setRiwayatTransaksi} 
        />
      </div>
    </div>
  );
}