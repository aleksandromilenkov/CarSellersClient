import React from "react";
import useCompanies from "../Components/Companies/useCompanies";
import { CarCompany  as ModelCompany} from "../Utils/Helpers/Types";
import CarCompany from "../Components/Companies/CarCompany";

type Props = {};

const CompaniesPage = (props: Props) => {
  const [isLoading, companies, error] = useCompanies();
  console.log(companies);
  if(isLoading)return <p>Loading...</p>
  return <div>CompaniesPage
    {companies?.map((company : ModelCompany,idx:number)=> <CarCompany company={company}/>)}
  </div>;
};

export default CompaniesPage;
