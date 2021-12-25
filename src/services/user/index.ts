import AxiosService from "@common/utils/axios";

const url = {
  getAllUsers: "getlistuser",
  updateRole: "setRole",
};

const fetchUser = {
  async getAllUsers(payload: any) {
    const response = await AxiosService.get(url.getAllUsers, payload);
    return response;
  },
  async updateRole(payload: { userId: string; isAdmin: boolean }) {
    const response = await AxiosService.post(url.updateRole, payload);
    return response;
  },
};

export default fetchUser;
