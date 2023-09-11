import React from 'react'
import { useNavigate } from 'react-router-dom';

const HomeSectionTitle = (props) => {

  const navigate = useNavigate();
  const btnClass = props.btn === 'alt' ? 'btn-section-head btn-alt' : 'btn-section-head'
  const textClass = props.btn === 'alt' ? 'text-white' : 'text-color-alt'
  return (
    <div className='w-full flex flex-col items-center text-black'>
      <h3 className={`title-section-head ${textClass}`}>{props.title}</h3>
      <div
        className={btnClass}
        onClick={() => navigate(`${props.path || '/'}`)}
      >
        View More
      </div>
    </div>
  )
}

export default HomeSectionTitle;


