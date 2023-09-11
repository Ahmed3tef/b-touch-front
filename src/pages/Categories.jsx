import React, { useEffect, useState } from 'react'
import { CategoryCard, ErrorCard, Filter, HomeSectionLayout, Pagination, Spinner } from '../components'
import { loadCategories } from '../store/reducers/categories';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {

  const dispatch = useDispatch()
  const data = [...new Array(12)];
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, isLoading, error, last_page } = useSelector(state => state.categories)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadCategories({ page: currentPage }));
  }, [currentPage]);

  return (
    <>
      <Filter />
      <div className="categories ">
        <h2>
          Our Categories
        </h2>

        {isLoading && <Spinner />}


        {!isLoading && !error && categories && <>
          <HomeSectionLayout>
            {categories.map((e, i) => <CategoryCard key={i} product={e} />)}
          </HomeSectionLayout>

          <Pagination numOfPages={last_page} setPage={setCurrentPage} currentPage={currentPage} />
        </>}

        {!isLoading && !categories && error &&
          <ErrorCard />
        }

        {/* no error no data */}
        {!isLoading && !error && categories?.length === 0 && <h3>No data found.</h3>}

      </div>
    </>
  )
}

export default Categories