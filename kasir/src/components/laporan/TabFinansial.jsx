import { useState } from 'react';
import ModalBagiDividen from './ModalBagiDividen';
import ModalOperasional from './ModalOperasional';
import TombolExportExcel from './TombolExportExcel';

export default function TabFinansial({ 
  harian, bulanan, tahunan, 
  labaKotorTotal, totalRugiGudang, 
  porsiCeo, porsiInv, 
  bukuKerugian, riwayatBagiHasil, setRiwayatBagiHasil,
  riwayatOperasional, setRiwayatOperasional, totalOperasional
}) {
  const [showModalDiv, setShowModalDiv] = useState(false);
  const [showModalOp, setShowModalOp] = useState(false);
  const [filterBulanOp, setFilterBulanOp] = useState("Semua");
  const [filterTahunOp, setFilterTahunOp] = useState("Semua");

  const tahunSekarang = new Date().getFullYear();
  const tahunTersediaOp = ["Semua", ...Array.from({length: 10}, (_, i) => (tahunSekarang - 2 + i).toString())];

  const bulanTersediaOp = [
    { val: "Semua", label: "Semua Bulan" },
    { val: "1", label: "Januari" },
    { val: "2", label: "Februari" },
    { val: "3", label: "Maret" },
    { val: "4", label: "April" },
    { val: "5", label: "Mei" },
    { val: "6", label: "Juni" },
    { val: "7", label: "Juli" },
    { val: "8", label: "Agustus" },
    { val: "9", label: "September" },
    { val: "10", label: "Oktober" },
    { val: "11", label: "November" },
    { val: "12", label: "Desember" }
  ];

  const riwayatOperasionalDifilter = riwayatOperasional.filter(op => {
    if (!op.waktu) return true;
    const datePart = op.waktu.split(/[, ]+/)[0];
    const parts = datePart.split('/');
    if (parts.length !== 3) return true;
    
    const bulanOp = parseInt(parts[1], 10).toString();
    const tahunOp = parts[2];

    const matchBulan = filterBulanOp === "Semua" || bulanOp === filterBulanOp;
    const matchTahun = filterTahunOp === "Semua" || tahunOp === filterTahunOp;

    return matchBulan && matchTahun;
  });

  const labaBersihRiil = labaKotorTotal - totalRugiGudang - totalOperasional;
  const totalTelahDibagi = riwayatBagiHasil.reduce((sum, d) => sum + d.nominal, 0);
  const totalDiterimaCEO = riwayatBagiHasil.reduce((sum, d) => sum + (d.ceo || 0), 0);
  const totalDiterimaInvestor = riwayatBagiHasil.reduce((sum, d) => sum + (d.investor || 0), 0);
  const sisaLabaDitahan = labaBersihRiil - totalTelahDibagi;

  const sisaHakCeo = sisaLabaDitahan > 0 ? sisaLabaDitahan * porsiCeo : 0;
  const sisaHakInv = sisaLabaDitahan > 0 ? sisaLabaDitahan * porsiInv : 0;

  const isUntung = sisaLabaDitahan >= 0;
  const warnaLaba = isUntung ? "text-emerald-400" : "text-rose-500";

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* 📊 ROW 1: STATUS OMZET */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-violet-500/20 p-6 rounded-3xl">
          <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Omzet Harian</h4>
          <p className="text-2xl font-black text-slate-200 font-mono">Rp {harian.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-slate-900/60 border border-violet-500/20 p-6 rounded-3xl">
          <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Omzet Bulanan</h4>
          <p className="text-2xl font-black text-violet-300 font-mono">Rp {bulanan.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-slate-900/60 border border-violet-500/30 p-6 rounded-3xl">
          <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Omzet Tahunan</h4>
          <p className="text-2xl font-black text-violet-400 font-mono">Rp {tahunan.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* 🏛️ ROW 2: BRANKAS PUSAT & DIVIDEN */}
      <div className={`${isUntung ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'} border p-6 md:p-8 rounded-[40px] relative overflow-hidden`}>
        <div className="flex flex-col xl:flex-row justify-between gap-8 relative z-10">
          
          <div className="flex-1">
            <h3 className={`${isUntung ? 'text-emerald-400' : 'text-rose-400'} text-sm font-bold uppercase tracking-[0.2em] mb-2`}>
              Sisa Laba di Kasir (Ready to Split)
            </h3>
            <p className={`text-4xl md:text-5xl font-black font-mono drop-shadow-[0_0_15px_rgba(52,211,153,0.2)] ${warnaLaba} mb-6`}>
              {isUntung ? `Rp ${sisaLabaDitahan.toLocaleString('id-ID')}` : `- Rp ${Math.abs(sisaLabaDitahan).toLocaleString('id-ID')}`}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px] md:text-xs font-mono">
               <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                 <span className="block text-slate-500 uppercase font-sans font-bold">1. Laba Kotor</span>
                 <span className="text-slate-300">Rp {labaKotorTotal.toLocaleString('id-ID')}</span>
               </div>
               <div className="bg-rose-950/30 p-2 rounded-lg border border-rose-500/20">
                 <span className="block text-rose-500/80 uppercase font-sans font-bold">2. Kerugian</span>
                 <span className="text-rose-400">- Rp {totalRugiGudang.toLocaleString('id-ID')}</span>
               </div>
               <div className="bg-blue-950/30 p-2 rounded-lg border border-blue-500/20">
                 <span className="block text-blue-500/80 uppercase font-sans font-bold">3. Operasional</span>
                 <span className="text-blue-400">- Rp {totalOperasional.toLocaleString('id-ID')}</span>
               </div>
               <div className="bg-amber-950/30 p-2 rounded-lg border border-amber-500/20">
                 <span className="block text-amber-500/80 uppercase font-sans font-bold">4. Ditarik Dividen</span>
                 <span className="text-amber-400">- Rp {totalTelahDibagi.toLocaleString('id-ID')}</span>
               </div>
               <div className="bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                 <span className="block text-emerald-500/80 uppercase font-sans font-bold">5. Sisa Tersedia</span>
                 <span className="text-emerald-400 font-bold">Rp {sisaLabaDitahan.toLocaleString('id-ID')}</span>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-3 xl:border-l border-white/10 xl:pl-8 shrink-0">
            <button 
              onClick={() => setShowModalOp(true)}
              className="w-full xl:w-64 bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 py-3 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span className="text-lg">🧾</span>
              <span>Catat Operasional</span>
            </button>

            <button 
              onClick={() => setShowModalDiv(true)}
              disabled={sisaLabaDitahan <= 0}
              className="w-full xl:w-64 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 disabled:opacity-30 text-white py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] text-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span className="text-xl">💸</span>
              <span>Cairkan Bagi Hasil</span>
            </button>

            {/* 📥 KOMPONEN TOMBOL EXCEL DIPASANG DI SINI! */}
            <TombolExportExcel 
              harian={harian} bulanan={bulanan} tahunan={tahunan}
              labaKotorTotal={labaKotorTotal} totalRugiGudang={totalRugiGudang}
              totalOperasional={totalOperasional}
              totalTelahDibagi={totalTelahDibagi} sisaLabaDitahan={sisaLabaDitahan}
              riwayatBagiHasil={riwayatBagiHasil} bukuKerugian={bukuKerugian}
              riwayatOperasional={riwayatOperasional}
            />
          </div>

        </div>
      </div>

      {/* 🏆 ROW 3: KARTU REKAP INVESTOR VS CEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-950/20 border border-indigo-500/30 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">👑</div>
          <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Pendapatan CEO ({(porsiCeo * 100).toFixed(0)}%)
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Telah Dicairkan</span>
              <span className="text-sm font-bold text-slate-200 font-mono text-emerald-400">Rp {totalDiterimaCEO.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-2">
              <span className="text-xs text-slate-500">Sisa Hak di Kasir</span>
              <span className="text-sm font-bold text-indigo-300 font-mono">Rp {sisaHakCeo.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">🤝</div>
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            Hak Investor ({(porsiInv * 100).toFixed(0)}%)
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Sudah Dibayarkan</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">Rp {totalDiterimaInvestor.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-2">
              <span className="text-xs text-slate-500">Sisa Hak di Kasir</span>
              <span className="text-sm font-bold text-slate-300 font-mono">Rp {sisaHakInv.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 📋 ROW 4: TABEL RIWAYAT OPERASIONAL */}
      <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Riwayat Pengeluaran Operasional
          </h4>
          
          {/* FILTER OPERASIONAL */}
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              value={filterBulanOp} 
              onChange={(e) => setFilterBulanOp(e.target.value)}
              className="bg-slate-800 border border-white/10 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-500 cursor-pointer flex-1 md:flex-none"
            >
              {bulanTersediaOp.map(b => (
                <option key={b.val} value={b.val}>{b.label}</option>
              ))}
            </select>
            <select 
              value={filterTahunOp} 
              onChange={(e) => setFilterTahunOp(e.target.value)}
              className="bg-slate-800 border border-white/10 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-500 cursor-pointer flex-1 md:flex-none"
            >
              {tahunTersediaOp.map(t => (
                <option key={t} value={t}>{t === "Semua" ? "Semua Tahun" : t}</option>
              ))}
            </select>
          </div>
        </div>
        
        {riwayatOperasionalDifilter && riwayatOperasionalDifilter.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-black/40 text-slate-500">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Waktu</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Keterangan</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {riwayatOperasionalDifilter.map((op, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-xs">{op.waktu}</td>
                    <td className="px-4 py-3 font-bold text-blue-300">{op.kategori}</td>
                    <td className="px-4 py-3 text-xs">{op.keterangan}</td>
                    <td className="px-4 py-3 font-mono font-bold text-right text-rose-400">- Rp {op.nominal.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 bg-black/20 rounded-2xl border border-white/5">
            <p className="text-slate-500 text-sm">Belum ada pengeluaran operasional yang dicatat.</p>
          </div>
        )}
      </div>

      <ModalBagiDividen 
        sisaLaba={sisaLabaDitahan} porsiCeo={porsiCeo} porsiInv={porsiInv} 
        setRiwayatBagiHasil={setRiwayatBagiHasil} 
        showModalDiv={showModalDiv} setShowModalDiv={setShowModalDiv} 
      />
      
      <ModalOperasional 
        show={showModalOp} close={() => setShowModalOp(false)} 
        setRiwayatOperasional={setRiwayatOperasional} 
      />
    </div>
  );
}