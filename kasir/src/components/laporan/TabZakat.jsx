import { useState, useEffect } from 'react';

export default function TabZakat({ harian = 0, bulanan = 0, tahunan = 0 }) {
  const [hargaEmas, setHargaEmas] = useState(1300000); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Mengambil harga emas real-time saat komponen dimuat
  useEffect(() => {
    const fetchHargaEmas = async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
        // Menggunakan Binance API (Sangat stabil, tanpa limit berlebihan, dan bebas CORS)
        // PAXG adalah aset yang dipatok 1:1 dengan 1 Troy Ounce Emas fisik
        // USDTIDRT adalah konversi nilai Dolar ke Rupiah
        const [resGold, resIdr] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=PAXGUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=USDTIDRT')
        ]);
        
        if (!resGold.ok || !resIdr.ok) {
          throw new Error("Gagal terhubung ke server pasar global");
        }
        
        const dataGold = await resGold.json();
        const dataIdr = await resIdr.json();
        
        const paxgUsdt = parseFloat(dataGold.price);
        const usdtIdrt = parseFloat(dataIdr.price);
        
        if (paxgUsdt && usdtIdrt) {
          // 1 Troy Ounce = 31.1034768 Gram Emas
          const hargaPerGramIdr = (paxgUsdt * usdtIdrt) / 31.1034768;
          setHargaEmas(Math.round(hargaPerGramIdr));
        } else {
            throw new Error("Format data pasar tidak sesuai");
        }

      } catch (error) {
        console.warn("Gagal mengambil harga emas:", error);
        setErrorMsg("Gagal memuat harga real-time, Anda dapat mengubahnya secara manual.");
        // Harga emas tetap pada nilai default jika gagal
      } finally {
        setIsLoading(false);
      }
    };

    fetchHargaEmas();
  }, []);
  
  const omzetTahunan = tahunan || 0; 
  
  const nisabZakat = hargaEmas * 85;
  const isWajibZakat = omzetTahunan >= nisabZakat;
  const totalZakat = isWajibZakat ? (omzetTahunan * 0.025) : 0;

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      <div className="bg-emerald-950/30 border border-emerald-500/30 p-8 rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute -right-10 -top-10 text-9xl opacity-5">🕋</div>
        <div className="relative z-10 flex-1">
          <h2 className="text-2xl font-black text-emerald-400 tracking-widest mb-2 flex items-center gap-3">
            <span>⚖️</span> KALKULATOR ZAKAT TIJARAH
          </h2>
          <p className="text-sm text-emerald-200/70">
            "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka." (QS. At-Taubah: 103)
          </p>
        </div>
        
        <div className="relative z-10 bg-black/40 p-4 rounded-2xl border border-emerald-500/20 w-full md:w-auto">
          <label className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest block mb-2 flex justify-between items-center">
            <span>Harga Emas Saat Ini (Per Gram)</span>
            {isLoading && <span className="text-amber-400 flex items-center gap-1"><span className="animate-spin text-lg leading-none">⏳</span> <span className="lowercase">Memuat...</span></span>}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
            <input 
              type="number" 
              value={hargaEmas}
              onChange={(e) => setHargaEmas(e.target.value === "" ? "" : Number(e.target.value))}
              disabled={isLoading}
              className={`w-full md:w-56 bg-slate-900 border ${errorMsg ? 'border-amber-500/50' : 'border-emerald-500/30'} text-emerald-300 font-mono font-bold rounded-xl py-2 pl-10 pr-3 outline-none focus:border-emerald-400 transition-colors disabled:opacity-50`}
            />
          </div>
          {errorMsg && (
            <p className="text-[9px] text-amber-500/80 mt-2 max-w-[220px] leading-tight">⚠️ {errorMsg}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-[#0a0a12]/60 border border-white/5 p-8 rounded-3xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
            ✦ Analisis Harta Tahunan
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Omzet Tahunan</p>
              {/* 🛡️ MENGGUNAKAN VARIABEL AMAN (omzetTahunan) */}
              <p className="text-3xl font-black text-slate-200 font-mono">Rp {omzetTahunan.toLocaleString('id-ID')}</p>
            </div>
            
            <div>
              <p className="text-xs text-amber-500/80 uppercase tracking-widest mb-1">Batas Nisab (85 Gram Emas)</p>
              <p className="text-xl font-black text-amber-400 font-mono">Rp {nisabZakat.toLocaleString('id-ID')}</p>
            </div>

            <div className={`p-4 rounded-xl border ${isWajibZakat ? 'bg-rose-950/20 border-rose-500/30' : 'bg-emerald-950/20 border-emerald-500/30'}`}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1 text-slate-400">Status Kewajiban</p>
              {isWajibZakat ? (
                <p className="text-rose-400 font-black flex items-center gap-2">
                  <span className="animate-pulse">⚠️</span> WAJIB ZAKAT (Telah mencapai Nisab)
                </p>
              ) : (
                <p className="text-emerald-400 font-black flex items-center gap-2">
                  <span>✅</span> BELUM WAJIB ZAKAT (Di bawah Nisab)
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={`border p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden transition-all duration-500 ${isWajibZakat ? 'bg-emerald-900/20 border-emerald-500' : 'bg-slate-900/40 border-white/5'}`}>
          {isWajibZakat && <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full"></div>}
          
          <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 relative z-10 ${isWajibZakat ? 'text-emerald-400' : 'text-slate-500'}`}>
            Kewajiban Zakat (2.5%)
          </h3>
          
          <div className="relative z-10">
            {isWajibZakat ? (
              <>
                <p className="text-5xl font-black text-emerald-400 font-mono drop-shadow-[0_0_15px_rgba(52,211,153,0.3)] mb-4">
                  Rp {totalZakat.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-emerald-200/60 leading-relaxed">
                  Berdasarkan perhitungan omzet tahunan, bisnis Anda telah mencapai haul dan nisab. Segera tunaikan zakat sebesar 2.5% dari total aset lancar Anda agar harta menjadi berkah.
                </p>
                <button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] text-sm uppercase tracking-widest flex justify-center items-center gap-2">
                  <span>💳</span> Bayar Zakat Sekarang
                </button>
              </>
            ) : (
              <>
                <p className="text-5xl font-black text-slate-600 font-mono mb-4">Rp 0</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Alhamdulillah, omzet tahunan Anda saat ini masih berada di bawah batas Nisab (85 gram emas). Anda belum diwajibkan untuk membayar Zakat Perdagangan tahun ini. Tingkatkan terus penjualan Anda!
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}