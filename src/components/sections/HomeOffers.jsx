import React from 'react'
import { HomeSectionLayout, HomeSectionTitle, ProductCard } from '..'

const HomeOffers = ({ data }) => {

  return (
    <div className='bg-black py-[2rem]'>
      <div className="container-mx my-10">
        <HomeSectionTitle title='BEST OFFERS' path='/best-offers' btn='alt' />
        <HomeSectionLayout>
          {data.map((e, i) => <ProductCard key={i} product={e} />)}
        </HomeSectionLayout>

      </div>
    </div>
  )
}

export default HomeOffers