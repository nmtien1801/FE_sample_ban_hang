import { ApiManager } from "./ApiManager";

const ApiProduct = {
    getListProductApi: (page, limit, keyword = "") => ApiManager.get(`/product/list?page=${page}&limit=${limit}&keyword=${keyword}`),
    getProductByIdApi: (id) => ApiManager.get(`/product/byProductId/${id}`),
    createProductApi: (data) => ApiManager.post(`/product/create`, data),
    updateProductApi: (id, data) => ApiManager.put(`/product/update/${id}`, data),
    deleteProductApi: (id) => ApiManager.delete(`/product/delete/${id}`),
    getListProductDropdownApi: () => ApiManager.get(`/product/dropdown`),
    filterProductApi: (page, limit, categoryId, priceProduct) => ApiManager.get(`/product/filter?page=${page}&limit=${limit}&categoryId=${categoryId}&priceProduct=${priceProduct}`),
};

export default ApiProduct;