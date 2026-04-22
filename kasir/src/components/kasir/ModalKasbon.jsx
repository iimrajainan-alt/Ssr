export default function ModalKasbon({ 
  showModalKasbon, setShowModalKasbon, 
  namaPelanggan, setNamaPelanggan, 
  handleProsesKasbon, totalTagihan 
}) {
  if (!showModalKasbon) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center print:hidden">
      <div className="bg-[#0a0a12] border border-amber-500/50 p-8 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
        
        <h2 className="text-2xl font-black text-amber-400 mb-2 border-b border-amber-500/20 pb-4">📝 CATAT KASBON</h2>
        <p className="text-xs text-slate-400 mb-6 font-mono">
          Total Tagihan: <span className="text-amber-300 font-bold">Rp {totalTagihan.toLocaleString('id-ID')}</span>
        </p>

        <form onSubmit={handleProsesKasbon} className="space-y-6 relative z-10">
          <div>
            <label className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest block mb-2">
              Nama Penghutang (Wajib)
            </label>
            <input 
              required 
              autoFocus
              type="text" 
              placeholder="Misal: Bapak Budi..." 
              value={namaPelanggan} 
              onChange={(e) => setNamaPelanggan(e.target.value)} 
              className="w-full bg-slate-900/80 border border-amber-500/30 text-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-amber-400 font-bold" 
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={() => {
                setShowModalKasbon(false);
                setNamaPelanggan(""); // Reset nama kalau batal
              }} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] text-sm uppercase tracking-widest"
            >
              Catat Hutang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}