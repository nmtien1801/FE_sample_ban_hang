import React, { useState, useMemo } from "react";
import ProductCard from "../components/sanpham/cardSanPham.jsx";
import { CATEGORIES, HERO_PRODUCTS, FEATURED_PRODUCTS } from "./mockTravelData";

// Gộp danh sách tổng thể sản phẩm
const PRODUCT_LIST = [...HERO_PRODUCTS, ...FEATURED_PRODUCTS];
const ITEMS_PER_PAGE = 12; // Tối đa 12 sản phẩm trên một trang (3x4)

export default function AdvancedProductStore() {
    // ─── CÁC TRẠNG THÁI QUẢN LÝ BỘ LỌC (STATE) ───
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [maxPrice, setMaxPrice] = useState(4000000); // Giá cao nhất mặc định (4 triệu)
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("DEFAULT");

    // Hàm chuyển đổi chuỗi giá "2.850.000" thành số để tính toán toán học
    const parsePrice = (priceStr) => {
        return parseInt(priceStr.replace(/\./g, ""), 10) || 0;
    };

    // ─── LOGIC LỌC VÀ SẮP XẾP SẢN PHẨM (USEMEMO) ───
    const processedProducts = useMemo(() => {
        // 1. Lọc theo từ khóa Tìm kiếm, Danh mục và Giá tiền
        let result = PRODUCT_LIST.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());

            // Giả định label danh mục khớp với tag hoặc brand/name để demo lọc (hoặc bạn bổ sung trường category vào mock nếu cần)
            const matchesCategory = selectedCategory === "ALL" ||
                product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                product.tagLine?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                product.subTitle?.toLowerCase().includes(selectedCategory.toLowerCase());

            const matchesPrice = parsePrice(product.price) <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // 2. Sắp xếp theo giá (nếu có chọn)
        if (sortOrder === "LOW_TO_HIGH") {
            result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortOrder === "HIGH_TO_LOW") {
            result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }

        return result;
    }, [searchQuery, selectedCategory, maxPrice, sortOrder]);

    // ─── LOGIC PHÂN TRANG (PAGINATION) ───
    const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);

    // Reset về trang 1 nếu người dùng thay đổi bộ lọc khiến số trang bị sụt giảm
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, maxPrice, sortOrder]);

    // Cắt mảng lấy đúng tối đa 12 sản phẩm thuộc trang hiện tại
    const displayedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return processedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [processedProducts, currentPage]);

    return (
        <section className="w-full bg-white py-12 font-sans text-gray-800">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* BỐ CỤC CHÍNH: GRID 12 CỘT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* =========================================================
              CỘT BÊN TRÁI: SIDEBAR TÌM KIẾM & BỘ LỌC (Chiếm 3/12 cột máy tính)
             ========================================================= */}
                    <aside className="lg:col-span-3 bg-[#f9f9f9] border border-gray-100 p-6 rounded-2xl sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight mb-6 border-b border-gray-200 pb-3">
                            Bộ lọc tìm kiếm
                        </h3>

                        {/* 1. Ô TÌM KIẾM VĂN BẢN */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Tìm kiếm sản phẩm
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Nhập tên, thương hiệu..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 outline-none focus:border-[#b31f24] transition-colors"
                                />
                                <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                </svg>
                            </div>
                        </div>

                        {/* 2. BỘ LỌC THEO GIÁ TIỀN (SLIDER RANGE) */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Khoảng giá tối đa
                            </label>
                            <input
                                type="range"
                                min="1500000"
                                max="4000000"
                                step="50000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-[#b31f24] cursor-pointer"
                            />
                            <div className="flex items-center justify-between mt-2 text-xs font-bold text-gray-700">
                                <span>1.500.000₫</span>
                                <span className="text-[#b31f24] bg-[#b31f24]/5 px-2 py-1 rounded border border-[#b31f24]/10">
                                    Dưới {maxPrice.toLocaleString("vi-VN")}₫
                                </span>
                            </div>
                        </div>

                        {/* 3. BỘ LỌC THEO CATEGORIES (DANH MỤC) */}
                        <div className="mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                Danh mục hương thơm
                            </label>
                            <div className="flex flex-col gap-1.5">
                                <button
                                    onClick={() => setSelectedCategory("ALL")}
                                    className={`text-left text-sm py-2 px-3 rounded-lg font-medium transition-colors ${selectedCategory === "ALL"
                                        ? "bg-[#b31f24]/10 text-[#b31f24]"
                                        : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    Tất cả sản phẩm
                                </button>
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.label)}
                                        className={`text-left text-sm py-2 px-3 rounded-lg font-medium flex items-center justify-between transition-colors ${selectedCategory === cat.label
                                            ? "bg-[#b31f24]/10 text-[#b31f24]"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span>{cat.label}</span>
                                        <span className="text-[10px] text-gray-400 font-normal">{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* =========================================================
              CỘT BÊN PHẢI: DANH SÁCH SẢN PHẨM & PHÂN TRANG (Chiếm 9/12 cột máy tính)
             ========================================================= */}
                    <main className="lg:col-span-9 w-full">

                        {/* Thanh công cụ sắp xếp nhanh phía trên lưới */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                            <p className="text-xs text-gray-500 font-medium">
                                Tìm thấy <span className="font-bold text-gray-900">{processedProducts.length}</span> kết quả phù hợp.
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 font-medium">Sắp xếp:</span>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="text-xs text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#b31f24] cursor-pointer font-medium"
                                >
                                    <option value="DEFAULT">Mặc định</option>
                                    <option value="LOW_TO_HIGH">Giá tăng dần</option>
                                    <option value="HIGH_TO_LOW">Giá giảm dần</option>
                                </select>
                            </div>
                        </div>

                        {/* LƯỚI SẢN PHẨM: Đạt cấu hình tối đa 3 cột trên Desktop (md:grid-cols-3) */}
                        {displayedProducts.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    {displayedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} featured={false} />
                                    ))}
                                </div>

                                {/* CỤM NÚT PHÂN TRANG (Chỉ hiển thị nếu tổng số trang > 1) */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-1.5 mt-12 border-t border-gray-100 pt-6">
                                        {/* Nút lùi trang */}
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-medium hover:border-[#b31f24] hover:text-[#b31f24] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-colors"
                                        >
                                            ‹
                                        </button>

                                        {/* Vòng lặp kết xuất số trang */}
                                        {Array.from({ length: totalPages }).map((_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${currentPage === pageNum
                                                        ? "bg-[#b31f24] text-white shadow-sm"
                                                        : "border border-gray-200 hover:border-[#b31f24] hover:text-[#b31f24]"
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        {/* Nút tiến trang */}
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-medium hover:border-[#b31f24] hover:text-[#b31f24] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-800 transition-colors"
                                        >
                                            ›
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Trống kết quả */
                            <div className="w-full text-center py-20 bg-[#f9f9f9] rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-500 text-sm font-medium">Không tìm thấy sản phẩm nào khớp với bộ lọc của bạn.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); setMaxPrice(4000000); }}
                                    className="mt-3 text-xs font-bold text-[#b31f24] uppercase tracking-wider underline"
                                >
                                    Xóa bộ lọc để tìm lại
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </section>
    );
}