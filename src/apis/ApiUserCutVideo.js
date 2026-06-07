import { ApiManager } from "./ApiManager";

const ApiUserCutVideo = {
  loginApi: (email, password) =>
    ApiManager.post(`/user-cut-video/login`, { email, password }),
  getListApi: (page, limit, keyword = "") =>
    ApiManager.get(
      `/user-cut-video/list?page=${page}&limit=${limit}&keyword=${keyword}`,
    ),
  createUserApi: (data) => ApiManager.post(`/user-cut-video/create`, data),
  updateUserApi: (id, data) =>
    ApiManager.put(`/user-cut-video/update/${id}`, data),
  deleteUserApi: (id) => ApiManager.delete(`/user-cut-video/delete/${id}`),
};

export default ApiUserCutVideo;
