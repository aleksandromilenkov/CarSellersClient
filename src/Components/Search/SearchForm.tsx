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
import styled from 'styled-components';
import { CarModel } from "../../Models/CarModel";
import { Car } from "../../Models/Car";
import CarsSearchResults from "../Cars/CarsSearchResults";

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Limit the width */
  margin: 0 auto; /* Center the form */
  padding: 20px;
  background-color: #f9f9f9; /* Light background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column; /* Stack fields vertically */
`;

const FormField = styled.div`
  margin-bottom: 15px; /* Space between fields */

  label {
    display: block; /* Block label */
    margin-bottom: 5px; /* Space below label */
    font-weight: bold; /* Bold label */
  }

  input,
  select {
    width: 100%; /* Full width */
    padding: 10px; /* Padding inside fields */
    border: 1px solid #ccc; /* Border color */
    border-radius: 4px; /* Rounded corners */
    font-size: 16px; /* Font size */
    transition: border-color 0.3s; /* Smooth transition for focus */
  }

  input:focus,
  select:focus {
    border-color: #007bff; /* Change border color on focus */
    outline: none; /* Remove default outline */
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px; /* Padding inside button */
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.3s; /* Smooth transition for hover */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const NoCarsMessage = styled.p`
  text-align: center; /* Center the message */
  color: #666; /* Lighter color */
`;
const OutputedCars = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:0.5rem;
`

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
type SearchCarFormInputs = {
  manufacturerName:string;
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
    useForm<SearchCarFormInputs>();
  const [searchParams, setSearchParams] = useSearchParams();

  const submitHandler = (formValues: SearchCarFormInputs) => {
    console.log(formValues);
    const mpa = new Map<string, string | number>();
    Object.keys(formValues).forEach((val, idx) => {
      const key = val as keyof SearchCarFormInputs; // Cast to keyof SearchCarFormInputs
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

  return (
    <FormContainer>
    <h2>Search Form</h2>
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormField>
        <label htmlFor="manufacturerName">Car Manufacturer</label>
        <input
          type="text"
          id="manufacturerName"
          placeholder="Manufacturer name"
          {...register("manufacturerName")}
        />
      </FormField>

      <FormField>
        <label htmlFor="modelName">Car Model</label>
        <input
          type="text"
          id="modelName"
          placeholder="Model name"
          {...register("modelName")}
        />
      </FormField>

      <FormField>
        <label htmlFor="year">Car Year</label>
        <input type="number" id="year" {...register("year")} />
      </FormField>

      <FormField>
        <label htmlFor="kilometersFrom">Km from</label>
        <input
          type="number"
          id="kilometersFrom"
          {...register("kilometersFrom")}
        />
      </FormField>

      <FormField>
        <label htmlFor="kilometersTo">Km To</label>
        <input
          type="number"
          id="kilometersTo"
          {...register("kilometersTo")}
        />
      </FormField>

      <FormField>
        <label htmlFor="priceFrom">Price from</label>
        <input type="number" id="priceFrom" {...register("priceFrom")} />
      </FormField>

      <FormField>
        <label htmlFor="priceTo">Price To</label>
        <input type="number" id="priceTo" {...register("priceTo")} />
      </FormField>

      <FormField>
        <label htmlFor="carColor">Select Car Color</label>
        <select id="carColor" {...register("carColor")}>
          <option>All</option>
          {optionsCarColors.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField>
        <label htmlFor="carType">Select Car Type</label>
        <select id="carType" {...register("carType")}>
          <option>All</option>
          {optionsCarTypes.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField>
        <label htmlFor="carOwner">Select Car Owner</label>
        <select id="carOwner" {...register("carOwner")}>
          <option>All</option>
          {optionsCarOwner.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </FormField>

      <FormField>
        <label htmlFor="carRegistration">Select Car Registration</label>
        <select id="carRegistration" {...register("carRegistration")}>
          <option>All</option>
          {optionsCarRegistration.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </FormField>

      <SearchButton type="submit">Search Car</SearchButton>
    </Form>
  </FormContainer>
      );
    };
export default SearchForm;
