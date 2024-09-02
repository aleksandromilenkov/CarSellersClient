import React from 'react'
import { useParams } from 'react-router-dom'
import useCompany from './useCompany'
import { Company } from '../../Models/Company'
import { Car as ModelCar } from '../../Models/Car'
import Car from '../Cars/Car'

type Props = {}

const CarCompany = (props: Props) => {
    const [isLoading, company, error] = useCompany();

  return (
    <div>
        <h1>{company.companyName}</h1>
        <h4>{company.companyAddress}</h4>
        { company?.companyCars?.length > 0 ? (
        company.companyCars.map((car:ModelCar, idx:number)=><Car key={idx} {...car}/>)
    ):<p>This company does not sell any cars at the moment.</p>
    }
    </div>
  )
}

export default CarCompany