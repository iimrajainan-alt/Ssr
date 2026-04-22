export default function ModalTunai({ 
  showModalTunai, setShowModalTunai, 
  namaPelanggan, setNamaPelanggan, 
  handleProsesTunai, totalTagihan 
}) {
  if (!showModalTunai) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center print:hidden">
      <div className="bg-[#0a0a12] border border-emerald-500/50 p-8 rounded-3xl w-full max-w-sm shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        
        <h2 className="text-2xl font-black text-emerald-400 mb-2 border-b border-emerald-500/20 pb-4">💵 KONFIRMASI TUNAI</h2>
        <p className="text-xs text-slate-400 mb-6 font-mono">
          Total Tagihan: <span className="text-emerald-300 font-bold text-lg">Rp {totalTagihan.toLocaleString('id-ID')}</span>
        </p>

        <form onSubmit={handleProsesTunai} className="space-y-6 relative z-10">
          <div>
            <label className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest block mb-2">
              Nama Pembeli (Opsional)
            </label>
            <input 
              autoFocus
              type="text" 
              placeholder="Kosongkan jika Pelanggan Umum..." 
              value={namaPelanggan} 
              onChange={(e) => setNamaPelanggan(e.target.value)} 
              className="w-full bg-slate-900/80 border border-emerald-500/30 text-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-400 font-bold" 
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="button" 
              onClick={() => {
                setShowModalTunai(false);
                setNamaPelanggan(""); // Reset nama kalau batal
              }} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] text-sm uppercase tracking-widest"
            >
              Terima Uang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}