import { Car } from "./Car";
import { Manufacturer } from "./Manufacturer";

export type CarModel = {
    modelID: number;
    manufacturerID: number;
    modelName: string;
    manufacturer:Manufacturer;
    cars:Car[];
  };