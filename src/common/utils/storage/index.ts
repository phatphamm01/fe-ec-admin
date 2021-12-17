import { IUser } from "@redux/types/user";

interface IStorage {
  setUser: (token: string) => void;
}

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const StorageToken: IStorage = {
  setUser: (token) => {
    setToken(token);
  },
};

export default StorageToken;
