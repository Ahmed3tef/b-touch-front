import React, { useEffect, useState } from 'react'
import { BrandCard, ErrorCard, HomeSectionLayout, Pagination, Spinner } from '../components'

import { loadBrands } from '../store/reducers/brands';
import { useDispatch, useSelector } from 'react-redux';
const Brands = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch()
  const { brands, isLoading, error, last_page } = useSelector(state => state.brands)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadBrands({ page: currentPage }));
  }, [currentPage]);


  return (

    <>
      {isLoading && <Spinner />}
      {!isLoading && !error && brands && <div className='brands'>

        <h2>BRANDS WE TRUST</h2>

        <HomeSectionLayout>
          {brands.map((e, i) => <BrandCard key={i} image={e.photo} name={e.photoAlt} />)}
        </HomeSectionLayout>

        <Pagination numOfPages={last_page} setPage={setCurrentPage} currentPage={currentPage} />
      </div>}

      {!isLoading && !brands && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && brands?.length === 0 && <h3>No data found.</h3>}
    </>
  )
}

export default Brands