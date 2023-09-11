import React from 'react'
import { Link } from 'react-router-dom'

const BrandCard = (props) => {
  return (
    <Link className='home-brand'>
      <img src={props.image} alt={props.name} />
    </Link>
  )
}

export default BrandCard