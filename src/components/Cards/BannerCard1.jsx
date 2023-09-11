import React from 'react'
import { Link } from 'react-router-dom'
import nextArr from '../../assets/images/nextArr1.svg'
import prevArr from '../../assets/images/prevArr-1.svg'
const BannerCard1 = ({ data, prevHandler, nextHandler }) => {

  return (
    <div className='banner-1'>
      <div className="banner-1-card">


        <img src={data?.banner} alt={data?.bannerAlt} />
        <div className="cta">
          <h1>{data?.title?.en}</h1>
          <p>{data?.description?.en}</p>
          {/* <Link>Buy Now</Link> */}
        </div>
      </div>
    </div>
  )
}

export default BannerCard1