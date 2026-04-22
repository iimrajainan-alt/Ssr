import { useState } from 'react';

export default function ModalBagiDividen({ 
  sisaLaba, porsiCeo, porsiInv, 
  setRiwayatBagiHasil, showModalDiv, setShowModalDiv 
}) {
  const [nominalTarik, setNominalTarik] = useState("");

  if (!showModalDiv) return null;

  const handleTarikDividen = (e) => {
    e.preventDefault();
    const uangDitarik = Number(nominalTarik);
    if (uangDitarik <= 0 || uangDitarik > sisaLaba) return;

    const dividenBaru = {
      id: "DIV-" + Date.now().toString().slice(-6),
      waktu: new Date().toLocaleString('id-ID'),
      nominal: uangDitarik,
      ceo: uangDitarik * porsiCeo,       
      investor: uangDitarik * porsiInv   
    };

    setRiwayatBagiHasil(lama => [...lama, dividenBaru]);
    setShowModalDiv(false);
    setNominalTarik("");
  };

  const bayanganCeo = Number(nominalTarik) * porsiCeo;
  const bayanganInvestor = Number(nominalTarik) * porsiInv;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out] print:hidden">
      <div className="bg-[#0a0a12] border border-amber-500/50 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        
        <h2 className="text-xl font-black text-amber-400 mb-4 border-b border-amber-500/20 pb-4">
          💸 TARIK DIVIDEN (BAGI HASIL)
        </h2>
        
        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20 mb-6 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Maksimal Dana Bisa Ditarik</p>
          <p className="text-2xl font-black text-amber-400 font-mono">Rp {sisaLaba.toLocaleString('id-ID')}</p>
        </div>

        <form onSubmit={handleTarikDividen} className="space-y-6">
          <div>
            <label className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest block mb-2">
              Nominal yang Ingin Ditarik (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
              <input 
                required autoFocus type="number" 
                min="1" max={sisaLaba}
                value={nominalTarik} 
                onChange={(e) => setNominalTarik(e.target.value)} 
                className="w-full bg-slate-900/80 border border-amber-500/30 text-amber-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 font-mono font-black text-lg" 
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button 
                type="button" 
                onClick={() => setNominalTarik(sisaLaba)}
                className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded hover:bg-amber-500/40 transition-all border border-amber-500/30"
              >
                Tarik Semua Laba
              </button>
            </div>
          </div>

          {Number(nominalTarik) > 0 && (
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
              <div className="text-center w-1/2 border-r border-white/5">
                <p className="text-[9px] text-slate-500 uppercase">CEO ({(porsiCeo * 100).toFixed(0)}%)</p>
                <p className="text-sm font-bold text-indigo-400 font-mono">Rp {bayanganCeo.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-center w-1/2">
                <p className="text-[9px] text-slate-500 uppercase">Investor ({(porsiInv * 100).toFixed(0)}%)</p>
                <p className="text-sm font-bold text-slate-300 font-mono">Rp {bayanganInvestor.toLocaleString('id-ID')}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button type="button" onClick={() => { setShowModalDiv(false); setNominalTarik(""); }} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-all text-sm uppercase tracking-widest">Batal</button>
            <button type="submit" className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] text-sm uppercase tracking-widest">Cairkan Uang</button>
          </div>
        </form>

      </div>
    </div>
  );
}