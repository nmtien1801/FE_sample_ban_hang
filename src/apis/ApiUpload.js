import { ApiManager } from "./ApiManager";

const ApiUpload = {
  UploadFileApi: (formData) => ApiManager.post(`/file/upload`, formData),
  GetFileApi: (imagePath) => {
    return ApiManager.getImageBinary(`/file/getFile?fileName=${imagePath}`);
  },
  uploadApi: () => ApiManager.get(`/file/upload`),
};

export default ApiUpload;
