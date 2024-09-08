import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar, getCarModels } from "../../Services/apiCars";
import { getManufacturers } from "../../Services/apiManufacturers";

const useManufacturers = () => {
    const {
      isLoading,
      data: manufacturers,
      error,
    } = useQuery({
      queryKey: ["manufacturers"],
      queryFn: ()=>getManufacturers(),
      retry:false
    });
    return [isLoading, manufacturers, error];
  };
  
  export default useManufacturers;