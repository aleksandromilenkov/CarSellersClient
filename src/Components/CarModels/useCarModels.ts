import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar, getCarModels } from "../../Services/apiCars";

const useCarModels = () => {
    const {
      isLoading,
      data: carModels,
      error,
    } = useQuery({
      queryKey: ["carModels"],
      queryFn: ()=>getCarModels(),
      retry:false
    });
    return [isLoading, carModels, error];
  };
  
  export default useCarModels;