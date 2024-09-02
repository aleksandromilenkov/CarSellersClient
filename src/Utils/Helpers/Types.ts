import { Car } from "../../Models/Car";
import { CarColor, CarOwner, CarRegistration, CarType } from "./EnumTypes";



export type CarCompany ={
  companyID:number;
  companyName:string;
  address:string;
  cars: Car[];
}