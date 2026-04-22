import { useState } from 'react';
import ModalDetailBarang from './ModalDetailBarang';
import ModalBayarCicilan from './ModalBayarCicilan';

export default function TabelRiwayatTransaksi({ 
  riwayatTransaksi, setStrukCetak, setPreviewMode, 
  kataKunciTransaksi, setKataKunciTransaksi,
  setRiwayatTransaksi 
}) {
  const [detailNota, setDetailNota] = useState(null);
  const [notaCicilan, setNotaCicilan] = useState(null);

  return (
    <div className="bg-[#0a0a12]/50 border border-white/5 rounded-3xl p-6 relative">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-white/10 pb-4 gap-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          ✦ Riwayat Arus Kas
        </h3>
        <div className="relative w-full md:w-150">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">🔍</span>
          <input 
            type="text" 
            placeholder="Cari nama atau INV..." 
            value={kataKunciTransaksi}
            onChange={(e) => setKataKunciTransaksi(e.target.value)}
            className="w-full bg-slate-900/50 border border-cyan-500/30 text-slate-200 placeholder-slate-600 text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* KUMPULAN KARTU (DESAIN KIRI-KANAN) */}
      <div className="space-y-4">
        {riwayatTransaksi.length === 0 ? (
          <p className="text-slate-600 font-mono text-center py-8 text-lg">Data tidak ditemukan.</p>
        ) : (
          [...riwayatTransaksi].reverse().map((nota) => {
            const totalTagihan = nota.total || nota.totalPendapatan || 0;
            const terbayar = nota.jumlahTerbayar || 0;
            const sisaHutang = totalTagihan - terbayar;
            const isKasbon = nota.metodePembayaran === "KASBON";
            const isLunas = nota.status === "LUNAS (EKS-KASBON)";

            return (
              <div key={nota.id} className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 hover:border-cyan-500/50 transition-all hover:bg-white/10">
                
                {/* 🗂️ SISI KIRI: INFORMASI DATA */}
                <div className="flex-1 flex flex-col gap-3">
                  
                  {/* NAMA & STATUS */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">👤</span>
                      <span className="font-bold text-slate-200 uppercase tracking-wider text-base md:text-sm">
                        {nota.pelanggan || (isKasbon ? "Hamba Allah" : "Pelanggan Umum")}
                      </span>
                    </div>
                    <span className={`text-xs md:text-xs px-3 py-1 rounded font-black tracking-widest border ${isKasbon ? (isLunas ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30") : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}`}>
                      {nota.status || (nota.metodePembayaran || "TUNAI")}
                    </span>
                  </div>

                  {/* INV & WAKTU */}
                  <div className="flex flex-wrap items-center gap-4 border-b border-white/5 pb-3">
                    <span className="font-mono text-xs text-cyan-400 bg-cyan-900/20 px-3 py-1 rounded-lg border border-cyan-500/20">
                      {nota.id}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-2">
                      <span>🕒</span> {nota.waktu || nota.tanggal || "Waktu tidak tercatat"}
                    </span>
                  </div>

                  {/* TOTAL TAGIHAN & SISA HUTANG */}
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 mt-1">
                    <div className="flex-1">
                      <span className="text-xs text-slate-400 uppercase tracking-widest font-bold block mb-1">Total Tagihan</span>
                      <span className="text-xl font-black text-white font-mono">
                        Rp {totalTagihan.toLocaleString('id-ID')}
                      </span>
                    </div>
                    
                    {isKasbon && !isLunas && (
                      <div className="flex-1 sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                        <span className="text-xs text-amber-400 uppercase tracking-widest font-bold block mb-1">Sisa Hutang</span>
                        <span className="text-lg font-black text-amber-400 font-mono">
                          Rp {sisaHutang.toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>

                </div>

                {/* 🎮 SISI KANAN: TOMBOL AKSI RAKSASA */}
                <div className="w-full md:w-56 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-6 shrink-0">
                  <button 
                    onClick={() => setDetailNota(nota)}
                    className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 py-2.5 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2"
                  >
                    👁️ LIHAT DETAIL
                  </button>
                  
                  <button 
                    onClick={() => {
                      setStrukCetak(nota);
                      if(setPreviewMode) setPreviewMode(true);
                    }}
                    className="w-full bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 text-cyan-300 py-2.5 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2"
                  >
                    🖨️ CETAK NOTA
                  </button>
                  
                  {isKasbon && !isLunas && (
                    <button 
                      onClick={() => setNotaCicilan(nota)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      💸 BAYAR CICILAN
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 🧩 MEMANGGIL KEDUA MODAL DARI FILE TERPISAH */}
      <ModalDetailBarang detailNota={detailNota} setDetailNota={setDetailNota} />
      <ModalBayarCicilan notaCicilan={notaCicilan} setNotaCicilan={setNotaCicilan} setRiwayatTransaksi={setRiwayatTransaksi} />

    </div>
  );
} 