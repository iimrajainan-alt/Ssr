/**
 * 🧮 MODUL KALKULASI LAPORAN KEUANGAN
 * Menghitung Omzet, Laba, dan Rugi dari riwayat transaksi
 */

export function hitungOmzetHarian(riwayatTransaksi) {
  const sekarang = new Date();
  const tglSekarang = sekarang.toLocaleDateString('id-ID');

  return riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    if (tglNota === tglSekarang) {
      return sum + (nota.total || nota.totalPendapatan || 0);
    }
    return sum;
  }, 0);
}

export function hitungOmzetBulanan(riwayatTransaksi) {
  const sekarang = new Date();
  const blnSekarang = sekarang.getMonth();
  const thnSekarang = sekarang.getFullYear();

  return riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    const parts = tglNota.split('/');

    if (parts.length === 3) {
      const b = parseInt(parts[1]) - 1;
      const t = parseInt(parts[2]);

      if (b === blnSekarang && t === thnSekarang) {
        return sum + (nota.total || nota.totalPendapatan || 0);
      }
    }
    return sum;
  }, 0);
}

export function hitungOmzetTahunan(riwayatTransaksi) {
  const sekarang = new Date();
  const thnSekarang = sekarang.getFullYear();

  return riwayatTransaksi.reduce((sum, nota) => {
    const tglNota = (nota.waktu || nota.tanggal || "").split(',')[0].trim();
    const parts = tglNota.split('/');

    if (parts.length === 3) {
      const t = parseInt(parts[2]);
      if (t === thnSekarang) {
        return sum + (nota.total || nota.totalPendapatan || 0);
      }
    }
    return sum;
  }, 0);
}

export function hitungLabaKotor(riwayatTransaksi, gudang) {
  let labaKotor = 0;

  riwayatTransaksi.forEach(nota => {
    if (nota.items && Array.isArray(nota.items)) {
      nota.items.forEach(item => {
        const barang = gudang.find(g => g.id === item.id);
        if (barang) {
          const labaPerItem = (item.harga - barang.modal) * item.qty;
          labaKotor += labaPerItem;
        }
      });
    }
  });

  return labaKotor;
}

export function hitungTotalRugi(bukuKerugian) {
  return bukuKerugian.reduce((sum, kerugian) => {
    return sum + (kerugian.totalRugiModal || 0);
  }, 0);
}

export function hitungLabaBersih(riwayatTransaksi, gudang, bukuKerugian) {
  const labaKotor = hitungLabaKotor(riwayatTransaksi, gudang);
  const totalRugi = hitungTotalRugi(bukuKerugian);
  return labaKotor - totalRugi;
}
