import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCars, getFavoritesCars } from "../../Services/apiCars";
import { getCompanies } from "../../Services/apiCompanies";
import { useSearchParams } from "react-router-dom";

const useSearchCar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const {
    isLoading,
    data: cars,
    error,
  } = useQuery({
    queryKey: ["cars", paramsObject],
    queryFn: () => getCars(paramsObject),
    enabled: Object.keys(paramsObject).length > 0, // Only enable query if searchParams are present
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
  return [isLoading, cars, error];
};

export default useSearchCar;
