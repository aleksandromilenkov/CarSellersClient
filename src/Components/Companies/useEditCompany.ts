import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCompanyAPI } from "../../Services/apiCompanies";
interface EditCarParams {
    companyInputs: FormData;
    companyId: number | string;
  }

function useEditCompany() {
    const queryClient = useQueryClient(); // Initialize the query client
  const { mutate: editCompany, isPending:isLoading, error } = useMutation({
    mutationFn: ({companyInputs, companyId} :EditCarParams) => editCompanyAPI(companyInputs, companyId),
    onSuccess: (data) => {
      toast.success("Company updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  return { editCompany, isLoading, error };
}

export default useEditCompany;
