import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import {
  ArrowLeft, ArrowRight, Loader2, CheckCircle2,
  Info, ExternalLink, ShoppingBag, Receipt,
  Clock, ShieldCheck, Smartphone, QrCode,
  AlertCircle, RefreshCw, Package,
} from 'lucide-react';
import ApiPaymentVietQr from '../../apis/payment/ApiPaymentVietQr.js';
import { formatCurrency, sanitizeAddInfo } from '../../utils/format.js';
import clsx from 'clsx';

/* ─────────────────────────────────────────────
   StepIndicator nội tuyến (không cần import)
───────────────────────────────────────────── */
function StepDot({ idx, current, label }) {
  const done = idx < current;
  const active = idx === current;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={clsx(
        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
        done  && 'bg-[#00c07b] text-white shadow-[0_0_0_3px_#00c07b22]',
        active && 'bg-white text-[#00c07b] border-2 border-[#00c07b] shadow-[0_0_0_3px_#00c07b22]',
        !done && !active && 'bg-white text-slate-300 border-2 border-slate-200',
      )}>
        {done ? <CheckCircle2 size={16} /> : idx}
      </div>
      <span className={clsx(
        'text-[10px] font-semibold uppercase tracking-widest',
        active ? 'text-[#00c07b]' : done ? 'text-slate-400' : 'text-slate-300',
      )}>
        {label}
      </span>
    </div>
  );
}

function Steps({ current }) {
  const labels = ['Xác nhận', 'Thanh toán', 'Hoàn tất'];
  return (
    <div className="flex items-center gap-0">
      {labels.map((label, i) => (
        <React.Fragment key={i}>
          <StepDot idx={i + 1} current={current} label={label} />
          {i < labels.length - 1 && (
            <div className={clsx(
              'flex-1 h-px mx-2 transition-colors duration-500',
              current > i + 1 ? 'bg-[#00c07b]' : 'bg-slate-200'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PaymentTimer nội tuyến
───────────────────────────────────────────── */
function Timer({ expiresAt, onExpire }) {
  const [secs, setSecs] = useState(null);

  useEffect(() => {
    if (!expiresAt) return;
    const calc = () => Math.max(0, Math.floor((new Date(expiresAt) - Date.now()) / 1000));
    setSecs(calc());
    const id = setInterval(() => {
      const s = calc();
      setSecs(s);
      if (s === 0) { clearInterval(id); onExpire?.(); }
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  if (secs === null) return null;
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  const urgent = secs < 60;

  return (
    <div className={clsx(
      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors',
      urgent ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-50 text-slate-600 border border-slate-200'
    )}>
      <Clock size={12} />
      {m}:{s}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function PaymentPayOSPage() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const socketRef = useRef(null);

  const product = location.state?.product;

  const currentItems = product
    ? [{ name: product.name, qty: 1, price: product.price }]
    : [];

  const totalAmount = currentItems.reduce((s, i) => s + i.price * i.qty, 0);
  const addInfo = sanitizeAddInfo(`Thanh toan ${product?.name || 'don hang'}`);

  const [step,        setStep]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [order,       setOrder]       = useState(null);
  const [payment,     setPayment]     = useState(null);
  const [orderStatus, setOrderStatus] = useState(null); // 'pending' | 'paid' | 'expired' | 'failed'
  const [error,       setError]       = useState('');
  const [polling,     setPolling]     = useState(false);

  /* Redirect nếu không có sản phẩm */
  useEffect(() => {
    if (!product) {
      toast.error('Không tìm thấy thông tin sản phẩm');
      navigate('/');
    }
  }, [product, navigate]);

  /* Socket — lắng nghe khi ở step 2 */
  useEffect(() => {
    if (!order?.orderId || step !== 2) return;

    const backendUrl = import.meta.env.VITE_BE_URL || 'http://localhost:8080';
    const socket = io(backendUrl, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.emit('join-payment-session', order.orderId);
    socket.on('payment-completed', (data) => {
      if (data?.success) {
        setOrderStatus('paid');
        setStep(3);
      } else if (data?.status === 'failed') {
        setOrderStatus('failed');
        setError('Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.');
      }
    });

    return () => {
      socket.off('payment-completed');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [order, step]);

  /* ── Tạo đơn hàng PayOS ── */
  const handleCreateOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await ApiPaymentVietQr.createOrder({
        items: currentItems,
        totalAmount,
        description: addInfo,
        // Không gửi bankBin / accountNo — PayOS tự xử lý
      });
      if (!res.success) throw new Error(res.message);

      setOrder(res.order);
      setPayment(res.payment);
      setOrderStatus('pending');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Lỗi hệ thống, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Kiểm tra thủ công ── */
  const handleManualCheck = async () => {
    if (!order) return;
    setPolling(true);
    setError('');
    try {
      const res = await ApiPaymentVietQr.confirmOrder(order.orderId);

      if (res.success && res.orderStatus === 'completed') {
        setOrder(res.order || order);
        setOrderStatus('paid');
        setStep(3);
        return;
      }
      if (res.orderStatus === 'failed' || res.orderStatus === 'cancelled') {
        setOrderStatus('failed');
        setError(res.message || 'Đơn hàng không thành công.');
        return;
      }
      setError(res.message || 'Hệ thống chưa nhận được tiền. Vui lòng đợi trong giây lát.');
    } catch (err) {
      setError(err.message || 'Lỗi hệ thống.');
    } finally {
      setPolling(false);
    }
  };

  /* ── Helpers ── */
  const expired = orderStatus === 'expired';

  return (
    <div className="min-h-screen bg-[#f4f7f5] font-['Sora',sans-serif]">

      {/* ── Fonts từ Google ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        .fade-up {
          animation: fadeUp .3s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pulse-ring {
          animation: pulseRing 2s ease infinite;
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 #00c07b33; }
          50%      { box-shadow: 0 0 0 12px #00c07b00; }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ShieldCheck size={16} className="text-[#00c07b]" />
            Thanh toán bảo mật
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Step indicator */}
        <div className="max-w-xs mx-auto mb-10">
          <Steps current={step} />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">

            {/* ══════════════════════════
                STEP 1 — Xác nhận đơn
            ══════════════════════════ */}
            {step === 1 && (
              <div className="fade-up grid sm:grid-cols-5 gap-6">

                {/* Trái — Chi tiết sản phẩm */}
                <div className="sm:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-[#00c07b]/10 flex items-center justify-center">
                      <ShoppingBag size={18} className="text-[#00c07b]" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">Đơn hàng của bạn</h2>
                      <p className="text-xs text-slate-400">Kiểm tra trước khi thanh toán</p>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="space-y-3 mb-6">
                    {currentItems.map((item, i) => (
                      <div key={i} className="flex items-start justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#00c07b]/10 flex items-center justify-center shrink-0">
                            <Package size={14} className="text-[#00c07b]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{item.name}</p>
                            <p className="text-xs text-slate-400 mt-0.5">Số lượng: {item.qty}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-800 font-['JetBrains_Mono',monospace]">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Nội dung CK */}
                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                    <p className="text-xs font-semibold text-blue-600 mb-1">Nội dung chuyển khoản</p>
                    <p className="text-sm font-mono text-blue-800 font-semibold">{addInfo}</p>
                    <p className="text-[10px] text-blue-500 mt-1">PayOS sẽ tự điền nội dung này vào giao dịch</p>
                  </div>

                  {/* Tổng */}
                  <div className="border-t border-dashed border-slate-200 pt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Tổng thanh toán</span>
                    <span className="text-xl font-bold text-[#00c07b] font-['JetBrains_Mono',monospace]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Phải — Thông tin PayOS */}
                <div className="sm:col-span-2 flex flex-col gap-4">
                  {/* PayOS logo card */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00c07b] to-[#00a668] flex items-center justify-center shadow-md shadow-[#00c07b33]">
                      <QrCode size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Thanh toán qua PayOS</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Quét QR hoặc chuyển khoản ngân hàng qua cổng PayOS an toàn
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 justify-center mt-1">
                      {['MBBank', 'VCB', 'Techcom', 'BIDV', '+50 NH'].map(b => (
                        <span key={b} className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Điểm lợi ích */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
                    {[
                      { icon: <ShieldCheck size={14} />, text: 'Bảo mật SSL — Dữ liệu được mã hóa' },
                      { icon: <Smartphone size={14} />, text: 'Hỗ trợ tất cả app ngân hàng VN' },
                      { icon: <Clock size={14} />, text: 'Xác nhận tự động trong 15 phút' },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-xs text-slate-500">
                        <span className="text-[#00c07b] shrink-0">{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Nút tiếp tục */}
                  {error && (
                    <div className="flex items-start gap-2 p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleCreateOrder}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-[#00c07b] to-[#00a668] hover:from-[#00a668] hover:to-[#008f56] disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white text-sm font-bold transition-all shadow-md shadow-[#00c07b33] active:scale-[.98]"
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Đang khởi tạo...</>
                    ) : (
                      <>Tiếp tục thanh toán <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ══════════════════════════
                STEP 2 — QR / PayOS Link
            ══════════════════════════ */}
            {step === 2 && payment && (
              <div className="fade-up grid sm:grid-cols-5 gap-6">

                {/* Trái — QR */}
                <div className="sm:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { setStep(1); setError(''); }}
                        className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">Quét mã QR</h2>
                        <p className="text-xs text-slate-400">Dùng app ngân hàng bất kỳ</p>
                      </div>
                    </div>
                    <Timer expiresAt={order?.expiresAt} onExpire={() => setOrderStatus('expired')} />
                  </div>

                  {/* QR Image */}
                  <div className="flex flex-col items-center">
                    <div className={clsx(
                      'relative w-56 h-56 rounded-2xl border-2 overflow-hidden transition-all',
                      expired ? 'border-red-200 grayscale opacity-50' : 'border-[#00c07b]/30 pulse-ring',
                    )}>
                      {payment.qrImageUrl ? (
                        <img
                          src={payment.qrImageUrl}
                          alt="PayOS QR Code"
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        /* fallback khi PayOS trả về checkoutUrl thay vì ảnh QR */
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-50">
                          <QrCode size={48} className="text-slate-300" />
                          <p className="text-xs text-slate-400 text-center px-4">
                            QR không khả dụng.<br />Dùng nút bên dưới.
                          </p>
                        </div>
                      )}

                      {expired && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                          <Clock size={28} className="text-red-400 mb-2" />
                          <p className="text-xs font-semibold text-red-500">Mã đã hết hạn</p>
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-xs text-slate-400 text-center">
                      Quét bằng <span className="font-semibold text-slate-600">Camera hoặc app ngân hàng</span>
                    </p>

                    {/* Nút mở PayOS */}
                    {payment.checkoutUrl && !expired && (
                      <a
                        href={payment.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00c07b] hover:bg-[#00a668] text-white text-sm font-semibold transition-colors shadow-sm shadow-[#00c07b33]"
                      >
                        <ExternalLink size={14} />
                        Mở trang PayOS
                      </a>
                    )}
                  </div>
                </div>

                {/* Phải — Hướng dẫn + Confirm */}
                <div className="sm:col-span-2 flex flex-col gap-4">
                  {/* Số tiền */}
                  <div className="bg-gradient-to-br from-[#00c07b]/10 to-[#00c07b]/5 rounded-2xl border border-[#00c07b]/20 p-5 text-center">
                    <p className="text-xs font-semibold text-[#00a668] uppercase tracking-widest mb-1">Cần thanh toán</p>
                    <p className="text-3xl font-bold text-[#00a668] font-['JetBrains_Mono',monospace]">
                      {formatCurrency(totalAmount)}
                    </p>
                    <p className="mt-2 text-xs font-mono bg-white/70 text-[#00a668] px-3 py-1 rounded-lg inline-block border border-[#00c07b]/20">
                      {addInfo}
                    </p>
                  </div>

                  {/* Mã đơn */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Mã đơn hàng</span>
                      <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                        #{order?.orderId}
                      </span>
                    </div>
                  </div>

                  {/* Hướng dẫn */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Hướng dẫn</p>
                    {[
                      'Mở app ngân hàng, chọn Quét QR',
                      'Hướng camera vào mã QR bên cạnh',
                      `Kiểm tra số tiền và xác nhận giao dịch`,
                      'Chờ hệ thống xác nhận tự động',
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#00c07b]/10 text-[#00c07b] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2 p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                      <AlertCircle size={13} className="shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  {/* Nút kiểm tra */}
                  <button
                    onClick={handleManualCheck}
                    disabled={polling || expired}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-[#00c07b] text-[#00c07b] hover:bg-[#00c07b]/5 disabled:border-slate-200 disabled:text-slate-400 text-sm font-bold transition-all active:scale-[.98]"
                  >
                    {polling ? (
                      <><Loader2 size={15} className="animate-spin" /> Đang kiểm tra...</>
                    ) : (
                      <><RefreshCw size={15} /> Tôi đã chuyển khoản — Kiểm tra</>
                    )}
                  </button>

                  {expired && (
                    <button
                      onClick={() => { setStep(1); setOrderStatus(null); setError(''); setOrder(null); setPayment(null); }}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold transition-colors"
                    >
                      <RefreshCw size={14} /> Tạo đơn mới
                    </button>
                  )}

                  <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                    Hệ thống tự xác nhận qua webhook PayOS.<br />
                    Bấm kiểm tra nếu chưa nhận được kết quả sau 30 giây.
                  </p>
                </div>
              </div>
            )}

            {/* ══════════════════════════
                STEP 3 — Thành công
            ══════════════════════════ */}
            {step === 3 && (
              <div className="fade-up max-w-md mx-auto">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">

                  {/* Icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#00c07b]/10 border-2 border-[#00c07b]/30 flex items-center justify-center pulse-ring">
                      <CheckCircle2 size={40} className="text-[#00c07b]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00c07b] flex items-center justify-center">
                      <ShieldCheck size={12} className="text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Thanh toán thành công!</h2>
                  <p className="text-sm text-slate-400 mb-8">Giao dịch đã được PayOS xác nhận</p>

                  {/* Chi tiết */}
                  {order && (
                    <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-3 mb-7 border border-slate-100">
                      {[
                        { label: 'Mã đơn hàng', value: `#${order.orderId}`, mono: true },
                        { label: 'Nội dung CK', value: addInfo, mono: true },
                        { label: 'Phương thức', value: 'PayOS — Chuyển khoản QR' },
                        { label: 'Số tiền', value: formatCurrency(order.totalAmount ?? totalAmount), highlight: true },
                      ].map(({ label, value, mono, highlight }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{label}</span>
                          <span className={clsx(
                            'text-sm font-semibold',
                            highlight ? 'text-[#00c07b] text-base' : 'text-slate-800',
                            mono && 'font-mono text-xs bg-slate-100 px-2 py-0.5 rounded-md',
                          )}>
                            {value}
                          </span>
                        </div>
                      ))}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-xs text-slate-400">Trạng thái</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#00c07b] bg-[#00c07b]/10 px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={11} /> Đã thanh toán
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Ghi chú biên lai */}
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
                    <Receipt size={12} />
                    Biên lai đã gửi đến email đăng ký của bạn
                  </div>

                  <button
                    onClick={() => navigate('/san-pham/all/all')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00c07b] to-[#00a668] hover:from-[#00a668] hover:to-[#008f56] text-white text-sm font-bold transition-all shadow-md shadow-[#00c07b33] active:scale-[.98]"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}