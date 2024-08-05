import { CarColor, CarOwner, CarRegistration, CarType } from "./EnumTypes";

export type Car = {
  carOwner: CarOwner;
  carRegistration: CarRegistration;
  carType: CarType;
  carColor: CarColor;
  carID: number;
  carSellerCompany: any;
  carModel: any;
  kilometers: number;
  price: number;
  year: number;
};
