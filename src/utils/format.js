export const formatNumber = (value) => {
  if (value === undefined || value === null) return "";
  const digits = String(value).replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parseNumber = (value) => {
  if (value === undefined || value === null) return 0;
  const digits = String(value).replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
};

export const formatCurrency = (value) => {
  if (typeof value !== "number" && typeof value !== "string") return "";
  const numberValue = Number(String(value).replace(/[^0-9.-]/g, ""));
  if (Number.isNaN(numberValue)) return "";
  return numberValue.toLocaleString("vi-VN") + " ₫";
};

export const sanitizeAddInfo = (text) => {
  if (!text) return "";
  return String(text)
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .slice(0, 25);
};

export const timeRemaining = (expiresAt) => {
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return null;
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

