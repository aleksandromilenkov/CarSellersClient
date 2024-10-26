import React from 'react'
import { Car } from '../../Models/Car'
import CarComponent  from "./Car";
import styled from 'styled-components';
import useSearchCar from './useSearchCar';
import LoadingSpinner from '../../UI/LoadingSpinner';
const NoCarsMessage = styled.p`
  text-align: center; /* Center the message */
  color: #666; /* Lighter color */
`;
const OutputedCars = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:0.5rem;
`
const CarsOutputLayout = styled.div`
    width:100%;
    padding:1.5rem;
`
type Props = {
}

const CarsSearchResults = (props: Props) => {
    const [isLoading, cars, error] = useSearchCar();
    if (isLoading) return <LoadingSpinner/>
    if (error) return <div>Error: {error.message}</div>;
  return (
    <CarsOutputLayout>
        {cars?.length === 0 && <NoCarsMessage>No Cars found.</NoCarsMessage>}
        <OutputedCars>
        {cars?.map((car: Car, idx: number) => (
          <CarComponent key={idx} {...car} />
        ))}
        </OutputedCars>
      </CarsOutputLayout>
  )
}

export default CarsSearchResults