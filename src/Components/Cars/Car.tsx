import React from 'react'
import {  Car as ModelCar } from '../../Models/Car'
import { CarColor, CarOwner, CarRegistration, CarType } from '../../Utils/Helpers/EnumTypes'
import useFavoriteCars from '../FavoritesCars/useFavoritesCars'
import useCreateFavoriteCars from '../FavoritesCars/useCreateFavoriteCar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadInterface } from '../../Utils/Helpers/Types'
import useDeleteCar from './useDeleteCar'
import styled from 'styled-components';
import Modal from '../../UI/Modal'
import Button from '../../UI/Button'
import ConfirmDelete from '../../UI/ConfirmDelete'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import CreateCarForm from './CreateCarForm'

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;
type Props = {}

const Car = (props: ModelCar) => {
  const navigate = useNavigate();
    const {isLoading, addToFavorites} = useCreateFavoriteCars();
    const [isLoadingFavorites, favorites ] = useFavoriteCars();
    const {isLoading: isLoadingDelete, deleteCar } = useDeleteCar();
    const {carModel,carOwner,carRegistration,carType,carColor,carID,carSellerCompany,kilometers,price,year} = props;
    const isThisCarAlreadyInFavorites = favorites?.find((favorite: ModelCar)=> favorite.carID === carID)
    const user = useSelector((state:RootState)=>state.user);
    const isAuthenticated = !!user.token;
    let isAdmin = false;
    if(user.token){
    const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
    const userRoles = decodedToken.role || [];
    isAdmin = userRoles.includes('Admin');
  }
  return (
    <div>
      <div>
        <h4>{carModel.manufacturer.manufacturerName} {carModel.modelName || carModel.carModel.modelName}</h4>
        {CarOwner[carOwner] && <p>Owner: {CarOwner[carOwner]}</p>}
        {CarRegistration[carRegistration] && <p>Registration: {CarRegistration[carRegistration]}</p>}
        {CarType[carType] && <p>Type: {CarType[carType]}</p> }
        {CarColor[carColor] && <p>Color: {CarColor[carColor]}</p> }
        <p>Seller: {carSellerCompany.companyName}</p>
        <p>Kilometers: {kilometers}</p>
        <p>Price: {price}</p>
        <p>Year: {year}</p>
        {isAdmin && <div className='adminActions'>
            {/* <button onClick={()=>deleteCar(props.carID)}>Delete</button> */}
          <Modal>
          <Modal.Open opens="edit-car">
            <Button variation="secondary"><HiPencil /></Button>
          </Modal.Open>
          <Modal.Window name="edit-car">
          <CreateCarForm editingCar={props} isEditSession={true} />
          </Modal.Window>
          </Modal>
        <Modal>
          <Modal.Open opens="delete-car">
            <Button variation="danger"><HiTrash /></Button>
          </Modal.Open>
          <Modal.Window name="delete-car">
            <ConfirmDelete
              onConfirm={()=>deleteCar(props.carID)}
              resourceName={`${carModel.manufacturer.manufacturerName} ${carModel.modelName || carModel.carModel.modelName}`}
            />
          </Modal.Window>
      </Modal>
          </div>}
        <button onClick={()=> navigate(`/cars/${carID}`)}>View Car</button>
        {!isThisCarAlreadyInFavorites && isAuthenticated && <button onClick={()=>{
            addToFavorites(carID)
        }}>Add To Favorites</button>}
      </div>
        
    </div>
  )
}

export default Car