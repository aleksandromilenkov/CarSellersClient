import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFavoritesCars } from "../../Services/apiCars";
import { getCompanies, getCompanyCars } from "../../Services/apiCompanies";
import { useParams } from "react-router-dom";

const useCompanyCars = () => {
    const {companyId} = useParams();
  const {
    isLoading,
    data: companyCars,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: ()=>getCompanyCars(companyId),
  });
  return [isLoading, companyCars, error];
};

export default useCompanyCars;
