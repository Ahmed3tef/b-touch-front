import React from 'react'

const BannerCard3 = ({ data }) => {
  return (
    <div className='banner-2'>
      <div className="title">
        <h2>{data?.title?.en}</h2>
        <p>{data?.description?.en}</p>
      </div>
      <div className="image">
        <img src={data?.banner} alt={data?.bannerAlt || ''} />
      </div>
    </div>
  )
}

export default BannerCard3