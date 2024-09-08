import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CarColor,
  CarOwner,
  CarRegistration,
  CarType,
} from "../../Utils/Helpers/EnumTypes";
import useCompanies from "../Companies/useCompanies";
import useCarModels from "./useCarModels";
import useCreateCar from "./useCreateCar";
import { CreateCarInputs } from "../../Utils/Helpers/Types";
import useManufacturers from "../Manufacturers/useManufacturers";
import { Manufacturer } from "../../Models/Manufacturer";
import { CarModel } from "../../Models/CarModel";
import { Company } from "../../Models/Company";

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const optionsCarColors = Object.values(CarColor).filter(
  (value) => isNaN(Number(value)) === true
);
const optionsCarTypes = Object.values(CarType).filter(
  (value) => isNaN(Number(value)) === true
);
const optionsCarOwner = Object.values(CarOwner).filter(
  (value) => isNaN(Number(value)) === true
);
const optionsCarRegistration = Object.values(CarRegistration).filter(
  (value) => isNaN(Number(value)) === true
);

const CreateCarForm = ({ onClose }: Props) => {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<CreateCarInputs>();
  const [isLoadingCompanies, companies, error] = useCompanies();
  const [isLoadingManufacturers, manufacturers, error3] = useManufacturers();
  const [isLoadingCarModels, carModels, error2] = useCarModels();
  const { isLoading, createCar } = useCreateCar();

  const [selectedCarModels, setSelectedCarModels] = useState<CarModel[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);

  const determineTheSelectedCarModels = (manufacturerId: number) => {
    const newCarModels = carModels.filter((cm: CarModel) => cm.manufacturerID === manufacturerId);
    setSelectedCarModels(newCarModels);
  };

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const manufacturerId = parseInt(event.target.value);
    setSelectedManufacturer(manufacturerId);
    determineTheSelectedCarModels(manufacturerId);
  };

  const submitHandler = (formValues: CreateCarInputs) => {
    console.log(formValues);
      // Filter out fields that are empty or not selected
      const filteredValues = {
        ...formValues,
        carOwner: formValues.carOwner === "" ? undefined : formValues.carOwner,
        // Add more fields if needed
      };
    createCar(filteredValues);
  };

  if (isLoading || isLoadingCompanies || isLoadingManufacturers || isLoadingCarModels)
    return <div>Loading...</div>;
  if (error || error2 || error3)
    return <div>Error: {error.message || error2.message || error3.message}</div>;

  return (
    <div>
      <h2>Create Car Form</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="formField">
          <label htmlFor="companyID">Select Car Company</label>
          <select id="companyID" {...register("companyID")}>
            <option value="">All</option>
            {companies?.map((option: Company, index: number) => (
              <option key={index} value={option.companyID}>
                {option.companyName}
              </option>
            ))}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="manufacturer">Select Manufacturer</label>
          <select id="manufacturer" onChange={handleManufacturerChange}>
            <option value="">Select Manufacturer</option>
            {manufacturers?.map((option: Manufacturer, index: number) => (
              <option key={index} value={option.manufacturerID}>
                {option.manufacturerName}
              </option>
            ))}
          </select>
        </div>
        {selectedManufacturer && <div className="formField">
          <label htmlFor="modelID">Select Car Model</label>
          <select id="modelID" {...register("modelID")}>
            {selectedCarModels?.map((option: CarModel, index: number) => (
              <option key={index} value={option.modelID}>
                {option.modelName}
              </option>
            ))}
          </select>
        </div>
        }
        <div className="formField">
          <label htmlFor="year">Car Year</label>
          <input type="number" id="year" {...register("year")} />
        </div>
        <div className="formField">
          <label htmlFor="kilometers">Kilometers</label>
          <input
            type="number"
            id="kilometers"
            {...register("kilometers")}
          />
        </div>
        <div className="formField">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" {...register("price")} />
        </div>
        <div className="formField">
          <label htmlFor="carColor">Select Car Color</label>
          <select id="carColor" {...register("carColor")}>
            <option value="">All</option>
            {optionsCarColors.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carType">Select Car Type</label>
          <select id="carType" {...register("carType")}>
            <option value="">All</option>
            {optionsCarTypes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carOwner">Select Car Owner</label>
          <select id="carOwner" {...register("carOwner")}>
            <option value="">All</option>
            {optionsCarOwner.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carRegistration">Select Car Registration</label>
          <select id="carRegistration" {...register("carRegistration")}>
            <option value="">All</option>
            {optionsCarRegistration.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Car</button>
        <button type="button" onClick={() => onClose(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCarForm;
