import { ApiManager } from "./ApiManager";

const ApiPost = {
    getListPostApi: (page, limit) => ApiManager.get(`/post/list?page=${page}&limit=${limit}`),
    getPostByIdApi: (id) => ApiManager.get(`/post/byPostId/${id}`),
    createPostApi: (data) => ApiManager.post(`/post/create`, data),
    updatePostApi: (id, data) => ApiManager.put(`/post/update/${id}`, data),
    deletePostApi: (id) => ApiManager.delete(`/post/delete/${id}`),
    getListPostDropdownApi: () => ApiManager.get(`/post/dropdown`),
}

export default ApiPost;
