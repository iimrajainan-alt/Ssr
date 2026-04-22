export default function ModalDetailBarang({ detailNota, setDetailNota }) {
  if (!detailNota) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
      <div className="bg-[#0a0a12] border border-indigo-500/50 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(99,102,241,0.2)] animate-[fadeIn_0.2s_ease-out] max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center border-b border-indigo-500/20 pb-4 mb-4">
          <div>
            <h2 className="text-xl font-black text-indigo-300">🛒 RINCIAN BELANJA</h2>
            <p className="text-[10px] text-slate-400 font-mono mt-1">{detailNota.id}</p>
          </div>
          <button onClick={() => setDetailNota(null)} className="text-slate-500 hover:text-rose-400 text-2xl font-black transition-colors">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-6">
          {detailNota.items && detailNota.items.length > 0 ? (
            detailNota.items.map((item, idx) => {
              const hargaItem = item.harga || item.hargaJual || 0;
              return (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-200 text-sm">{item.nama}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">{item.qty} x Rp {hargaItem.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="font-black text-indigo-400 font-mono text-sm">
                    Rp {(item.qty * hargaItem).toLocaleString('id-ID')}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-slate-500 text-xs italic py-4">Rincian barang tidak ditemukan di nota lama ini.</p>
          )}
        </div>

        <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/30 flex justify-between items-center">
           <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Tagihan</span>
           <span className="text-2xl font-black text-indigo-300 font-mono">
             Rp {(detailNota.total || detailNota.totalPendapatan || 0).toLocaleString('id-ID')}
           </span>
        </div>

      </div>
    </div>
  );
}