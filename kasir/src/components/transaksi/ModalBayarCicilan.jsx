import { useState } from 'react';

export default function ModalBayarCicilan({ notaCicilan, setNotaCicilan, setRiwayatTransaksi }) {
  const [nominalBayar, setNominalBayar] = useState("");

  if (!notaCicilan) return null;

  const simpanCicilan = (e) => {
    e.preventDefault();
    const bayar = Number(nominalBayar);
    if (bayar <= 0) return;

    setRiwayatTransaksi((lama) => lama.map((nota) => {
      if (nota.id === notaCicilan.id) {
        const totalTagihan = nota.total || nota.totalPendapatan || 0;
        const terbayarLama = nota.jumlahTerbayar || 0;
        const terbayarBaru = terbayarLama + bayar;
        const isLunas = terbayarBaru >= totalTagihan;

        return {
          ...nota,
          jumlahTerbayar: terbayarBaru,
          status: isLunas ? "LUNAS (EKS-KASBON)" : "HUTANG (DICICIL)"
        };
      }
      return nota;
    }));

    setNotaCicilan(null);
    setNominalBayar("");
  };

  const totalTagihan = notaCicilan.total || 0;
  const sudahDibayar = notaCicilan.jumlahTerbayar || 0;
  const sisaHutang = totalTagihan - sudahDibayar;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 print:hidden animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#0a0a12] border border-emerald-500/50 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        
        <h2 className="text-xl font-black text-emerald-400 mb-4 border-b border-emerald-500/20 pb-4">
          💸 PEMBAYARAN KASBON
        </h2>
        
        <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20 mb-6 space-y-2">
          <p className="text-xs text-slate-400 flex justify-between">
            <span>Penghutang:</span> <span className="font-bold text-slate-200">{notaCicilan.pelanggan || "Hamba Allah"}</span>
          </p>
          <p className="text-xs text-slate-400 flex justify-between">
            <span>Total Tagihan:</span> <span className="font-mono text-slate-200">Rp {totalTagihan.toLocaleString('id-ID')}</span>
          </p>
          <p className="text-xs text-slate-400 flex justify-between border-t border-emerald-500/20 pt-2">
            <span>Sisa Hutang:</span> 
            <span className="font-mono font-black text-emerald-400">
              Rp {sisaHutang.toLocaleString('id-ID')}
            </span>
          </p>
        </div>

        <form onSubmit={simpanCicilan} className="space-y-6">
          <div>
            <label className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest block mb-2">
              Nominal Uang yang Dibayar (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
              <input 
                required autoFocus type="number" 
                min="1" max={sisaHutang}
                value={nominalBayar} 
                onChange={(e) => setNominalBayar(e.target.value)} 
                className="w-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-400 font-mono font-black text-lg" 
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button 
                type="button" 
                onClick={() => setNominalBayar(sisaHutang)}
                className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded hover:bg-emerald-500/40 transition-all border border-emerald-500/30"
              >
                Lunasi Semua Sisa
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => { setNotaCicilan(null); setNominalBayar(""); }} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] text-sm uppercase tracking-widest">
              Terima Uang
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}