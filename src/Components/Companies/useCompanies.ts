import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../Services/apiCompanies";

const useCompanies = () => {
  const {
    isLoading,
    data: companies,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  return [isLoading, companies, error];
};

export default useCompanies;
