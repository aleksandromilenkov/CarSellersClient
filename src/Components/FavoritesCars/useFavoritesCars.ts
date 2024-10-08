import { useQuery } from "@tanstack/react-query";
import { getFavoritesCars } from "../../Services/apiCars";

const useFavoriteCars = () => {
  const {
    isLoading,
    data: favoriteCars,
    error,
  } = useQuery({
    queryKey: ["favoriteCars"],
    queryFn: getFavoritesCars,
  });
  return [isLoading, favoriteCars, error];
};

export default useFavoriteCars;
