import React from 'react'

import quotes from '../../assets/images/quotes.svg'

import avatar from '../../assets/images/avatar.png'

import { Ratings } from '..';

const Testimonial = ({ text, name, image, rating }) => {
  return (
    <div className='testimonial'>
      {/* <p className='quotes'>“</p> */}
      <img src={quotes} alt="quotes" className='quotes-img' />
      <p className="testimonial-text">
        {text}
      </p>
      <span className='testimonial-border'></span>

      <div className="testimonial-user">
        <img src={image ? image : avatar} alt="user-image" />
        <div className="testimonial-user-info">
          <p>{name}</p>
          <Ratings value={rating} color={'#ECC66A'} />
        </div>
      </div>

    </div>
  )
}

export default Testimonial