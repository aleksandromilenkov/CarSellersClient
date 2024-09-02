import { Car } from "./Car";

export type Company = {
    companyID: number;
    companyName: string;
    companyAddress: string;
    companyCars: Car[];
  };