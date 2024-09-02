import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../../Services/apiCompanies";
import { useParams } from "react-router-dom";


const useCompany = () => {
    const {companyId} = useParams();
    const {
      isLoading,
      data: company,
      error,
    } = useQuery({
      queryKey: ["companies", companyId],
      queryFn: ()=>getCompany(companyId),
      retry:false
    });
    return [isLoading, company, error];
  };
  
  export default useCompany;