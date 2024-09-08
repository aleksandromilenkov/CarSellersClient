import { useMutation } from "@tanstack/react-query";
import { updateUserAPI } from "../../Services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Authentication/userSlice";
import { createCarAPI } from "../../Services/apiCars";
import { createCarModelAPI } from "../../Services/apiCarModels";

function useCreateCarModel() {
  const { mutate: createCarModel, isPending:isLoading, error } = useMutation({
    mutationFn: createCarModelAPI,
    onSuccess: (data) => {
      toast.success("Car created successfully.");
    },
    onError: (error) => {
      toast.error(`Create failed: ${error.message}`);
    },
  });

  return { createCarModel, isLoading, error };
}

export default useCreateCarModel;
