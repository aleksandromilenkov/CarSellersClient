import React from 'react'
import useCar from './useCar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {  Car as ModelCar } from '../../Models/Car'
import { RootState } from '../../store'
import { jwtDecode } from 'jwt-decode'
import { JwtPayloadInterface } from '../../Utils/Helpers/Types'
import useCreateFavoriteCars from '../FavoritesCars/useCreateFavoriteCar'
import useRemoveFromFavoriteCars from '../FavoritesCars/useRemoveFavoriteCars'
import useFavoriteCars from '../FavoritesCars/useFavoritesCars'
import useDeleteCar from './useDeleteCar'
import styled from 'styled-components'
import { CarColor, CarOwner, CarRegistration, CarType } from '../../Utils/Helpers/EnumTypes'
import Modal from '../../UI/Modal'
import Button from '../../UI/Button'
import ConfirmDelete from '../../UI/ConfirmDelete'
import { HiPencil, HiTrash } from 'react-icons/hi2'
import CreateCarForm from './CreateCarForm'
import LoadingSpinner from '../../UI/LoadingSpinner'
// Main container for car details
const CarDetailContainer = styled.div`
  max-width: 90%;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Header for the car title
const CarTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

// Image for the car
const CarImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Information text for each car detail
const CardInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
`;

// Container for action buttons
const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

// Styled button
const CardButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &.danger {
    background-color: #ff4d4d;

    &:hover {
      background-color: #ff1a1a;
    }
  }
`;

// Admin Actions Container
const AdminActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;
type Props = {}

const CarDetail = (props: Props) => {
  const navigate = useNavigate();
  const {isLoading: isLoading1, addToFavorites} = useCreateFavoriteCars();
  const {isLoading: isLoadingRemovingFromFavorites, removeFromFavorites} = useRemoveFromFavoriteCars();
  const [isLoadingFavorites, favorites ] = useFavoriteCars();
  const {isLoading: isLoadingDelete, deleteCar } = useDeleteCar();
  const user = useSelector((state:RootState)=>state.user);
  const [isLoading, car, error] = useCar();
  const isThisCarAlreadyInFavorites = favorites?.find((favorite: ModelCar)=> favorite.carID === car?.carID)
  const isAuthenticated = !!user.token;
  let isAdmin = false;
  if(user.token){
  const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
  const userRoles = decodedToken.role || [];
  isAdmin = userRoles.includes('Admin');
  console.log(car)
  if(isLoading)return <LoadingSpinner/>
  return (
    <CarDetailContainer>
    <CarTitle>
      {car?.carModel?.manufacturer.manufacturerName} {car?.carModel.modelName}
    </CarTitle>
    <CarImage src={`https://localhost:7209/resources/${car.carImage}`} alt="Car" />
    {CarOwner[car?.carOwner] && <CardInfo>Owner: {CarOwner[car?.carOwner]}</CardInfo>}
    {CarRegistration[car?.carRegistration] && <CardInfo>Registration: {CarRegistration[car?.carRegistration]}</CardInfo>}
    {CarType[car?.carType] && <CardInfo>Type: {CarType[car?.carType]}</CardInfo>}
    {CarColor[car?.carColor] && <CardInfo>Color: {CarColor[car?.carColor]}</CardInfo>}
    <CardInfo>Seller: {car?.carSellerCompany.companyName}</CardInfo>
    <CardInfo>Kilometers: {car?.kilometers}</CardInfo>
    <CardInfo>Price: {car?.price}</CardInfo>
    <CardInfo>Year: {car?.year}</CardInfo>

    {isAdmin && (
      <AdminActions>
        <Modal>
          <Modal.Open opens="edit-car">
            <Button variation="secondary" size="small">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit-car">
            <CreateCarForm editingCar={car} isEditSession={true} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="delete-car">
            <Button variation="danger" size="small">
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-car">
            <ConfirmDelete
              onConfirm={() => deleteCar(car?.carID)}
              resourceName={`${car?.carModel.manufacturer.manufacturerName} ${car?.carModel.modelName || car?.carModel.carModel.modelName}`}
            />
          </Modal.Window>
        </Modal>
      </AdminActions>
    )}

    <ActionsContainer>
      <CardButton onClick={() => navigate(`/cars/${car?.carID}`)}>View Car</CardButton>
      {!isThisCarAlreadyInFavorites && isAuthenticated && (
        <CardButton onClick={() => addToFavorites(car?.carID)}>Add To Favorites</CardButton>
      )}
      {isThisCarAlreadyInFavorites && isAuthenticated && (
        <CardButton className="danger" onClick={() => removeFromFavorites(car?.carID)}>
          Remove from Favorites
        </CardButton>
      )}
    </ActionsContainer>
  </CarDetailContainer>
  )
}}

export default CarDetail