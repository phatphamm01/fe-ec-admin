import AxiosService from "@common/utils/axios";

const url = {
  dashboard: "dashboard",
};

const fetchDashboard = {
  async dashboard() {
    const response = await AxiosService.get(url.dashboard);
    return response;
  },
};

export default fetchDashboard;
