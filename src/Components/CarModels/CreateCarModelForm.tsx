import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useManufacturers from "../Manufacturers/useManufacturers";
import { CreateCarModelInputs } from "../../Utils/Helpers/Types";
import useCreateCarModel from "./useCreateCarModel";
import { Manufacturer } from "../../Models/Manufacturer";
import styled from "styled-components";
import { FormContainer } from "../../UI/FormContainer";
import { FormTitle } from "../../UI/FormTitle";
import { FormField } from "../../UI/FormField";
import { Label } from "../../UI/Label";
import { Select } from "../../UI/Select";
import { Input } from "../../UI/Input";
import { ErrorMessage } from "../../UI/ErrorMessage";
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
  manufacturerID: yup.number().required('Manufacturer is required').positive('Manufacturer must be selected').integer('Manufacturer ID must be an integer').moreThan(0, 'Please select Manufacturer'),
  modelName: yup.string().required('Model Name is required').min(2, 'Model Name must be at least 2 characters').max(50, 'Model Name cannot exceed 50 characters')
}).required();

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const CreateCarModelForm = ({ onClose }: Props) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateCarModelInputs>({
    resolver: yupResolver(schema)
  });

  const [isLoadingManufacturers, manufacturers, error2] = useManufacturers();
  const { createCarModel, isLoading, error } = useCreateCarModel();

  const submitHandler: SubmitHandler<CreateCarModelInputs> = (formValues) => {
    createCarModel(formValues);
reset();
  };

  if (isLoading || isLoadingManufacturers) return <p>Loading...</p>;
  
  return (
    <FormContainer>
    <FormTitle>Create Car Model Form</FormTitle>
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormField>
        <Label htmlFor="manufacturerID">Select Manufacturer</Label>
        <Select id="manufacturerID" {...register("manufacturerID")}>
          <option value={0}>Select Manufacturer</option>
          {manufacturers?.map((option: Manufacturer, index: number) => (
            <option key={index} value={option.manufacturerID}>
              {option.manufacturerName}
            </option>
          ))}
        </Select>
        {errors.manufacturerID && <p>{errors.manufacturerID.message}</p>}
      </FormField>

      <FormField>
        <Label htmlFor="modelName">Model Name</Label>
        <Input type="text" id="modelName" {...register("modelName")} />
        {errors.modelName && <ErrorMessage>{errors.modelName.message}</ErrorMessage>}
      </FormField>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="submit">Create Car Model</Button>
        <Button type="button" onClick={() => onClose(false)}>Cancel</Button>
      </div>
    </form>

    {(error || error2) && <ErrorMessage>{error?.message || error2?.message}</ErrorMessage>}
  </FormContainer>
  );
};

export default CreateCarModelForm;
