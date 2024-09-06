import { Car } from "../../Models/Car";
import { CLAIM_TYPES } from "./constants";
import { CarColor, CarOwner, CarRegistration, CarType } from "./EnumTypes";



export type CarCompany ={
  companyID:number;
  companyName:string;
  address:string;
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