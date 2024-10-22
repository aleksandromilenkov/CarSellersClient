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
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #f8f9fa; /* Light background */
  border-radius: 8px; /* Rounded corners */
  padding: 20px; /* Padding inside the form */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 600px; /* Max width for the form */
  margin: 20px auto; /* Center the form */
`;

const FormTitle = styled.h2`
  text-align: center; /* Center the title */
  color: #333; /* Darker color for the title */
`;

const FormField = styled.div`
  margin-bottom: 15px; /* Space between fields */
`;

const Label = styled.label`
  display: block; /* Label takes full width */
  margin-bottom: 5px; /* Space below label */
  font-weight: bold; /* Bold label */
`;

const Select = styled.select`
  width: 100%; /* Full width */
  padding: 10px; /* Padding inside select */
  border: 1px solid #ccc; /* Border */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Font size */
`;

const Input = styled.input`
  width: 100%; /* Full width */
  padding: 10px; /* Padding inside input */
  border: 1px solid #ccc; /* Border */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Font size */
`;

const ErrorMessage = styled.p`
  color: red; /* Red for error messages */
  font-size: 14px; /* Font size for error messages */
`;

const Button = styled.button`
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  padding: 10px 15px; /* Padding */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  margin-right: 10px; /* Space between buttons */
  transition: background-color 0.3s; /* Smooth transition for hover */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #ccc; /* Disable button background */
    cursor: not-allowed; /* Not allowed cursor */
  }
`;
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
        formData.append("carOwner", CarOwner[carOwnerValue]);
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
        editCar({ carInputs: formData, carId: carID });
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
    <FormContainer>
      <FormTitle>{isEditSession ? "Edit Car" : "Create Car"}</FormTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormField>
          <Label htmlFor="companyID">Select Car Company</Label>
          <Select id="companyID" {...register("companyID")}>
            <option value="">Select Company</option>
            {companies?.map((option: Company, index: number) => (
              <option key={index} value={option.companyID}>
                {option.companyName}
              </option>
            ))}
          </Select>
          {errors.companyID && <ErrorMessage>{errors.companyID.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="manufacturer">Select Manufacturer</Label>
          <Select
            id="manufacturer"
            onChange={handleManufacturerChange}
            defaultValue={isEditSession && alreadySelectedManufacturer.manufacturerID}
          >
            <option value="">Select Manufacturer</option>
            {manufacturers?.map((option: Manufacturer, index: number) => (
              <option key={index} value={option.manufacturerID}>
                {option.manufacturerName}
              </option>
            ))}
          </Select>
        </FormField>

        {/* Conditional rendering for Car Model */}
        {selectedManufacturer && (
          <FormField>
            <Label htmlFor="modelID">Select Car Model</Label>
            <Select
              id="modelID"
              defaultValue={isEditSession && (editingCar as Car)?.carModel?.modelID}
              {...register('modelID', { onChange: handleSelectCarModel })}
            >
              <option value="">Select Car Model</option>
              {selectedCarModels?.map((option, index) => (
                <option key={index} value={option.modelID}>
                  {option.modelName}
                </option>
              ))}
            </Select>
            {errors.modelID && <ErrorMessage>{errors.modelID.message}</ErrorMessage>}
          </FormField>
        )}

        <FormField>
          <Label htmlFor="year">Car Year</Label>
          <Input type="number" id="year" {...register("year")} />
          {errors.year && <ErrorMessage>{errors.year.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="kilometers">Kilometers</Label>
          <Input type="number" id="kilometers" {...register("kilometers")} />
          {errors.kilometers && <ErrorMessage>{errors.kilometers.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" {...register("price")} />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="carImage">Select Car Image</Label>
          <Input type="file" id="carImage" {...register("carImage")} />
          {errors.carImage && <ErrorMessage>{errors.carImage.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="carColor">Select Car Color</Label>
          <div style={{
            backgroundColor: `${selectedCarColor ? selectedCarColor === "other" ? "transparent" : selectedCarColor : "transparent"}`,
            width: '1rem',
            height: "1rem",
            borderRadius: "50%",
            border: "1px solid black"
          }}></div>
          <Select id="carColor" defaultValue="Black" {...register("carColor", { onChange: handleSelectCarColor })}>
            <option value="">Select Color</option>
            {optionsCarColors.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.carColor && <ErrorMessage>{errors.carColor.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="carType">Select Car Type</Label>
          <Select id="carType" defaultValue={CarType[(editingCar as Car)?.carType]} {...register("carType")}>
            <option value="">Select Type</option>
            {optionsCarTypes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.carType && <ErrorMessage>{errors.carType.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="carOwner">Select Car Owner</Label>
          <Select id="carOwner" defaultValue={(editingCar as Car)?.carOwner} {...register("carOwner")}>
            <option value="">Select Owner</option>
            {optionsCarOwner.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.carOwner && <ErrorMessage>{errors.carOwner.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="carRegistration">Select Car Registration</Label>
          <Select id="carRegistration" {...register("carRegistration")} defaultValue={(editingCar as Car)?.carRegistration}>
            <option value="">Select Registration</option>
            {optionsCarRegistration.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          {errors.carRegistration && <ErrorMessage>{errors.carRegistration.message}</ErrorMessage>}
        </FormField>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" disabled={!selectedManufacturer}>{isEditSession ? "Edit Car" : "Create Car"}</Button>
          <Button type="button" onClick={() => {
            onClose && onClose(false);
          }}>Cancel</Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateCarForm;