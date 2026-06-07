import { ApiManager } from "./ApiManager";

const ApiRecruitment = {
    getListRecruitmentApi: (page, limit) => ApiManager.get(`/recruitment/list?page=${page}&limit=${limit}`),
    getRecruitmentByIdApi: (id) => ApiManager.get(`/recruitment/byRecruitmentId/${id}`),
    createRecruitmentApi: (data) => ApiManager.post(`/recruitment/create`, data),
    updateRecruitmentApi: (id, data) => ApiManager.put(`/recruitment/update/${id}`, data),
    deleteRecruitmentApi: (id) => ApiManager.delete(`/recruitment/delete/${id}`),
    getListRecruitmentDropdownApi: () => ApiManager.get(`/recruitment/dropdown`),
}

export default ApiRecruitment;
