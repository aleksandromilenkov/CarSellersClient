import React from "react";
import useFavoritesCars from "../Components/FavoritesCars/useFavoritesCars";
import { Car as ModelCar } from "../Models/Car";
import Car from "../Components/Cars/Car";
import styled from "styled-components";
import LoadingSpinner from "../UI/LoadingSpinner";
const OutputedCars = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:0.5rem;
`
const CarsOutputLayout = styled.div`
    width:100%;
    padding:1.5rem;
`
const NoCarsMessage = styled.p`
  text-align: center; /* Center the message */
  color: #666; /* Lighter color */
`;
type Props = {};

const FavoritesPage = (props: Props) => {
  const [isLoading, favoriteCars, error] = useFavoritesCars();
  if(isLoading)return <LoadingSpinner/>
  if(error) return <p>{error}</p>
  console.log(favoriteCars)
  return <CarsOutputLayout>
    <h2 style={{textAlign: "center"}}>Your Favorite Cars</h2>
    {favoriteCars?.length === 0 && <NoCarsMessage>You dont have favorite cars so far.</NoCarsMessage>}
    <OutputedCars>
    {favoriteCars?.map((car:ModelCar, idx:number)=> <Car key={idx}{...car}/>)}
    </OutputedCars>
  </CarsOutputLayout>;
};  

export default FavoritesPage;
