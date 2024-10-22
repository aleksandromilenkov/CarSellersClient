import React, { useState } from 'react'
import CreateCarForm from '../Components/Cars/CreateCarForm';
import CreateCarModelForm from '../Components/CarModels/CreateCarModelForm';
import CreateManufacterForm from '../Components/Manufacturers/CreateManufacterForm';
import CreateCompanyForm from '../Components/Companies/CreateCompanyForm';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MenuList = styled.ul`
  list-style: none; /* Remove default list styles */
  padding: 0; /* Remove default padding */
  display: flex; /* Display items in a row */
  justify-content: center; /* Center items */
  gap: 20px; /* Space between items */
`;

const MenuItem = styled.li`
  cursor: pointer;
  padding: 10px 20px; /* Padding for menu items */
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const FormContainer = styled.div`
  margin-top: 20px; /* Space above the form */
  display: flex;
  justify-content: center; /* Center the form horizontally */
  align-items: center; /* Center the form vertically */
  width: 100%;
  max-width: 600px; /* Set a max width for the form */
  padding: 20px;
  background-color: #f8f9fa; /* Light background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;
type Props = {}

const AdminPanelPage = (props: Props) => {
    const [isCreateCarFormOpen, setIsCreateCarFormOpen] = useState(false);
    const [isCreateCarModelFormOpen, setIsCreateCarModelFormOpen] = useState(false);
    const [isCreateManufacturerFormOpen, setIsCreateManufacturerFormOpen] = useState(false);
    const [isCreateCarSellerFormOpen, setIsCreateSellerCarFormOpen] = useState(false);
  return (
    <AdminContainer>
    <MenuList>
      <MenuItem onClick={() => {
        setIsCreateCarFormOpen(true);
        setIsCreateCarModelFormOpen(false);
        setIsCreateManufacturerFormOpen(false);
        setIsCreateSellerCarFormOpen(false);
      }}>Create Car</MenuItem>
      <MenuItem onClick={() => {
        setIsCreateCarFormOpen(false);
        setIsCreateCarModelFormOpen(true);
        setIsCreateManufacturerFormOpen(false);
        setIsCreateSellerCarFormOpen(false);
      }}>Create Car Model</MenuItem>
      <MenuItem onClick={() => {
        setIsCreateCarFormOpen(false);
        setIsCreateCarModelFormOpen(false);
        setIsCreateManufacturerFormOpen(true);
        setIsCreateSellerCarFormOpen(false);
      }}>Create Manufacturer</MenuItem>
      <MenuItem onClick={() => {
        setIsCreateCarFormOpen(false);
        setIsCreateCarModelFormOpen(false);
        setIsCreateManufacturerFormOpen(false);
        setIsCreateSellerCarFormOpen(true);
      }}>Create Car Seller Company</MenuItem>
    </MenuList>
    {
      (isCreateCarFormOpen || isCreateCarModelFormOpen || isCreateManufacturerFormOpen || isCreateCarSellerFormOpen ) &&
      (<FormContainer>
      {isCreateCarFormOpen && <CreateCarForm onClose={setIsCreateCarFormOpen} />}
      {isCreateCarModelFormOpen && <CreateCarModelForm onClose={setIsCreateCarModelFormOpen} />}
      {isCreateManufacturerFormOpen && <CreateManufacterForm onClose={setIsCreateManufacturerFormOpen} />}
      {isCreateCarSellerFormOpen && <CreateCompanyForm onClose={setIsCreateSellerCarFormOpen} />}
    </FormContainer>)
    }
  </AdminContainer>
  )
}

export default AdminPanelPage