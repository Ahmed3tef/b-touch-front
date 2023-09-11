import React from 'react'
import carImage from '../../assets/images/car.png';
import { useNavigate } from 'react-router-dom';


const CarYearCard = ({ year, model, vehicle }) => {

  const navigate = useNavigate();

  return (
    <div className='car-year'>
      <div className="car-year__ribbon">{year?.year} {model?.name?.en}</div>
      <div className="car-year__options">
        {year?.agency?.map((e, i) => <span onClick={() => navigate(`/products?vehicle=${vehicle?.id}&model=${model?.id}&year=${year?.id}&agency=${e.id}`)} key={i}>{e.name?.en}</span>)}

      </div>
      <img src={year?.photo || carImage} alt="" />
    </div>
  )
}

export default CarYearCard