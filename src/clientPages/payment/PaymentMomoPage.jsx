import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';
import ApiPayment from '../../apis/payment/ApiPaymentMomo';

const PaymentMomoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo, isLoading: authLoading, hasCheckedAuth } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [qrCode, setQrCode] = useState(null);
    const [payUrl, setPayUrl] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const intervalRef = useRef(null);
    const timerRef = useRef(null);

    const product_data = location.state?.product || location.state?.cleanProduct;

    useEffect(() => {
        // Chỉ tự động tạo mã khi:
        // 1. Thông tin sản phẩm đã được set vào state
        // 2. Chưa có qrCode (để tránh lặp lại khi re-render)
        // 3. Không đang trong quá trình load
        if (product && !qrCode && !isLoading) {
            handleCreateMomoQr();
        }
    }, [product]);

    useEffect(() => {
        if (authLoading) return;
        if (hasCheckedAuth && !userInfo?.id) {
            toast.error('Vui lòng đăng nhập để tiếp tục thanh toán');
            navigate('/login');
            return;
        }
        if (product_data) {
            setProduct(product_data);
        } else {
            toast.error('Không tìm thấy thông tin sản phẩm');
            navigate(-1);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [product_data, navigate, userInfo, authLoading, hasCheckedAuth]);

    const startCountdown = () => {
        setTimeLeft(15 * 60);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) { clearInterval(timerRef.current); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const handleCreateMomoQr = async () => {
        if (!product) return;
        const cleanPrice = Number(String(product.price).replace(/\D+/g, ''));
        setIsLoading(true);
        try {
            const response = await ApiPayment.createMomoQrApi({
                userId: userInfo?.id,
                productId: product.id,
                productName: product.name,
                quantity,
                amount: cleanPrice * quantity,
                description: `Thanh toán cho ${product.name} x${quantity}`,
                paymentMethod: 'momo',
            });

            if (response?.EC !== 0) {
                toast.error(response?.EM || 'Lỗi khi tạo mã');
                return;
            }

            const { orderId: oid, payUrl: url, qrCode: rawQr } = response.DT;
            setOrderId(oid);
            setPayUrl(url);

            if (rawQr && rawQr.startsWith('http')) {
                setQrCode(rawQr);
            } else {
                const qrDataUrl = await QRCode.toDataURL(url, { width: 512, margin: 2 });
                setQrCode(qrDataUrl);
            }

            setPaymentStatus('pending');
            startCountdown();
            toast.success('Đã tạo mã thanh toán');
            pollPaymentStatus(oid);
        } catch (error) {
console.log('ssssssssss ', error);

            toast.error('Không thể kết nối máy chủ MoMo');
        } finally {
            setIsLoading(false);
        }
    };

    const pollPaymentStatus = (currentOrderId) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(async () => {
            try {
                const response = await ApiPayment.checkPaymentStatusApi(currentOrderId);
                if (response?.DT) {
                    const { status } = response.DT;
                    if (status === 'success' || status === 'completed') {
                        setPaymentStatus('success');
                        clearInterval(intervalRef.current);
                        clearInterval(timerRef.current);
                        setTimeout(() => navigate(-1), 2500);
                    } else if (status === 'failed' || status === 'cancelled') {
                        setPaymentStatus('failed');
                        clearInterval(intervalRef.current);
                        clearInterval(timerRef.current);
                    }
                }
            } catch { }
        }, 3000);
    };

    const cleanPrice = product ? Number(String(product.price).replace(/\D+/g, '')) : 0;
    const totalPrice = cleanPrice * quantity;
    const timerPercent = (timeLeft / (15 * 60)) * 100;

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-[#2D3748] py-12 px-4" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&display=swap');
                .momo-pink { color: #D63384; }
                .momo-bg-pink { background-color: #D63384; }
                .btn-primary { 
                    background: #D63384; 
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 14px 0 rgba(214, 51, 132, 0.39);
                }
                .btn-primary:hover:not(:disabled) { 
                    background: #C02674; 
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(214, 51, 132, 0.23);
                }
                .white-card { 
                    background: #FFFFFF; 
                    border: 1px solid #E2E8F0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                }
                .timer-progress { transition: width 1s linear; }
                .step-badge { background: #FDE6F1; color: #D63384; }
            `}</style>

            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-8 group">
                    <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </div>
                    <span className="font-medium">Quay lại sản phẩm</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COL: Bill details */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="white-card rounded-3xl p-8">
                            <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 momo-bg-pink rounded-full"></span>
                                Chi tiết đơn hàng
                            </h2>

                            {product && (
                                <div className="flex gap-6 mb-8 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-24 h-24 rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-2 line-clamp-1">{product.description}</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-50 text-gray-500 border-r border-gray-200">−</button>
                                                <span className="px-4 py-1 font-bold text-sm">{quantity}</span>
                                                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-gray-50 text-gray-500 border-l border-gray-200">+</button>
                                            </div>
                                            <span className="font-bold momo-pink">{cleanPrice.toLocaleString('vi-VN')} ₫</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tạm tính</span>
                                    <span className="font-medium">{(cleanPrice * quantity).toLocaleString('vi-VN')} ₫</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Phí dịch vụ</span>
                                    <span className="text-green-500 font-medium">Miễn phí</span>
                                </div>
                                <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-gray-200">
                                    <span className="text-lg font-bold">Tổng cộng</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-black momo-pink">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">Đã bao gồm VAT (nếu có)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="white-card rounded-3xl p-6 flex items-center gap-4 bg-blue-50/30 border-blue-100">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-800">Thông tin bảo mật</h4>
                                <p className="text-xs text-gray-500">Giao dịch được mã hóa và bảo mật bởi hệ thống MoMo Business.</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: QR Panel */}
                    <div className="lg:col-span-5 sticky top-12">
                        <div className="white-card rounded-3xl overflow-hidden">
                            <div className="momo-bg-pink p-4 text-white text-center">
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Cổng thanh toán MoMo</p>
                            </div>

                            <div className="p-8 text-center">
                                {!qrCode ? (
                                    <div className="py-4">
                                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 momo-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-black mb-3">Xác nhận thanh toán</h3>
                                        <p className="text-sm text-gray-500 mb-8 px-4">Vui lòng kiểm tra lại đơn hàng trước khi tạo mã thanh toán.</p>

                                        <button onClick={handleCreateMomoQr} disabled={isLoading} className="btn-primary w-full text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3">
                                            {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span> : "THANH TOÁN NGAY"}
                                        </button>
                                    </div>
                                ) : paymentStatus === 'pending' ? (
                                    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                                        <div className="relative inline-block p-4 bg-white border-4 border-[#FDE6F1] rounded-3xl shadow-xl">
                                            <img src={qrCode} alt="QR Code" className="w-56 h-56" />
                                            {timeLeft < 1 && <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-2xl p-4 text-red-500 font-bold">Mã đã hết hạn</div>}
                                        </div>

                                        <div className="flex items-center justify-center gap-3 py-1 px-4 bg-pink-50 rounded-full w-max mx-auto">
                                            <span className="flex h-2 w-2 rounded-full momo-bg-pink animate-ping"></span>
                                            <span className="text-xs font-bold momo-pink font-mono">{formatTime(timeLeft)}</span>
                                        </div>

                                        <div className="text-left bg-gray-50 rounded-2xl p-4 space-y-3">
                                            <div className="flex gap-3">
                                                <span className="step-badge w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                                <p className="text-xs text-gray-600">Mở ứng dụng <b>MoMo</b></p>
                                            </div>
                                            <div className="flex gap-3">
                                                <span className="step-badge w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                                <p className="text-xs text-gray-600">Chọn <b>Quét Mã</b> và hướng camera về phía mã QR trên</p>
                                            </div>
                                        </div>

                                        {payUrl && (
                                            <a href={payUrl} target="_blank" rel="noreferrer" className="block text-xs font-bold text-gray-400 hover:text-[#D63384] transition-colors underline decoration-dotted">
                                                Tiếp tục trên trình duyệt web
                                            </a>
                                        )}
                                    </div>
                                ) : paymentStatus === 'success' ? (
                                    <div className="py-12 animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h3 className="text-2xl font-black text-green-600 mb-2">Thành công!</h3>
                                        <p className="text-sm text-gray-500">Đơn hàng đang được xử lý...</p>
                                    </div>
                                ) : (
                                    <div className="py-12">
                                        <h3 className="text-xl font-bold text-red-500 mb-4">Thanh toán thất bại</h3>
                                        <button onClick={() => setQrCode(null)} className="btn-primary w-full py-3 rounded-xl text-white font-bold">Thử lại</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMomoPage;