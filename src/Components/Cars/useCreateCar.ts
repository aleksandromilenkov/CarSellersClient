import { useMutation } from "@tanstack/react-query";
import { updateUserAPI } from "../../Services/apiAuth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Authentication/userSlice";
import { createCarAPI } from "../../Services/apiCars";

function useCreateCar() {
    const dispatch = useDispatch();
  const { mutate: createCar, isPending:isLoading } = useMutation({
    mutationFn: createCarAPI,
    onSuccess: (data) => {
      toast.success("Car created successfully.");
    },
    onError: (error) => {
      toast.error(`Create failed: ${error.message}`);
    },
  });

  return { createCar, isLoading };
}

export default useCreateCar;
