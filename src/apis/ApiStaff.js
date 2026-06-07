import { ApiManager } from "./ApiManager";

const ApiStaff = {
    getListStaffApi: () => ApiManager.get(`/staff/list`),
}

export default ApiStaff;
