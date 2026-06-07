import { ApiManager } from "../ApiManager";

const ApiPayment = {
  // Tạo QR Code MoMo cho thanh toán
  createMomoQrApi: (data) => ApiManager.post(`/payment/momo/create-qr`, data),

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatusApi: (orderId) =>
    ApiManager.get(`/payment/check-status/${orderId}`),

  // Lấy thông tin đơn hàng
  getOrderInfoApi: (orderId) => ApiManager.get(`/payment/order/${orderId}`),
};

export default ApiPayment;
