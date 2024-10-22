import React from "react";
import useCompanies from "../Components/Companies/useCompanies";
import { CarCompany  as ModelCompany} from "../Utils/Helpers/Types";
import CarCompany from "../Components/Companies/CarCompany";
import styled from "styled-components";

const CompaniesContainer =styled.div`
width: 80%;
 margin: 0 auto;

`

type Props = {};


const CompaniesPage = (props: Props) => {
  const [isLoading, companies, error] = useCompanies();
  console.log(companies);
  if(isLoading)return <p>Loading...</p>
  return <CompaniesContainer>
    {companies?.map((company : ModelCompany,idx:number)=> <CarCompany key={idx} company={company}/>)}
  </CompaniesContainer>;
};

export default CompaniesPage;
