import React, { useState } from "react";

/**
 * Component hiển thị thẻ sản phẩm nước hoa (Product Card)
 * @param {Object} props.product - Đối tượng chứa thông tin sản phẩm
 * @param {string|number} props.product.id - ID sản phẩm
 * @param {string} props.product.name - Tên sản phẩm
 * @param {string} props.product.brand - Thương hiệu sản phẩm
 * @param {string} [props.product.note] - Tầng hương ghi chú (tùy chọn)
 * @param {string} props.product.price - Giá sản phẩm (đã định dạng chuỗi, ví dụ: "2.850.000")
 * @param {string} props.product.img - URL ảnh sản phẩm
 * @param {string} [props.product.size] - Dung tích sản phẩm, ví dụ: "100ml" (tùy chọn)
 * @param {string} [props.product.badge] - Nhãn bên trái (ví dụ: "Best Seller")
 * @param {string} [props.product.tag] - Nhãn bên phải (ví dụ: "Mới", "Hot")
 * @param {boolean} [props.featured=false] - Cấu hình bo góc card (true: vuông rounded-none, false: bo góc rounded-md)
 */
export default function ProductCard({ product, featured = false }) {
  const [hovered, setHovered] = useState(false);

  // Xử lý sự kiện click thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt nếu sau này bạn bọc link chi tiết sản phẩm ở ngoài
    // Logic thêm vào giỏ hàng của bạn ở đây (ví dụ: gọi context, dispatch redux...)
    console.log(`Đã thêm sản phẩm ${product.name} vào giỏ hàng`);
  };

  return (
    <div
      className={`group relative bg-white border border-gray-200 overflow-hidden transition-all duration-500 ${featured ? "rounded-none" : "rounded-md"
        } ${hovered ? "border-[#b31f24] shadow-md" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Khung Ảnh Sản Phẩm */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-50">
        <img
          src={product.img}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"
            }`}
          loading="lazy" // Tối ưu hiệu năng tải ảnh chậm khi scroll
        />

        {/* Lớp phủ Gradient mờ khi hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-30"
            }`}
        />

        {/* Badge trái (Best Seller, Trending...) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#b31f24] text-white text-[10px] tracking-[0.15em] font-semibold px-2.5 py-1 uppercase rounded-sm z-10">
            {product.badge}
          </div>
        )}

        {/* Tag phải (Mới, Hot, Sale...) */}
        {product.tag && (
          <div className="absolute top-3 right-3 bg-[#b31f24] text-white text-[10px] tracking-[0.15em] font-semibold px-2 py-1 uppercase rounded-sm z-10">
            {product.tag}
          </div>
        )}

        {/* Nút "Thêm vào giỏ" trượt lên khi hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 z-10 ${hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#b31f24] hover:bg-[#91161a] text-white text-xs tracking-[0.15em] uppercase font-semibold py-2.5 transition-colors duration-200 rounded-sm shadow-sm cursor-pointer"
          >
            Tùy Chọn
          </button>
        </div>
      </div>

      {/* Vùng Thông Tin Sản Phẩm */}
      <div className="p-4 bg-white">
        {/* Thương hiệu */}
        <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mb-1">
          {product.brand}
        </p>

        {/* Tên sản phẩm */}
        <h3 className="text-gray-900 font-sans font-bold text-base leading-tight mb-1 group-hover:text-[#b31f24] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Ghi chú hương thơm (Mùi gỗ, cam chanh...) */}
        {product.note ? (
          <p className="text-gray-500 text-[11px] tracking-wide mb-3 truncate">
            {product.note}
          </p>
        ) : (
          <div className="h-[29px]" /> // Giữ khoảng trống đồng đều nếu sản phẩm không có dòng ghi chú mùi hương
        )}

        {/* Giá tiền & Dung tích */}
        <div className="flex items-center justify-between tức thời">
          <span className="text-[#b31f24] font-medium text-base tracking-wide">
            {product.price}₫
          </span>
          {product.size && (
            <span className="text-gray-400 text-[10px] tracking-[0.1em]">
              {product.size}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}