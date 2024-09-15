
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { removeFavoriteCar } from "../../Services/apiCars";
function useRemoveFromFavoriteCars(){
    const queryClient = useQueryClient();
  const { mutate: removeFromFavorites, isPending: isLoading } = useMutation({
    mutationFn: removeFavoriteCar,
    onSuccess: (car) => {
        toast.success("Car removed from favorites.");
        queryClient.invalidateQueries({
            queryKey: ["favoriteCars"],
          });
        // queryClient.setQueryData(['favoriteCars'], (oldData) => oldData?.filter(favCar => favCar.id !== car.id));
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Cannot remove from favorites. Maybe it's already removed...");
    },
  });

  return { removeFromFavorites, isLoading };
}
export default useRemoveFromFavoriteCars