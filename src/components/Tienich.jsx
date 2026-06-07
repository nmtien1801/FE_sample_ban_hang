import React from 'react';
import { Link } from 'react-router-dom';
import { postDetailPath } from '../utils/constants';

// Sub-component nội bộ phục vụ cho việc hiển thị tiêu đề các Block
const SectionTitle = ({ children }) => (
    <div className="mb-8 flex items-center gap-5">
        <h3 className="font-serif text-[26px] font-semibold text-neutral-950">{children}</h3>
        <div className="h-px flex-1 bg-neutral-200">
            <div className="h-[2px] w-12 bg-[#6eb48c]" />
        </div>
    </div>
);

export default function Sidebar({ listPosts = [], travelCategories = [] }) {
    // Lấy ra tối đa 3 bài viết đầu tiên để làm danh sách xem nhiều trong tuần
    const popularPosts = listPosts.slice(0, 3);

    const handleSubscribe = (event) => {
        event.preventDefault();
        // Xử lý logic đăng ký nhận bản tin ở đây nếu cần
    };

    return (
        <aside className="w-full flex flex-col space-y-10">

            {/* 1. SECTION: POPULAR THIS WEEK */}
            <section>
                <SectionTitle>Popular This Week</SectionTitle>
                <div className="flex flex-col gap-6">
                    {popularPosts.map((post, index) => (
                        <Link key={post.id || index} to={postDetailPath(post.category, post)} className="flex gap-4 items-start group">

                            {/* Ảnh Thumbnail + Số Thứ Tự Đè Lên */}
                            <div className="relative flex-shrink-0 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-[100px] h-[100px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute -top-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Tiêu đề & Ngày tháng */}
                            <div className="min-w-0">
                                <h4 className="font-serif text-[16px] font-semibold leading-snug text-neutral-950 hover:text-[#6eb48c] transition cursor-pointer line-clamp-3">
                                    {post.title}
                                </h4>
                                <p className="mt-1.5 text-[12px] text-neutral-500">{post.date}</p>
                            </div>

                        </Link>
                    ))}
                </div>
            </section>

            {/* 2. SECTION: EXPLORE (DANH MỤC) */}
            <section>
                <SectionTitle>Explore</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                    {travelCategories.map((category) => (
                        <a
                            key={category}
                            href={`#category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="border border-[#ececec] px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700 transition hover:border-[#6eb48c] hover:text-[#6eb48c]"
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </section>

            {/* 3. SECTION: NEWSLETTER BOX */}
            <div className="bg-neutral-950 p-7 text-white rounded-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6eb48c]">
                    Newsletter
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-semibold leading-tight">
                    Weekly travel inspiration for curious readers.
                </h3>
                <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubscribe}>
                    <input
                        type="email"
                        required
                        placeholder="Email address"
                        className="h-12 bg-white px-4 text-sm text-neutral-950 outline-none w-full focus:ring-1 focus:ring-[#6eb48c]"
                    />
                    <button
                        type="submit"
                        className="h-12 bg-[#6eb48c] text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-neutral-950"
                    >
                        Subscribe
                    </button>
                </form>
            </div>

        </aside>
    );
}
