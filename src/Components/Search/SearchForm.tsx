import React from "react";
import { useForm } from "react-hook-form";
import {
  CarColor,
  CarOwner,
  CarRegistration,
  CarType,
} from "../../Utils/Helpers/EnumTypes";
import useSearchCar from "../Cars/useSearchCar";
import { useSearchParams } from "react-router-dom";

import CarComponent  from "../Cars/Car";
import { Car } from "../../Models/Car";

type Props = {};
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
type LoginFormsInputs = {
  modelName: string;
  year: number;
  kilometersFrom: number;
  kilometersTo: number;
  priceFrom: number;
  priceTo: number;
  carColor: CarColor;
  carType: CarType;
  carOwner: CarOwner;
  carRegistration: CarRegistration;
};

const SearchForm = (props: Props) => {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<LoginFormsInputs>();
  const [isLoading, cars, error] = useSearchCar();
  const [searchParams, setSearchParams] = useSearchParams();
  const submitHandler = (formValues: LoginFormsInputs) => {
    console.log(formValues);
    const mpa = new Map<string, string | number>();
    Object.keys(formValues).forEach((val, idx) => {
      const key = val as keyof LoginFormsInputs; // Cast to keyof LoginFormsInputs
      const value = formValues[key]; // Access value with proper type
      if (value !== "" && value !== "All") {
        mpa.set(val, value);
      }
    });
    const newSearchParams = new URLSearchParams();
    mpa.forEach((value, key) => {
      newSearchParams.set(key, value.toString()); // Ensure the value is a string
    });

    setSearchParams(newSearchParams);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      SearchForm
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="formField">
          <label htmlFor="modelName">Car Model</label>
          <input
            type="text"
            id="modelName"
            placeholder="model name"
            {...register("modelName")}
          />
        </div>
        <div className="formField">
          <label htmlFor="year">Car Year</label>
          <input type="number" id="year" {...register("year")} />
        </div>
        <div className="formField">
          <label htmlFor="kilometersFrom">Km from</label>
          <input
            type="number"
            id="kilometersFrom"
            {...register("kilometersFrom")}
          />
        </div>
        <div className="formField">
          <label htmlFor="kilometersTo">Km To</label>
          <input
            type="number"
            id="kilometersTo"
            {...register("kilometersTo")}
          />
        </div>
        <div className="formField">
          <label htmlFor="priceFrom">Price from</label>
          <input type="number" id="priceFrom" {...register("priceFrom")} />
        </div>
        <div className="formField">
          <label htmlFor="priceTo">Price To</label>
          <input type="number" id="priceTo" {...register("priceTo")} />
        </div>
        <div className="formField">
          <label htmlFor="carColor">Select Car Color</label>
          <select id="carColor" {...register("carColor")}>
            <option>All</option>
            {optionsCarColors.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carType">Select Car Type</label>
          <select id="carType" {...register("carType")}>
            <option>All</option>
            {optionsCarTypes.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carOwner">Select Car Owner</label>
          <select id="carOwner" {...register("carOwner")}>
            <option>All</option>
            {optionsCarOwner.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="formField">
          <label htmlFor="carRegistration">Select Car Registration</label>

          <select id="carRegistration" {...register("carRegistration")}>
            <option>All</option>
            {optionsCarRegistration.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <button>Search Car</button>
      </form>
      <div>
        {cars?.length === 0 && <p>No Cars found.</p>}
        {cars?.map((car: Car, idx: number) => (
          <CarComponent key={idx} {...car}/>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
