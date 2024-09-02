import React from 'react'
import { Car as ModelCar } from '../Models/Car'
import { CarColor, CarOwner, CarRegistration, CarType } from '../Utils/Helpers/EnumTypes'
import useFavoriteCars from './FavoritesCars/useFavoritesCars'
import useCreateFavoriteCars from './FavoritesCars/useCreateFavoriteCar'


type Props = {}

const Car = (props: ModelCar) => {
    const {isLoading, addToFavorites} = useCreateFavoriteCars();
    const {carModel,carOwner,carRegistration,carType,carColor,carID,carSellerCompany,kilometers,price,year} = props;
  return (
    <div>
        <h4>{carModel.modelName || carModel.carModel.modelName}</h4>
        <p>Owner: {CarOwner[carOwner]}</p>
        <p>Registration: {CarRegistration[carRegistration]}</p>
        <p>Type: {CarType[carType]}</p>
        <p>Color: {CarColor[carColor]}</p>
        <p>Seller: {carSellerCompany.companyName}</p>
        <p>Kilometers: {kilometers}</p>
        <p>Price: {price}</p>
        <p>Year: {year}</p>
        <button onClick={()=>{
            addToFavorites(carID)
        }}>Add To Favorites</button>
    </div>
  )
}

export default Car