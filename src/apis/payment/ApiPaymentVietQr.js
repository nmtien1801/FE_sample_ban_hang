import { ApiManager } from "../ApiManager";

const ApiPaymentVietQr = {
    // --- Nhóm API về Ngân hàng (Banks) ---
  // Lấy danh sách tất cả ngân hàng hỗ trợ VietQR
  getBanks: () => ApiManager.get("/banks"),

  // Lấy danh sách ngân hàng hỗ trợ chuyển tiền nhanh
  getTransferBanks: () => ApiManager.get("/banks/transfer"),

  // --- Nhóm API về Tạo mã QR ---
  // Tạo mã QR qua API chính thức (trả về mã text hoặc DataURL)
  generateQR: (payload) => ApiManager.post("/qr/generate", payload),

  // Lấy link ảnh QR nhanh (Quick Link)
  getQuickLink: (params) => ApiManager.get("/qr/quick-link", { params }),

  // --- Nhóm API về Thanh toán (Payment) ---
  // Tạo đơn hàng và lấy thông tin thanh toán (QR, Deeplink)
  createOrder: (data) => ApiManager.post(`/payment/vietqr/create-order`, data),

  // Kiểm tra trạng thái đơn hàng (Dùng cho Polling)
  getOrder: (orderId) => ApiManager.get(`/payment/vietqr/order/${orderId}`),

  // Xác nhận đã thanh toán (Manual confirm)
  confirmOrder: (orderId) =>
    ApiManager.post(`/payment/vietqr/confirm/${orderId}`),

  // Lấy Deeplink mở app ngân hàng
  getDeeplink: (params) =>
    ApiManager.get(`/payment/vietqr/deeplink`, { params }),
};

export default ApiPaymentVietQr;
