import { useMutation } from "@tanstack/react-query";
import { editCarAPI } from "../../Services/apiCars";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CreateCarInputs } from "../../Utils/Helpers/Types";

interface EditCarParams {
  carInputs: FormData;
  carId: number | string | undefined;
}

function useEditCar() {
  const dispatch = useDispatch();
  const { mutate: editCar, isPending:isLoading } = useMutation({
    mutationFn: ({ carInputs, carId }: EditCarParams) => editCarAPI(carInputs, carId),
    onSuccess: () => {
      toast.success("Car updated successfully.");
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  return { editCar, isLoading };
}

export default useEditCar;
