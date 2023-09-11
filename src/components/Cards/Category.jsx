import React from 'react'
import catImg from '../../assets/images/dark-brand.jpg';
import { useNavigate } from 'react-router-dom';


const Category = ({ category }) => {
  const navigate = useNavigate();
  return (
    <div className='category-card' onClick={() => navigate(`products/${category.id}`)}>
      <img src={category.photo || catImg} alt="" />
      <h4 >{category.name?.en || 'Car Body Cover'}</h4>
    </div>
  )
}

export default Category