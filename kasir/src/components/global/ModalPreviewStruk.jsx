export default function ModalPreviewStruk({ strukCetak, setPreviewMode }) {
  if (!strukCetak) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4 print:hidden">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-4 border-b-2 border-dashed border-black pb-4">
          <h1 className="text-2xl font-black tracking-widest">NEXUS POS</h1>
          <p className="text-xs mt-1">Sistem Kasir Mahasiswa</p>
          <p className="text-xs">Jl. Teknologi No. 99, Surabaya</p>
        </div>
        
        <div className="mb-4 text-xs font-mono">
          <p><strong>RESI  :</strong> {strukCetak.id}</p>
          <p><strong>WAKTU :</strong> {strukCetak.waktu || strukCetak.tanggal || "Tidak Tercatat"}</p>
          <p><strong>KASIR :</strong> {strukCetak.kasir || "Tuan Muda"}</p>
          <p><strong>STATUS:</strong> {strukCetak.status || (strukCetak.metodePembayaran === "KASBON" ? "HUTANG" : "LUNAS")}</p>
        </div>
        
        <div className="border-t-2 border-b-2 border-dashed border-black py-2 mb-4 text-xs">
          {strukCetak.items && strukCetak.items.map(item => {
            const hargaItem = item.harga || item.hargaJual || 0;
            const subTotal = item.qty * hargaItem;
            return (
              <div key={item.id} className="flex justify-between mb-1">
                <div className="flex-1">
                  <p>{item.nama}</p>
                  <p className="text-gray-600">{item.qty} x Rp {hargaItem.toLocaleString("id-ID")}</p>
                </div>
                <div className="text-right font-bold">
                  Rp {subTotal.toLocaleString("id-ID")}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between text-lg font-black mt-2 mb-4 pb-4 border-b-2 border-dashed border-black">
          <span>TOTAL</span>
          <span>Rp {(strukCetak.total || strukCetak.totalPendapatan || 0).toLocaleString("id-ID")}</span>
        </div>
        
        <div className="text-center mb-6 text-xs">
          <p>Terima Kasih Atas Kunjungan Anda!</p>
          <p>--- Zenpos.com ---</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              const printWindow = window.open('', '', 'height=400,width=300');
              printWindow.document.write(`
                <style>
                  body { font-family: monospace; font-size: 12px; margin: 0; padding: 10px; }
                  .header { text-align: center; margin-bottom: 10px; border-bottom: 2px dashed black; padding-bottom: 10px; }
                  .header h1 { margin: 0; font-size: 16px; }
                  .header p { margin: 2px 0; font-size: 10px; }
                  .info { margin-bottom: 10px; font-size: 11px; }
                  .items { border-top: 2px dashed black; border-bottom: 2px dashed black; padding: 10px 0; margin: 10px 0; }
                  .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                  .total { display: flex; justify-content: space-between; font-weight: bold; margin: 10px 0; }
                  .footer { text-align: center; font-size: 10px; }
                </style>
                <div class="header">
                  <h1>NEXUS POS</h1>
                  <p>Sistem Kasir Mahasiswa</p>
                  <p>Jl. Teknologi No. 99, Surabaya</p>
                </div>
                <div class="info">
                  <p>RESI  : ${strukCetak.id}</p>
                  <p>WAKTU : ${strukCetak.waktu || strukCetak.tanggal || "Tidak Tercatat"}</p>
                  <p>KASIR : ${strukCetak.kasir || "Tuan Muda"}</p>
                  <p>STATUS: ${strukCetak.status || (strukCetak.metodePembayaran === "KASBON" ? "HUTANG" : "LUNAS")}</p>
                </div>
                <div class="items">
                  ${strukCetak.items.map(item => {
                    const hargaItem = item.harga || item.hargaJual || 0;
                    const subTotal = item.qty * hargaItem;
                    return `
                      <div class="item">
                        <div>
                          <div>${item.nama}</div>
                          <div style="font-size: 10px; color: #666;">${item.qty} x Rp ${hargaItem.toLocaleString("id-ID")}</div>
                        </div>
                        <div style="font-weight: bold;">Rp ${subTotal.toLocaleString("id-ID")}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
                <div class="total">
                  <span>TOTAL</span>
                  <span>Rp ${(strukCetak.total || strukCetak.totalPendapatan || 0).toLocaleString("id-ID")}</span>
                </div>
                <div class="footer">
                  <p>Terima Kasih Atas Kunjungan Anda!</p>
                  <p>--- Zenpos.com ---</p>
                </div>
              `);
              printWindow.document.close();
              setTimeout(() => printWindow.print(), 250);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
          >
            🖨️ CETAK SEKARANG
          </button>
          <button
            onClick={() => setPreviewMode(false)}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold transition-all"
          >
            ❌ TUTUP
          </button>
        </div>
      </div>
    </div>
  );
}