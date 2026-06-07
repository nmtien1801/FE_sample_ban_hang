import React from 'react';
import { Banknote, Landmark, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ChinhSach2() {
  return (
    <div className="bg-slate-50 min-h-screen py-1 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-0xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-transparent py-10 text-center border-b border-slate-100">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-[#ed792f]">
            Các Phương Thức Thanh Toán
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base italic text-slate-600">
            Khi mua sắm trực tuyến tại website <span className="text-[#ed792f] font-semibold">cmicstudio.vn</span>, Quý khách hàng có thể lựa chọn một trong các hình thức thanh toán sau đây để hoàn tất giao dịch.
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="p-6 md:p-10 space-y-12">

          {/* 1. Thanh toán COD */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#ed792f] text-white px-6 py-4 flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-amber-400">
                <Banknote size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold">1. Thanh toán bằng tiền mặt khi nhận hàng (COD)</h2>
                <p className="text-xs ">Áp dụng cho tất cả khách hàng mua hàng từ xa trên phạm vi toàn quốc.</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Quy trình thực hiện:</h3>
              <div className="relative pl-6 border-l-2 border-indigo-100 space-y-6">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 1:</strong> Khách hàng đặt hàng trực tuyến trên website và lựa chọn hình thức thanh toán COD.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 2:</strong> Ban quản trị website tiếp nhận đơn hàng, xác nhận thông tin và tiến hành đóng gói, gửi hàng qua đơn vị chuyển phát đối tác.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 3:</strong> Nhân viên giao hàng vận chuyển sản phẩm đến địa chỉ của khách hàng. Khách hàng kiểm tra sản phẩm và thanh toán trực tiếp số tiền bằng tiền mặt ghi trên hóa đơn/phiếu giao hàng cho nhân viên bưu tá.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Chuyển khoản ngân hàng */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#ed792f] text-white px-6 py-4 flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-sky-400">
                <Landmark size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold">2. Thanh toán bằng hình thức Chuyển khoản ngân hàng</h2>
                <p className="text-xs ">Áp dụng cho tất cả khách hàng có nhu cầu thanh toán trước bằng tài khoản ngân hàng.</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Quy trình thực hiện:</h3>
                <div className="relative pl-6 border-l-2 border-indigo-100 space-y-6">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
                    <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 1:</strong> Khách hàng đặt hàng trực tuyến trên website và lựa chọn hình thức thanh toán chuyển khoản.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                    <p className="text-sm text-slate-600 mb-3"><strong className="text-slate-900">Bước 2:</strong> Khách hàng thực hiện chuyển khoản giá trị đơn hàng vào tài khoản ngân hàng chính thức của CMIC STUDIO theo thông tin dưới đây:</p>

                    {/* Hộp thông tin số tài khoản */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-xl space-y-2 text-sm ml-2">
                      <div className="grid grid-cols-3 border-b border-slate-200/60 pb-2">
                        <span className="text-slate-500">Tên tài khoản:</span>
                        <span className="col-span-2 font-bold text-slate-900">[Tên chủ tài khoản / Hộ kinh doanh]</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-slate-200/60 pb-2">
                        <span className="text-slate-500">Số tài khoản:</span>
                        <span className="col-span-2 font-mono font-bold text-indigo-600 tracking-wider">[Số tài khoản tại đây]</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-slate-200/60 pb-2">
                        <span className="text-slate-500">Ngân hàng:</span>
                        <span className="col-span-2 font-medium text-slate-800">[Tên ngân hàng và chi nhánh]</span>
                      </div>
                      <div className="grid grid-cols-3 pt-1">
                        <span className="text-slate-500">Nội dung CK:</span>
                        <span className="col-span-2 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 w-fit">
                          [Mã đơn hàng] <span className=" font-normal">hoặc</span> [Số điện thoại đặt hàng]
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 3:</strong> Sau khi hệ thống kiểm tra và xác nhận số tiền đã được chuyển thành công, đơn hàng của Quý khách sẽ được xử lý và giao đến quý khách theo chính sách giao hàng.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Ví điện tử */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#ed792f] text-white px-6 py-4 flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-rose-400">
                <Wallet size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold">3. Thanh toán qua ví điện tử liên kết</h2>
                <p className="text-xs ">Tích hợp các ví điện tử được cấp phép bởi Ngân hàng Nhà nước.</p>
              </div>
            </div>

            <div className="p-6">
              {/* Logo/Badge các ví điện tử */}
              <div className="flex gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200 font-bold text-xs">
                  <CheckCircle2 size={14} /> Ví MoMo
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-bold text-xs">
                  <CheckCircle2 size={14} /> Ví ZaloPay
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Quy trình thực hiện:</h3>
              <div className="relative pl-6 border-l-2 border-indigo-100 space-y-6">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 1:</strong> Khách hàng lựa chọn sản phẩm, tiến hành đặt hàng tại trang thanh toán.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 2:</strong> Chọn phương thức thanh toán tương ứng (Ví MoMo hoặc Ví ZaloPay). Hệ thống sẽ chuyển hướng hoặc hiển thị mã QR thanh toán tương ứng.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 bg-indigo-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                  <p className="text-sm text-slate-600"><strong className="text-slate-900">Bước 3:</strong> Khách hàng sử dụng ứng dụng Ví điện tử trên điện thoại quét mã QR hoặc đăng nhập để xác nhận thanh toán. Hệ thống website ghi nhận đơn hàng đã thanh toán thành công và tự động chuyển sang trạng thái xử lý giao hàng.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Lưu ý đơn vị chủ quản */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
            <div className="text-amber-600 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-1.5 text-sm text-amber-900">
              <h4 className="font-bold uppercase tracking-wide text-xs">Lưu ý về đơn vị chủ quản:</h4>
              <p className="leading-relaxed">
                Tài khoản nhận tiền trên thuộc sở hữu chính thức của <strong className="text-slate-950">HỘ KINH DOANH CMIC MEDIA SERVICES</strong>.
              </p>
              <div className="pt-1 space-y-1 text-xs text-amber-900/80">
                <p>• <span className="font-medium">Mã số thuế:</span> 075301018907</p>
                <p>• <span className="font-medium">Địa chỉ:</span> 252/21/18 Phạm Văn Chiêu, Khu phố 30, Phường Thông Tây Hội, TP.HCM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CMIC STUDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#support" className="hover:text-indigo-600 transition-colors">Trung tâm trợ giúp</a>
            <span>•</span>
            <a href="#security" className="hover:text-indigo-600 transition-colors">Bảo mật thanh toán</a>
          </div>
        </div>

      </div>
    </div>
  );
}