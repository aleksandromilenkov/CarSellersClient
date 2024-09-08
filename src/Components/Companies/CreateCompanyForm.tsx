import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCompanyInputs } from "../../Utils/Helpers/Types";
import useCreateCompany from "./useCreateCompany";

// Define Yup validation schema
const schema = yup.object({
  companyName: yup.string().required('Company Name is required').min(2, 'Company Name must be at least 2 characters').max(50, 'Company Name cannot exceed 50 characters'),
  address: yup.string().required('Address is required').min(2, 'Address must be at least 2 characters').max(50, 'Address cannot exceed 50 characters')
}).required();

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
};

const CreateCompanyForm = ({ onClose }: Props) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateCompanyInputs>({
    resolver: yupResolver(schema)
  });

  const { createCompany, isLoading, error } = useCreateCompany();

  const submitHandler: SubmitHandler<CreateCompanyInputs> = (formValues) => {
    createCompany(formValues);
reset();
  };

  if (isLoading) return <p>Loading...</p>;
  
  return (
      <div>
      <h2>Create Company Form</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
      <div className="formField">
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" {...register("companyName")} />
          {errors.companyName && <p>{errors.companyName.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address")} />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <button type="submit">Create Company</button>
        <button type="button" onClick={() => onClose(false)}>Cancel</button>
      </form>
      {(error ) && <p>{error?.message }</p> }
    </div>
  );
};

export default CreateCompanyForm;
