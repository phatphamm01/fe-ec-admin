import AxiosService from "@common/utils/axios";

const url = {
  login: "signinAsadmin",
  getUser: "getuserbytoken",
};

const fetchAuth = {
  async login(payload: any) {
    const response = await AxiosService.post(url.login, payload);
    return response;
  },
  async getUser() {
    const response = await AxiosService.get(url.getUser);
    return response;
  },
};

export default fetchAuth;
