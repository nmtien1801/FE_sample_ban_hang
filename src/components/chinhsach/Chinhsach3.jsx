import React from 'react';
import { Truck, Zap, Store, CalendarClock, Calculator, Gift, AlertCircle } from 'lucide-react';

export default function ChinhSach3() {
  return (
    <div className="bg-slate-50 min-h-screen py-1 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-0xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-transparent px-8 py-10 text-center border-b border-slate-100">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-[#ed792f]">
            Chính Sách Vận Chuyển Và Giao Nhận
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base italic text-slate-600">
            Nhằm mang lại trải nghiệm mua sắm tốt nhất, <span className="text-[#ed792f] font-semibold">CMIC STUDIO</span> áp dụng chính sách giao hàng linh hoạt với nhiều hình thức và chi phí tối ưu cho khách hàng.
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="p-6 md:p-10 space-y-12">

          {/* 1. Các phương thức giao hàng */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <Truck size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Các phương thức giao hàng</h2>
            </div>
            <p className="text-sm text-slate-600">Chúng tôi hiện đang triển khai 3 hình thức vận chuyển chính:</p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Hỏa tốc */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-amber-500 text-white p-1.5 rounded-bl-xl">
                  <Zap size={16} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 pr-6">Giao hàng hỏa tốc</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Áp dụng cho các đơn hàng nội thành <span className="font-semibold text-slate-900">[Hà Nội / TP.HCM]</span>. Đơn hàng được xử lý và giao ngay qua các đối tác công nghệ (GrabExpress, Ahamove, Be...).
                </p>
              </div>

              {/* Chuyển phát nhanh */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white p-1.5 rounded-bl-xl">
                  <Truck size={16} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 pr-6">Chuyển phát bưu điện</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  Áp dụng cho các đơn hàng liên tỉnh hoặc khu vực ngoại thành. Các đối tác chiến lược bao gồm:
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500">Viettel Post</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500">VNPost</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500">GHN</span>
                  <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500">GHTK</span>
                </div>
              </div>

              {/* Nhận tại cửa hàng */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white p-1.5 rounded-bl-xl">
                  <Store size={16} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 pr-6">Nhận tại cửa hàng</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Khách hàng có thể đến trực tiếp địa chỉ của chúng tôi để kiểm tra và nhận hàng hoàn toàn <span className="text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">Miễn phí vận chuyển</span>.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Thời gian giao hàng ước tính */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <CalendarClock size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Thời gian giao hàng ước tính</h2>
            </div>
            <p className="text-sm text-slate-600">Thời gian giao hàng được tính từ khi đơn hàng được xác nhận thành công:</p>

            {/* Bảng thời gian */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                    <th className="p-4 border-b border-slate-200">Phương thức giao hàng</th>
                    <th className="p-4 border-b border-slate-200">Khu vực áp dụng</th>
                    <th className="p-4 border-b border-slate-200">Thời gian ước tính</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 bg-white">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Giao hỏa tốc
                    </td>
                    <td className="p-4 text-slate-600">Nội thành</td>
                    <td className="p-4 font-medium text-slate-900">3-5 giờ <span className="text-xs text-slate-500 font-normal">kể từ khi duyệt đơn</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Chuyển phát nhanh
                    </td>
                    <td className="p-4 text-slate-600">Nội thành / Trung tâm tỉnh</td>
                    <td className="p-4 font-medium text-slate-900">3 ngày làm việc</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Chuyển phát tiêu chuẩn
                    </td>
                    <td className="p-4 text-slate-600">Huyện/Xã vùng sâu, vùng xa</td>
                    <td className="p-4 font-medium text-slate-900">3-5 ngày làm việc</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Lưu ý nhỏ */}
            <div className="flex gap-2 items-start text-xs text-slate-500 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <p><strong className="text-slate-700">Lưu ý:</strong> Thời gian giao hàng không tính các ngày Chủ nhật, ngày Lễ, Tết hoặc các trường hợp bất khả kháng do thiên tai, dịch bệnh.</p>
            </div>
          </section>

          {/* 3. Cách tính chi phí vận chuyển */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Calculator size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Cách tính chi phí vận chuyển</h2>
            </div>
            <p className="text-sm text-slate-600">Chi phí vận chuyển được minh bạch hóa và tự động tính toán khi khách hàng đặt hàng:</p>

            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm leading-relaxed shadow-sm">
                <ul className="space-y-3 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                    <span><strong className="text-slate-950">Đơn hàng hỏa tốc:</strong> Phí vận chuyển được tính dựa trên số km thực tế từ kho hàng đến địa chỉ giao hàng, áp dụng đúng bảng giá của các ứng dụng gọi xe công nghệ (Grab/Ahamove) tại thời điểm đặt hàng.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                    <span><strong className="text-slate-950">Đơn hàng chuyển phát thông thường:</strong> Phí ship được tính theo biểu phí của đối tác vận chuyển (Viettel Post, GHN...), dựa trên <span className="font-medium text-slate-900">Trọng lượng quy đổi</span> của gói hàng và <span className="font-medium text-slate-900">Khoảng cách địa lý</span>.</span>
                  </li>
                </ul>
              </div>

              {/* Khối ưu đãi Freeship */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-emerald-100/60 pointer-events-none transform -rotate-12">
                  <Gift size={120} />
                </div>
                <h3 className="font-bold text-emerald-950 text-base mb-3 flex items-center gap-2">
                  <Gift size={20} className="text-emerald-600" />
                  Chính sách ưu đãi (Freeship):
                </h3>
                <div className="space-y-2.5 text-sm text-emerald-900/90 pl-1">
                  <p className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    Miễn phí vận chuyển toàn quốc cho đơn hàng từ <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-100">[ giá tiền ]</span> trở lên (áp dụng hình thức giao hàng tiêu chuẩn).
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    Miễn phí vận chuyển nội thành cho đơn hàng từ <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-100">[ giá tiền ]</span> trở lên.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CMIC STUDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#tracking" className="hover:text-indigo-600 transition-colors">Tra cứu vận đơn</a>
            <span>•</span>
            <a href="#support" className="hover:text-indigo-600 transition-colors">Hotline khiếu nại</a>
          </div>
        </div>

      </div>
    </div>
  );
}