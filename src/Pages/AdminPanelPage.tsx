import React, { useState } from 'react'
import CreateCarForm from '../Components/Cars/CreateCarForm';

type Props = {}

const AdminPanelPage = (props: Props) => {
    const [isCreateCarFormOpen, setIsCreateCarFormOpen] = useState(false);
    const [isCreateCarModelFormOpen, setIsCreateCarModelFormOpen] = useState(false);
    const [isCreateManufacturerFormOpen, setIsCreateManufacturerFormOpen] = useState(false);
    const [isCreateCarSellerFormOpen, setIsCreateSellerCarFormOpen] = useState(false);
  return (
    <div>AdminPanelPage
        <ul>
            <li style={{cursor:"pointer"}} onClick={()=> setIsCreateCarFormOpen(true)}>Create Car</li>
            <li>Create Car Model</li>
            <li>Create Manufacturer</li>
            <li>Create Car Seller Company</li>
        </ul>
        {isCreateCarFormOpen && <CreateCarForm onClose={setIsCreateCarFormOpen}/>}
    </div>
  )
}

export default AdminPanelPage