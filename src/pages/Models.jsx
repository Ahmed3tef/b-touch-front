import React, { useEffect, useState } from 'react'

import banner1Img from '../assets/images/banner-1.png';
import banner2Img from '../assets/images/banner-2.png';
import banner3Img from '../assets/images/banner-3.png';
import { Filter, HomeHeader, ModelCard, ModelsLayout, ErrorCard, Spinner, Pagination } from '../components';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadModels } from '../store/reducers/models';


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
const Models = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch()
  const { models, isLoading, error, last_page, vehicle } = useSelector(state => state.models)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadModels({ page: currentPage, id }));
  }, [currentPage]);



  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !error && models?.length > 0 && <div className="responsive models-page">
        <HomeHeader data={data} />
        <Filter />
        <h2 className='font-Playball text-[3.5rem] text-center mt-[3rem]'>{vehicle?.name?.en.toUpperCase()} MODELS</h2>

        <ModelsLayout>{models.map((e, i) => <ModelCard key={i} product={e} />)}</ModelsLayout>

        <Pagination numOfPages={last_page} setPage={setCurrentPage} currentPage={currentPage} />
      </div>}
      {!isLoading && !models && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && models?.length === 0 && <h3>No data found.</h3>}
    </>
  )
}

export default Models


