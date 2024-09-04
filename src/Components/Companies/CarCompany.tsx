import React from 'react'
import useCompany from './useCompany'
import { Link } from 'react-router-dom';
import { CarCompany as ModelCompany } from '../../Utils/Helpers/Types';

type Props = {
    company:ModelCompany
}

const CarCompany = ({company}: Props) => {
  return (
    <div>
        <h1>{company.companyName}</h1>
        <h4>{company.address}</h4>
        <Link to={`/companies/${company.companyID}`}>View Company</Link>
    </div>
  )
}

export default CarCompany