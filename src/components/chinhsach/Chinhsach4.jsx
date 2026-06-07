import React from 'react';
import { ShieldAlert, Building2, Target, EyeOff, Database, CheckCircle, Smartphone } from 'lucide-react';

export default function ChinhSach4() {
  return (
    <div className="bg-slate-50 min-h-screen py-1 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-0xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">

        {/* Header */}
        <div className="bg-transparent px-8 py-10 text-center relative border-b border-slate-100">
          <div className="absolute top-4 right-4 text-[#ed792f]/10 pointer-events-none">
            <ShieldAlert size={80} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase mb-4 text-[#ed792f]">
            Chính Sách Bảo Mật Thông Tin Cá Nhân
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base italic text-slate-600">
            <span className="text-[#ed792f] font-semibold">CMIC STUDIO</span> cam kết bảo vệ tối đa quyền riêng tư và thông tin cá nhân của khách hàng. Chính sách bảo mật dưới đây làm rõ cách thức chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu của bạn.
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="p-6 md:p-10 space-y-10">

          {/* 1. Đơn vị thu thập */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-700">
                <Building2 size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">1. Đơn vị thu thập và quản lý dữ liệu cá nhân</h2>
            </div>
            <p className="text-sm text-slate-600">Mọi thông tin thu thập trên website được quản lý trực tiếp bởi:</p>

            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl space-y-3 text-sm max-w-2xl border border-slate-800 shadow-inner">
              <div className="grid sm:grid-cols-3 gap-1 sm:gap-4 border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Tên đơn vị chủ quản:</span>
                <span className="sm:col-span-2 font-semibold text-white">CMIC MEDIA SERVICES</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-1 sm:gap-4 border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Mã số thuế / MST:</span>
                <span className="sm:col-span-2 font-mono font-bold text-emerald-400 tracking-wider">075301018907</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-1 sm:gap-4 border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-medium">Địa chỉ trụ sở:</span>
                <span className="sm:col-span-2 text-slate-300">252/21/18 Phạm Văn Chiêu, P9, Gò Vấp, Ho Chi Minh City, Vietnam, 700000</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-1 sm:gap-4 pt-1">
                <span className="text-slate-400 font-medium">Hotline liên hệ:</span>
                <span className="sm:col-span-2 font-bold text-amber-400 flex items-center gap-1">
                  <Smartphone size={16} /> 037.2672.396
                </span>
              </div>
            </div>
          </section>

          {/* 2. Mục đích thu thập */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <Target size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">2. Mục đích thu thập thông tin khách hàng</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Chúng tôi chỉ thu thập các thông tin cần thiết như: <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">Họ tên</span>, <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">số điện thoại</span>, <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">email</span>, <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">địa chỉ giao hàng</span> nhằm các mục đích sau:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-slate-200 p-4 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Xử lý đơn hàng
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">Xác nhận đơn hàng, liên hệ giao hàng, xuất hóa đơn và hỗ trợ kỹ thuật sau bán hàng.</p>
              </div>
              <div className="border border-slate-200 p-4 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Chăm sóc khách hàng
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">Tiếp nhận và giải quyết nhanh chóng các khiếu nại, thắc mắc hoặc nhu cầu đổi trả hàng hóa.</p>
              </div>
              <div className="border border-slate-200 p-4 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
                <h3 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Nâng cao trải nghiệm
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">Gửi thông tin cập nhật về các chương trình ưu đãi độc quyền, khuyến mãi và tri ân khách hàng.</p>
              </div>
            </div>
          </section>

          {/* 3. Phạm vi sử dụng */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-rose-100 p-2 rounded-lg text-rose-700">
                <EyeOff size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">3. Phạm vi sử dụng thông tin</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              CMIC STUDIO cam kết chỉ sử dụng nội bộ thông tin khách hàng trong phạm vi mục đích nêu trên. <strong className="text-rose-700">Chúng tôi tuyệt đối không bán, chia sẻ hay trao đổi thông tin cho bất kỳ bên thứ ba nào</strong>, ngoại trừ các trường hợp đặc biệt sau:
            </p>
            <div className="bg-rose-50/50 border-l-4 border-rose-500 p-4 rounded-r-xl text-sm space-y-2 text-rose-950">
              <p className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                <span>Cung cấp thông tin địa chỉ, số điện thoại cho các đối tác vận chuyển để thực hiện việc giao nhận hàng hóa đến tay khách hàng.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                <span>Cung cấp theo yêu cầu bằng văn bản mang tính pháp lý từ các cơ quan nhà nước có thẩm quyền theo quy định của pháp luật.</span>
              </p>
            </div>
          </section>

          {/* 4. Thời gian lưu trữ */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
                <Database size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">4. Thời gian lưu trữ thông tin</h2>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 space-y-2 leading-relaxed shadow-sm">
              <p>
                Dữ liệu cá nhân của khách hàng sẽ được lưu trữ an toàn trên hệ thống nội bộ của chúng tôi cho đến khi hoàn thành mục đích cung cấp dịch vụ, hoặc cho đến khi <span className="font-semibold text-slate-900">có yêu cầu hủy bỏ trực tiếp từ phía khách hàng</span>.
              </p>
              <p className="text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                * Trong mọi trường hợp thông thường, thông tin cá nhân sẽ được bảo mật tối đa và lưu trữ vô thời hạn để phục vụ tốt nhất cho quyền lợi bảo hành, bảo trì sản phẩm dài hạn của khách hàng.
              </p>
            </div>
          </section>

          {/* 5. Cam kết bảo mật */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                <CheckCircle size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">5. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3 items-start">
                <div className="bg-slate-100 p-1.5 rounded-md text-slate-700 shrink-0 mt-0.5 font-bold text-xs w-6 h-6 flex items-center justify-center">A</div>
                <div>
                  <h4 className="font-bold text-slate-950 mb-0.5">Bảo mật hệ thống:</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Chúng tôi sử dụng các giao thức bảo mật tiên tiến (mã hóa SSL/TLS) để bảo vệ và mã hóa hoàn toàn thông tin khách hàng trong suốt quá trình truyền tải dữ liệu qua môi trường internet.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-slate-100 p-1.5 rounded-md text-slate-700 shrink-0 mt-0.5 font-bold text-xs w-6 h-6 flex items-center justify-center">B</div>
                <div>
                  <h4 className="font-bold text-slate-950 mb-0.5">Trách nhiệm bảo mật của người dùng:</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Khách hàng có trách nhiệm tự bảo mật tài khoản cá nhân, mật khẩu và hòm thư điện tử của mình. Tuyệt đối không chia sẻ hoặc cung cấp các thông tin đăng nhập này với bất kỳ ai khác.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-slate-100 p-1.5 rounded-md text-slate-700 shrink-0 mt-0.5 font-bold text-xs w-6 h-6 flex items-center justify-center">C</div>
                <div>
                  <h4 className="font-bold text-slate-950 mb-0.5">Quy trình xử lý sự cố:</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến nguy cơ hoặc rủi ro mất mát dữ liệu cá nhân của khách hàng, CMIC STUDIO có trách nhiệm thông báo ngay vụ việc cho cơ quan chức năng có thẩm quyền tiến hành điều tra, đồng thời kịp thời thông báo công khai cho toàn thể khách hàng được biết.</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CMIC STUDIO. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy-setting" className="hover:text-emerald-600 transition-colors">Cài đặt quyền riêng tư</a>
            <span>•</span>
            <a href="#terms" className="hover:text-emerald-600 transition-colors">Điều khoản bổ sung</a>
          </div>
        </div>

      </div>
    </div>
  );
}