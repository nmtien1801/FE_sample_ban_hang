import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HERO_PRODUCTS, FEATURED_PRODUCTS } from "../../clientPages/mockTravelData";

const PRODUCT_LIST = [...HERO_PRODUCTS, ...FEATURED_PRODUCTS];
// ─────────────────────────────────────────────────────────────────────────────
 
const PRIMARY = "#b31f24";
const PRIMARY_DARK = "#91161a";
const PRIMARY_LIGHT = "#fef2f2";

function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}

const GIFTS = [
  {
    icon: "🎁",
    title: "Quà tặng kèm khi mua nước hoa",
    items: [
      {
        bold: "Tặng mini sample cho đơn từ 499.000đ",
        sub: "Thêm ngay một mùi hương mới vào bộ sưu tập của bạn – món quà nhỏ từ chúng tôi dành tặng bạn!",
      },
      {
        bold: "Đơn từ 1.000.000đ nhận túi đựng nước hoa cao cấp",
        sub: "Thiết kế tinh tế, tiện mang theo – món quà hoàn hảo cho tín đồ nước hoa.",
      },
      {
        bold: "Khách hàng mới – Nhận ngay voucher 50.000đ",
        sub: "Trải nghiệm hương thơm yêu thích đầu tiên cùng ưu đãi chào mừng đặc biệt!",
      },
    ],
  },
];

const POLICIES = [
  { icon: "🚚", title: "Miễn phí vận chuyển", sub: "FREE" },
  { icon: "📦", title: "Giao hàng toàn quốc", sub: "" },
  { icon: "🛡️", title: "Chính sách bảo hành", sub: "" },
  { icon: "🔄", title: "Chính sách đổi trả", sub: "" },
];

export default function DetailSanPham() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCT_LIST.find((item) => String(item.id) === String(id)) || PRODUCT_LIST[0];

  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="min-h-screen bg-white px-6 py-16 text-center text-gray-700">
        <p className="text-lg font-semibold">Không tìm thấy sản phẩm này.</p>
        <button
          onClick={() => navigate("/san-pham")}
          className="mt-4 rounded-full px-5 py-2.5 text-sm font-semibold text-white uppercase tracking-widest"
          style={{ background: PRIMARY }}
        >
          Quay lại danh sách
        </button>
      </section>
    );
  }

  const imageList = product.img && product.img.length ? product.img : [product.img || "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80"];
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* LEFT — Images */}
          <div className="flex gap-3 lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 w-[90px] shrink-0">
              {imageList.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  className="overflow-hidden rounded-xl border-2 transition-all"
                  style={{
                    borderColor: mainImg === i ? PRIMARY : "#e5e7eb",
                    boxShadow: mainImg === i ? `0 0 0 1px ${PRIMARY}` : "none",
                  }}
                >
                  <img src={img} alt="" className="h-[86px] w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white flex items-center justify-center"
              style={{ minHeight: 420 }}
            >
              <img
                src={imageList[mainImg] || imageList[0]}
                alt={product.name}
                className="h-[460px] w-full object-cover transition-all duration-300"
                style={{ objectFit: "contain", padding: "12px" }}
              />
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="lg:w-1/2 flex flex-col gap-4">

            {/* Name + meta */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{product.name}</h1>
              <div className="mt-1.5 flex items-center gap-4 text-sm text-gray-500">
                <span>
                  Thương hiệu:{" "}
                  <span className="font-semibold" style={{ color: PRIMARY }}>
                    {product.brand}
                  </span>
                </span>
                <span>|</span>
                <span>
                  Thể loại:{" "}
                  <span className="font-medium text-gray-700">
                    {product.category || "Đang cập nhật"}
                  </span>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold" style={{ color: PRIMARY }}>
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded text-white ml-1"
                  style={{ background: PRIMARY }}
                >
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3">
              {/* Qty control */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden select-none">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-10 text-lg font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-800">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-10 text-lg font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                className="flex-1 h-10 rounded-lg text-sm font-bold text-white uppercase tracking-widest transition-all active:scale-[0.98]"
                style={{ background: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
              >
                Liên Hệ
              </button>
            </div>

            {/* Stock */}
            <p className="text-sm text-gray-500">
              {product.stock ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Còn hàng
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Hết hàng</span>
              )}
            </p>

            {/* Gift box */}
            {GIFTS.map((g, gi) => (
              <div
                key={gi}
                className="rounded-xl p-4 text-sm"
                style={{
                  border: `1.5px dashed ${PRIMARY}`,
                  background: PRIMARY_LIGHT,
                }}
              >
                <p className="font-bold mb-3" style={{ color: PRIMARY }}>
                  {g.icon} {g.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {g.items.map((item, ii) => (
                    <li key={ii} className="flex gap-2">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ background: PRIMARY }}
                      >
                        ✓
                      </span>
                      <div>
                        <p className="font-semibold text-gray-800">{item.bold}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Policy Bar ─────────────────────────────────────────────── */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Chính sách</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POLICIES.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  {p.sub && (
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded text-white mr-1"
                      style={{ background: "#16a34a" }}
                    >
                      {p.sub}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-gray-700 leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hotline Banner ─────────────────────────────────────────── */}
        <div
          className="mt-4 rounded-xl px-6 py-3 flex items-center justify-center gap-3 text-white font-bold text-sm"
          style={{ background: PRIMARY }}
        >
          <span>📞</span>
          <span>
            Gọi ngay <span className="text-lg tracking-wider">1900 6750</span> để được hỗ trợ nhanh nhất
          </span>
        </div>

        {/* ── Product Description ────────────────────────────────────── */}
        {product.note && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              Mô tả sản phẩm
            </h2>
            <p className="text-sm text-gray-600 leading-7">{product.note}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badge && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                  style={{ background: PRIMARY }}
                >
                  {product.badge}
                </span>
              )}
              {product.tag && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                  {product.tag}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}