import React from "react";
import { Link } from "react-router-dom";

const SELECTION_CARDS = [
  {
    id: "blog",
    title: "Web Blog",
    subTitle: "Kiến thức & Xu hướng",
    desc: "Khám phá các bài viết chuyên sâu, mẹo hữu ích và xu hướng mới nhất về thế giới mùi hương độc đáo.",
    path: "https://fe-blog-livid.vercel.app/", // Đường dẫn ngoài -> Sẽ mở tab mới
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6c0-1.103.897-2 2-2h14c1.103 0 2 .897 2 2v4M16.5 7.5h.008v.008H16.5V7.5z" />
      </svg>
    ),
    bgImage: "https://picsum.photos/id/61/800/600"
  },
  {
    id: "courses",
    title: "Web Khóa Học",
    subTitle: "Đào tạo chuyên nghiệp",
    desc: "Tham gia các khóa học chuyên sâu về pha chế, phân biệt các tầng hương và kiến thức kinh doanh ngành perfume.",
    path: "https://fe-sample-khoa-hoc.vercel.app/", // Đường dẫn ngoài -> Sẽ mở tab mới
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L10.74 14.172a1.5 1.5 0 001.52 0l6.48-3.998m-13.72-.441L11.23 5.441a1.5 1.5 0 011.54 0l6.23 3.734m-13.72.441a3 3 0 000 5.23l6.23 3.734a1.5 1.5 0 001.54 0l6.23-3.734a3 3 0 000-5.23M12 11.25v6.5" />
      </svg>
    ),
    bgImage: "https://picsum.photos/id/65/800/600"
  },
  {
    id: "store",
    title: "Web bán hàng",
    subTitle: "Sản phẩm cao cấp",
    desc: "Trải nghiệm không gian mua sắm đẳng cấp với hàng ngàn dòng hương chính hãng, đầy cảm xúc phản chiếu cá tính của bạn.",
    path: "/trang-chu", // Đường dẫn nội bộ -> Chuyển trang SPA bình thường
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0Zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0Z" />
      </svg>
    ),
    bgImage: "https://picsum.photos/id/64/800/600"
  }
];

export default function HubNavigationPage() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-16 px-6 md:px-12 font-sans select-none">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Header giới thiệu trên đỉnh trang */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#b31f24] text-[11px] tracking-[0.3em] uppercase font-semibold block mb-3">
            Chào mừng bạn đến với Sudes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">
            BẠN ĐANG TÌM KIẾM ĐIỀU GÌ?
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Hãy lựa chọn không gian phù hợp với nhu cầu của bạn để bắt đầu hành trình khám phá và trải nghiệm nghệ thuật mùi hương độc bản.
          </p>
        </div>

        {/* Lưới hiển thị 3 sự lựa chọn khổng lồ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {SELECTION_CARDS.map((card) => {
            // Kiểm tra xem đường dẫn có phải liên kết ngoài (bắt đầu bằng http hoặc https) không
            const isExternal = card.path.startsWith("http");
            
            // CSS dùng chung cho cả 2 loại thẻ để giao diện đồng nhất 100%
            const cardClasses = "group relative rounded-[28px] overflow-hidden bg-zinc-900 min-h-[420px] md:min-h-[480px] flex flex-col justify-end p-8 border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer block";

            // Nội dung hiển thị bên trong thẻ
            const cardContent = (
              <>
                {/* Lớp ảnh nền mờ đằng sau */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={card.bgImage}
                    alt={card.title}
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-30 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                </div>

                {/* Icon đại diện tròn màu trắng tinh tế */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-20 group-hover:bg-[#b31f24] group-hover:border-[#b31f24] transition-all duration-300">
                  {card.icon}
                </div>

                {/* Vùng thông tin nội dung văn bản */}
                <div className="relative z-20 text-white text-left">
                  <span className="text-[#fef2f2]/70 text-[10px] tracking-[0.2em] uppercase font-bold block mb-1">
                    {card.subTitle}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3 group-hover:text-[#fef2f2] transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light mb-6 opacity-85 group-hover:opacity-100 transition-opacity line-clamp-3">
                    {card.desc}
                  </p>

                  <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white border-b border-white/30 pb-1 group-hover:border-[#b31f24] group-hover:text-[#fef2f2] transition-all">
                    Truy cập ngay 
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">➔</span>
                  </div>
                </div>
              </>
            );

            // RENDER DỰA TRÊN ĐIỀU KIỆN LINK
            return isExternal ? (
              // Nếu là link ngoài: Dùng thẻ <a> truyền thống để mở tab mới an toàn
              <a 
                key={card.id}
                href={card.path}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {cardContent}
              </a>
            ) : (
              // Nếu là link trong hệ thống: Dùng thẻ <Link> của react-router-dom chống load trang
              <Link
                key={card.id}
                to={card.path}
                className={cardClasses}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}