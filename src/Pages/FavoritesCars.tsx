import React from "react";
import useFavoritesCars from "../Components/FavoritesCars/useFavoritesCars";
import { Car as ModelCar } from "../Models/Car";
import Car from "../Components/Car";

type Props = {};

const FavoritesCars = (props: Props) => {
  const [isLoading, favoriteCars, error] = useFavoritesCars();
  console.log('asd')
  console.log(favoriteCars);
  return <div>FavoritesCars
    {favoriteCars?.map((car:ModelCar, idx:number)=> <Car key={idx}{...car}/>)}
  </div>;
};  

export default FavoritesCars;
