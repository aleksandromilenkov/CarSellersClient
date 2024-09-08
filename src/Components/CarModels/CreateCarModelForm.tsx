import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useManufacturers from "../Manufacturers/useManufacturers";
import { CreateCarModelInputs } from "../../Utils/Helpers/Types";
import useCreateCarModel from "./useCreateCarModel";
import { Manufacturer } from "../../Models/Manufacturer";

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
      <div>
    

      <h2>Create Car Model Form</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="formField">
          <label htmlFor="manufacturerID">Select Manufacturer</label>
          <select id="manufacturerID" {...register("manufacturerID")}>
            <option value={0}>Select Manufacturer</option>
            {manufacturers?.map((option: Manufacturer, index: number) => (
              <option key={index} value={option.manufacturerID}>
                {option.manufacturerName}
              </option>
            ))}
          </select>
          {errors.manufacturerID && <p>{errors.manufacturerID.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="modelName">Model Name</label>
          <input type="text" id="modelName" {...register("modelName")} />
          {errors.modelName && <p>{errors.modelName.message}</p>}
        </div>
        <button type="submit">Create Car Model</button>
        <button type="button" onClick={() => onClose(false)}>Cancel</button>
      </form>
      {(error || error2) && <p>{error?.message || error2?.message}</p> }
    </div>
  );
};

export default CreateCarModelForm;
