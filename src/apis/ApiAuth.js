import { ApiManager } from "./ApiManager";

const ApiAuth = {
  LoginApi: (data) => ApiManager.post(`/auth/login`, data),
  RegisterApi: (data) => ApiManager.post(`/auth/register`, data),
  GetAccountApi: () => ApiManager.get(`/auth/account`),

  ChangePasswordApi: (data) => ApiManager.post(`/auth/change-password`, data),
  UpdateProfileApi: (data) => ApiManager.put(`/auth/update-profile`, data),

  getListUserApi: (page, limit) => ApiManager.get(`/auth/getListUser?page=${page}&limit=${limit}`),
  createUserApi: (data) => ApiManager.post(`/auth/create-user`, data),
  updateUserApi: (id, data) => ApiManager.put(`/auth/update-user/${id}`, data),
  deleteUserApi: (id) => ApiManager.delete(`/auth/delete-user/${id}`),
};

export default ApiAuth;
