import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar } from "../../Services/apiCars";

const useCar = () => {
    const {carId} = useParams();
    console.log(carId)
    const {
      isLoading,
      data: car,
      error,
    } = useQuery({
      queryKey: ["cars", carId],
      queryFn: ()=>getCar(carId),
      retry:false
    });
    return [isLoading, car, error];
  };
  
  export default useCar;