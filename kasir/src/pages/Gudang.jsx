import { useState } from 'react';
import ModalBarangBaru from '../components/gudang/ModalBarangBaru';
import ModalEditBarang from '../components/gudang/ModalEditBarang'; // File baru nanti!
import ModalKerugian from '../components/gudang/ModalKerugian';

export default function Gudang({ gudang, setGudang, bukuKerugian, setBukuKerugian }) {
  const [showModalBaru, setShowModalBaru] = useState(false);
  const [showModalRugi, setShowModalRugi] = useState(false);
  const [produkDipilih, setProdukDipilih] = useState(null); // Untuk Edit

  const tambahBarang = (barangBaru) => {
    setGudang([...gudang, { ...barangBaru, id: Date.now() }]);
    setShowModalBaru(false);
  };

  const updateBarang = (barangUpdate) => {
    setGudang(gudang.map(item => item.id === barangUpdate.id ? barangUpdate : item));
    setProdukDipilih(null);
  };

  const hapusBarang = (id) => {
    const yakin = window.confirm("Hapus barang ini dari database? Tindakan ini tidak bisa dibatalkan!");
    if (yakin) setGudang(gudang.filter(item => item.id !== id));
  };

  return (
    <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-100">📦 DATABASE GUDANG</h2>
        <div className="flex gap-3">
          <button onClick={() => setShowModalRugi(true)} className="bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition-all">⚠️ LAPOR RUGI</button>
          <button onClick={() => setShowModalBaru(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]">➕ TAMBAH BARANG</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
        {gudang.map((item) => (
          <div key={item.id} className="bg-[#0a0a12]/60 border border-white/5 p-5 rounded-3xl group hover:border-indigo-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">{item.icon}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setProdukDipilih(item)} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/20 hover:bg-indigo-500/40">📝</button>
                <button onClick={() => hapusBarang(item.id)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 hover:bg-rose-500/40">🗑️</button>
              </div>
            </div>
            <h4 className="font-bold text-slate-200 text-lg mb-1">{item.nama}</h4>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Harga Modal</p>
                <p className="text-sm font-mono text-slate-300">Rp {item.modal.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">Harga Jual</p>
                <p className="text-sm font-mono text-indigo-300 font-bold">Rp {item.hargaJual.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className="mt-3 bg-black/40 p-2 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold px-2">Stok Tersedia</span>
              <span className={`font-mono font-bold px-3 py-0.5 rounded-lg ${item.stok < 10 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {item.stok}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ModalBarangBaru show={showModalBaru} close={() => setShowModalBaru(false)} simpan={tambahBarang} />
      {produkDipilih && <ModalEditBarang produk={produkDipilih} close={() => setProdukDipilih(null)} simpan={updateBarang} />}
      <ModalKerugian show={showModalRugi} close={() => setShowModalRugi(false)} gudang={gudang} setGudang={setGudang} setBukuKerugian={setBukuKerugian} />
    </div>
  );
}