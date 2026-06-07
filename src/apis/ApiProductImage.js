import { ApiManager } from "./ApiManager";

const ApiProductImage = {
    createProductImageApi: (data) => ApiManager.post(`/product-image/create`, data),
    getProductImagesByProductIdApi: (productId) => ApiManager.get(`/product-image/byProductId/${productId}`),
    updateProductImageApi: (id, data) => ApiManager.put(`/product-image/update/${id}`, data),
    deleteProductImageApi: (id) => ApiManager.delete(`/product-image/delete/${id}`),
}

export default ApiProductImage;
