import { ApiManager } from "./ApiManager";

const ApiProductCategory = {
    getCategoriesByProduct: (productId) => ApiManager.get(`/product-category/byProduct/${productId}`),
    getProductsByCategory: (categoryId) => ApiManager.get(`/product-category/byCategory/${categoryId}`),
    addProductCategory: (data) => ApiManager.post(`/product-category/add`, data),
    removeProductCategory: (data) => ApiManager.post(`/product-category/remove`, data),
}

export default ApiProductCategory;
