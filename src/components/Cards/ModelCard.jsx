import React from 'react'
import carImage from '../../assets/images/lambo.webp';
import frontLayer from '../../assets/images/model-svg-2.svg'
import backLayer from '../../assets/images/model-svg-1.svg'
import { useNavigate } from 'react-router-dom';
const ModelCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className='model-card' onClick={() => navigate(`/years/${product.id}`)}>
      <div className="back-layer">
        <img src={backLayer} alt="" />
      </div>
      <div className="car-image">
        <img src={product?.photo || carImage} alt={product?.name?.en || ""} />
      </div>
      <div className="front-layer">
        <img src={frontLayer} alt="" />
        <span>{product?.name?.en}</span>
      </div>
    </div>
  )
}

export default ModelCard