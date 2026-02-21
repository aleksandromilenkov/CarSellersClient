import React from 'react'
import useCompany from './useCompany';
import { Car as ModelCar } from '../../Models/Car'
import Car from '../Cars/Car'
import useCompanyCars from './useCompanyCars';
import LoadingSpinner from '../../UI/LoadingSpinner';
import styled from 'styled-components';

const CarCompanyDetailCarsList = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`
type Props = {}

const CarCompanyDetail = (props: Props) => {
    const [isLoading, company, error] = useCompany();
    const [isLoadingCars, companyCars, errorCars] = useCompanyCars();
    if(isLoading || isLoadingCars) return <LoadingSpinner/>
  return (
    <div>
        <h1 style={{padding:'7px'}}>{company?.companyName}'s cars</h1>
        <CarCompanyDetailCarsList>
          { company?.cars?.length > 0 ? (
              companyCars?.map((car:ModelCar, idx:number)=><Car key={idx} {...car}/>)
            ):<p>This company does not sell any cars at the moment.</p>
          }
      </CarCompanyDetailCarsList>
    </div>
  )
}

export default CarCompanyDetail