import { CarColor, CarOwner, CarRegistration, CarType } from "../Utils/Helpers/EnumTypes";
import { CarCompany } from "../Utils/Helpers/Types";

export type CarPost = {
  year: number;
  content: string;
};

export type CarGet = {
  year: number;
  km: number;
  price: number;
};

export type Car = {
  carOwner: CarOwner;
  carRegistration: CarRegistration;
  carType: CarType;
  carColor: CarColor;
  carID: number;
  carSellerCompany: CarCompany;
  carModel: any;
  kilometers: number;
  price: number;
  year: number;
};