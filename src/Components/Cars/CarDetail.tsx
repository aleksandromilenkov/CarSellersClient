import React from 'react'
import useCar from './useCar'

type Props = {}

const CarDetail = (props: Props) => {
    const [isLoading, car, error] = useCar();
    console.log(car)
    if(isLoading)return <p>Loading...</p>
  return (
    <div>
        <h1>{car?.carModel?.manufacturer.manufacturerName} {car?.carModel.modelName}</h1>
    </div>
  )
}

export default CarDetail