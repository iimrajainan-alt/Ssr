import { useState } from 'react';
import KatalogProduk from '../components/kasir/KatalogProduk';
import KeranjangBelanja from '../components/kasir/KeranjangBelanja';
import { useTheme } from '../context/useTheme';
import { getThemeColor } from '../config/themeConfig';

export default function Kasir({ gudang, setGudang, setRiwayatTransaksi, setStrukCetak, setPreviewMode, currentUser }) {
  const [keranjang, setKeranjang] = useState([]);
  const [kataKunci, setKataKunci] = useState("");
  const { isDarkMode } = useTheme();
  const tema = getThemeColor(isDarkMode);

  const tambahKeKeranjang = (produk) => {
    if (produk.stok <= 0) {
      alert(`⚠️ Maaf, stok ${produk.nama} sudah habis!`);
      return;
    }

    setKeranjang((lama) => {
      const idx = lama.findIndex((item) => item.id === produk.id);
      if (idx !== -1) {
        const baru = [...lama];
        
        if (baru[idx].qty + 1 > produk.stok) {
          alert(`⚠️ Maksimal! Stok ${produk.nama} hanya tersisa ${produk.stok}.`);
          return baru;
        }
        
        baru[idx].qty += 1;
        return baru;
      }
      return [...lama, { ...produk, qty: 1 }];
    });
  };

  const hapusItem = (id) => setKeranjang((lama) => lama.filter((item) => item.id !== id));
  
  const ubahQtyItem = (id, perubahan) => {
    setKeranjang((lama) => {
      return lama.map(item => {
        if (item.id === id) {
          const qtyBaru = item.qty + perubahan;
          
          if (qtyBaru > item.stok) {
            return { ...item, qty: item.stok }; // Mentok di angka maksimal
          }
          
          // Kunci tombol [-] agar tidak turun di bawah 1
          return { ...item, qty: qtyBaru > 0 ? qtyBaru : 1 };
        }
        return item;
      });
    });
  };

  const totalTagihan = keranjang.reduce((sum, item) => sum + (item.hargaJual * item.qty), 0);

  const prosesPembayaran = (metode, namaPelanggan = "Umum") => {
    if (keranjang.length === 0) return;
    
    // Kita hanya fokus menghitung Uang Masuk dan Modal Keluar. Sangat ringan!
    let totalModal = 0, totalPendapatan = 0;

    let gudangBaru = [...gudang]; 

    keranjang.forEach((item) => {
      const pendapatanItem = item.hargaJual * item.qty;
      const modalItem = item.modal * item.qty;

      totalPendapatan += pendapatanItem;
      totalModal += modalItem;

      const idxGudang = gudangBaru.findIndex(g => g.id === item.id);
      if(idxGudang !== -1) {
        gudangBaru[idxGudang].stok = gudangBaru[idxGudang].stok - item.qty;
      }
    });

    setGudang(gudangBaru);

    const notaBaru = {
      id: "INV-" + Date.now().toString().slice(-6), 
      waktu: new Date().toLocaleString('id-ID'), 
      kasir: currentUser?.name || "Kasir", 
      pelanggan: namaPelanggan,
      status: metode === "TUNAI" ? "LUNAS" : "HUTANG",
      metodePembayaran: metode,
      items: keranjang.map(item => ({ ...item, harga: item.hargaJual })), 
      total: totalPendapatan, 
      totalModal: totalModal,
      labaKotor: totalPendapatan - totalModal
    };

    setRiwayatTransaksi((lama) => [...lama, notaBaru]);
    setKeranjang([]);
    
    setStrukCetak(notaBaru);
    if(setPreviewMode) setPreviewMode(true); 
  };

  const produkTampil = gudang.filter((produk) =>
    produk.nama.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col animate-[fadeIn_0.3s_ease-out]">
<h2 className={`text-2xl font-black ${tema.text.heading} mb-6 drop-shadow-md`}>💳 TERMINAL TRANSAKSI</h2>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden min-h-0">
        
        <KatalogProduk 
          produkTampil={produkTampil} 
          kataKunci={kataKunci} 
          setKataKunci={setKataKunci} 
          tambahKeKeranjang={tambahKeKeranjang} 
        />
        
        <KeranjangBelanja 
          keranjang={keranjang} 
          hapusItem={hapusItem} 
          ubahQtyItem={ubahQtyItem} 
          totalTagihan={totalTagihan} 
          prosesPembayaran={prosesPembayaran} 
        />

      </div>
    </div>
  );
}