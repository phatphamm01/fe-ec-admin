export interface IPassbook {
  _id?: string;
  optionId?: string;
  userId?: string;
  status?: boolean;
  endAt?: Date;
  createAt?: Date;
  option?: number;
  deposits?: number;
  cyclesupdate?: ICyclesUpdate[];
}

export interface ICyclesUpdate {
  startDate?: Date;
  endDate?: Date;
  value?: number;
}
