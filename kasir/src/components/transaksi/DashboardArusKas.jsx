export default function DashboardArusKas({ 
  kasMasuk, piutang, top5Barang, maxQty, 
  filterMetode, setFilterMetode,
  rentangTop5, setRentangTop5 
}) {
  
  const totalUang = kasMasuk + piutang;
  const persenKas = totalUang === 0 ? 100 : Math.round((kasMasuk / totalUang) * 100);
  
  const donutStyle = {
    background: `conic-gradient(#10b981 0% ${persenKas}%, #e11d48 ${persenKas}% 100%)`
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* ==================================================== */}
      {/* 📊 PANEL KIRI: STATUS ARUS KAS (HARIAN) */}
      {/* ==================================================== */}
      <div className="bg-[#0a0a12]/80 border border-white/5 rounded-3xl p-6 flex flex-col shadow-lg relative overflow-hidden">
        {/* Label HARI INI yang elegan */}
        <div className="absolute top-0 right-0 bg-cyan-600/20 text-cyan-400 text-[10px] font-black px-4 py-1 rounded-bl-xl border-b border-l border-cyan-500/30 tracking-widest uppercase">
          HARI INI
        </div>

        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          📈 Status Arus Kas
        </h3>

        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
          
          <div className="relative w-40 h-40 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]" style={donutStyle}>
            <div className="absolute w-28 h-28 bg-[#0a0a12] rounded-full flex flex-col items-center justify-center border border-white/5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total</span>
              <span className="text-xs font-mono font-black text-slate-300 mt-1">
                {totalUang > 1000000 ? `${(totalUang/1000000).toFixed(1)}M` : `${(totalUang/1000).toFixed(0)}K`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full sm:w-auto flex-1">
            <div 
              onClick={() => setFilterMetode(filterMetode === "TUNAI" ? "SEMUA" : "TUNAI")}
              className={`cursor-pointer border p-4 rounded-2xl transition-all duration-300 ${
                filterMetode === "TUNAI" 
                ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-[1.02]' 
                : 'bg-black/40 border-white/5 hover:border-emerald-500/50'
              }`}
            >
              <p className="text-[10px] text-slate-500 mb-1 tracking-widest font-bold">
                {filterMetode === "TUNAI" ? '⚡ MEMFILTER: TUNAI' : 'Kas Masuk Harian'}
              </p>
              <p className="text-xl font-black text-emerald-400 font-mono">Rp {kasMasuk.toLocaleString('id-ID')}</p>
            </div>

            <div 
              onClick={() => setFilterMetode(filterMetode === "KASBON" ? "SEMUA" : "KASBON")}
              className={`cursor-pointer border p-4 rounded-2xl transition-all duration-300 ${
                filterMetode === "KASBON" 
                ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.2)] scale-[1.02]' 
                : 'bg-black/40 border-white/5 hover:border-rose-500/50'
              }`}
            >
              <p className="text-[10px] text-slate-500 mb-1 tracking-widest font-bold">
                {filterMetode === "KASBON" ? '⚡ MEMFILTER: KASBON' : 'Kasbon Harian'}
              </p>
              <p className="text-xl font-black text-rose-500 font-mono">Rp {piutang.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 🏆 PANEL KANAN: TOP 5 MENU TERLARIS DENGAN FILTER */}
      {/* ==================================================== */}
      <div className="bg-[#0a0a12]/80 border border-white/5 rounded-3xl p-6 flex flex-col shadow-lg">
         
         <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              🏆 Top 5 Terlaris
            </h3>
            
            {/* DROPDOWN FILTER WAKTU */}
            <select 
              value={rentangTop5} 
              onChange={(e) => setRentangTop5(e.target.value)}
              className="bg-black/50 border border-white/10 text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-cyan-500/50 transition-colors"
            >
              <option value="MINGGU_INI">7 Hari Terakhir</option>
              <option value="BULAN_INI">Bulan Ini</option>
              <option value="TAHUN_INI">Tahun Ini</option>
            </select>
         </div>

        <div className="flex-1 flex flex-col justify-center space-y-5">
          {top5Barang.length === 0 ? (
            <p className="text-slate-600 font-mono text-center text-sm">Belum ada data penjualan pada rentang waktu ini.</p>
          ) : (
            top5Barang.map((b, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-24 md:w-28 shrink-0 text-right">
                  <p className="text-[11px] md:text-xs text-slate-300 font-bold leading-tight line-clamp-2">
                    {b.nama}
                  </p>
                </div>
                <div className="flex-1 h-7 bg-slate-900 rounded-md overflow-hidden relative border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-r-md transition-all duration-1000 ease-out flex items-center px-3 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                    style={{ width: `${(b.qty / maxQty) * 100}%`, minWidth: '15%' }}
                  >
                     <span className="text-[10px] md:text-xs font-black text-white font-mono drop-shadow-md">
                       {b.qty}x
                     </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}