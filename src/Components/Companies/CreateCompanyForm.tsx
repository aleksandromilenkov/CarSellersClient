import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCompanyInputs } from "../../Utils/Helpers/Types";
import useCreateCompany from "./useCreateCompany";
import useEditCompany from "./useEditCompany";
import { Company } from "../../Models/Company";

// Define Yup validation schema
const schema = yup.object({
  companyName: yup.string().required('Company Name is required').min(2, 'Company Name must be at least 2 characters').max(50, 'Company Name cannot exceed 50 characters'),
  address: yup.string().required('Address is required').min(2, 'Address must be at least 2 characters').max(50, 'Address cannot exceed 50 characters'),
  telephoneNumber: yup.string()
}).required();

type Props = {
  onClose?: Dispatch<SetStateAction<boolean>>;
  isEditSession?: boolean;
  editingCompany?: Company | {};
  onCloseModal?: () => void;
};

const CreateCompanyForm = ({ onClose, isEditSession, editingCompany = {}, onCloseModal }: Props) => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm<CreateCompanyInputs>({
    resolver: yupResolver(schema),
    defaultValues: isEditSession ? editingCompany : {}
  });

  const { createCompany, isLoading, error } = useCreateCompany();
  const { editCompany, isLoading: isLoadingUpdateCompany, error: errorUpdateCompany } = useEditCompany();
  

  const submitHandler: SubmitHandler<CreateCompanyInputs> = (formValues) => {
    const formData = new FormData();
      formData.append("companyName", formValues.companyName.toString());
      formData.append("address", formValues.address.toString());
      if(formValues?.telephoneNumber) formData.append("telephoneNumber", formValues.telephoneNumber.toString());
      if (formValues.companyImage instanceof FileList && formValues.companyImage.length > 0) {
        const companyImageFile = formValues.companyImage[0]; // Get the first file from the FileList
        formData.append("companyImage", companyImageFile); // Append the file
      }
      if(isEditSession &&  (editingCompany as Company).companyID){
        const companyId = (editingCompany as Company).companyID;
        editCompany({companyInputs: formData, companyId:companyId});
        onCloseModal && onCloseModal();
      }else{
          createCompany(formData);
          onCloseModal && onCloseModal();
          reset();
      } 
  };

  if (isLoading) return <p>Loading...</p>;
  
  return (
      <div>
      <h2>{isEditSession ? "Edit Company" : "Create Company"}</h2>
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
        <div className="formField">
          <label htmlFor="telephoneNumber">Telephone Number</label>
          <input type="text" id="telephoneNumber" {...register("telephoneNumber")} />
          {errors.telephoneNumber && <p>{errors.telephoneNumber.message}</p>}
        </div>
        <div className="formField">
          <label htmlFor="companyImage">Company Image</label>
          <input
            type="file"
            id="companyImage"
            placeholder="companyImage"
            accept="image/jpeg,image/png,image/jpg"
            {...register("companyImage")}
          />
          {errors?.companyImage && <p>{errors.companyImage.message}</p>}
        </div>
        <button type="submit">{isEditSession ? "Edit Company" : "Create Company"}</button>
        <button type="button" onClick={() =>{
          onClose && onClose(false);
          onCloseModal && onCloseModal();
        } 
        }>Cancel</button>
      </form>
      {(error ) && <p>{error?.message }</p> }
    </div>
  );
};

export default CreateCompanyForm;
