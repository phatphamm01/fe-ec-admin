export type IOptions = Array<IOption>;

export interface IOption {
  _id?: string;
  value?: number;
  option?: number;
  createAt?: Date;
}

export interface IHistory {
  createAt?: Date;
  value?: number;
}
