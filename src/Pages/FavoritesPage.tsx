import React from "react";
import useFavoritesCars from "../Components/FavoritesCars/useFavoritesCars";
import { Car as ModelCar } from "../Models/Car";
import Car from "../Components/Cars/Car";

type Props = {};

const FavoritesPage = (props: Props) => {
  const [isLoading, favoriteCars, error] = useFavoritesCars();
  if(isLoading)return <p>Loading...</p>
  return <div>FavoritesCars
    {favoriteCars?.map((car:ModelCar, idx:number)=> <Car key={idx}{...car}/>)}
    {favoriteCars?.length === 0 && <p>You dont have favorite cars so far.</p>}
  </div>;
};  

export default FavoritesPage;
