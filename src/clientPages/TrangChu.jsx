import React, { useState, useEffect } from "react";
import { HERO_PRODUCTS, BRANDS, CATEGORIES, BLOG_POSTS, FEATURED_PRODUCTS , TESTIMONIALS  } from "./mockTravelData";
import ProductCard from "../components/sanpham/cardSanPham.jsx";

function StarRating({ stars }) {
  return (
    <div className="flex gap-0.5 text-amber-500 text-sm">
      {Array.from({ length: stars }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}

export default function SudesPerfumeHome() {
  const [activeHero, setActiveHero] = useState(0);
  const [catIndex, setCatIndex] = useState(0);
  const [blogIndex, setBlogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleHeroNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeHero]);

  const handleHeroNext = () => {
    setActiveHero((prev) => (prev + 1) % HERO_PRODUCTS.length);
  };

  const handleHeroPrev = () => {
    setActiveHero((prev) => (prev - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
  };

  const handleBlogNext = () => {
    setBlogIndex((prev) => {
      const maxIndex = BLOG_POSTS.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handleBlogPrev = () => {
    setBlogIndex((prev) => {
      if (prev === 0) {
        const maxIndex = BLOG_POSTS.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
        return maxIndex;
      }
      return prev - 1;
    });
  };

  const handleCatNext = () => {
    setCatIndex((prev) => (prev + 1) % CATEGORIES.length);
  };

  const handleCatPrev = () => {
    setCatIndex((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  };

  const activeHeroProduct = HERO_PRODUCTS[activeHero];
  const prevHeroProduct = HERO_PRODUCTS[(activeHero - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length];
  const nextHeroProduct = HERO_PRODUCTS[(activeHero + 1) % HERO_PRODUCTS.length];

  const visibleCategories = [
    CATEGORIES[catIndex],
    CATEGORIES[(catIndex + 1) % CATEGORIES.length],
    CATEGORIES[(catIndex + 2) % CATEGORIES.length],
  ];

  const activeCategory = CATEGORIES[catIndex];

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans overflow-x-hidden antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Jost', sans-serif; background-color: #ffffff; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
        .animate-fade { animation: fadeIn 0.8s ease forwards; }
        .animate-slide { animation: slideIn 0.7s ease forwards; }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>

      {/* ─── 1. HERO BANNER SECTION ─── */}
      <section className="relative min-h-[750px] h-[90vh] w-full flex items-center overflow-hidden bg-gradient-to-r from-[#e3d7d0] via-[#eedfd9] to-[#f5eae4]">
        <div className="absolute inset-0 z-0 flex justify-end items-center">
          <div className="w-full md:w-[60%] h-full relative">
            <img
              key={activeHeroProduct.id}
              src={activeHeroProduct.img}
              alt={activeHeroProduct.name}
              className="w-full h-full object-cover object-right md:object-center mix-blend-multiply opacity-80 animate-fade"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e3d7d0] via-transparent to-transparent hidden md:block" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-16">
          <div className="max-w-xl md:max-w-2xl text-left">
            <h2 key={`title-${activeHeroProduct.id}`} className="font-sans text-4xl md:text-[56px] font-extrabold text-white leading-[1.15] drop-shadow-sm mb-4 tracking-tight whitespace-pre-line animate-slide">
              {activeHeroProduct.subTitle}
            </h2>

            <p key={`tag-${activeHeroProduct.id}`} className="text-[#8e7a72] text-xs md:text-sm font-bold tracking-[0.1em] uppercase mb-8 animate-fade">
              {activeHeroProduct.tagLine}
            </p>

            <div className="flex items-center gap-3 mb-6 overflow-visible">
              <button
                onClick={handleHeroPrev}
                className="w-16 h-28 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-1.5 opacity-40 hidden sm:flex items-center justify-center overflow-hidden transition-all duration-300 hover:opacity-60 cursor-pointer"
              >
                <img src={prevHeroProduct.img} alt="Previous" className="w-full h-full object-cover rounded-xl opacity-70" />
              </button>

              <div key={`card-${activeHeroProduct.id}`} className="bg-white rounded-3xl p-4 shadow-[0_10px_30px_rgba(142,122,114,0.15)] flex items-center gap-4 border border-white min-w-[290px] max-w-[320px] animate-fade">
                <div className="w-20 h-20 bg-[#f5f5f5] rounded-2xl p-1 flex items-center justify-center overflow-hidden">
                  <img src={activeHeroProduct.img} alt={activeHeroProduct.name} className="h-full object-cover rounded-xl" />
                </div>
                <div>
                  <span className="bg-[#b31f24]/10 text-[#b31f24] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                    {activeHeroProduct.badge}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">{activeHeroProduct.name}</h4>
                  <p className="text-gray-500 text-[11px] mb-2">{activeHeroProduct.brand} · {activeHeroProduct.size}</p>
                  <p className="text-[#b31f24] font-semibold text-xs mb-1">{activeHeroProduct.price}₫</p>
                </div>
              </div>

              <button
                onClick={handleHeroNext}
                className="w-16 h-28 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-1.5 opacity-40 hidden sm:flex items-center justify-center overflow-hidden transition-all duration-300 hover:opacity-60 cursor-pointer"
              >
                <img src={nextHeroProduct.img} alt="Next" className="w-full h-full object-cover rounded-xl opacity-70" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-40 h-[2px] bg-gray-400/40 relative rounded-full">
                <div
                  className="absolute top-0 h-full bg-gray-800 rounded-full transition-all duration-500"
                  style={{
                    width: `${100 / HERO_PRODUCTS.length}%`,
                    left: `${(activeHero * 100) / HERO_PRODUCTS.length}%`
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={handleHeroPrev} className="w-6 h-6 rounded-full bg-white text-gray-700 hover:bg-[#b31f24] hover:text-white flex items-center justify-center text-xs shadow-sm transition-all">‹</button>
                <button onClick={handleHeroNext} className="w-6 h-6 rounded-full bg-[#b31f24] text-white hover:bg-[#91161a] flex items-center justify-center text-xs shadow-sm transition-all">›</button>
              </div>
            </div>

            <button className="inline-flex items-center gap-4 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all group">
              Tìm hiểu thêm
              <span className="w-7 h-7 rounded-full bg-[#b31f24] text-white flex items-center justify-center text-xs group-hover:scale-105 transition-transform">➔</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. MARQUEE STRIP ─── */}
      <div className="py-5 border-y border-gray-100 overflow-hidden bg-gray-50/50">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-gray-400 text-[12px] tracking-[0.4em] uppercase font-medium">
              {b} <span className="text-[#b31f24] text-[8px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── 3. BRAND INTRO & STATS SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-black via-zinc-900 to-stone-900 text-white min-h-[550px] flex flex-col justify-between p-8 md:p-14 group shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&q=80"
                alt="Sudes Signature"
                className="w-full h-full object-cover opacity-35 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 max-w-xl">
              <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-8 tracking-wide text-white">
                Dấu ấn từ mùi hương
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                Chào mừng bạn đến với Sudes, nơi hội tụ những dòng nước hoa tinh tế, sang trọng và đầy cảm xúc. Chúng tôi tin rằng mỗi mùi hương là một tuyên ngôn cá nhân...
              </p>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="block font-sans text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">+2000</span>
                <span className="text-sm md:text-base uppercase tracking-[0.15em] text-gray-400 font-semibold">ngày hoạt động</span>
              </div>
              <button className="self-start inline-flex items-center gap-5 bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm tracking-wider uppercase pl-6 pr-2 py-2 rounded-full shadow-lg transition-all group/btn">
                Tìm hiểu thêm
                <span className="w-8 h-8 rounded-full bg-[#b31f24] text-white flex items-center justify-center text-sm group-hover/btn:translate-x-1 transition-transform">➔</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="pl-2">
              <p className="text-gray-400 text-sm tracking-[0.2em] uppercase font-bold mb-3">Giới thiệu</p>
              <h3 className="font-sans text-3xl md:text-4xl font-black text-[#b31f24] uppercase tracking-tight mb-4">SUDES PERFUME</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                Sudes mang đến những dòng nước hoa chính hãng, tinh tế và phù hợp với từng cá tính. Chúng tôi không chỉ bán hương thơm, mà còn giúp bạn thể hiện phong cách và cảm xúc qua từng lựa chọn mùi hương.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 items-stretch">
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-[#1c1917] to-[#0c0a09] text-white p-8 flex flex-col justify-between group shadow-md border border-stone-800">
                <div className="absolute inset-0 z-0 opacity-25 group-hover:scale-105 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80" alt="Stats 1" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
                <div className="relative z-10">
                  <span className="block font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">+3000</span>
                  <h4 className="text-lg md:text-xl font-bold text-gray-200 tracking-wide mb-4">Khách hàng toàn quốc</h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                    Với hơn 3.000 khách hàng tin tưởng, Sudes tự hào là địa chỉ uy tín cho những ai yêu thích nước hoa chính hãng...
                  </p>
                </div>
                <div className="relative z-10 mt-8">
                  <button className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs tracking-wider uppercase pl-5 pr-1.5 py-1.5 rounded-full shadow-sm transition-all group/btn2">
                    Tìm hiểu thêm
                    <span className="w-6 h-6 rounded-full bg-[#b31f24] text-white flex items-center justify-center text-xs group-hover/btn2:translate-x-1 transition-transform">➔</span>
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-[#2e1012] to-[#1a0507] text-white p-8 flex flex-col justify-between group shadow-md border border-rose-950/40">
                <div className="absolute inset-0 z-0 opacity-30 group-hover:scale-105 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80" alt="Stats 2" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-0" />
                <div className="relative z-10">
                  <span className="block font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">+1000</span>
                  <h4 className="text-lg md:text-xl font-bold text-gray-200 tracking-wide mb-4">Feedback tích cực</h4>
                  <p className="text-rose-200/70 text-sm md:text-base leading-relaxed font-light">
                    Khách hàng đã lựa chọn Sudes không chỉ vì nước hoa chính hãng, mà còn bởi sự hài lòng tuyệt đối...
                  </p>
                </div>
                <div className="relative z-10 mt-8">
                  <button className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs tracking-wider uppercase pl-5 pr-1.5 py-1.5 rounded-full shadow-sm transition-all group/btn3">
                    Tìm hiểu thêm
                    <span className="w-6 h-6 rounded-full bg-[#b31f24] text-white flex items-center justify-center text-xs group-hover/btn3:translate-x-1 transition-transform">➔</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BRAND VALUES POLICIES BAR ─── */}
      <section className="bg-[#b31f24] text-white py-14 border-t border-white/10 shadow-inner">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
            <div className="flex flex-col items-center gap-3 group">
              <div className="mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                <svg className="w-9 h-9 opacity-95" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h5 className="text-sm md:text-base font-bold tracking-wider uppercase">Ship hàng nhanh chóng</h5>
              <p className="text-white/80 text-xs md:text-sm font-light max-w-[250px] leading-relaxed">Đảm bảo sản phẩm đến tay bạn trong thời gian ngắn nhất.</p>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                <svg className="w-9 h-9 opacity-95" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19c0 .445-.035.882-.102 1.309m-1.921-6.666A8.002 8.002 0 005.99 11H8.5"></path></svg>
              </div>
              <h5 className="text-sm md:text-base font-bold tracking-wider uppercase">Chính sách đổi trả</h5>
              <p className="text-white/80 text-xs md:text-sm font-light max-w-[250px] leading-relaxed">Hỗ trợ bạn đổi hoặc trả hàng dễ dàng trong vòng 7 ngày.</p>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                <svg className="w-9 h-9 opacity-95" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h5 className="text-sm md:text-base font-bold tracking-wider uppercase">Hỗ trợ khách hàng</h5>
              <p className="text-white/80 text-xs md:text-sm font-light max-w-[250px] leading-relaxed">Hỗ trợ khách hàng tận tâm, sẵn sàng giải đáp mọi thắc mắc 24/7.</p>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="mb-1 transition-transform duration-300 group-hover:-translate-y-1">
                <svg className="w-9 h-9 opacity-95" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"></path></svg>
              </div>
              <h5 className="text-sm md:text-base font-bold tracking-wider uppercase">Sản phẩm chính hãng</h5>
              <p className="text-white/80 text-xs md:text-sm font-light max-w-[250px] leading-relaxed">Sản phẩm chính hãng 100%, cam kết về chất lượng và nguồn gốc.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. ASYMMETRIC CATEGORIES CAROUSEL ─── */}
      <section className="bg-[#fcfcfc] w-full min-h-[650px] py-24 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col justify-center relative z-10 min-h-[350px]">
            <div className="absolute -top-10 -left-4 text-[90px] md:text-[120px] font-black text-gray-200/50 uppercase tracking-tighter pointer-events-none z-0 font-sans">
              SUDES
            </div>

            <div className="relative z-10 animate-fade">
              <p className="text-gray-800 text-sm md:text-base font-medium tracking-wide mb-2">
                Danh mục sản phẩm
              </p>
              <h2 key={activeCategory.id} className="font-sans text-4xl md:text-5xl font-black text-[#b31f24] tracking-tight mb-5 uppercase leading-tight animate-slide">
                {activeCategory.label}
              </h2>
              <p key={`desc-${activeCategory.id}`} className="text-gray-600 text-sm md:text-base leading-relaxed max-w-sm mb-8 font-light animate-fade">
                {activeCategory.desc}
              </p>

              <button className="inline-flex items-center gap-5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-wider uppercase pl-6 pr-1.5 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all group border border-gray-100">
                Tìm hiểu thêm
                <span className="w-8 h-8 rounded-full bg-[#b31f24] text-white flex items-center justify-center text-sm group-hover:scale-105 transition-transform">➔</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            <div className="flex items-end gap-5 w-full min-h-[480px] overflow-visible">
              {visibleCategories.map((item, index) => {
                const isFirstCard = index === 0;
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className={`relative flex flex-col justify-between bg-[#e6e6e6] text-gray-900 rounded-[24px] p-6 transition-all duration-500 ease-out flex-shrink-0 ${isFirstCard
                      ? "w-[44%] h-[480px] shadow-md bg-[#e2e2e2]"
                      : "w-[26%] h-[400px] opacity-85 hidden sm:flex"
                      }`}
                  >
                    <span className="absolute top-4 left-6 font-sans text-5xl md:text-6xl font-bold text-gray-400/40 tracking-tighter">
                      {item.id}
                    </span>

                    <div className={`w-full flex items-center justify-center overflow-hidden mix-blend-multiply ${isFirstCard ? "h-[340px] mt-4" : "h-[260px] mt-6"
                      }`}>
                      <img
                        src={item.img}
                        alt={item.label}
                        className={`object-contain transition-transform duration-500 hover:scale-105 ${isFirstCard ? "max-h-full" : "max-h-[90%]"
                          }`}
                      />
                    </div>

                    <div className="w-full text-center pb-2">
                      <h4 className="font-sans font-extrabold text-sm md:text-base text-[#b31f24] tracking-wide uppercase">
                        {item.label}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-6 mt-4 w-full pr-2">
              <div className="hidden md:block w-72 h-[1.5px] bg-gray-200 relative rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-[#b31f24] transition-all duration-500 rounded-full"
                  style={{
                    width: `${100 / CATEGORIES.length}%`,
                    left: `${(catIndex * 100) / CATEGORIES.length}%`
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handleCatPrev} className="w-9 h-9 rounded-full bg-gray-200/70 hover:bg-[#b31f24] text-gray-700 hover:text-white flex items-center justify-center text-base shadow-sm transition-all font-medium">←</button>
                <button onClick={handleCatNext} className="w-9 h-9 rounded-full bg-[#b31f24] text-white hover:bg-[#91161a] flex items-center justify-center text-base shadow-sm transition-all font-medium">→</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-[#fcfcfc] border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#b31f24] text-[10px] tracking-[0.5em] uppercase mb-3 font-semibold">Được yêu thích</p>
              <h2 className="font-sans text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-[#b31f24] text-[11px] tracking-[0.2em] uppercase transition-colors font-medium">
              Xem tất cả <span className="text-lg">→</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} featured />)}
          </div>
        </div>
      </section>

      {/* ─── 7. MEN PERFUMES PRODUCTS ─── */}
      <section className="py-20 bg-[#fcfcfc] border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#b31f24] text-[10px] tracking-[0.5em] uppercase mb-3 font-semibold">Được yêu thích</p>
              <h2 className="font-sans text-3xl font-bold text-gray-900">Nước hoa nam</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-[#b31f24] text-[11px] tracking-[0.2em] uppercase transition-colors font-medium">
              Xem tất cả <span className="text-lg">→</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {FEATURED_PRODUCTS.map(p => <ProductCard key={p.id} product={p} featured />)}
          </div>
        </div>
      </section>

      {/* ─── 8. BLOG SECTION (Đã tối ưu hóa giống hoàn toàn 100% hình ảnh) ─── */}
      <section className="w-full bg-[#ffffff] py-20 relative select-none font-sans">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">

          {/* Cụm Tiêu Đề Chính */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[32px] font-black text-[#b31f24] tracking-normal mb-2 uppercase">
              TIP CHIA SẺ VỀ NƯỚC HOA
            </h2>
            <p className="text-gray-950 text-sm md:text-base font-normal">
              Khám phá những bài viết hữu ích và xu hướng mới nhất trong Blog của chúng tôi.
            </p>
          </div>

          {/* Wrapper Slider */}
          <div className="relative w-full group">

            {/* Nút lùi slide trái - Căn đè giữa ảnh bên trái */}
            <button
              onClick={handleBlogPrev}
              className="absolute -left-4 top-[32%] -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md hover:bg-[#b31f24] hover:text-white text-gray-700 text-lg transition-all duration-300"
            >
              ←
            </button>

            {/* Nút tiến slide phải - Căn đè giữa ảnh bên phải */}
            <button
              onClick={handleBlogNext}
              className="absolute -right-4 top-[32%] -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center shadow-md hover:bg-[#b31f24] hover:text-white text-gray-700 text-lg transition-all duration-300"
            >
              →
            </button>

            {/* Vùng tràn hiển thị danh sách bài viết */}
            <div className="overflow-hidden px-1 py-2">
              <div
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{
                  // Tính toán khoảng dịch chuyển dịch slide mượt mà cho 3 cột
                  transform: `translateX(calc(-${blogIndex * (100 / 3)}% - ${blogIndex * 8}px))`
                }}
              >
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    // w-full cho mobile, sm:w-(50%) cho tablet, và ÉP CỨNG lg:w-[calc(33.333%-16px)] để luôn ra 3 block trên 1 hàng máy tính
                    className="bg-[#f4f4f4] rounded-[24px] overflow-hidden flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 border border-gray-100/60"
                  >
                    {/* Phần Khung Ảnh bọc ngoài */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[24px]">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Badge "Kiến thức nước hoa" chuẩn ảnh mẫu */}
                      <span className="absolute top-4 left-4 bg-[#b31f24] text-white text-[11px] font-medium px-4 py-1.5 rounded-full shadow-sm">
                        {post.badge}
                      </span>
                    </div>

                    {/* Vùng Nội Dung Text */}
                    <div className="p-6 flex flex-col flex-1 bg-[#f4f4f4] rounded-b-[24px]">
                      <div>
                        {/* Tiêu đề bài viết */}
                        <h3 className="font-sans font-bold text-gray-900 text-base md:text-[17px] leading-snug mb-4 hover:text-[#b31f24] transition-colors line-clamp-2 min-h-[48px]">
                          {post.title}
                        </h3>

                        {/* Cụm Meta-info Metadata: Date & Comment */}
                        <div className="flex items-center gap-2 text-xs text-gray-800 mb-4 font-normal">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </span>
                          <span className="text-gray-300 mx-1">|</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {post.comments} bình luận
                          </span>
                        </div>

                        {/* Đoạn mô tả vắn tắt */}
                        <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-normal line-clamp-3">
                          {post.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. TESTIMONIALS (Đã đổi font chữ thường và giao diện tối giản tinh tế) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 bg-white">
        <div className="text-center mb-10">
          <p className="text-[#b31f24] text-[10px] tracking-[0.4em] uppercase mb-2 font-semibold">Đánh giá khách hàng</p>
          <h2 className="font-sans text-3xl font-extrabold text-gray-900 uppercase">Khách hàng nói gì</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="border border-gray-100 bg-[#f9f9f9] p-6 rounded-2xl hover:shadow-sm transition-all duration-300">
              <StarRating stars={t.stars} />
              <p className="text-gray-700 text-sm leading-relaxed my-4 font-normal">"{t.text}"</p>
              <p className="text-gray-900 text-[11px] tracking-[0.1em] uppercase font-bold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}