import React from "react";
import { Facebook, Instagram, Link as LinkIcon, Twitter } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  featuredPosts,
  listPosts,
  travelCategories,
} from "./mockTravelData";
import Tienich from "../components/Tienich";
import { postDetailPath } from "../utils/constants.js";

const allPosts = [...featuredPosts, ...listPosts];

const articleSections = [
  "The luxury train service, spearheaded by the Saudi Ministry of Tourism and the Saudi Railway Company, promises to redefine luxury travel in the region. With a focus on combining modern amenities with traditional Arabian hospitality, the experience aims to showcase rich cultural heritage and natural beauty while offering world-class comfort and convenience.",
  "One of the most captivating aspects of a journey like this is the balance between stillness and discovery. Travelers can move from quiet interiors to dramatic landscapes, pairing thoughtful design with the excitement of waking up somewhere new.",
  "For readers planning their own route, the best trips start with a narrow point of view: choose the mood first, then build the itinerary around it. A slower schedule leaves space for local meals, neighborhood walks, and the small details that make travel feel personal.",
];

const SectionTitle = ({ children }) => (
  <div className="mb-6 flex items-center gap-4">
    <h3 className="font-serif text-[22px] font-semibold text-neutral-950">
      {children}
    </h3>
    <div className="h-px flex-1 bg-[#e5e5e5]">
      <div className="h-[2px] w-12 bg-[#6eb48c]" />
    </div>
  </div>
);

const ShareButton = ({ children, label }) => (
  <button
    type="button"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center border border-[#ececec] text-neutral-700 transition hover:border-[#6eb48c] hover:text-[#6eb48c]"
  >
    {children}
  </button>
);

const RelatedPost = ({ post }) => (
  <Link to={postDetailPath(post.category, post)} className="group block">
    <div className="overflow-hidden bg-neutral-100">
      <img
        src={post.image}
        alt={post.title}
        className="aspect-[1.5] w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
    <p className="mt-3 text-[11px] font-bold text-[#6eb48c]">{post.category}</p>
    <h4 className="mt-1 font-serif text-[18px] font-semibold leading-snug text-neutral-950 transition group-hover:text-[#6eb48c]">
      {post.title}
    </h4>
    <p className="mt-2 text-xs text-neutral-500">{post.date}</p>
  </Link>
);

export default function ChiTietBaiViet() {
  const { id } = useParams();
  const post = allPosts.find((item) => String(item.id) === String(id));

  if (!post) {
    return <Navigate to="/tin-tuc" replace />;
  }

  const relatedPosts = allPosts
    .filter((item) => item.id !== post.id && item.category === post.category)
    .slice(0, 3);

  const fallbackRelated = allPosts
    .filter((item) => item.id !== post.id)
    .slice(0, 3 - relatedPosts.length);

  const finalRelatedPosts = [...relatedPosts, ...fallbackRelated];

  return (
    <main className="bg-white text-neutral-900 overflow-x-hidden">

      {/* ======================================================= */}
      {/* 1. BANNER CHIỀU CAO CỐ ĐỊNH                              */}
      {/* ======================================================= */}
      <div className="relative w-full h-[700px] overflow-hidden bg-neutral-950">
        <img
          src={post.image}
          alt={post.title}
          className="sticky top-0 left-0 w-full h-[700px] object-cover opacity-95 pointer-events-none"
        />
      </div>

      {/* ======================================================= */}
      {/* 2. KHU VỰC NỘI DUNG CHÍNH CHIA GRID (60 / 40)           */}
      {/* ======================================================= */}
      <div className="relative z-20 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="mx-auto max-w-[1170px] px-5 md:px-0">
          {/* Lưới Grid chính */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] items-start">

            {/* ======================================================= */}
            {/* CỘT TRÁI (60%): Nhích ngược lên trên đè vào ảnh banner  */}
            {/* ======================================================= */}
            {/* Thêm '-mt-[80px]' để đẩy hộp nội dung đè lên ảnh nền giống hình */}
            <div className="min-w-0 bg-white relative z-30 -mt-[40px] pt-10 pb-12 pr-0 lg:pr-8 px-5">

              {/* Breadcrumb nằm gọn gàng phía trên cùng hộp trắng */}
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-neutral-500">
                <Link to="/trang-chu" className="hover:text-[#6eb48c]">Home</Link>
                <span>&gt;</span>
                <Link to="/tin-tuc" className="hover:text-[#6eb48c]">Inspiration</Link>
                <span>&gt;</span>
                <Link to="/tin-tuc" className="hover:text-[#6eb48c]">{post.category}</Link>
                <span>&gt;</span>
                <span className="text-neutral-400 line-clamp-1">{post.title}</span>
              </nav>

              {/* Tiêu đề danh mục con & Tiêu đề chính */}
              <header className="mb-10 text-left">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0088cc] flex items-center space-x-2">
                  <span>{post.category?.toUpperCase()}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">PLACE TO STAY</span>
                </div>
                <h1 className="mt-3 font-serif text-[32px] md:text-[42px] font-bold leading-tight text-neutral-950">
                  {post.title}
                </h1>
                <p className="mt-3 text-[13px] text-neutral-500 italic">
                  Discovering Timeless Elegance: The Mitsui Kyoto's Fusion of Modern Design and Japanese
                </p>
              </header>

              {/* Vùng bài viết chi tiết */}
              <div className="mx-auto max-w-[780px]">
                <p className="mb-7 font-serif text-[21px] leading-9 text-neutral-950">
                  {post.description || post.excerpt}
                </p>

                <div className="space-y-6 text-[16px] leading-8 text-neutral-700">
                  {articleSections.map((section, index) => (
                    <p key={index}>{section}</p>
                  ))}
                </div>

                <blockquote className="my-9 border-l-4 border-[#6eb48c] pl-6 font-serif text-[24px] leading-9 italic text-neutral-950">
                  "Thoughtful travel is less about checking off a place and more about noticing what the place asks you to remember."
                </blockquote>

                <div className="space-y-6 text-[16px] leading-8 text-neutral-700">
                  <p>The practical details matter too: book flexible time into each stop, keep a short list of priorities, and leave room for the unplanned meal...</p>
                </div>

                {/* Tags & Social Share */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-y border-[#ececec] py-5">
                  <div className="flex flex-wrap gap-2">
                    {travelCategories.slice(0, 3).map((category) => (
                      <Link key={category} to="/tin-tuc" className="border border-[#ececec] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 transition hover:border-[#6eb48c] hover:text-[#6eb48c]">
                        {category}
                      </Link>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <ShareButton label="Share on Facebook"><Facebook className="h-4 w-4" /></ShareButton>
                    <ShareButton label="Share on Twitter"><Twitter className="h-4 w-4" /></ShareButton>
                    <ShareButton label="Share on Instagram"><Instagram className="h-4 w-4" /></ShareButton>
                    <ShareButton label="Copy link"><LinkIcon className="h-4 w-4" /></ShareButton>
                  </div>
                </div>

                {/* Section: You May Also Like */}
                <section className="mt-12">
                  <SectionTitle>You May Also Like</SectionTitle>
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
                    {finalRelatedPosts.map((item) => (
                      <RelatedPost key={item.id} post={item} />
                    ))}
                  </div>
                </section>
              </div>

            </div>

            {/* ======================================================= */}
            {/* CỘT PHẢI (40%): Sidebar bắt đầu ngay dưới chân banner   */}
            {/* ======================================================= */}
            {/* Thêm 'pt-10' để căn đều khoảng cách từ dưới ảnh của Sidebar */}
            <aside className="lg:sticky lg:top-36 pt-10 pb-12">
              <Tienich listPosts={listPosts} travelCategories={travelCategories} />
            </aside>

          </div>

        </div>
      </div>

    </main>
  );
}