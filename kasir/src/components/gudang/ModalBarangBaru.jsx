import { useState } from 'react';

export default function ModalBarangBaru({ show, close, simpan }) {
  const [form, setForm] = useState({ nama: "", icon: "📦", modal: "", hargaJual: "", stok: "" });

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0a12] border border-white/10 p-8 rounded-[40px] w-full max-w-md shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <h2 className="text-2xl font-black text-white mb-6">➕ BARANG BARU</h2>
        <form onSubmit={(e) => { e.preventDefault(); simpan(form); setForm({ nama: "", icon: "📦", modal: "", hargaJual: "", stok: "" }); }} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1 text-center">Ikon</label>
              <input type="text" value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 text-center text-xl" />
            </div>
            <div className="col-span-3">
              <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Nama Barang</label>
              <input required type="text" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white" placeholder="Nama Produk..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Harga Modal</label>
              <input required type="number" value={form.modal} onChange={(e) => setForm({...form, modal: e.target.value === "" ? "" : Number(e.target.value)})} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white font-mono" placeholder="Rp..." />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Harga Jual</label>
              <input required type="number" value={form.hargaJual} onChange={(e) => setForm({...form, hargaJual: e.target.value === "" ? "" : Number(e.target.value)})} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-indigo-400 font-mono" placeholder="Rp..." />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Stok Awal</label>
            <input required type="number" value={form.stok} onChange={(e) => setForm({...form, stok: e.target.value === "" ? "" : Number(e.target.value)})} className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white font-mono" placeholder="Jumlah..." />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={close} className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors">BATAL</button>
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg">SIMPAN</button>
          </div>
        </form>
      </div>
    </div>
  );
}