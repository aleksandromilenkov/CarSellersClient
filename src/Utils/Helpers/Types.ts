import { Car } from "../../Models/Car";
import { CLAIM_TYPES } from "./constants";
import { CarColor, CarOwner, CarRegistration, CarType } from "./EnumTypes";



export type CarCompany ={
  companyID:number;
  companyName:string;
  address:string;
  telephoneNumber:string;
  companyImage:string | null;
  cars: Car[];
}

export type UserUpdateReturnDTO = {
  username:string;
  email:string;
}

export type UpdateUserInfo ={
  username: string | null;
  email: string|null;
  currentPassword: string|null;
  newPassword:string|null
}
export interface JwtPayloadInterface {
  email:string,
  name:string,
  nameId: string,
  role:string[]
}

export type ForgotPasswordInputs = {
  email:string;
}

export type ResetPasswordInputs = {
  password:string;
}

export type CreateCarInputs = {
  companyID: number;
  modelID: number;
  year: number;
  kilometers: number;
  price: number;
  carImage?: File | null;
  carColor?: CarColor | string;  // Optional and can be enum or string
  carType?: CarType | string;    // Optional and can be enum or string
  carOwner?: CarOwner | string;  // Optional and can be enum or string
  carRegistration?: CarRegistration | string; // Optional and can be enum or string
};

export type CreateCarModelInputs = {
  manufacturerID: number;
  modelName:string;
}

export type CreateManufacturerInputs = {
  manufacturerName: string;
  country:string;
}

export type CreateCompanyInputs = {
  companyName: string;
  address:string;
  telephoneNumber?:string;
  companyImage?: File | null;
}