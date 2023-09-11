import React, { useEffect } from 'react'
import { CartProduct, ErrorCard, Spinner } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistItem, loadWishList } from '../store/reducers/wishlist';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading, error } = useSelector(state => state.wishlist)

  useEffect(() => {
    dispatch(loadWishList())
  }, [])

  const deleteHandler = (e) => {
    const id = e.target.dataset.product;
    dispatch(deleteWishlistItem({ id }))
    // console.log(e.target.dataset.product);
  }

  // console.log(wishlist);
  return (
    <>
      <h2 className='text-center text-[2.8rem] lg:text-[3.5rem] mb-[1.5rem] font-Orelega mt-[3rem]'>My Favorites</h2>

      {!isLoading && !error && wishlist && <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] p-[2rem] mb-[3rem]">
        {wishlist.map((e, i) => <CartProduct key={i} path='wishlist' product={e} deleteHandler={deleteHandler} />)}
      </div>}

      {isLoading && <Spinner />}

      {!isLoading && !wishlist && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && !wishlist || wishlist?.length === 0 && <h3 className='text-center'>Add some products to show.</h3>}

    </>
  )
}

export default Wishlist