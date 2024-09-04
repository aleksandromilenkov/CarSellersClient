import React from 'react'
import useCompany from './useCompany';
import { Car as ModelCar } from '../../Models/Car'
import Car from '../Cars/Car'

type Props = {}

const CarCompanyDetail = (props: Props) => {
    const [isLoading, company, error] = useCompany();
    if(isLoading) return <p>Loading...</p>
  return (
    <div>CarCompanyDetail
        <h1>{company.companyName}</h1>
        { company?.cars?.length > 0 ? (
        company.cars.map((car:ModelCar, idx:number)=><Car key={idx} {...car}/>)
    ):<p>This company does not sell any cars at the moment.</p>
    }
    </div>
  )
}

export default CarCompanyDetail