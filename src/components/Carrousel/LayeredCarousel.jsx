import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import nextArr from '../../assets/images/nextArr2.svg';
import prevArr from '../../assets/images/prevArr-2.svg';
import { Box } from '@mui/material';


const LayeredCarousel = ({ data }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const length = data?.length;
  const [carouselData, setCarouselData] = useState(Array.from(Object.seal(data)))

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
    setCarouselData(prev => {
      const lastEl = prev.pop()
      prev.unshift(lastEl)
      return prev;
    })
    // carouselData.push(carouselData.shift())
  }
  // console.log(carouselData);

  return (
    <>
      <Box onClick={prevSlide}>
        <img src={prevArr} className='cursor-pointer' />
      </Box>

      <div className="w-full carousel">

        <div className='carousel-container'>
          {carouselData?.map((e, i) =>
            (<img className={`cursor-pointer carousel-item carousel-item-${i + 1}`} src={e.photo || "https://upload.wikimedia.org/wikipedia/commons/5/5f/Grey.PNG"} loading="lazy" data-index={i + 1} onClick={() => navigate(e.link || '/')} key={i} />)
          )}
        </div>
      </div>

      <Box onClick={nextSlide}>
        <img src={nextArr} className='cursor-pointer' />
      </Box>
    </>
  )
}

export default LayeredCarousel