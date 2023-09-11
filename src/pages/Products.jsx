import React, { useEffect, useState } from 'react'
import { HomeSectionLayout, Pagination, ProductCard, ErrorCard, Spinner, SortList } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, loadProductsHard, loadSearchProducts } from '../store/reducers/products';
import { useParams, useSearchParams } from 'react-router-dom';
const Products = (props) => {


  const [currentPage, setCurrentPage] = useState(1);
  const { id, searchText } = useParams();
  const dispatch = useDispatch()
  const { products, isLoading, error, last_page } = useSelector(state => state.products)

  const [sort, setSort] = useState('')
  // if (props.path === 'search') { console.log(products) }
  const [searchParams] = useSearchParams();


  // console.log(searchText);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    if (searchText) {
      dispatch(loadSearchProducts({ search: searchText, page: currentPage }));
      return
    }
    // this req is for get products depending on v_id, model_id, cat_id, agency, year
    if (!searchText && [...searchParams].length > 0) {
      dispatch(loadProductsHard({ page: currentPage, id, sort, ...Object.fromEntries([...searchParams]) }));

      // console.log(Object.fromEntries([...searchParams]));
      //  vehicle_id, vehicle_model_id, vehicle_year_id,vehicle_agency_id

    } if (!searchText && ![...searchParams].length > 0) {
      dispatch(loadProducts({ page: currentPage, id, sort }));
    }
  }, [currentPage, sort, searchText]);




  // console.log('1');

  return (
    <>
      {!isLoading && !error && products?.length > 0 && < div className='products' >
        <div className="products-sort">
          <SortList id={sort} setId={setSort} />
        </div>
        <HomeSectionLayout>
          {products.map((e, i) => <ProductCard key={i} product={e} />)}
        </HomeSectionLayout>

        <Pagination numOfPages={last_page} setPage={setCurrentPage} currentPage={currentPage} />
      </div >}

      {isLoading && <Spinner />}
      {!isLoading && !products && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && products?.length === 0 || !products && <h3 className='text-center my-[4rem] text-[3rem]'>No data found.</h3>}
    </>
  )
}

export default Products