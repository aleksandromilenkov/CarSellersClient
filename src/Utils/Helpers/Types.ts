import { Car } from "../../Models/Car";
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