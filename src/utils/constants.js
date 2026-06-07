import moment from "moment";
import ApiUpload from "../apis/ApiUpload.js";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TypeUserIDCons = {
  client: "client",
  staff: "staff",
  admin: "admin",
};

const typeCategory_obligatory = {
  comboLivestream: 1,
  resPhuKienThuAm: 11,
  Loa: 12,
  Soundcard: 7,
};

const formatDate = (isoDate) => {
  if (isoDate && isoDate !== "0001-01-01T00:00:00") {
    return moment(isoDate).format("DD/MM/YYYY");
  }
  return "";
};

const formatToISODate = (displayDate) => {
  if (!displayDate) return "01/01/0001";

  const m = moment(
    displayDate,
    ["YYYY-MM-DDTHH:mm:ss.SSS", "DD/MM/YYYY"],
    true,
  );

  if (!m.isValid()) return "01/01/0001";

  return m.format("DD/MM/YYYY");
};

const getGenderDisplay = (id) => {
  return id === 0 ? "Nữ" : id === 1 ? "Nam" : "";
};

// lấy ngày đầu -> cuối tháng
const getFirstDayOfMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().split("T")[0];
};

const getLastDayOfMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.toISOString().split("T")[0];
};

const formatToInputDate = (isoDate) => {
  if (isoDate && isoDate !== "0001-01-01T00:00:00") {
    // Cắt bỏ phần T và giờ, chỉ lấy YYYY-MM-DD
    return isoDate.split("T")[0];
  }
  return "";
};

const loadImage = async (url) => {
  try {
    if (!url) return null;

    // Gọi API lấy buffer của ảnh dựa trên path lưu trong DB
    const imageRes = await ApiUpload.GetFileApi(url);

    // Tạo blob từ arraybuffer nhận được
    const blob = new Blob([imageRes]); // Trình duyệt tự hiểu định dạng
    const previewUrl = URL.createObjectURL(blob);

    return previewUrl;
  } catch (error) {
    console.error("Lỗi khi tải ảnh:", error);
    return null;
  }
};

const loadImage2 = (path) => {
  if (!path) return null;

  // Nếu đã là URL hoàn chỉnh thì giữ nguyên
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Loại bỏ dấu '/' ở đầu nếu có để tránh xuất hiện '//' giữa base và path
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${BASE_URL}/upload/${normalizedPath}`;
};

const arrayBufferToUrl = (arrayBuffer) => {
  const blob = new Blob([arrayBuffer], { type: "image/png" });
  return URL.createObjectURL(blob);
};

const slug = (text) => {
  if (!text) return "";

  return (
    text
      .toString()
      // 1. Chuyển đổi Unicode đặc biệt (Bold, Italic) về dạng ký tự chuẩn
      .normalize("NFKC")
      // 2. Chuyển về chữ thường
      .toLowerCase()
      // 3. Tách các dấu tiếng Việt ra khỏi chữ cái (ví dụ: 'ế' -> 'e' + '´')
      .normalize("NFD")
      // 4. Xóa các ký tự dấu sau khi tách (accents)
      .replace(/[\u0300-\u036f]/g, "")
      // 5. Xử lý riêng chữ đ/Đ vì NFD không tách được hoàn toàn
      .replace(/[đĐ]/g, "d")
      // 6. Thay thế tất cả ký tự KHÔNG phải là chữ cái (a-z) hoặc số (0-9) thành dấu gạch ngang
      // Lưu ý: regex [^a-z0-9] cực kỳ an toàn cho URL
      .replace(/[^a-z0-9\s-]/g, "-")
      // 7. Thay thế một hoặc nhiều khoảng trắng bằng 1 dấu gạch ngang
      .replace(/\s+/g, "-")
      // 8. Dọn dẹp: Nếu có nhiều dấu gạch ngang liên tiếp (--) thì chỉ giữ lại 1 (-)
      .replace(/-+/g, "-")
      // 9. Cắt bỏ dấu gạch ngang dư thừa ở đầu và cuối chuỗi
      .replace(/^-+|-+$/g, "")
  );
};

const postDetailPath = (cat, post) =>
  `/tin-tuc/${slug(cat)}/${slug(post.title)}/${post.id}`;

export {
  TypeUserIDCons,
  typeCategory_obligatory,
  formatDate,
  formatToISODate,
  getGenderDisplay,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  loadImage,
  loadImage2,
  arrayBufferToUrl,
  formatToInputDate,
  slug,
  postDetailPath,
};
