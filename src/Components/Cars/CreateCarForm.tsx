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

// Define form validation functions
const validateYear = (year: number) => year >= 1900;
const validatePositiveNumber = (value: number) => value > 0;

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
  const { register, formState: { errors }, handleSubmit, setError, clearErrors } =
    useForm<CreateCarInputs>();

  const [isLoadingCompanies, companies, error] = useCompanies();
  const [isLoadingManufacturers, manufacturers, error3] = useManufacturers();
  const [isLoadingCarModels, carModels, error2] = useCarModels();
  const { isLoading, createCar } = useCreateCar();

  const [selectedCarModels, setSelectedCarModels] = useState<CarModel[]>([]);
  const [selectedCarModel, setSelectedCarModel] = useState<number | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);
  const [isSelectedManufacturer, setIsSelectedManufacturer] = useState<boolean>(true);

  const determineTheSelectedCarModels = (manufacturerId: number) => {
    const newCarModels = carModels.filter((cm: CarModel) => cm.manufacturerID === manufacturerId);
    setSelectedCarModels(newCarModels);
  };

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const manufacturerId = parseInt(event.target.value);
    setSelectedManufacturer(manufacturerId);
    determineTheSelectedCarModels(manufacturerId);
    if(+event.target.value){
      setIsSelectedManufacturer(true);
    }else {
      setIsSelectedManufacturer(false);
      setSelectedCarModel(null);
    }
  };
 const handleSelectCarModel = (event: React.ChangeEvent<HTMLSelectElement>)=>{
  if(!event.target.value){
    setSelectedCarModel(null);
  }else{
    setSelectedCarModel(+event.target.value);
  }
 }
  const validateForm = (data: CreateCarInputs) => {
    let isValid = true;

    if (!data.companyID) {
      setError("companyID", { type: "manual", message: "Company is required" });
      isValid = false;
    } else {
      clearErrors("companyID");
    }

    if(!selectedManufacturer){
     setIsSelectedManufacturer(false);
    }else{
      setIsSelectedManufacturer(true);
    }

    if (!selectedCarModel) {
      setError("modelID", { type: "manual", message: "Car model is required" });
      isValid = false;
    } else {
      clearErrors("modelID");
    }

    if (!validateYear(data.year)) {
      if(!data.year){
        setError("year", { type: "manual", message: "Year is required" });
      }else{
        setError("year", { type: "manual", message: "Year must be later than 1900" });
      }
      isValid = false;
    } else {
      clearErrors("year");
    }

    if (!validatePositiveNumber(data.kilometers)) {
      if(!data.kilometers){
        setError("kilometers", { type: "manual", message: "Kilometers are required" });
      }else{

        setError("kilometers", { type: "manual", message: "Kilometers must be positive" });
      }
      isValid = false;
    } else {
      clearErrors("kilometers");
    }

    if (!validatePositiveNumber(data.price)) {
      if(!data.price){
        setError("price", { type: "manual", message: "Price is required" });
      }else{

        setError("price", { type: "manual", message: "Price must be positive" });
      }
      isValid = false;
    } else {
      clearErrors("price");
    }

    if (data.carColor && !optionsCarColors.includes(data.carColor)) {
      setError("carColor", { type: "manual", message: "Invalid color" });
      isValid = false;
    } else {
      clearErrors("carColor");
    }

    if (data.carType && !optionsCarTypes.includes(data.carType)) {
      setError("carType", { type: "manual", message: "Invalid type" });
      isValid = false;
    } else {
      clearErrors("carType");
    }

    if (data.carOwner && !optionsCarOwner.includes(data.carOwner)) {
      setError("carOwner", { type: "manual", message: "Invalid owner" });
      isValid = false;
    } else {
      clearErrors("carOwner");
    }

    if (data.carRegistration && !optionsCarRegistration.includes(data.carRegistration)) {
      setError("carRegistration", { type: "manual", message: "Invalid registration" });
      isValid = false;
    } else {
      clearErrors("carRegistration");
    }

    return isValid;
  };

  const submitHandler = (formValues: CreateCarInputs) => {
    if (validateForm(formValues)) {
      // Filter out fields that are empty or not selected
      const filteredValues = {
        ...formValues,
        carOwner: formValues.carOwner === "" ? undefined : formValues.carOwner,
        carColor: formValues.carColor === "" ? undefined : formValues.carColor,
        carRegistration: formValues.carRegistration === "" ? undefined : formValues.carRegistration,
        carType: formValues.carType === "" ? undefined : formValues.carType,
      };
      createCar(filteredValues);
    }
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
            <option value="">Select Company</option>
            {companies?.map((option: Company, index: number) => (
              <option key={index} value={option.companyID}>
                {option.companyName}
              </option>
            ))}
          </select>
          {errors.companyID && <p>{errors.companyID.message}</p>}
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
          {!isSelectedManufacturer && <p>Please select Manufacturer</p>}
        </div>
        {!selectedManufacturer ? "" : <div className="formField">
          <label htmlFor="modelID">Select Car Model</label>
          <select id="modelID"{...register('modelID', {
    onChange: handleSelectCarModel
  })}>
    <option value={""}>Select Car Model</option>
            {selectedCarModels?.map((option: CarModel, index: number) => (
              <option key={index} value={option.modelID}>
                {option.modelName}
              </option>
            ))}
          </select>
        </div>}
          {errors.modelID && <p>{errors.modelID.message}</p>}
        <div className="formField">
          <label htmlFor="year">Car Year</label>
          <input type="number" id="year" {...register("year")} />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="kilometers">Kilometers</label>
          <input
            type="number"
            id="kilometers"
            {...register("kilometers")}
          />
          {errors.kilometers && <p>{errors.kilometers.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" {...register("price")} />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carColor">Select Car Color</label>
          <select id="carColor" {...register("carColor")}>
            <option value="">Select Color</option>
            {optionsCarColors.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.carColor && <p>{errors.carColor.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carType">Select Car Type</label>
          <select id="carType" {...register("carType")}>
            <option value="">Select Type</option>
            {optionsCarTypes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.carType && <p>{errors.carType.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carOwner">Select Car Owner</label>
          <select id="carOwner" {...register("carOwner")}>
            <option value="">Select Owner</option>
            {optionsCarOwner.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.carOwner && <p>{errors.carOwner.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carRegistration">Select Car Registration</label>
          <select id="carRegistration" {...register("carRegistration")}>
            <option value="">Select Registration</option>
            {optionsCarRegistration.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.carRegistration && <p>{errors.carRegistration.message}</p>}
        </div>
        <button type="submit" disabled={!isSelectedManufacturer}>Create Car</button>
        <button type="button" onClick={() => onClose(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCarForm;
