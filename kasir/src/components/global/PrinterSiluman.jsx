export default function PrinterSiluman({ strukCetak }) {
  if (!strukCetak) return null;

  return (
    <div className="hidden print:block w-[80mm] bg-white text-black p-4 font-mono text-sm mx-auto absolute top-0 left-0 z-[9999]">
      <div className="text-center mb-4 border-b-2 border-dashed border-black pb-4">
        <h1 className="text-2xl font-black tracking-widest">NEXUS POS</h1>
        <p className="text-xs mt-1">Sistem Kasir Mahasiswa</p>
        <p className="text-xs">Jl. Teknologi No. 99, Surabaya</p>
      </div>
      
      <div className="mb-4 text-xs">
        <p>RESI  : {strukCetak.id}</p>
        <p>WAKTU : {strukCetak.waktu || strukCetak.tanggal || "Tidak Tercatat"}</p>
        <p>KASIR : {strukCetak.kasir || "Tuan Muda"}</p>
        <p>STATUS: {strukCetak.status || (strukCetak.metodePembayaran === "KASBON" ? "HUTANG" : "LUNAS")}</p>
      </div>
      
      <div className="border-t-2 border-b-2 border-dashed border-black py-2 mb-4">
        {strukCetak.items && strukCetak.items.map(item => {
          const hargaItem = item.harga || item.hargaJual || 0;
          const subTotal = item.qty * hargaItem;
          
          return (
            <div key={item.id} className="flex justify-between mb-1">
              <div className="flex-1">
                <p>{item.nama}</p>
                <p className="text-xs text-gray-600">{item.qty} x Rp {hargaItem.toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right font-bold flex items-end">
                Rp {subTotal.toLocaleString("id-ID")}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-lg font-black mt-2">
        <span>TOTAL</span>
        <span>Rp ${(strukCetak.total || strukCetak.totalPendapatan || 0).toLocaleString("id-ID")}</span>
      </div>
      
      <div className="text-center mt-8 text-xs">
        <p>Terima Kasih Atas Kunjungan Anda!</p>
        <p>--- Zenpos.com ---</p>
      </div>
    </div>
  );
}