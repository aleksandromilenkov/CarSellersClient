
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createFavoriteCar } from "../../Services/apiCars";
function useCreateFavoriteCars(){
  const queryClient = useQueryClient();
  const { mutate: addToFavorites, isPending: isLoading } = useMutation({
    mutationFn: createFavoriteCar,
    onSuccess: (car) => {
        toast.success("Car added to favorites.");
        queryClient.invalidateQueries({ queryKey: ["favoriteCars"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Cannot add to favorites. Maybe it's already added...");
    },
  });

  return { addToFavorites, isLoading };
}
export default useCreateFavoriteCars