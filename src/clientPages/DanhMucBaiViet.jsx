import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { listPosts, travelCategories } from './mockTravelData';
import Tienich from '../components/Tienich';
import { postDetailPath } from '../utils/constants';

export default function App() {
  const { name } = useParams();

  // 1. Phân bổ data cố định cho phần trên cùng
  const topPosts = listPosts.slice(0, 2);      // 2 bài viết lớn trên cùng
  const featuredPost = listPosts[2] || null;   // 1 bài viết Session 1

  // 2. Thu thập toàn bộ các bài viết còn lại từ vị trí index thứ 3 trở đi để phân trang
  const allRemainingPosts = listPosts.slice(3);

  // 3. Khởi tạo State và Cấu hình phân trang cho SESSION 2
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Số lượng bài viết hiển thị trên mỗi trang

  // Tính toán chỉ mục dữ liệu
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Dữ liệu bài viết thực tế hiển thị trên trang hiện tại
  const currentGridPosts = allRemainingPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Tính tổng số trang
  const totalPages = Math.ceil(allRemainingPosts.length / postsPerPage);

  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Tự động cuộn mượt mà lên đầu danh sách lưới khi chuyển trang
    document.getElementById('session2-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 font-sans antialiased text-[#333]">

      {/* 1. Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <a href="#home" className="hover:underline">Home</a>
        <span className="text-gray-300">&gt;</span>
        <a href="#inspiration" className="hover:underline">Inspiration</a>
        <span className="text-gray-300">&gt;</span>
        <span className="text-gray-800 font-medium">{name}</span>
      </nav>

      {/* 2. Main Title */}
      <h1 className="text-center text-4xl md:text-5xl font-serif text-[#0088cc] mb-10 tracking-wide font-normal">
        {name}
      </h1>

      {/* 3. Top Grid Layout (2 bài viết lớn phủ mờ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {topPosts.map((post) => (
          <OverlayCard key={post.id} post={post} />
        ))}
      </div>

      {/* 4. Layout chia cột 6/4 */}
      <div className="flex flex-col md:flex-row gap-8 w-full">

        {/* CỘT TRÁI (60%) */}
        <div className="w-full md:w-[60%] flex flex-col space-y-10">

          {/* SESSION 1: Bài viết tiêu điểm */}
          {featuredPost && (
            <div className="border-t-2 border-black pt-4">
              <h3 className="font-serif text-lg font-bold mb-4 text-gray-900">Latest in Hotel & Resort</h3>
              <FeaturedPostCard post={featuredPost} />
            </div>
          )}

          {/* SESSION 2: Lưới bài viết nhỏ có Phân Trang */}
          <div id="session2-start" className="border-t border-gray-200 pt-8 flex flex-col space-y-8">

            {/* Lưới hiển thị bài viết */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {currentGridPosts.map((post) => (
                <SimpleGridCard key={post.id} post={post} />
              ))}
            </div>

            {/* Thanh điều hướng phân trang (Pagination UI) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-4">
                {/* Nút Quay lại (Prev) */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-xs font-bold uppercase border transition-colors ${currentPage === 1
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]'
                    }`}
                >
                  Prev
                </button>

                {/* Danh sách số trang */}
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-9 h-9 text-xs font-bold border transition-colors ${currentPage === pageNumber
                        ? 'bg-[#0088cc] text-white border-[#0088cc]'
                        : 'border-gray-300 text-gray-700 hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]'
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* Nút Tiếp theo (Next) */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 text-xs font-bold uppercase border transition-colors ${currentPage === totalPages
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]'
                    }`}
                >
                  Next
                </button>
              </div>
            )}

          </div>

        </div>

        {/* CỘT PHẢI (40%) - Sidebar */}
        <div className="w-full md:w-[40%] border border-gray-100 p-4 h-fit bg-gray-50">
          <Tienich listPosts={listPosts} travelCategories={travelCategories} />
        </div>

      </div>
    </div>
  );
}

// ==========================================
// THÀNH PHẦN CON (SUB-COMPONENTS GIỮ NGUYÊN)
// ==========================================

function OverlayCard({ post }) {
  return (
    <Link to={postDetailPath(post.category, post)} className="relative block overflow-hidden rounded-sm aspect-[4/3] group cursor-pointer">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
        <div className="text-xs md:text-sm font-medium text-gray-200 mb-2 flex items-center space-x-2">
          {post.category ? (
            <span className="uppercase">{post.category}</span>
          ) : (
            post.categories?.map((cat, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-400">|</span>}
                <span className="uppercase">{cat}</span>
              </React.Fragment>
            ))
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-serif font-bold leading-snug mb-3 group-hover:text-gray-200 transition-colors">
          {post.title}
        </h2>
        <div className="text-xs text-gray-400">{post.date}</div>
      </div>
    </Link>
  );
}

function FeaturedPostCard({ post }) {
  return (
    <Link to={postDetailPath(post.category, post)} className="block cursor-pointer group">
      <div className="overflow-hidden mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>
      <div className="text-xs font-semibold text-[#0088cc] flex items-center space-x-2 mb-2">
        {post.category ? (
          <span className="uppercase">{post.category}</span>
        ) : (
          post.categories?.map((cat, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-300">|</span>}
              <span className="uppercase">{cat}</span>
            </React.Fragment>
          ))
        )}
      </div>
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-3 hover:text-[#0088cc] transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {post.description || post.excerpt || "No description available."}
      </p>
      <div className="inline-flex items-center text-xs font-bold tracking-wider text-[#0088cc] group-hover:underline">
        CONTINUE READING
        <span className="w-12 h-[1px] bg-[#0088cc] ml-2 inline-block"></span>
      </div>
    </Link>
  );
}

function SimpleGridCard({ post }) {
  return (
    <Link to={postDetailPath(post.category, post)} className="flex flex-col cursor-pointer group">
      <div className="overflow-hidden aspect-[4/3] mb-3">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-[11px] font-semibold text-[#0088cc] flex items-center space-x-1.5 mb-1">
        {post.category ? (
          <span className="uppercase">{post.category}</span>
        ) : (
          post.categories?.map((cat, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-300">|</span>}
              <span className="uppercase">{cat}</span>
            </React.Fragment>
          ))
        )}
      </div>
      <h4 className="font-serif text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-[#0088cc] transition-colors">
        {post.title}
      </h4>
      <div className="text-xs text-gray-400">
        by <span className="text-gray-700">{post.author || "Penci Design"}</span>
        <span className="mx-1">•</span>
        {post.date}
      </div>
    </Link>
  );
}
