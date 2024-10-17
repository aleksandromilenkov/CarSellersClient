import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCarAPI } from "../../Services/apiCars";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CreateCarInputs } from "../../Utils/Helpers/Types";

interface EditCarParams {
  carInputs: FormData;
  carId: number | string | undefined;
}

function useEditCar() {
    const queryClient = useQueryClient();
  const { mutate: editCar, isPending:isLoading } = useMutation({
    mutationFn: ({ carInputs, carId }: EditCarParams) => editCarAPI(carInputs, carId),
    onSuccess: () => {
      toast.success("Car updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  return { editCar, isLoading };
}

export default useEditCar;
