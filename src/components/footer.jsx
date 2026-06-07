import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#b31f24] text-white pt-16 pb-6 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* ─── SECTION: ĐĂNG KÝ NHẬN TIN ─── */}
        <div className="relative bg-white rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between mb-16 overflow-visible shadow-lg">
          {/* Nội dung bên trái */}
          <div className="flex-1 text-center md:text-left z-10 md:max-w-[55%]">
            <h2 className="text-[#b31f24] text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">
              ĐĂNG KÝ NHẬN TIN
            </h2>
            <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed">
              Đăng ký email để không bỏ lỡ khuyến mãi hấp dẫn và cập nhật sản phẩm mới nhất từ chúng tôi!
            </p>
            {/* Form đăng ký */}
            <div className="flex items-center bg-[#e9e9e9] rounded-full p-1 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Nhập địa chỉ email"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none placeholder-gray-400"
              />
              <button className="bg-[#b31f24] hover:bg-[#91161a] text-white text-xs md:text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200">
                Đăng ký
              </button>
            </div>
          </div>

          {/* Hình ảnh chai nước hoa bên phải (Kéo tràn viền trên/dưới theo mockup) */}
          <div className="relative md:absolute md:right-8 md:-top-10 md:-bottom-4 flex justify-center items-end mt-6 md:mt-0 z-20">
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80" // Thay bằng link ảnh cắt từ mockup nếu có
              alt="Sudes Perfume Collection"
              className="h-48 md:h-64 object-contain drop-shadow-2xl"
              onError={(e) => {
                // Fallback nếu link ảnh lỗi vẫn giữ được layout đẹp
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* ─── SECTION: THÔNG TIN CHI TIẾT FOOTER ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 mb-12 text-[13px]">
          
          {/* Cột 1: Thông tin thương hiệu (Chiếm 4/12 cột) */}
          <div className="md:col-span-4 space-y-4">
            {/* Logo Sudes */}
            <div className="flex items-center gap-2">
              <div className="border-2 border-white px-2 py-1 font-serif text-2xl font-black tracking-widest uppercase">
                SUDES
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase border-l border-white/40 pl-2 opacity-80">
                Perfume
              </div>
            </div>

            {/* List thông tin liên hệ */}
            <ul className="space-y-2.5 pt-2 opacity-90">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span><strong>Địa chỉ:</strong> 70 Lữ Gia, Phường 15, Quận 11, TP. HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span><strong>Điện thoại:</strong> <a href="tel:19006750" className="hover:underline font-semibold">1900 6750</a></span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span><strong>Email:</strong> <a href="mailto:support@sapo.vn" className="hover:underline">support@sapo.vn</a></span>
              </li>
            </ul>

            {/* Hỗ trợ thanh toán */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2">HỖ TRỢ THANH TOÁN</h4>
              <div className="inline-flex flex-wrap items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-black font-black text-[11px]">
                <span className="text-[#1a1f71]">VISA</span>
                <span className="text-[#eb001b]">mastercard</span>
                <span className="text-[#0070ba] italic">napas</span>
                <span className="border border-gray-300 px-0.5 text-[8px] rounded font-mono">COD</span>
                <span className="text-[#a50064] font-serif">momo</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Chính sách (Chiếm 2/12 cột) */}
          <div className="md:col-span-2">
            <h4 className="text-[14px] font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-1">Chính sách</h4>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Chính sách thành viên</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Chính sách thanh toán</a></li>
            </ul>
          </div>

          {/* Cột 3: Hướng dẫn (Chiếm 2/12 cột) */}
          <div className="md:col-span-2">
            <h4 className="text-[14px] font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-1">Hướng dẫn</h4>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Hướng dẫn chuyển khoản</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Quy định bảo hành</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Hướng dẫn thanh toán</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Hướng dẫn mua hàng</a></li>
            </ul>
          </div>

          {/* Cột 4: Hỗ trợ (Chiếm 2/12 cột) */}
          <div className="md:col-span-2">
            <h4 className="text-[14px] font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-1">Hỗ trợ</h4>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Member Card</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Gói quà miễn phí</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Hướng dẫn sử dụng nước hoa đúng cách</a></li>
            </ul>
          </div>

          {/* Cột 5: Danh mục (Chiếm 2/12 cột) */}
          <div className="md:col-span-2">
            <h4 className="text-[14px] font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-1">Danh mục</h4>
            <ul className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Nước hoa nam</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Nước hoa nữ</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Nước hoa Unisex</a></li>
              <li><a href="#" className="hover:underline flex items-center gap-1">▪ Nước hoa mini</a></li>
            </ul>
          </div>

        </div>

        {/* ─── SECTION: COPYRIGHT & SOCIAL ICONS ─── */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-90">
          <p>© Bản quyền thuộc về <strong className="text-[#fecdd3]">Sudes Team</strong> | Cung cấp bởi <strong>Sapo</strong></p>
          
          {/* Mạng xã hội */}
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-gray-300 transition-colors" title="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors" title="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors" title="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.57.29 3.7.81v4.4c-.66-.46-1.44-.73-2.29-.73-2.18 0-3.95 1.77-3.95 3.95v1.66h4.23l-.56 4.14h-3.67v9.75c-.26.03-.52.05-.79.05-3.32 0-6.02-2.7-6.02-6.02s2.7-6.02 6.02-6.02c.27 0 .53.02.79.05v-5.26c1.64-.17 3.12-.96 4.14-2.17.65.42 1.39.69 2.18.69v.01z" fillRule="evenodd" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}