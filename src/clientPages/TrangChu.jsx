import React, { useRef, useState } from "react";
import {
  featuredPosts,
  listPosts,
  sidePosts,
  travelCategories,
  mockVideos
} from "./mockTravelData";
import Tienich from "../components/Tienich";
import { postDetailPath } from "../utils/constants.js";

const CategoryLabels = ({ post }) => (
  <div className="mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
    <span className="text-[11px] font-bold text-[#6eb48c]">
      {post.category}
    </span>
    {post.secondCategory && (
      <span className="text-[11px] font-bold text-[#6eb48c]">
        {post.secondCategory}
      </span>
    )}
  </div>
);

const StandardPost = ({ post, large = false }) => (
  <article className="group text-center">
    <a href={postDetailPath(post.category, post)} className="block overflow-hidden bg-neutral-100">
      <img
        src={post.image}
        alt={post.title}
        className={`w-full object-cover transition duration-700 group-hover:scale-105 ${large ? "aspect-[1.5]" : "aspect-[1.5]"
          }`}
      />
    </a>
    <div className={large ? "px-4 pt-7" : "px-2 pt-5"}>
      <CategoryLabels post={post} />
      <h2
        className={`mx-auto font-serif font-semibold leading-tight text-neutral-950 ${large ? "max-w-[650px] text-3xl md:text-[34px]" : "text-[24px]"
          }`}
      >
        <a href={postDetailPath(post.category, post)} className="transition hover:text-[#6eb48c]">
          {post.title}
        </a>
      </h2>
      <p className="mt-3 text-[12px] text-neutral-500">
        written by{" "}
        <a href="#" className="font-semibold text-neutral-800 hover:text-[#6eb48c]">
          {post.author}
        </a>
      </p>
      {large && (
        <>
          <p className="mx-auto mt-6 max-w-[610px] text-[15px] leading-7 text-neutral-600">
            {post.excerpt}
          </p>
          <a
            href={postDetailPath(post.category, post)}
            className="mt-6 inline-flex items-center border border-neutral-900 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900 transition hover:border-[#6eb48c] hover:bg-[#6eb48c] hover:text-white"
          >
            Continue Reading
          </a>
        </>
      )}
    </div>
  </article>
);

const SideList = () => (
  <aside className="space-y-0">
    {sidePosts.map((title) => (
      <article key={title} className="border-b border-[#ececec] py-[15px] first:pt-0 last:border-b-0">
        <h4 className="font-serif text-[18px] font-semibold leading-snug text-neutral-950">
          <a href={postDetailPath(travelCategories[0], { title })} className="transition hover:text-[#6eb48c]">
            {title}
          </a>
        </h4>
        <p className="mt-2 text-xs text-neutral-500">
          by <span className="font-semibold text-neutral-800">Penci Design</span>
        </p>
      </article>
    ))}
  </aside>
);

const SectionTitle = ({ children }) => (
  <div className="mb-8 flex items-center gap-5">
    <h3 className="font-serif text-[26px] font-semibold text-neutral-950">{children}</h3>
    <div className="h-px flex-1 bg-neutral-200">
      <div className="h-[2px] w-12 bg-[#6eb48c]" />
    </div>
  </div>
);

const SmallPost = ({ post }) => (
  <article className="grid grid-cols-[118px_1fr] gap-5 border-b border-[#ececec] pb-6 md:grid-cols-[210px_1fr]">
    {/* Bọc ảnh trong div với kích thước cố định */}
    <a href={postDetailPath(post.category, post)} className="block overflow-hidden bg-neutral-100 h-[78px] md:h-[140px]">
      <img
        src={post.image}
        alt={post.title}
        className="h-full w-full object-cover transition duration-500 hover:scale-105"
      />
    </a>
    <div>
      <span className="text-[11px] font-bold text-[#6eb48c] uppercase">{post.category}</span>
      <h4 className="mt-2 font-serif text-[20px] md:text-[22px] font-semibold leading-snug text-neutral-950">
        <a href={postDetailPath(post.category, post)} className="transition hover:text-[#6eb48c]">
          {post.title}
        </a>
      </h4>
      <p className="mt-2 text-xs text-neutral-500">{post.date}</p>
      <p className="mt-2 text-[14px] leading-6 text-neutral-600 hidden md:block">
        {post.description.length > 100 ? post.description.slice(0, 100) + "..." : post.description}
      </p>
    </div>
  </article>
);

export default function TrangChu() {
  const sliderRef = useRef(null);
  const [leftOne, leftTwo, centerPost] = featuredPosts;
  // State quản lý video đang được chọn phát
  const [activeVideo, setActiveVideo] = useState(mockVideos[0]);
  // State quản lý số lượng bài viết hiển thị lastest stories
  const [visibleCount, setVisibleCount] = useState(4);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-white text-neutral-900">
      <section className="mx-auto grid max-w-[1170px] grid-cols-1 gap-10 px-5 py-10 md:px-0 lg:grid-cols-[270px_1fr_270px] lg:gap-[30px]">
        <div className="space-y-10">
          <StandardPost post={leftOne} />
          <StandardPost post={leftTwo} />
        </div>

        <StandardPost post={centerPost} large />

        <SideList />
      </section>

      {/* trending stories */}
      <section className="bg-[#f6f6f3] py-12 select-none">
        <div className="mx-auto max-w-[1170px] px-4 md:px-0">

          {/* ================= HEADER TITLE SYSTEM ================= */}
          <div className="relative mb-10 text-center">
            <div className="flex items-center justify-center gap-4">
              {/* Đường gạch ngang mảnh bên trái */}
              <div className="h-[1px] flex-1 bg-[#dedede] max-w-[100px] sm:max-w-[200px] md:max-w-[300px]"></div>

              {/* Khung chứa Text */}
              <div className="relative border border-[#313131] bg-white px-6 py-2.5">
                <h3 className="font-serif text-[14px] font-bold uppercase tracking-[2px] text-[#313131]">
                  Trending stories
                </h3>
                {/* Mũi tên nhọn trỏ xuống dưới đáy khung */}
                <div className="absolute -bottom-[5px] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#313131]"></div>
              </div>

              {/* Đường gạch ngang mảnh bên phải */}
              <div className="h-[1px] flex-1 bg-[#dedede] max-w-[100px] sm:max-w-[200px] md:max-w-[300px]"></div>
            </div>
          </div>

          {/* ================= CAROUSEL SLIDER ================= */}
          <div className="relative group">

            {/* Nút điều hướng Trái (Prev) */}
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#313131] shadow-[0_2px_5px_rgba(0,0,0,0.15)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-neutral-100 hover:bg-[#6eb48c] hover:text-white"
              aria-label="Previous posts"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Nút điều hướng Phải (Next) */}
            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#313131] shadow-[0_2px_5px_rgba(0,0,0,0.15)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-neutral-100 hover:bg-[#6eb48c] hover:text-white"
              aria-label="Next posts"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Khung chứa danh sách bài viết cuộn mượt */}
            <div
              ref={sliderRef}
              className="no-scrollbar flex gap-[30px] overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {listPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full min-w-full sm:min-w-[calc(50%-15px)] md:min-w-[calc(33.333%-20px)] snap-start"
                >
                  <article className="grid grid-cols-[120px_1fr] gap-4 items-center">
                    {/* Khung chứa ảnh vuông */}
                    <div className="overflow-hidden bg-neutral-200 aspect-square w-[120px] h-[120px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Khung nội dung */}
                    <div className="flex flex-col pr-2">
                      <h4 className="font-serif text-[16px] font-semibold leading-[1.4] text-[#161616] line-clamp-2">
                        <a href={postDetailPath(post.category, post)} className="hover:text-[#0497e0] transition-colors duration-200">
                          {post.title}
                        </a>
                      </h4>

                      {/* Meta data đúng màu và kích thước gốc */}
                      <div className="mt-1.5 flex items-center gap-1.5 font-sans text-[13px] text-[#888888]">
                        <span>by <span className="text-[#313131] hover:text-[#0497e0] cursor-pointer transition-colors">{post.author}</span></span>
                        <span className="text-[#dedede]">|</span>
                        <time datetime="2024-03-28">{post.date}</time>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO PLAYLIST */}
      <section className="w-full bg-[#111111] py-10">
        <div className="mx-auto max-w-[1170px] px-4">

          {/* KHUNG CHÍNH - Giới hạn chiều cao để kích hoạt scroll bên trong */}
          <div className="flex flex-col md:flex-row bg-[#1a1a1a] h-auto md:h-[450px] shadow-2xl overflow-hidden border border-neutral-800">

            {/* PHẦN VIDEO BÊN TRÁI */}
            <div className="flex-1 bg-black relative">
              <iframe
                className="w-full h-full aspect-video md:aspect-auto"
                src={activeVideo.embedUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                allowFullScreen
              ></iframe>
            </div>

            {/* PHẦN PLAYLIST BÊN PHẢI - Khu vực scroll */}
            <div className="w-full md:w-[350px] flex flex-col h-[400px] md:h-full min-h-0 bg-[#1a1a1a]">

              {/* Header Playlist */}
              <div className="p-4 bg-[#1a1a1a] border-b border-neutral-800 flex justify-between items-center flex-shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  PLAYLIST ({mockVideos.length} VIDEOS)
                </span>
                <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded font-bold">4K SERIES</span>
              </div>

              {/* List cuộn - Sử dụng flex-1 và overflow-y-auto */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar divide-y divide-neutral-800">
                {mockVideos.map((video, index) => {
                  const isSelected = activeVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      className={`flex gap-3 p-3 cursor-pointer border-neutral-800 transition-colors ${isSelected ? "bg-[#252525] border-r-4 border-blue-500" : "hover:bg-[#252525]"
                        }`}
                    >
                      <div className="w-20 h-12 bg-neutral-700 flex-shrink-0 relative overflow-hidden">
                        <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/30 flex items-end p-1">
                          <span className="text-[10px] font-bold text-white bg-black/60 px-1">{index + 1}</span>
                        </div>
                      </div>
                      <div className="min-w-0 flex flex-col justify-center">
                        <p className={`text-[12px] font-medium leading-tight line-clamp-2 ${isSelected ? "text-blue-400" : "text-neutral-200"}`}>
                          {video.title}
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1">{video.duration}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Style để thanh cuộn đẹp hơn */}
        <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1a1a1a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
      </section>

      <section className="mx-auto grid max-w-[1170px] grid-cols-1 gap-10 px-5 py-14 md:px-0 lg:grid-cols-[2fr_1fr]">
        <div>
          <SectionTitle>Latest Stories</SectionTitle>

          <div className="space-y-6">
            {/* Dùng slice để giới hạn số bài hiện thị dựa trên state */}
            {listPosts.slice(0, visibleCount).map((post) => (
              <SmallPost key={post.id} post={post} />
            ))}
          </div>

          {/* NÚT LOAD MORE: Chỉ hiện nếu vẫn còn bài để load */}
          {visibleCount < listPosts.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="border border-[#ececec] px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-900 transition hover:bg-[#6eb48c] hover:text-white"
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <Tienich listPosts={listPosts} travelCategories={travelCategories} />

      </section>
    </main>
  );
}
