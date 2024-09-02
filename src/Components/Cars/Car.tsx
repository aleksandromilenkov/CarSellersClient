import React from 'react'
import {  Car as ModelCar } from '../../Models/Car'
import { CarColor, CarOwner, CarRegistration, CarType } from '../../Utils/Helpers/EnumTypes'
import useFavoriteCars from '../FavoritesCars/useFavoritesCars'
import useCreateFavoriteCars from '../FavoritesCars/useCreateFavoriteCar'
import { Link, useNavigate } from 'react-router-dom'


type Props = {}

const Car = (props: ModelCar) => {
  const navigate = useNavigate();
    const {isLoading, addToFavorites} = useCreateFavoriteCars();
    const [isLoadingFavorites, favorites ] = useFavoriteCars();
    const {carModel,carOwner,carRegistration,carType,carColor,carID,carSellerCompany,kilometers,price,year} = props;
    const isThisCarAlreadyInFavorites = favorites.find((favorite: ModelCar)=> favorite.carID === carID)
  return (
    <div>
      <div onClick={()=> navigate(`/cars/${carID}`)}>
        <h4>{carModel.modelName || carModel.carModel.modelName}</h4>
        <p>Owner: {CarOwner[carOwner]}</p>
        <p>Registration: {CarRegistration[carRegistration]}</p>
        <p>Type: {CarType[carType]}</p>
        <p>Color: {CarColor[carColor]}</p>
        <p>Seller: {carSellerCompany.companyName}</p>
        <p>Kilometers: {kilometers}</p>
        <p>Price: {price}</p>
        <p>Year: {year}</p>
        {!isThisCarAlreadyInFavorites && <button onClick={()=>{
            addToFavorites(carID)
        }}>Add To Favorites</button>}
      </div>
        
    </div>
  )
}

export default Car