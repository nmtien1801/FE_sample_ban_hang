import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Disc, Music, Sparkles, CheckCircle2, Clock, Zap, Heart } from 'lucide-react';
import ApiContact from '../../apis/ApiContact';
import { toast } from 'react-toastify';

// Custom Component để bọc và tạo hiệu ứng khi cuộn chuột tới
const ScrollReveal = ({ children, className = "", animation = "animate-fade-up" }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-out ${isIntersecting
                ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                : animation === "animate-fade-up" ? "opacity-0 translate-y-12"
                    : animation === "animate-fade-left" ? "opacity-0 translate-x-16"
                        : animation === "animate-fade-right" ? "opacity-0 -translate-x-16"
                            : "opacity-0 scale-95"
                }`}
        >
            {children}
        </div>
    );
};

const CMICLandingPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const contactData = {
                name: formData.fullName.trim(),
                email: formData.email.trim(),
                message: `Tôi đang quan tâm dịch vụ AutoTune. Hãy liên hệ với tôi qua số điện thoại: ${formData.phone}`
            };
            let res = await ApiContact.sendContactApi(contactData);

            toast.success('Đã gửi yêu cầu tư vấn AutoTune thành công!');
            setFormData({ fullName: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error sending contact:', error);
            toast.error('Gửi yêu cầu tư vấn AutoTune thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-orange-50 min-h-screen font-sans text-gray-800 pb-20 scroll-smooth selection:bg-[#e67e22] selection:text-white overflow-x-hidden">
            {/* SECTION 6: FOOTER SUMMARY */}
            <section className="w-full bg-white py-20 px-4 border-t border-orange-100 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 animate-[fadeIn_1s_ease-out]">
                    <h2 className="text-[#e67e22] text-4xl md:text-5xl font-black tracking-tight uppercase leading-none drop-shadow-sm animate-pulse duration-3000">
                        CMIC STUDIO
                    </h2>
                    <div className="space-y-3">
                        <h3 className="text-gray-900 text-xl md:text-2xl font-black leading-tight uppercase tracking-tight">
                            Giải Pháp Âm Thanh & Phần Mềm Chuyên Nghiệp
                        </h3>
                        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto italic font-medium">
                            Nâng tầm giọng hát của bạn với Cubase & AutoTune. Dịch vụ tận tâm, hỗ trợ mọi lúc mọi nơi.
                        </p>
                    </div>
                    <div className="flex justify-center pt-4">
                        <div className="flex items-center gap-2.5 bg-orange-50 px-6 py-2.5 rounded-full border border-orange-200 shadow-sm hover:border-orange-400 transition-all duration-300 group cursor-default">
                            <MapPin className="text-[#e67e22] group-hover:animate-bounce" size={20} />
                            <span className="text-[#e67e22] text-sm md:text-base font-bold uppercase tracking-tight">Hồ Chí Minh & Toàn Quốc</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: CÁC KHÓ KHĂN */}
            <section className="max-w-5xl mx-auto px-6 py-20 relative">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                            Gặp Khó Khăn Khi Cài Đặt?
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {["Rắc Rối Công Nghệ?", "Giọng Hát Thô?"].map((q, i) => (
                        <ScrollReveal key={i} animation={i === 0 ? "animate-fade-right" : "animate-fade-left"}>
                            <div className="bg-white border-2 border-orange-100 p-8 rounded-[30px] hover:border-[#e67e22] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 group h-full">
                                <h3 className="text-[#e67e22] text-lg font-black mb-4 uppercase tracking-tight group-hover:text-black transition-colors">{q}</h3>
                                <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                                    {i === 0 ? "Phần mềm Cubase quá phức tạp? Bạn không biết cách kết nối Soundcard và Micro sao cho chuẩn xác?" : "Bạn muốn hát hay như ca sĩ nhưng AutoTune cứ bị méo tiếng, không bắt đúng tông bài hát?"}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal animation="animate-scale">
                    <div className="text-center pt-4">
                        <p className="text-gray-800 text-lg md:text-xl font-black italic tracking-tight bg-white/40 inline-block px-6 py-3 rounded-full border border-orange-100 backdrop-blur-sm shadow-sm">
                            Đừng lo lắng, <span className="text-[#e67e22]">CMIC STUDIO</span> sẽ giải quyết tất cả giúp bạn!
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 8: GIẢI PHÁP TOÀN DIỆN */}
            <section className="w-full bg-gradient-to-r from-[#f9f4f0] via-white to-[#f9f4f0] py-20 px-6 border-y border-orange-100 relative">
                <ScrollReveal className="max-w-5xl mx-auto text-center flex flex-col items-center" animation="animate-scale">
                    <div className="w-16 h-1.5 bg-[#e67e22] mb-6 rounded-full"></div>
                    <h4 className="text-gray-900 text-2xl md:text-3xl font-black tracking-tight mb-4 uppercase">
                        Giải Pháp Toàn Diện
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg font-bold italic tracking-tight opacity-90">
                        Mang không gian phòng thu chuyên nghiệp về tận ngôi nhà của bạn
                    </p>
                </ScrollReveal>
            </section>

            {/* SECTION 9: TRẢI NGHIỆM THỰC TẾ */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight">
                            Trải Nghiệm Thực Tế
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal animation="animate-fade-right">
                        <div className="relative group">
                            <div className="absolute -inset-2 border-2 border-dashed border-[#f18132] rounded-[28px] opacity-40 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-500"></div>
                            <div className="relative aspect-video bg-black rounded-[20px] overflow-hidden shadow-2xl border-2 border-gray-900">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="CMIC Studio Demo Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="animate-fade-left" className="space-y-4">
                        <h3 className="text-[#f18132] text-xl md:text-2xl font-black tracking-tight border-b-2 border-orange-100 pb-2 inline-block">
                            Âm Thanh Đỉnh Cao
                        </h3>
                        <div className="space-y-4 pt-2">
                            <p className="text-gray-700 text-base md:text-lg font-semibold leading-relaxed">
                                Xem video để cảm nhận sự khác biệt khi sử dụng bộ Plugin chuyên nghiệp từ CMIC STUDIO.
                            </p>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                                Hỗ trợ tinh chỉnh theo từng chất giọng riêng biệt, giúp bạn tự tin tỏa sáng khi Livestream hoặc thu âm.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* SECTION 10: PHẦN MỀM CHUYÊN NGHIỆP */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">Phần Mềm Chuyên Nghiệp</h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Disc size={32} className="animate-[spin_4s_linear_infinite]" />, title: "Cubase Pro", desc: "Trình quản lý âm thanh mạnh mẽ, ổn định, hỗ trợ thu âm và mix nhạc tốt nhất." },
                        { icon: <Music size={32} />, title: "AutoTune Pro", desc: "Xử lý cao độ thông minh, làm mịn giọng hát, tạo hiệu ứng ảo diệu cho người nghe." },
                        { icon: <Sparkles size={32} />, title: "Bộ VST Plugin", desc: "Lọc tạp âm, nén tiếng, tạo độ vang chuẩn Studio chuyên nghiệp." }
                    ].map((sw, i) => (
                        <ScrollReveal key={i} animation="animate-fade-up" className="h-full">
                            <div className="bg-white border-2 border-orange-100 p-8 rounded-[30px] text-center flex flex-col items-center group hover:border-[#e67e22] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 h-full">
                                <div className="text-[#e67e22] mb-6 bg-orange-50 p-4 rounded-full group-hover:bg-[#e67e22] group-hover:text-white transition-all duration-300 shadow-inner">
                                    {sw.icon}
                                </div>
                                <h3 className="text-[#e67e22] text-lg md:text-xl font-black mb-3 uppercase tracking-tight group-hover:scale-105 transition-transform">{sw.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-medium">{sw.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 11: ĐỘT PHÁ CÔNG NGHỆ */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <ScrollReveal animation="animate-scale">
                    <div className="bg-white rounded-[40px] border-2 border-orange-100 p-10 md:p-14 grid md:grid-cols-2 gap-12 items-center shadow-lg hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl"></div>
                        <div className="text-center space-y-2 border-r-0 md:border-r border-orange-100 py-4">
                            <div className="text-[#e67e22] text-6xl md:text-7xl font-black leading-none tracking-tight drop-shadow-sm scale-95 hover:scale-100 transition-transform duration-300 cursor-default">100%</div>
                            <p className="text-gray-900 text-lg md:text-xl font-black uppercase tracking-tight">Tự Động Dò Tông</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[#e67e22] text-xl md:text-2xl font-black uppercase tracking-tight">Hát Live Cực Dễ</h3>
                            <p className="text-gray-700 text-base font-bold leading-snug">Không cần rành nhạc lý! Phần mềm tự động nhận diện tông bài hát một cách chính xác.</p>
                            <div className="p-5 bg-orange-50 border-l-4 border-[#e67e22] rounded-r-2xl shadow-sm">
                                <p className="text-gray-600 text-sm md:text-base font-medium">Giao diện và hướng dẫn hoàn toàn thân thiện cho người dùng Việt Nam. Chỉ việc chọn bài và hát.</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 12: LINH HOẠT MỌI NƠI */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal animation="animate-fade-right" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                            <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                                Linh Hoạt Mọi Nơi
                            </h2>
                        </div>

                        <div className="space-y-4 bg-white/40 p-6 rounded-2xl border border-orange-100 shadow-sm">
                            <h3 className="text-gray-800 text-lg md:text-xl font-black">
                                Cài Đặt Online & Offline
                            </h3>
                            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                                <p className="hover:text-black transition-colors">
                                    <span className="font-bold text-gray-900">Cài đặt Offline:</span> Kỹ thuật viên hỗ trợ tận nhà tại khu vực TP. Hồ Chí Minh.
                                </p>
                                <p className="hover:text-black transition-colors">
                                    <span className="font-bold text-gray-900">Cài đặt Online:</span> Toàn quốc và hải ngoại qua UltraView / TeamViewer cực kỳ nhanh chóng và bảo mật.
                                </p>
                                <p className="font-semibold text-gray-700 border-t border-orange-100 pt-3 mt-2">
                                    Hỗ trợ kiểm tra Soundcard, Micro và tối ưu hệ điều hành máy tính để đạt độ trễ thấp nhất.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="animate-fade-left">
                        <div className="relative rounded-[30px] overflow-hidden shadow-2xl group border-2 border-white aspect-[4/3]">
                            <img src="/dichvu4.jpg" alt="Studio Setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* SECTION 13: GIẢI PHÁP CHO NGƯỜI NGẠI CÔNG NGHỆ */}
            <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                            Cho Người Ngại Công Nghệ
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal animation="animate-scale">
                        <div className="relative flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 p-1.5 border-4 border-[#f18132] rounded-full shadow-2xl overflow-hidden group bg-white">
                                <img src="/dichvu3.jpg" alt="Laptop cài sẵn" className="w-full h-full object-cover rounded-full group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700" />
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-1.5 rounded-full shadow-lg border border-orange-200 whitespace-nowrap group-hover:bg-orange-500 transition-colors duration-300">
                                    <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase tracking-wider group-hover:text-white transition-colors">Người lớn tuổi hát vui</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="animate-fade-left" className="space-y-4">
                        <h3 className="text-[#f18132] text-xl md:text-2xl font-black tracking-tight">
                            Laptop Cài Sẵn – Hát Ngay!
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-base md:text-lg font-semibold leading-relaxed">
                                Dành riêng cho cô chú lớn tuổi hoặc người không thích phức tạp. Chúng tôi cung cấp Laptop đã setup hoàn chỉnh mọi thứ.
                            </p>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed italic border-l-4 border-orange-400 pl-4 bg-white/40 py-2 rounded-r-xl shadow-sm">
                                <span className="font-bold text-gray-900 not-italic">Chìa Khóa Trao Tay:</span> Mua về chỉ cần cắm điện, kết nối Micro là có thể hát ngay lập tức với giao diện một nút bấm siêu đơn giản.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* SECTION 14: BẢNG GIÁ */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-1.5 h-8 bg-[#e67e22] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">Bảng Giá Minh Bạch</h2>
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="animate-scale">
                    <div className="overflow-hidden rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(230,126,34,1)] transition-all duration-300 bg-white">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="py-5 px-6 text-xs font-black uppercase tracking-wider">Gói Dịch Vụ</th>
                                    <th className="py-5 px-6 text-xs font-black uppercase tracking-wider text-right">Chi Phí</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { n: "Cài Đặt Cubase", p: "800,000 VNĐ" },
                                    { n: "Combo Chuyên Nghiệp", p: "1,300,000 VNĐ" },
                                    { n: "Laptop Trọn Gói", p: "Liên hệ báo giá" }
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-orange-50/60 transition-colors duration-200 group">
                                        <td className="py-5 px-6 font-bold text-sm md:text-base text-gray-900 group-hover:text-orange-600 transition-colors">{row.n}</td>
                                        <td className="py-5 px-6 text-right font-black text-[#e67e22] text-sm md:text-base">{row.p}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 15: TẠI SAO NÊN CHỌN CMIC STUDIO? */}
            <section className="max-w-4xl mx-auto px-6 py-16 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/30 rounded-full blur-3xl -z-10"></div>
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-1.5 h-8 bg-[#f18132] rounded-full"></div>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase">
                            Tại Sao Nên Chọn CMIC STUDIO?
                        </h2>
                    </div>
                </ScrollReveal>

                <ScrollReveal className="space-y-5 bg-white/30 backdrop-blur-sm p-6 md:p-8 rounded-[30px] border border-orange-100/80 shadow-inner">
                    {[
                        { icon: <CheckCircle2 className="text-white" size={18} />, label: "Chuyên Môn Cao", text: "Kỹ thuật viên am hiểu sâu về âm thanh và nhạc lý." },
                        { icon: <Clock className="text-white" size={18} />, label: "Hỗ Trợ 24/7", text: "Bảo hành phần mềm, hỗ trợ kỹ thuật trọn đời sau khi cài đặt." },
                        { icon: <Zap className="text-white" size={18} />, label: "Tối Ưu Tuyệt Đối", text: "Đảm bảo âm thanh sạch, không trễ tiếng (Latency), ổn định cao." },
                        { icon: <Heart className="text-white" size={18} />, label: "Tận Tâm", text: "Hướng dẫn sử dụng chi tiết, dễ hiểu cho cả người không rành máy tính." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 group p-2 rounded-xl hover:bg-white/60 transition-colors duration-300">
                            <div className="bg-[#f18132] p-1.5 rounded-full mt-0.5 shrink-0 shadow-md group-hover:bg-black group-hover:scale-110 transition-all duration-300">
                                {item.icon}
                            </div>
                            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                                <span className="font-black text-gray-900 group-hover:text-[#f18132] transition-colors">{item.label}:</span> {item.text}
                            </p>
                        </div>
                    ))}
                </ScrollReveal>
            </section>

            {/* SECTION 16: QUY TRÌNH */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <ScrollReveal>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-black tracking-tight uppercase text-center mb-20">Quy Trình Làm Việc</h2>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative">
                    <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-orange-100 -z-0"></div>
                    {["Tư Vấn", "Hẹn Lịch", "Cài Đặt", "Bàn Giao"].map((step, i) => (
                        <ScrollReveal key={i} className="w-full animate-delay" animation="animate-scale">
                            <div className="relative z-10 flex flex-col items-center space-y-4 group">
                                <div className="w-10 h-10 rounded-full bg-[#e67e22] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-sm group-hover:bg-black group-hover:scale-110 transition-all duration-300">{i + 1}</div>
                                <div className="text-center">
                                    <h3 className="text-[#e67e22] text-base md:text-lg font-black uppercase mb-0.5 tracking-tight group-hover:text-black transition-colors">{step}</h3>
                                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Bước {i + 1}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* SECTION 17: FORM ĐĂNG KÝ */}
            <section className="max-w-xl mx-auto px-6 py-16 bg-white rounded-3xl border border-orange-100 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-orange-400/10 rounded-full blur-xl"></div>
                <ScrollReveal>
                    <h2 className="text-orange-600 text-3xl font-bold mb-8 uppercase text-center tracking-wide">Đăng ký tư vấn ngay</h2>
                </ScrollReveal>
                <form className="space-y-6 text-left relative z-10" onSubmit={handleSend}>
                    <ScrollReveal className="group">
                        <label className="block font-bold mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Họ và tên</label>
                        <input
                            name="fullName"
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full p-3.5 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20 "
                        />
                    </ScrollReveal>
                    <ScrollReveal className="group">
                        <label className="block font-bold mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Địa chỉ email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3.5 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20"
                        />
                    </ScrollReveal>

                    <ScrollReveal className="group">
                        <label className="block font-bold mb-2 text-gray-700 group-focus-within:text-orange-500 transition-colors">*Số điện thoại</label>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3.5 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 ring-orange-100 transition-all bg-orange-50/20"
                        />
                    </ScrollReveal>
                    <ScrollReveal>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg text-xl uppercase tracking-wider active:scale-[0.99] ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-black hover:shadow-orange-200'}`}
                        >
                            {loading ? 'ĐANG GỬI...' : 'Gửi Yêu Cầu'}
                        </button>
                    </ScrollReveal>
                </form>
                <p className="mt-6 text-gray-500 italic text-sm text-center">
                    CMIC STUDIO sẽ liên hệ trong vòng 24h. Thông tin của bạn sẽ được bảo mật.
                </p>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}} />
        </div>
    );
};

export default CMICLandingPage;