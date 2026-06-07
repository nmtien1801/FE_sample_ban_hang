import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Trang chủ", path: "/" },
  { label: "Giới thiệu", path: "/gioi-thieu" },
  { label: "Sản phẩm", path: "/san-pham" },
  { label: "Blog", path: "/tin-tuc" },
  { label: "Liên hệ", path: "/lien-he" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── Announcement Bar ─── */}
      <div className="bg-[#b31f24] text-white text-center text-[11px] tracking-[0.25em] uppercase py-2 font-medium font-body relative z-[60]">
        &nbsp;·&nbsp; Hàng chính hãng 100% &nbsp;·&nbsp; 0967273063 &nbsp;·&nbsp; Giao hàng toàn quốc &nbsp;·&nbsp;
      </div>

      {/* ─── Navbar Nền Trắng Cố Định ─── */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">

          <div className="flex-1">
            <h1 className="font-display text-2xl text-[#b31f24] tracking-[0.3em] uppercase font-bold">Sudes</h1>
            <p className="text-gray-400 text-[8px] tracking-[0.4em] uppercase -mt-0.5">Perfume & Luxury</p>
          </div>

          {/* 2. Desktop Nav (Sử dụng NavLink chống load lại trang) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                // end đảm bảo trang chủ "/" không bị dính highlight lây khi vào các trang con
                end={item.path === "/"} 
                className={({ isActive }) =>
                  `text-[12px] tracking-[0.15em] uppercase transition-colors duration-200 relative group font-body font-medium ${
                    isActive ? "text-[#b31f24]" : "text-gray-800 hover:text-[#b31f24]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {/* Thanh gạch chân đỏ tự động xuất hiện hoặc kéo dài ra khi hover */}
                    <span 
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#b31f24] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* 3. Cụm Chức Năng */}
          <div className="flex-1 flex items-center justify-end">
            <div className="flex items-center gap-6 px-5 py-2.5 border border-[#b31f24] rounded-full bg-white text-[#b31f24]">
              {/* Icon Tìm kiếm */}
              <button className="hover:scale-105 transition-transform" title="Tìm kiếm">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Icon Tài khoản */}
              <button className="hover:scale-105 transition-transform" title="Tài khoản">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>

              {/* Icon Giỏ hàng kèm Badge số 0 */}
              <button className="relative hover:scale-105 transition-transform" title="Giỏ hàng">
                <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="absolute -top-2.5 -right-2.5 w-4.5 h-4.5 bg-[#b31f24] rounded-full text-white text-[10px] flex items-center justify-center font-bold border border-white">
                  0
                </span>
              </button>
            </div>

            {/* Nút Menu Mobile */}
            <button className="md:hidden text-gray-800 ml-4" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-inner">
            {NAV_LINKS.map((item) => (
              <NavLink 
                key={item.label} 
                to={item.path} 
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)} // Click xong tự đóng drawer menu
                className={({ isActive }) =>
                  `text-[12px] tracking-[0.15em] uppercase font-medium transition-colors ${
                    isActive ? "text-[#b31f24] font-bold" : "text-gray-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
}