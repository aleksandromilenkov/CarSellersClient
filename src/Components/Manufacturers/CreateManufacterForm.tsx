import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useManufacturers from "../Manufacturers/useManufacturers";
import { CreateCarModelInputs, CreateManufacturerInputs } from "../../Utils/Helpers/Types";;
import { Manufacturer } from "../../Models/Manufacturer";
import useCreateManufacturer from "./useCreateManufacturer";

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
      <div>
      <h2>Create Car Model Form</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
      <div className="formField">
          <label htmlFor="manufacturerName">Manufacturer Name</label>
          <input type="text" id="manufacturerName" {...register("manufacturerName")} />
          {errors.manufacturerName && <p>{errors.manufacturerName.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" {...register("country")} />
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <button type="submit">Create Manufacturer</button>
        <button type="button" onClick={() => onClose(false)}>Cancel</button>
      </form>
      {(error ) && <p>{error?.message }</p> }
    </div>
  );
};

export default CreateManufacterForm;
