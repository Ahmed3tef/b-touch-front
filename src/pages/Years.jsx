import React, { useEffect, useState } from 'react'
import banner1Img from '../assets/images/banner-1.png';
import banner2Img from '../assets/images/banner-2.png';
import banner3Img from '../assets/images/banner-3.png';
import { CarYearCard, Filter, HomeHeader, ModelsLayout, ErrorCard, Spinner, Pagination } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadYears } from '../store/reducers/years';
const data = [
  {
    image: banner1Img,
    title: 'some title',
    description: 'some description'
  },
  {
    image: banner2Img,
    title: 'some title',
    description: 'some description'
  },
  {
    image: banner3Img,
    title: 'some title',
    description: 'some description'
  },
];
const Years = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch()
  const { years, isLoading, error, last_page, vehicle, model } = useSelector(state => state.years)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadYears({ page: currentPage, id }));
  }, [currentPage]);

  // console.log(years);

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !error && years?.length > 0 && <div className="responsive">

        <HomeHeader data={data} />
        <Filter />

        <h2 className='font-Playball text-[3.5rem] text-center mt-[3rem]'>{model?.name?.en?.toUpperCase()} GENERATIONS</h2>

        <ModelsLayout>{years.map((e, i) => <CarYearCard key={i} year={e} model={model} vehicle={vehicle} />)}</ModelsLayout>

        <Pagination numOfPages={last_page} setPage={setCurrentPage} currentPage={currentPage} />

      </div>}

      {!isLoading && !years && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && years?.length === 0 && <h3>No data found.</h3>}
    </>
  )
}

export default Years