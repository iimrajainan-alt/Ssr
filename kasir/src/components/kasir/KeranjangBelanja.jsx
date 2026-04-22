import { useState } from 'react';
import ModalKasbon from './ModalKasbon';
import ModalTunai from './ModalTunai';

export default function KeranjangBelanja({ keranjang, hapusItem, ubahQtyItem, totalTagihan, prosesPembayaran }) {
  // State untuk Kasbon
  const [showModalKasbon, setShowModalKasbon] = useState(false);
  const [namaPelangganKasbon, setNamaPelangganKasbon] = useState("");

  // State untuk Tunai
  const [showModalTunai, setShowModalTunai] = useState(false);
  const [namaPelangganTunai, setNamaPelangganTunai] = useState("");

  // Handler Kasbon (Wajib Nama)
  const handleProsesKasbon = (e) => {
    e.preventDefault();
    if (!namaPelangganKasbon.trim()) return;
    prosesPembayaran("KASBON", namaPelangganKasbon);
    setShowModalKasbon(false);
    setNamaPelangganKasbon("");
  };

  // Handler Tunai (Nama Opsional)
  const handleProsesTunai = (e) => {
    e.preventDefault();
    // Kalau namanya kosong, otomatis diberi nama "Umum"
    const namaFinal = namaPelangganTunai.trim() === "" ? "Umum" : namaPelangganTunai;
    prosesPembayaran("TUNAI", namaFinal);
    setShowModalTunai(false);
    setNamaPelangganTunai("");
  };

  return (
    <>
      <div className="md:col-span-5 bg-[#05050b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl relative h-full min-h-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex justify-between">
          <span>🧾 Struk Belanja</span>
          <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg font-mono text-xs">{keranjang.length} Item</span>
        </h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {keranjang.map((item) => (
            <div key={item.id} className="bg-[#0a0a12] border border-white/5 p-4 rounded-2xl flex justify-between items-center hover:bg-white/5 transition-colors">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-slate-200 text-[15px] leading-tight mb-1">{item.nama}</h4>
                <p className="font-mono text-indigo-400/80 text-xs">
                  Rp {(item.hargaJual * item.qty).toLocaleString('id-ID')}
                </p>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
                  <button onClick={() => ubahQtyItem(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">-</button>
                  <span className="w-8 text-center font-bold text-white font-mono text-sm">{item.qty}</span>
                  <button onClick={() => ubahQtyItem(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors">+</button>
                </div>
                
                <button 
                  onClick={() => hapusItem(item.id)} 
                  className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-500 w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-[0_0_10px_rgba(225,29,72,0.1)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 shrink-0">
            <div className="flex justify-between items-end mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
              <span className="text-slate-400 text-sm uppercase font-bold tracking-widest">Total Tagihan</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300 font-mono">Rp {totalTagihan.toLocaleString('id-ID')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* TOMBOL TUNAI SEKARANG MEMANGGIL MODAL! */}
              <button 
                onClick={() => setShowModalTunai(true)} 
                disabled={keranjang.length === 0} 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all disabled:opacity-50 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                💵 BAYAR TUNAI
              </button>
              <button 
                onClick={() => setShowModalKasbon(true)} 
                disabled={keranjang.length === 0} 
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-4 rounded-xl transition-all disabled:opacity-50 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                📝 CATAT KASBON
              </button>
            </div>
        </div>
      </div>

      {/* MANGGIL DUA MODAL SEKALIGUS */}
      <ModalTunai 
        showModalTunai={showModalTunai} setShowModalTunai={setShowModalTunai}
        namaPelanggan={namaPelangganTunai} setNamaPelanggan={setNamaPelangganTunai}
        handleProsesTunai={handleProsesTunai} totalTagihan={totalTagihan}
      />

      <ModalKasbon 
        showModalKasbon={showModalKasbon} setShowModalKasbon={setShowModalKasbon}
        namaPelanggan={namaPelangganKasbon} setNamaPelanggan={setNamaPelangganKasbon}
        handleProsesKasbon={handleProsesKasbon} totalTagihan={totalTagihan}
      />
    </>
  );
}