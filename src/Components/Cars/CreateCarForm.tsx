import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CarColor,
  CarOwner,
  CarRegistration,
  CarType,
} from "../../Utils/Helpers/EnumTypes";
import useCompanies from "../Companies/useCompanies";
import useCarModels from "../CarModels/useCarModels";
import useCreateCar from "./useCreateCar";
import { CreateCarInputs } from "../../Utils/Helpers/Types";
import useManufacturers from "../Manufacturers/useManufacturers";
import { Manufacturer } from "../../Models/Manufacturer";
import { CarModel } from "../../Models/CarModel";
import { Company } from "../../Models/Company";
import useEditCar from "./useEditCar";
import { Car } from "../../Models/Car";
import { useMemo } from "react";

// Define form validation functions
const validateYear = (year: number) => year >= 1900;
const validatePositiveNumber = (value: number) => value > 0;

type Props = {
  onClose?: Dispatch<SetStateAction<boolean>>;
  editingCar?: Car | {};
  isEditSession?:boolean;
  onCloseModal?: () => void;
};

const optionsCarColors = Object.keys(CarColor).filter((value) =>
  isNaN(Number(value))
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

const CreateCarForm = ({ onClose, editingCar={}, isEditSession, onCloseModal }: Props) => {
  const editingCarModel = isEditSession ? editingCar as Car : {};
  const { register, formState: { errors }, handleSubmit, setError, clearErrors, reset } =
    useForm<CreateCarInputs>({
      defaultValues: isEditSession ? editingCarModel : {}
    });
    console.log(editingCar)
    const [isLoadingCompanies, companies, error] = useCompanies();
    const [isLoadingManufacturers, manufacturers, error3] = useManufacturers();
    const [isLoadingCarModels, carModels, error2] = useCarModels();
    const { isLoading: isLoadingEditCar, editCar } = useEditCar();
    const { isLoading, createCar } = useCreateCar();
  
    const [selectedCarModels, setSelectedCarModels] = useState<CarModel[]>([]);
    const [selectedCarModel, setSelectedCarModel] = useState<number | null>(
      (editingCarModel as Car)?.carModel?.modelID || null
    );
    const [selectedCarColor, setSelectedCarColor] = useState<string | null>(
      (editingCarModel as Car)?.carColor?.toString() || null
    );
  
    const alreadySelectedManufacturer = useMemo(() => {
      return isEditSession && manufacturers?.length
        ? manufacturers.find(
            (m: Manufacturer) =>
              m.manufacturerID ===  (editingCarModel as Car)?.carModel?.manufacturerID
          )?.manufacturerID || null
        : null;
    }, [isEditSession, manufacturers, editingCar]);

    const alreadySelectedCarColor = useMemo(()=>{
      if(isEditSession)
          return CarColor[(editingCarModel as Car)?.carColor].toString().toLowerCase();
       return null;
    },[isEditSession, editingCarModel])
  
    const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(alreadySelectedManufacturer);
    const [isSelectedManufacturer, setIsSelectedManufacturer] = useState<boolean>(true);
  

  useEffect(()=>{
    console.log(alreadySelectedManufacturer)
    if(alreadySelectedManufacturer){
      determineTheSelectedCarModels(alreadySelectedManufacturer)
    }
    if(alreadySelectedCarColor){
      setSelectedCarColor(alreadySelectedCarColor)
    }
  },[alreadySelectedManufacturer,carModels])

  const determineTheSelectedCarModels = (manufacturerId: number) => {
    const newCarModels = carModels?.filter(
      (cm: CarModel) => cm.manufacturerID === manufacturerId
    );
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

 const handleSelectCarColor = (event: React.ChangeEvent<HTMLSelectElement>)=>{
  setSelectedCarColor(event.target.value.toLowerCase());
 }

  const validateForm = (data: CreateCarInputs) => {
    let isValid = true;
    console.log(data)
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

    // if (data.carColor && !optionsCarColors.includes(data.carColor)) {
    //   setError("carColor", { type: "manual", message: "Invalid color" });
    //   isValid = false;
    // } else {
    //   clearErrors("carColor");
    // }

    // if (data.carType && !optionsCarTypes.includes(data.carType)) {
    //   setError("carType", { type: "manual", message: "Invalid type" });
    //   isValid = false;
    // } else {
    //   clearErrors("carType");
    // }

    // if (data.carOwner && !optionsCarOwner.includes(data.carOwner)) {
    //   setError("carOwner", { type: "manual", message: "Invalid owner" });
    //   isValid = false;
    // } else {
    //   clearErrors("carOwner");
    // }

    // if (data.carRegistration && !optionsCarRegistration.includes(data.carRegistration)) {
    //   setError("carRegistration", { type: "manual", message: "Invalid registration" });
    //   isValid = false;
    // } else {
    //   clearErrors("carRegistration");
    // }

    return isValid;
  };

  const submitHandler = (formValues: CreateCarInputs) => {
    console.log(formValues);
    if (validateForm(formValues)) {
      console.log("E")
      const filteredValues = {
        ...formValues,
        carOwner: formValues.carOwner === "" ? undefined : formValues.carOwner,
        carColor: formValues.carColor === "" ? undefined : formValues.carColor,
        carRegistration: formValues.carRegistration === "" ? undefined : formValues.carRegistration,
        carType: formValues.carType === "" ? undefined : formValues.carType,
      };
      console.log(filteredValues);
      const formData = new FormData();
      formData.append("companyID", formValues.companyID.toString());
      formData.append("modelID", formValues.modelID.toString());
      formData.append("year", formValues.year.toString());
      formData.append("kilometers", formValues.kilometers.toString());
      formData.append("price", formValues.price.toString());
      if (formValues.carImage instanceof FileList && formValues.carImage.length > 0) {
        const carImageFile = formValues.carImage[0]; // Get the first file from the FileList
        formData.append("carImage", carImageFile); // Append the file
      }
      if(formValues?.carColor){
        const carColorValue = filteredValues.carColor as CarColor;
        formData.append("carColor", CarColor[carColorValue]);
      }
      if(formValues?.carOwner){
        const carOwnerValue = filteredValues.carOwner as CarOwner;
        formData.append("carOwner", CarColor[carOwnerValue]);
      }
      if(formValues?.carType){
        const carTypeValue = filteredValues.carType as CarType;
        formData.append("carType", CarType[carTypeValue]);
      }
      if(formValues?.carRegistration){
        const carRegistrationValue = filteredValues.carRegistration as CarRegistration;
        formData.append("carRegistration", CarRegistration[carRegistrationValue]);
      }
      if (isEditSession && (editingCarModel as Car).carID) {
        const carID = (editingCarModel as Car).carID;
        editCar({ carInputs: filteredValues, carId: carID });
        onCloseModal && onCloseModal();
        
      } else {
        createCar(formData);
        setSelectedCarColor("transparent");
        reset()
        onCloseModal && onCloseModal();
      }
    }
  };
  
  if (isLoading || isLoadingCompanies || isLoadingManufacturers || isLoadingCarModels || isLoadingEditCar)
    return <div>Loading...</div>;
  if (error || error2 || error3)
    return <div>Error: {error.message || error2.message || error3.message}</div>;

  return (
    <div>
      <h2>{isEditSession ? "Edit Car" : "Create Car"}</h2>
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
          <select id="manufacturer" onChange={handleManufacturerChange} defaultValue={isEditSession && alreadySelectedManufacturer.manufacturerID}>
            <option value="">Select Manufacturer</option>
            {manufacturers?.map((option: Manufacturer, index: number) => (
              <option key={index} value={option.manufacturerID} selected = {option.manufacturerID === alreadySelectedManufacturer}>
                {option.manufacturerName}
              </option>
            ))}
          </select>
          {!isSelectedManufacturer && <p>Please select Manufacturer</p>}
        </div>
        {!selectedManufacturer ? "" : <div className="formField">
          <label htmlFor="modelID">Select Car Model</label>
          <select id="modelID" defaultValue={isEditSession && (editingCar as Car)?.carModel?.modelID} {...register('modelID', {
    onChange: handleSelectCarModel
  })}>
    <option value={""}>Select Car Model</option>
            {selectedCarModels?.map((option: CarModel, index: number) => (
              <option key={index} value={option.modelID} selected = {isEditSession && option.modelID === (editingCar as Car)?.carModel.modelID}>
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
          <label htmlFor="carImage">Select Car Image</label>
          <input type="file" id="carImage" {...register("carImage")} />
          {errors.carImage && <p>{errors.carImage.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carColor">Select Car Color</label>
          <div style={{backgroundColor:`${selectedCarColor ? selectedCarColor === "other" ? "transparent" : selectedCarColor  : "transparent"}`, width:'1rem', height:"1rem", borderRadius:"50%", border:"1px solid black" }}></div>
          <select id="carColor" defaultValue={"Black"}  {...register("carColor", {onChange:handleSelectCarColor})}>
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
          <select id="carType" defaultValue={CarType[(editingCar as Car)?.carType]} {...register("carType")} >
            <option value="">Select Type</option>
            {optionsCarTypes.map((option, index) => (
              <option key={index} value={option} >
                {option}
              </option>
            ))}
          </select>
          {errors.carType && <p>{errors.carType.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="carOwner">Select Car Owner</label>
          <select id="carOwner" defaultValue={(editingCar as Car)?.carOwner} {...register("carOwner")} >
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
          <select id="carRegistration" {...register("carRegistration")} defaultValue={(editingCar as Car)?.carRegistration}>
            <option value="">Select Registration</option>
            {optionsCarRegistration.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.carRegistration && <p>{errors.carRegistration.message}</p>}
        </div>
        <button type="submit" disabled={!isSelectedManufacturer}>{isEditSession ? "Edit Car" : "Create Car"}</button>
        <button type="button" onClick={() =>{
          onClose && onClose(false);
          onCloseModal && onCloseModal();
        } 
        }>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCarForm;
