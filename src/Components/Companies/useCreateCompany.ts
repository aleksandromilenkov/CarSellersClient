import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCompanyAPI } from "../../Services/apiCompanies";

function useCreateCompany() {
  const { mutate: createCompany, isPending:isLoading, error } = useMutation({
    mutationFn: createCompanyAPI,
    onSuccess: (data) => {
      toast.success("Company created successfully.");
    },
    onError: (error) => {
      toast.error(`Create failed: ${error.message}`);
    },
  });

  return { createCompany, isLoading, error };
}

export default useCreateCompany;
