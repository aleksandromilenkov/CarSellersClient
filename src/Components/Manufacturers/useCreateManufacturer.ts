import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createManufacturerAPI } from "../../Services/apiManufacturers";

function useCreateManufacturer() {
  const { mutate: createManufacturer, isPending:isLoading, error } = useMutation({
    mutationFn: createManufacturerAPI,
    onSuccess: (data) => {
      toast.success("Manufacturer created successfully.");
    },
    onError: (error) => {
      toast.error(`Create failed: ${error.message}`);
    },
  });

  return { createManufacturer, isLoading, error };
}

export default useCreateManufacturer;
