import AxiosService from "@common/utils/axios";

const url = {
  getCurrentOptions: (payload: any) => "option/getcurrentoption",
  getOptionsByTime: (payload: any) =>
    `option/getoptionbydatetime/${payload.date}-${payload.month}-${payload.year}`,
  editOption: (payload: any) => `option/updateOption/${payload.id}`,
  addOption: (payload: any) => "option/saveOption",
};

const fetchOption = {
  async getCurrentOptions(payload: any) {
    const response = await AxiosService.get(url.getCurrentOptions(payload));
    return response;
  },
  async getOptionsByTime(payload: any) {
    const response = await AxiosService.get(url.getOptionsByTime(payload));
    return response;
  },
  async editOption(payload: any) {
    const response = await AxiosService.put(url.editOption(payload), payload);
    return response;
  },
  async addOption(payload: any) {
    const response = await AxiosService.post(url.addOption(payload), payload);
    return response;
  },
};

export default fetchOption;
