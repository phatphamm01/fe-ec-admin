import AxiosService from "@common/utils/axios";

const url = {
  signup: "signup",
  login: "login",
  me: "me",
  verify: "verify",
};

const fetchAuth = {
  async signup(payload: any) {
    const response = await AxiosService.post(url.signup, payload);
    return response;
  },
  async login(payload: any) {
    const response = await AxiosService.post(url.login, payload);
    return response;
  },
  async getMe() {
    const response = await AxiosService.get(url.me);
    return response;
  },
  async verify(payload: any) {
    const response = await AxiosService.post(url.verify, payload);
    return response;
  },
};

export default fetchAuth;
