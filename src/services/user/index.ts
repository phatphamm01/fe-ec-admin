import AxiosService from "@common/utils/axios";

const url = {
  getAllUsers: "getlistuser",
};

const fetchUser = {
  async getAllUsers(payload: any) {
    const response = await AxiosService.post(url.getAllUsers, payload);
    return response;
  },
};

export default fetchUser;
