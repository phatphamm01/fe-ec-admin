import AxiosService from "@common/utils/axios";

const url = {
  getAllPassbooks: "passbook/getallpassbook",
  getAllOfUser: ({ _id }: any) => `passbook/getpassbookbyuser/${_id}`,
  getPassbookById: ({ _id }: any) => `passbook/check/${_id}`,
  checkInformationpassbook: (payload: any) =>
    `passbook/checkInformationpassbook/${payload.passbookid}`,
};

const fetchPassbook = {
  async getAllPassbooks(payload: any) {
    const response = await AxiosService.get(url.getAllPassbooks);
    return response;
  },
  async getAllOfUser(payload: any) {
    const response = await AxiosService.get(url.getAllOfUser(payload));
    return response;
  },
  async getPassbookById(payload: any) {
    const response = await AxiosService.get(url.getPassbookById(payload));
    return response;
  },
  async checkInformationpassbook(payload: { passbookid: string }) {
    const response = await AxiosService.get(
      url.checkInformationpassbook(payload)
    );
    return response;
  },
};

export default fetchPassbook;
