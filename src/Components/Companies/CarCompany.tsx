import React from 'react'
import useCompany from './useCompany'
import { Link } from 'react-router-dom';
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

type Props = {
    company:ModelCompany
}

const CarCompany = ({company}: Props) => {
  console.log(company)
  const {deleteCompany, isLoading, error} = useDeleteCompany();
  const user = useSelector((state:RootState)=>state.user);
  let isAdmin = false;
  if(user.token){
  const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
  const userRoles = decodedToken.role || [];
  isAdmin = userRoles.includes('Admin');
  }
  return (
    <div>
       <img src={`https://localhost:7209/resources/${company.companyImage}`} alt="Company" />
        <h1>{company.companyName}</h1>
        <h4>{company.address}</h4>
        <h4>{company.telephoneNumber}</h4>
        {isAdmin && <div className='adminActions'>
            {/* <button onClick={()=>deleteCar(props.carID)}>Delete</button> */}
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
              resourceName={`Delete company ${company.companyName} ?`}
            />
          </Modal.Window>
      </Modal>
        </div>}
        <Link to={`/companies/${company.companyID}`}>View Company</Link>
    </div>
  )
}

export default CarCompany;