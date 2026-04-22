export default function KatalogProduk({ produkTampil, kataKunci, setKataKunci, tambahKeKeranjang }) {
  return (
    <div className="md:col-span-7 flex flex-col overflow-hidden bg-[#0a0a12]/50 border border-white/5 rounded-3xl p-6 min-h-0">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="text-indigo-500">✦</span> Katalog Produk
        </h3>
        <div className="relative w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input 
            type="text" placeholder="Cari nama barang..." value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="w-full bg-slate-900/50 border border-indigo-500/30 text-slate-200 placeholder-slate-600 text-sm rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* ETALASE BARANG */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-10">
        {produkTampil.map((produk) => (
          
          <button 
            key={produk.id} 
            onClick={() => tambahKeKeranjang(produk)} 
            className="mt-1 group relative bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 ease-out text-left flex flex-col h-full shadow-lg hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(99,102,241,0.2)]"
          >
            <span className="text-4xl mb-3 drop-shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
              {produk.icon}
            </span>
            
            <div className="w-full min-w-0 mb-2">
              {/* 🛡️ PERBAIKAN: Tambahkan group-hover:whitespace-normal agar teksnya turun ke bawah saat disentuh! */}
              <h4 className="text-base font-bold text-slate-300 truncate group-hover:whitespace-normal group-hover:text-white transition-all">
                {produk.nama}
              </h4>
            </div>
            
            <div className="mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <span className={`text-[10px] font-mono px-2 py-1 rounded border border-white/5 ${produk.stok < 10 ? 'bg-rose-900/50 text-rose-300' : 'bg-slate-900/50 text-slate-400'}`}>
                Sisa: {produk.stok || 0}
              </span>
            </div>

            <div className="mt-auto pt-3 border-t border-white/5 w-full flex justify-between items-end opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-slate-500 line-through">Rp {produk.modal.toLocaleString('id-ID')}</span>
              <span className="text-lg font-black text-indigo-400 font-mono tracking-tight group-hover:text-indigo-300">
                Rp {produk.hargaJual.toLocaleString('id-ID')}
              </span>
            </div>

          </button>

        ))}
      </div>
    </div>
  );
}