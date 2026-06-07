import { ApiManager } from "./ApiManager";

const ApiContact = {
  sendContactApi: (data) => ApiManager.post(`/contact/send`, data),
  applyCVApi: (data) => ApiManager.post(`/contact/apply`, data),
};

export default ApiContact;