import { useState, useEffect } from 'react';

export default function ModalKerugian({ show, close, gudang, setGudang, setBukuKerugian }) {
  const [form, setForm] = useState({ idBarang: "", qty: 1, alasan: "Rusak" });

  useEffect(() => {
    if (show && gudang && gudang.length > 0 && form.idBarang === "") {
      setForm(f => ({ ...f, idBarang: gudang[0].id }));
    }
  }, [show, gudang]);

  if (!show) return null;

  const simpanKerugian = (e) => {
    e.preventDefault();
    if (gudang.length === 0) return;

    // Cari barang yang dipilih
    const barang = gudang.find(b => b.id.toString() === form.idBarang.toString());
    if (!barang) return;

    const qtyRugi = Number(form.qty);
    
    // Cegah kasir nakal yang masukin angka minus atau melebihi stok
    if (qtyRugi <= 0 || qtyRugi > barang.stok) {
      alert(`⚠️ Gagal! Stok ${barang.nama} saat ini hanya ${barang.stok}.`);
      return;
    }

    // 1. Potong Stok di Gudang
    const gudangBaru = gudang.map(b => {
      if (b.id === barang.id) {
        return { ...b, stok: b.stok - qtyRugi };
      }
      return b;
    });
    setGudang(gudangBaru);

    // 2. Catat ke Buku Dosa (Buku Kerugian)
    const totalRugiModal = barang.modal * qtyRugi;
    const catatanRugi = {
      id: "RUGI-" + Date.now().toString().slice(-6),
      waktu: new Date().toLocaleString('id-ID'),
      namaBarang: barang.nama,
      qty: qtyRugi,
      totalRugiModal: totalRugiModal,
      alasan: form.alasan
    };

    setBukuKerugian(lama => [...lama, catatanRugi]);

    // Tutup dan bersihkan modal
    close();
    setForm({ idBarang: gudang.length > 0 ? gudang[0].id : "", qty: 1, alasan: "Rusak" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0a12] border border-rose-500/30 p-8 rounded-[40px] w-full max-w-md shadow-[0_0_50px_rgba(225,29,72,0.2)] animate-[fadeIn_0.2s_ease-out]">
        <h2 className="text-2xl font-black text-rose-400 mb-6 flex items-center gap-2">
          <span>⚠️</span> LAPOR KERUGIAN
        </h2>

        {gudang.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 font-mono mb-4">Gudang kosong, tidak ada barang yang bisa dilaporkan.</p>
            <button onClick={close} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl font-bold">Kembali</button>
          </div>
        ) : (
          <form onSubmit={simpanKerugian} className="space-y-4">
            
            <div>
              <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Pilih Barang yang Lenyap</label>
              <select 
                value={form.idBarang} 
                onChange={(e) => setForm({...form, idBarang: e.target.value})} 
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-white appearance-none cursor-pointer outline-none focus:border-rose-500"
              >
                {gudang.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.nama} (Sisa: {item.stok})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Jumlah</label>
                <input 
                  required type="number" min="1" 
                  value={form.qty} 
                  onChange={(e) => setForm({...form, qty: e.target.value === "" ? "" : Number(e.target.value)})} 
                  className="w-full bg-slate-900 border border-rose-500/30 rounded-2xl py-3 px-4 text-rose-400 font-mono font-bold focus:outline-none focus:border-rose-500" 
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Alasan / Tragedi</label>
                <select 
                  value={form.alasan} 
                  onChange={(e) => setForm({...form, alasan: e.target.value})} 
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-slate-300 appearance-none cursor-pointer outline-none focus:border-rose-500"
                >
                  <option value="Rusak">Rusak / Basi</option>
                  <option value="Hilang">Hilang / Dicuri</option>
                  <option value="Dimakan Kucing">Dimakan Hewan</option>
                  <option value="Kadaluarsa">Kadaluarsa</option>
                  <option value="Lainnya">Lainnya...</option>
                </select>
              </div>
            </div>

            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/20 mt-4">
               <p className="text-[10px] text-rose-400/80 uppercase tracking-widest text-center">Kerugian akan memotong Sisa Laba Finansial secara otomatis!</p>
            </div>

            <div className="flex gap-4 pt-2">
              <button type="button" onClick={close} className="flex-1 py-4 text-slate-400 font-bold hover:text-white transition-colors">BATAL</button>
              <button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-black py-4 rounded-2xl shadow-[0_0_15px_rgba(225,29,72,0.4)]">CATAT RUGI</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}