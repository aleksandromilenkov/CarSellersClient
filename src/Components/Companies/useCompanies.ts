import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFavoritesCars } from "../../Services/apiCars";
import { getCompanies } from "../../Services/apiCompanies";

const useCompanies = () => {
  const {
    isLoading,
    data: companies,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  return [isLoading, companies, error];
};

export default useCompanies;
