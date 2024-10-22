import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateCompanyInputs } from "../../Utils/Helpers/Types";
import useCreateCompany from "./useCreateCompany";
import useEditCompany from "./useEditCompany";
import { Company } from "../../Models/Company";
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
    <FormContainer>
      <FormTitle>{isEditSession ? "Edit Company" : "Create Company"}</FormTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        
        <FormField>
          <Label htmlFor="companyName">Company Name</Label>
          <Input type="text" id="companyName" {...register("companyName")} />
          {errors.companyName && <ErrorMessage>{errors.companyName.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" {...register("address")} />
          {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="telephoneNumber">Telephone Number</Label>
          <Input type="text" id="telephoneNumber" {...register("telephoneNumber")} />
          {errors.telephoneNumber && <ErrorMessage>{errors.telephoneNumber.message}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="companyImage">Company Image</Label>
          <Input
            type="file"
            id="companyImage"
            accept="image/jpeg,image/png,image/jpg"
            {...register("companyImage")}
          />
          {errors.companyImage && <ErrorMessage>{errors.companyImage.message}</ErrorMessage>}
        </FormField>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit">{isEditSession ? "Edit Company" : "Create Company"}</Button>
          <Button type="button" onClick={() => {
            onClose && onClose(false);
            onCloseModal && onCloseModal();
          }}>Cancel</Button>
        </div>
      </form>

      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </FormContainer>
  );
};

export default CreateCompanyForm;
