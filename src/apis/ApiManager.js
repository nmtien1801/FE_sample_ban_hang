import axios from "axios";
import { toast } from "react-toastify"; // nếu bạn dùng react-toastify
import Cookies from "js-cookie";
import axiosRetry from "axios-retry";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

// Cấu hình retry -> khi sử dụng refresh token
axiosRetry(api, {
  retries: 2, // Số lần retry tối đa
  retryDelay: (retryCount) => {
    return retryCount * 100; // Thời gian delay giữa các lần retry (ms)
  },
  retryCondition: (error) => {
    // Điều kiện để thực hiện retry -> retry refresh token khi bất đồng bộ
    return error.response?.status === 403; // Retry nếu lỗi là 400
  },
});

// 🧩 Interceptor request
api.interceptors.request.use((config) => {
  const token = Cookies.get("fr");
  let headerValue = null;

  try {
    headerValue = JSON.parse(localStorage.getItem("userInfo"));
  } catch (parseError) {
    console.warn("ApiManager: invalid userInfo in localStorage", parseError);
  }

  if (token && headerValue) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["UserID"] = headerValue.id;
    config.headers["UserName"] = encodeURIComponent(headerValue.userName);
  }
  return config;
});

// 🧩 Interceptor response
api.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
  async (error) => {
    const status = error.response?.status || 500;

    switch (status) {
      case 401: {
        const path = window.location.pathname;
        const publicPaths = ["/", "/login", "/register", "/forgot-password"];

        // ✅ Nếu đang ở trang public, bỏ qua
        if (publicPaths.includes(path)) {
          return Promise.reject(error);
        }

        // ✅ Chỉ redirect nếu KHÔNG phải request /account
        const isAccountRequest = error.config?.url?.includes("/auth/account");

        if (!isAccountRequest) {
          Cookies.remove("fr");
          localStorage.removeItem("userInfo");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      case 400: {
        return error.response.data; // Bad request
      }

      case 403: {
        try {
          const res = await api.post("/auth/refreshToken");
          const newAccessToken = res.DT.accessToken;

          Cookies.set("fr", newAccessToken);

          const config = error.config;
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api.request(config);
        } catch (e) {
          Cookies.remove("fr");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }

      case 404: {
        toast.error("Không tìm thấy tài nguyên.");
        return Promise.reject(error);
      }

      case 409: {
        return Promise.reject(error);
      }

      case 422: {
        return Promise.reject(error);
      }

      default: {
        return Promise.reject(error); // Lỗi server bất ngờ
      }
    }
  },
);

// 🧩 Wrapper API
export const ApiManager = {
  get: async (url, { params } = {}) => {
    const res = await api.get(url, { params });
    return res;
  },
  post: async (url, body, query) => {
    if (body instanceof FormData) {
      const config = { params: query };
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
      const res = await api.post(url, body, config);
      return res;
    }
    const res = await api.post(url, body, { params: query });
    return res;
  },
  put: async (url, data, query) => {
    if (data instanceof FormData) {
      const config = { params: query };
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
      const res = await api.put(url, data, config);
      return res;
    }
    const res = await api.put(url, data);
    return res;
  },
  delete: async (url, data) => {
    const res = await api.delete(url, { data });
    return res;
  },
  patch: async (url, data) => {
    const res = await api.patch(url, data);
    return res;
  },
  getImageBinary: async (urlPath) => {
    const response = await api.get(urlPath, {
      responseType: "arraybuffer",
    });
    return response;
  },
};

export default ApiManager;
