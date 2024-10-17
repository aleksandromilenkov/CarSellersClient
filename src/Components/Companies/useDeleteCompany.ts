import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCompanyAPI } from "../../Services/apiCompanies";

function useDeleteCompany() {
  const { mutate: deleteCompany, isPending:isLoading, error } = useMutation({
    mutationFn: deleteCompanyAPI,
    onSuccess: (data) => {
      toast.success("Company deleted successfully.");
    },
    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  return { deleteCompany, isLoading, error };
}

export default useDeleteCompany;
