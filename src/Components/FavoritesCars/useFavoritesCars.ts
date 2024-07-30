import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFavoritesCars } from "../../Services/apiCars";

const useCabins = () => {
  const {
    isLoading,
    data: favoriteCars,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getFavoritesCars,
  });
  return [isLoading, favoriteCars, error];
};

export default useCabins;
