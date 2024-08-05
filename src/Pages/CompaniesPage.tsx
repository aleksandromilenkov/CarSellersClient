import React from "react";
import useCompanies from "../Components/Companies/useCompanies";

type Props = {};

const CompaniesPage = (props: Props) => {
  const [isLoading, companies, error] = useCompanies();
  console.log(companies);
  return <div>CompaniesPage</div>;
};

export default CompaniesPage;
