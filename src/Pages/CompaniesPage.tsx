import React from "react";
import useCompanies from "../Components/Companies/useCompanies";
import { CarCompany } from "../Utils/Helpers/Types";

type Props = {};

const CompaniesPage = (props: Props) => {
  const [isLoading, companies, error] = useCompanies();
  console.log(companies);
  return <div>CompaniesPage
    {companies?.map((company : CarCompany,idx:number)=> <p key={idx}>{company.companyName}</p>)}
  </div>;
};

export default CompaniesPage;
