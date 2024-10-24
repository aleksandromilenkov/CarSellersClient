import React from 'react'
import useCompany from './useCompany'
import { Link, useNavigate } from 'react-router-dom';
import { JwtPayloadInterface, CarCompany as ModelCompany } from '../../Utils/Helpers/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { jwtDecode } from 'jwt-decode';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../UI/ConfirmDelete';
import CreateCompanyForm from './CreateCompanyForm';
import useDeleteCar from '../Cars/useDeleteCar';
import useDeleteCompany from './useDeleteCompany';
import styled from 'styled-components';
const CardContainer = styled.div`
  background-color: #ffffff; /* White background */
  border: 1px solid #ddd; /* Light border */
  border-radius: 8px; /* Rounded corners */
   border-bottom-left-radius: 0; /* Remove top-left corner rounding */
  border-bottom-right-radius: 0; /* Remove top-right corner rounding */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin: 15px; /* Space between cards */
  text-align: left; /* Align text to the left */
  transition: transform 0.2s; /* Smooth scale effect on hover */
  overflow:hidden;

  &:hover {
    transform: scale(1.02); /* Slightly enlarge card on hover */
  }
`;

const CardTitle = styled.h4`
  font-size: 1.2em; /* Title font size */
  margin: 10px 0; /* Margin around title */
`;

const CardInfo = styled.p`
  margin: 5px 0; /* Margin around info paragraphs */
  color: #555; /* Slightly lighter color for text */
`;

const CardButton = styled.button`
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  padding: 10px; /* Button padding */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth transition for hover */
 
  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  margin-right: 10px; /* Space between buttons */
`;

const CarImage = styled.img`
  width: 100%; /* Make the image full width */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Cover the area, maintaining aspect ratio */
  max-height: 200px; /* Set a maximum height for the image */
  

`;
type Props = {
    company:ModelCompany
}

const CarCompany = ({company}: Props) => {
  const navigate = useNavigate();
  const {deleteCompany, isLoading, error} = useDeleteCompany();
  const user = useSelector((state:RootState)=>state.user);
  let isAdmin = false;
  if(user.token){
  const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
  const userRoles = decodedToken.role || [];
  isAdmin = userRoles.includes('Admin');
  }
  return (
    <CardContainer>
       <CarImage src={`https://localhost:7209/resources/${company.companyImage}`} alt="Company" />
       <div style={{padding:'1.4rem'}}>
        <CardTitle>{company.companyName}</CardTitle>
        <CardInfo>{company.address}</CardInfo>
        <CardInfo>{company.telephoneNumber}</CardInfo>
        {isAdmin && <div className='adminActions'>
          <div style={{display:'flex', gap: '1rem', margin: '1rem 0'}}>
            <Modal>
              <Modal.Open opens="edit-car">
                <Button variation="secondary"><HiPencil /></Button>
              </Modal.Open>
              <Modal.Window name="edit-car">
              <CreateCompanyForm editingCompany={company} isEditSession={true}/>
              </Modal.Window>
              </Modal>
            <Modal>
              <Modal.Open opens="delete-car">
                <Button variation="danger"><HiTrash /></Button>
              </Modal.Open>
              <Modal.Window name="delete-car">
                <ConfirmDelete
                  onConfirm={()=>deleteCompany(company.companyID)}
                  resourceName={`company ${company.companyName} ?`}
                />
              </Modal.Window>
            </Modal>
           </div>
        </div>}
        <Button onClick={()=> navigate(`/companies/${company.companyID}`)}>View Company</Button>
      </div>
    </CardContainer>
  )
}

export default CarCompany;