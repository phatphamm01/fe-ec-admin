import AxiosService from "@common/utils/axios";

const url = {
  login: "signinAsadmin",
};

const fetchAuth = {
  async login(payload: any) {
    const response = await AxiosService.post(url.login, payload);
    return response;
  },
};

export default fetchAuth;
