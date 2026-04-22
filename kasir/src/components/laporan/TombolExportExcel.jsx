import React from 'react';

export default function TombolExportExcel({ 
  harian, bulanan, tahunan, 
  labaKotorTotal, totalRugiGudang, totalOperasional,
  totalTelahDibagi, sisaLabaDitahan, 
  riwayatBagiHasil, bukuKerugian, riwayatOperasional 
}) {

  const handleExport = () => {
    // 🪄 SIHIR: Kita membuat struktur HTML lengkap dengan CSS inline
    // Excel akan membaca ini dan mengubahnya menjadi tabel asli dengan warna!
    const htmlString = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <style>
          table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
          th { border: 1px solid #dddddd; padding: 8px; font-weight: bold; }
          td { border: 1px solid #dddddd; padding: 8px; }
          .title { font-size: 20px; font-weight: bold; text-align: center; color: #4f46e5; }
          .bg-primary { background-color: #4f46e5; color: white; }
          .bg-success { background-color: #10b981; color: white; }
          .bg-warning { background-color: #f59e0b; color: white; }
          .bg-danger { background-color: #e11d48; color: white; }
          .text-right { text-align: right; }
          .text-center { text-align: center; }
          .bold { font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="5" class="title">NEXUS POS - LAPORAN FINANSIAL KORPORAT</td></tr>
          <tr><td colspan="5" class="text-center">Dicetak pada: ${new Date().toLocaleString('id-ID')}</td></tr>
          <tr><td colspan="5"></td></tr>
        </table>

        <table>
          <tr>
            <th colspan="2" class="bg-primary">RINGKASAN OMZET</th>
            <th class="bg-success">RINGKASAN LABA</th>
            <th class="bg-success">NOMINAL</th>
          </tr>
          <tr>
            <td>Omzet Harian</td><td class="text-right">Rp ${harian.toLocaleString('id-ID')}</td>
            <td>Laba Kotor (Total Pendapatan - Modal)</td><td class="text-right">Rp ${labaKotorTotal.toLocaleString('id-ID')}</td>
          </tr>
          <tr>
            <td>Omzet Bulanan</td><td class="text-right">Rp ${bulanan.toLocaleString('id-ID')}</td>
            <td>Total Kerugian Gudang</td><td class="text-right text-danger">- Rp ${totalRugiGudang.toLocaleString('id-ID')}</td>
          </tr>
          <tr>
            <td>Omzet Tahunan</td><td class="text-right">Rp ${tahunan.toLocaleString('id-ID')}</td>
            <td>Total Biaya Operasional</td><td class="text-right text-danger">- Rp ${(totalOperasional || 0).toLocaleString('id-ID')}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Telah Dicairkan (Dividen)</td><td class="text-right text-warning">- Rp ${totalTelahDibagi.toLocaleString('id-ID')}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td class="bold bg-success">SISA LABA BERSIH DI KASIR</td><td class="bold text-right">Rp ${sisaLabaDitahan.toLocaleString('id-ID')}</td>
          </tr>
        </table>
        
        <br/><br/>

        <table>
          <tr><th colspan="5" class="bg-warning">RIWAYAT PENCABUTAN DIVIDEN (BAGI HASIL)</th></tr>
          <tr>
            <th style="background-color: #fcd34d;">ID Transaksi</th>
            <th style="background-color: #fcd34d;">Waktu</th>
            <th style="background-color: #fcd34d;">Total Uang Ditarik</th>
            <th style="background-color: #fcd34d;">Jatah CEO (Tuan Muda)</th>
            <th style="background-color: #fcd34d;">Jatah Investor</th>
          </tr>
          ${riwayatBagiHasil && riwayatBagiHasil.length > 0 ? riwayatBagiHasil.map(d => `
            <tr>
              <td class="text-center">${d.id}</td>
              <td class="text-center">${d.waktu}</td>
              <td class="text-right bold">Rp ${d.nominal.toLocaleString('id-ID')}</td>
              <td class="text-right">Rp ${d.ceo.toLocaleString('id-ID')}</td>
              <td class="text-right">Rp ${d.investor.toLocaleString('id-ID')}</td>
            </tr>
          `).join('') : '<tr><td colspan="5" class="text-center">Belum ada data pencairan dividen</td></tr>'}
        </table>

        <br/><br/>

        <table>
          <tr><th colspan="5" class="bg-danger">RIWAYAT KERUGIAN GUDANG (BARANG HILANG/RUSAK)</th></tr>
          <tr>
            <th style="background-color: #fda4af;">Waktu Kejadian</th>
            <th style="background-color: #fda4af;">Nama Barang</th>
            <th style="background-color: #fda4af;">Qty Hilang</th>
            <th style="background-color: #fda4af;">Total Kerugian Modal</th>
            <th style="background-color: #fda4af;">Alasan Tragedi</th>
          </tr>
          ${bukuKerugian && bukuKerugian.length > 0 ? bukuKerugian.map(r => `
            <tr>
              <td class="text-center">${r.waktu}</td>
              <td>${r.namaBarang}</td>
              <td class="text-center">${r.qty}</td>
              <td class="text-right bold text-danger">- Rp ${r.totalRugiModal.toLocaleString('id-ID')}</td>
              <td>${r.alasan}</td>
            </tr>
          `).join('') : '<tr><td colspan="5" class="text-center">Alhamdulillah, tidak ada data kerugian</td></tr>'}
        </table>

        <br/><br/>

        <table>
          <tr><th colspan="4" style="background-color: #3b82f6; color: white;">RIWAYAT BIAYA OPERASIONAL</th></tr>
          <tr>
            <th style="background-color: #93c5fd;">Waktu</th>
            <th style="background-color: #93c5fd;">Kategori</th>
            <th style="background-color: #93c5fd;">Nominal</th>
            <th style="background-color: #93c5fd;">Keterangan</th>
          </tr>
          ${riwayatOperasional && riwayatOperasional.length > 0 ? riwayatOperasional.map(op => `
            <tr>
              <td class="text-center">${op.waktu}</td>
              <td>${op.kategori}</td>
              <td class="text-right bold text-danger">- Rp ${op.nominal.toLocaleString('id-ID')}</td>
              <td>${op.keterangan}</td>
            </tr>
          `).join('') : '<tr><td colspan="4" class="text-center">Tidak ada biaya operasional</td></tr>'}
        </table>
      </body>
      </html>
    `;

    // Proses konversi string HTML menjadi file .xls
    const blob = new Blob([htmlString], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Download dengan format .xls
    link.download = `Laporan_Finansial_NEXUS_${new Date().toISOString().slice(0,10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button 
      onClick={handleExport}
      className="w-full xl:w-64 bg-slate-900/80 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 py-3 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
    >
      <span className="text-lg">📊</span>
      <span>Download Excel</span>
    </button>
  );
}