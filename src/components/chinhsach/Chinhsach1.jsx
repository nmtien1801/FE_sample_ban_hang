import React from 'react';
import { Truck, RotateCcw, AlertTriangle, Headphones } from 'lucide-react';

export default function ChinhSach1() {
  return (
    <div className="bg-slate-50 min-h-screen py-1 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-0xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-transparent px-8 py-10 text-center border-b border-slate-100">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-[#ed792f]">
            Điều Khoản Dịch Vụ & Điều Kiện Giao Dịch Chung
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base italic text-slate-600">
            Khi mua và sử dụng các dịch vụ tại <span className="text-[#ed792f] font-semibold">CMIC STUDIO</span>, đồng nghĩa với việc quý khách đã đồng ý với các điều khoản và điều kiện dưới đây.
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="p-6 md:p-10 space-y-10">

          {/* Mục 1: Quyền và nghĩa vụ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900">1. Quyền và nghĩa vụ của các bên</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bên bán */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
                <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  Nghĩa vụ của Bên bán (CMIC STUDIO)
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600 list-disc pl-4">
                  <li>Cung cấp thiết bị âm thanh chính hãng, đúng thông số kỹ thuật, xuất xứ và hình ảnh đã công bố trên website.</li>
                  <li>Tư vấn, hướng dẫn khách hàng sử dụng, lắp đặt đúng kỹ thuật (đặc biệt là các hệ thống loa, amply phức tạp).</li>
                  <li>Bảo mật thông tin khách hàng và giao hàng đúng hẹn.</li>
                </ul>
              </div>

              {/* Bên mua */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Quyền và nghĩa vụ của Bên mua (Khách hàng)
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600 list-disc pl-4">
                  <li>Cung cấp chính xác thông tin giao hàng và thanh toán đầy đủ giá trị đơn hàng.</li>
                  <li><strong className="text-slate-900">Nghĩa vụ kiểm tra:</strong> Khi nhận hàng, khách hàng có nghĩa vụ đồng kiểm cùng bưu tá (kiểm tra ngoại quan sản phẩm, tem mác, phụ kiện đi kèm như dây cáp, điều khiển...).</li>
                  <li>Tuân thủ hướng dẫn sử dụng của nhà sản xuất, không tự ý tháo dỡ, can thiệp vào linh kiện bên trong thiết bị.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mục 2: Tiêu chuẩn & Giới hạn trách nhiệm */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900">2. Tiêu chuẩn dịch vụ và giới hạn trách nhiệm</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-emerald-900 mb-1">Tiêu chuẩn dịch vụ:</h3>
                <p className="text-sm text-emerald-800">
                  Tất cả thiết bị âm thanh bán ra đều là hàng mới 100% (trừ khi có ghi chú rõ là hàng trưng bày/đã qua sử dụng), có đầy đủ tem bảo hành và hóa đơn đi kèm.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle size={18} className="text-amber-600" />
                  Giới hạn trách nhiệm:
                </h3>
                <p className="text-sm text-amber-800 mb-2">
                  CMIC STUDIO từ chối trách nhiệm bồi thường trong các trường hợp:
                </p>
                <ul className="space-y-2 text-sm text-amber-900/80 list-disc pl-4">
                  <li>Thiết bị bị cháy nổ, chập mạch do khách hàng sử dụng sai nguồn điện, quá công suất hoặc lắp đặt sai sơ đồ kỹ thuật.</li>
                  <li>Sản phẩm bị móp méo, rơi vỡ, dính nước hoặc hư hỏng do tác động vật lý từ phía người dùng sau khi đã ký nhận bàn giao từ đơn vị vận chuyển.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Mục 3: Quy trình đổi trả & Hoàn tiền */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900">3. Quy trình đổi trả hàng và hoàn tiền</h2>
            </div>

            <div className="space-y-6">
              {/* Điều kiện đổi trả */}
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">a. Điều kiện đổi trả:</h3>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                  <li>Sản phẩm phát sinh lỗi kỹ thuật từ nhà sản xuất (như rè loa, mất tiếng, không kết nối được bluetooth...) trong vòng <span className="font-semibold text-slate-900">7 ngày</span> kể từ ngày nhận.</li>
                  <li>Hàng hóa còn nguyên vẹn, đầy đủ vỏ hộp, xốp chèn, sách hướng dẫn và toàn bộ phụ kiện đi kèm. Không có dấu hiệu trầy xước, cấn móp.</li>
                </ul>
              </div>

              {/* Quy trình đổi trả */}
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-3">b. Quy trình đổi trả:</h3>
                <div className="grid sm:grid-cols-3 gap-4 relative">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mx-auto mb-2">1</div>
                    <p className="text-xs text-slate-600 font-medium">Khách hàng liên hệ Hotline báo lỗi kèm video quay lại tình trạng lỗi của thiết bị.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mx-auto mb-2">2</div>
                    <p className="text-xs text-slate-600 font-medium">CMIC STUDIO tiếp nhận và hướng dẫn gửi hàng về trung tâm kỹ thuật để thẩm định.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mx-auto mb-2">3</div>
                    <p className="text-xs text-slate-600 font-medium">Nếu xác định đúng lỗi sản xuất, chúng tôi sẽ tiến hành đổi sản phẩm mới tương đương.</p>
                  </div>
                </div>
              </div>

              {/* Quy trình hoàn tiền */}
              <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-950 text-base mb-1.5">c. Quy trình hoàn tiền:</h3>
                <p className="text-sm text-indigo-900/90 leading-relaxed">
                  Trong trường hợp sản phẩm bị lỗi nhưng hết hàng đổi trả, CMIC STUDIO sẽ hoàn lại <span className="font-bold text-indigo-700">100% tiền</span> cho khách hàng qua tài khoản ngân hàng trong vòng <span className="font-bold text-indigo-700">3-5 ngày</span> kể từ khi nhận lại hàng hoàn.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer của trang chính sách */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CMIC STUDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#hotline" className="hover:text-indigo-600 transition-colors">Hỗ trợ kỹ thuật</a>
            <span>•</span>
            <a href="#chinhsach" className="hover:text-indigo-600 transition-colors">Chính sách bảo hành</a>
          </div>
        </div>

      </div>
    </div>
  );
}