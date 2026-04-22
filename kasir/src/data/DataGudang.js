// DataGudang.js

export const databaseGudang = [
  { 
    id: 1, 
    nama: "Indomie Goreng", 
    icon: "🍜", 
    modal: 2500,     // Harga beli dari supplier/investor
    hargaJual: 3500, // Harga jual ke pembeli (Laba kotor: Rp 1.000)
    nisbah: 0.6,
    stok: 100         // 60% laba untuk Tuan Muda, 40% untuk Investor
  },
  { 
    id: 2, 
    nama: "Aqua Botol 600ml", 
    icon: "💧", 
    modal: 2000, 
    hargaJual: 3500, 
    nisbah: 0.5,      // Bagi rata 50:50
    stok: 150
  },
  { 
    id: 3, 
    nama: "Roti Aoka Coklat", 
    icon: "🍞", 
    modal: 2000, 
    hargaJual: 3000, 
    nisbah: 0.5,
    stok: 200
  },
  { 
    id: 4, 
    nama: "Kopi Good Day", 
    icon: "☕", 
    modal: 4000, 
    hargaJual: 6000, 
    nisbah: 0.6,
    stok: 120
  },
  { 
    id: 5, 
    nama: "Sabun Lifebuoy", 
    icon: "🧼", 
    modal: 3500, 
    hargaJual: 5000, 
    nisbah: 0.4,      // 40% untuk Tuan Muda (Mungkin barang titipan khusus)
    stok: 180
  },
  { 
    id: 6, 
    nama: "Chitato Sapi Panggang", 
    icon: "🥔", 
    modal: 8000, 
    hargaJual: 11000, 
    nisbah: 0.5,
    stok: 100
  }
];