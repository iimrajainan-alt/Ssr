import { useState } from 'react';

export default function ModalOperasional({ show, close, setRiwayatOperasional }) {
  const [form, setForm] = useState({ nominal: "", kategori: "Gaji Karyawan", keterangan: "" });

  if (!show) return null;

  const simpanOperasional = (e) => {
    e.preventDefault();
    const uangKeluar = Number(form.nominal);
    
    if (uangKeluar <= 0) {
      alert("⚠️ Gagal! Nominal tidak boleh nol atau minus.");
      return;
    }

    const catatanBaru = {
      id: "OPR-" + Date.now().toString().slice(-6),
      waktu: new Date().toLocaleString('id-ID'),
      kategori: form.kategori,
      nominal: uangKeluar,
      keterangan: form.keterangan || "-"
    };

    setRiwayatOperasional(lama => [...lama, catatanBaru]);
    close();
    setForm({ nominal: "", kategori: "Gaji Karyawan", keterangan: "" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0a12] border border-blue-500/30 p-8 rounded-[40px] w-full max-w-md shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-[fadeIn_0.2s_ease-out]">
        <h2 className="text-2xl font-black text-blue-400 mb-6 flex items-center gap-2">
          <span>🧾</span> CATAT OPERASIONAL
        </h2>

        <form onSubmit={simpanOperasional} className="space-y-4">
          
          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Kategori Pengeluaran</label>
            <select 
              value={form.kategori} 
              onChange={(e) => setForm({...form, kategori: e.target.value})} 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white appearance-none cursor-pointer outline-none focus:border-blue-500"
            >
              <option value="Gaji Karyawan">Gaji Karyawan</option>
              <option value="Listrik & Air">Listrik & Air</option>
              <option value="Internet / WiFi">Internet / WiFi</option>
              <option value="Sewa Tempat">Sewa Tempat</option>
              <option value="Lainnya">Lainnya...</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Nominal Keluar (Rp)</label>
            <input 
              required type="number" min="1" 
              value={form.nominal} 
              onChange={(e) => setForm({...form, nominal: e.target.value})} 
              className="w-full bg-slate-900 border border-blue-500/30 rounded-2xl py-3 px-4 text-blue-400 font-mono font-bold focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Keterangan Tambahan</label>
            <input 
              type="text" 
              placeholder="Cth: Gaji bulan ini / Token 50k"
              value={form.keterangan} 
              onChange={(e) => setForm({...form, keterangan: e.target.value})} 
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-slate-300 focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-500/20 mt-4">
            <p className="text-[10px] text-blue-400/80 uppercase tracking-widest text-center">Biaya operasional memotong sisa laba di kasir!</p>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={close} className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors">BATAL</button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.4)]">SIMPAN</button>
          </div>
        </form>
      </div>
    </div>
  );
}
