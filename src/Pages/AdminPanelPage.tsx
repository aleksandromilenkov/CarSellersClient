import React, { useState } from 'react'
import CreateCarForm from '../Components/Cars/CreateCarForm';
import CreateCarModelForm from '../Components/CarModels/CreateCarModelForm';
import CreateManufacterForm from '../Components/Manufacturers/CreateManufacterForm';
import CreateCompanyForm from '../Components/Companies/CreateCompanyForm';

type Props = {}

const AdminPanelPage = (props: Props) => {
    const [isCreateCarFormOpen, setIsCreateCarFormOpen] = useState(false);
    const [isCreateCarModelFormOpen, setIsCreateCarModelFormOpen] = useState(false);
    const [isCreateManufacturerFormOpen, setIsCreateManufacturerFormOpen] = useState(false);
    const [isCreateCarSellerFormOpen, setIsCreateSellerCarFormOpen] = useState(false);
  return (
    <div>AdminPanelPage
        <ul>
            <li style={{cursor:"pointer"}} onClick={()=> {
              setIsCreateCarFormOpen(true);
              setIsCreateCarModelFormOpen(false);
              setIsCreateManufacturerFormOpen(false);
              setIsCreateSellerCarFormOpen(false)
            }
              }>Create Car</li>
            <li style={{cursor:"pointer"}} onClick={
              ()=> {
                setIsCreateCarFormOpen(false);
                setIsCreateCarModelFormOpen(true);
                setIsCreateManufacturerFormOpen(false);
                setIsCreateSellerCarFormOpen(false)
              }
            }>Create Car Model</li>
            <li style={{cursor:"pointer"}} onClick={
              ()=> {
                setIsCreateCarFormOpen(false);
                setIsCreateCarModelFormOpen(false);
                setIsCreateManufacturerFormOpen(true);
                setIsCreateSellerCarFormOpen(false)
              }}>Create Manufacturer</li>
            <li style={{cursor:"pointer"}} onClick={
              ()=> {
                setIsCreateCarFormOpen(false);
                setIsCreateCarModelFormOpen(false);
                setIsCreateManufacturerFormOpen(false);
                setIsCreateSellerCarFormOpen(true)
              }}>Create Car Seller Company</li>
        </ul>
        {isCreateCarFormOpen && <CreateCarForm onClose={setIsCreateCarFormOpen}/>}
        {isCreateCarModelFormOpen && <CreateCarModelForm onClose={setIsCreateCarModelFormOpen}/>}
        {isCreateManufacturerFormOpen && <CreateManufacterForm onClose={setIsCreateManufacturerFormOpen}/>}
        {isCreateCarSellerFormOpen && <CreateCompanyForm onClose={setIsCreateSellerCarFormOpen}/>}
    </div>
  )
}

export default AdminPanelPage