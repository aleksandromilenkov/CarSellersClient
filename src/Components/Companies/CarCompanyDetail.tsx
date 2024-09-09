import React from 'react'
import useCompany from './useCompany';
import { Car as ModelCar } from '../../Models/Car'
import Car from '../Cars/Car'
import useCompanyCars from './useCompanyCars';

type Props = {}

const CarCompanyDetail = (props: Props) => {
    const [isLoading, company, error] = useCompany();
    const [isLoadingCars, companyCars, errorCars] = useCompanyCars();
    if(isLoading || isLoadingCars) return <p>Loading...</p>
  return (
    <div>CarCompanyDetail
        <h1>{company.companyName}</h1>
        { company?.cars?.length > 0 ? (
        companyCars?.map((car:ModelCar, idx:number)=><Car key={idx} {...car}/>)
    ):<p>This company does not sell any cars at the moment.</p>
    }
    </div>
  )
}

export default CarCompanyDetail