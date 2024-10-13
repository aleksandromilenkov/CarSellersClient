import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCarAPI } from "../../Services/apiCars";
import { useQueryClient } from "@tanstack/react-query";

function useDeleteCar() {
    const queryClient = useQueryClient();
  const { mutate: deleteCar, isPending:isLoading } = useMutation({
    mutationFn: (carId:number)=>deleteCarAPI(carId),
    onSuccess: (data) => {
      toast.success("Car deleted successfully.");
        queryClient.invalidateQueries({
            queryKey: ["cars"],
          });
    },
    onError: (error) => {
      toast.error(`Deletion failed: ${error.message}`);
    },
  });

  return { deleteCar, isLoading };
}

export default useDeleteCar;
