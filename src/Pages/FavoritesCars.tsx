import React from "react";
import useFavoritesCars from "../Components/FavoritesCars/useFavoritesCars";

type Props = {};

const FavoritesCars = (props: Props) => {
  const [isLoading, favoriteCars, error] = useFavoritesCars();
  console.log(favoriteCars);
  return <div>FavoritesCars</div>;
};

export default FavoritesCars;
