import React from "react";
import useFavoritesCars from "../Components/FavoritesCars/useFavoritesCars";
import { Car as ModelCar } from "../Models/Car";
import Car from "../Components/Cars/Car";

type Props = {};

const FavoritesCars = (props: Props) => {
  const [isLoading, favoriteCars, error] = useFavoritesCars();
  if(isLoading)return <p>Loading...</p>
  return <div>FavoritesCars
    {favoriteCars?.map((car:ModelCar, idx:number)=> <Car key={idx}{...car}/>)}
  </div>;
};  

export default FavoritesCars;
