import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useManufacturers from "../Manufacturers/useManufacturers";
import { CreateCarModelInputs, CreateManufacturerInputs } from "../../Utils/Helpers/Types";;
import { Manufacturer } from "../../Models/Manufacturer";
import useCreateManufacturer from "./useCreateManufacturer";
import { FormContainer } from "../../UI/FormContainer";
import { FormTitle } from "../../UI/FormTitle";
import { FormField } from "../../UI/FormField";
import { Label } from "../../UI/Label";
import { Select } from "../../UI/Select";
import { Input } from "../../UI/Input";
import { ErrorMessage } from "../../UI/ErrorMessage";
import styled from "styled-components";
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
`;
// Define Yup validation schema
const schema = yup.object({
  manufacturerName: yup.string().required('Manufacturer Name is required').min(2, 'Manufacturer Name must be at least 2 characters').max(50, 'Manufacturer Name cannot exceed 50 characters'),
  country: yup.string().required('Country Name is required').min(2, 'Country Name must be at least 2 characters').max(50, 'Model Name cannot exceed 50 characters')
}).required();

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const CreateManufacterForm = ({ onClose }: Props) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateManufacturerInputs>({
    resolver: yupResolver(schema)
  });

  const { createManufacturer, isLoading, error } = useCreateManufacturer();

  const submitHandler: SubmitHandler<CreateManufacturerInputs> = (formValues) => {
    createManufacturer(formValues);
reset();
  };

  if (isLoading) return <p>Loading...</p>;
  
  return (
    <FormContainer>
    <FormTitle>Create Manufacturer Form</FormTitle>
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormField>
        <Label htmlFor="manufacturerName">Manufacturer Name</Label>
        <Input type="text" id="manufacturerName" {...register("manufacturerName")} />
        {errors.manufacturerName && <ErrorMessage>{errors.manufacturerName.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <Label htmlFor="country">Country</Label>
        <Input type="text" id="country" {...register("country")} />
        {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
      </FormField>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit">Create Manufacturer</Button>
        <Button type="button" onClick={() => onClose(false)}>Cancel</Button>
      </div>
    </form>

    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </FormContainer>
  );
};

export default CreateManufacterForm;
