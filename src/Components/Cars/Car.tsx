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
import useRemoveFromFavoriteCars from '../FavoritesCars/useRemoveFavoriteCars'

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

type Props = {}

const Car = (props: ModelCar) => {
  const navigate = useNavigate();
    const {isLoading, addToFavorites} = useCreateFavoriteCars();
    const {isLoading: isLoadingRemovingFromFavorites, removeFromFavorites} = useRemoveFromFavoriteCars();
    const [isLoadingFavorites, favorites ] = useFavoriteCars();
    const {isLoading: isLoadingDelete, deleteCar } = useDeleteCar();
    const {carModel,carOwner,carRegistration,carType,carColor,carID,carSellerCompany,kilometers,price,year, carImage} = props;
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
    <CardContainer>
        <CarImage src={`https://localhost:7209/resources/${carImage}`} alt="Car" />
      <div style={{padding:'1.4rem'}}>
        <CardTitle>
        {carModel.manufacturer.manufacturerName} {carModel.modelName || carModel.carModel.modelName}
      </CardTitle>
      {CarOwner[carOwner] && <CardInfo>Owner: {CarOwner[carOwner]}</CardInfo>}
      {CarRegistration[carRegistration] && <CardInfo>Registration: {CarRegistration[carRegistration]}</CardInfo>}
      {CarType[carType] && <CardInfo>Type: {CarType[carType]}</CardInfo>}
      {CarColor[carColor] && <CardInfo>Color: {CarColor[carColor]}</CardInfo>}
      <CardInfo>Seller: {carSellerCompany.companyName}</CardInfo>
      <CardInfo>Kilometers: {kilometers}</CardInfo>
      <CardInfo>Price: {price}</CardInfo>
      <CardInfo>Year: {year}</CardInfo>
        {isAdmin && <div className='adminActions'>
          <div style={{display:'flex', gap: '1rem', margin: '1rem 0'}}>
            <Modal>
              <Modal.Open opens="edit-car">
                <Button variation="secondary" size='small'><HiPencil /></Button>
              </Modal.Open>
              <Modal.Window name="edit-car">
              <CreateCarForm editingCar={props} isEditSession={true}/>
              </Modal.Window>
            </Modal>
            <Modal>
              <Modal.Open opens="delete-car">
                <Button variation="danger" size='small'><HiTrash /></Button>
              </Modal.Open>
              <Modal.Window name="delete-car">
                <ConfirmDelete
                  onConfirm={()=>deleteCar(props.carID)}
                  resourceName={`${carModel.manufacturer.manufacturerName} ${carModel.modelName || carModel.carModel.modelName}`}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>}
        <div>
        <CardButton onClick={() => navigate(`/cars/${carID}`)}>View Car</CardButton>
        {!isThisCarAlreadyInFavorites && isAuthenticated && (
          <CardButton onClick={() => addToFavorites(carID)}>Add To Favorites</CardButton>
        )}
        {isThisCarAlreadyInFavorites && isAuthenticated && (
          <CardButton onClick={() => removeFromFavorites(carID)}>Remove from Favorites</CardButton>
        )}
        </div>
      </div>
        
    </CardContainer>
  )
}

export default Car