import React, { useEffect } from 'react'
import { CartProduct, ErrorCard, Spinner } from '../components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadCartItems } from '../store/reducers/cart-server';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, isLoading, error, totalPrice } = useSelector(state => state.cart)
  useEffect(() => {
    dispatch(loadCartItems())
  }, [])

  const deleteHandler = () => {
    dispatch(deleteOneItem({ id: props.product?.id }))

  }


  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !cartItems && error &&
        <ErrorCard />
      }

      {/* no error no data */}
      {!isLoading && !error && !cartItems && <h3>Your Cart is Empty.</h3>}

      {!isLoading && !error && cartItems && cartItems.length > 1 && <div className='max-w-[85rem] mx-auto my-[5rem] flex flex-col gap-[3rem] items-center'>
        <h2 className='cart-title'>My Shopping Cart  ({cartItems.length} Items)</h2>

        <div className="flex min-w-[75%] flex-col gap-[2rem]">
          {cartItems.map((e, i) => <CartProduct key={i} product={e} path='cart' deleteHandler={deleteHandler} />)}
        </div>
        <div className="cart-total">
          <span className='font-Playball'>Subtotal  (Taxes Included)</span>
          <span className='total-price'>EGP  <span >{totalPrice?.toFixed(2)}</span></span>
        </div>
        <button type='button' className='cart-proceed' onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</button>
      </div>}
      {!isLoading && !error && cartItems && cartItems.length === 0 && <div className='text-center mt-[5rem]'>
        your cart is empty.
      </div>}
    </>
  )
}

export default Cart