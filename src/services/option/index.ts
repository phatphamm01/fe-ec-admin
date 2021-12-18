import AxiosService from "@common/utils/axios";

const url = {
  getCurrentOptions: (payload: any) => "option/getcurrentoption",
  getOptionsByTime: (date: any) =>
    `option/${date.getDate}-${date.getMonth}-${date.getFullYear}`,
  editOption: (_id: any) => `option/updateOption/${_id}`,
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
    const response = await AxiosService.put(
      url.editOption(payload),
      payload.data
    );
    return response;
  },
  async addOption(payload: any) {
    const response = await AxiosService.post(
      url.addOption(payload),
      payload.data
    );
    return response;
  },
};

export default fetchOption;
