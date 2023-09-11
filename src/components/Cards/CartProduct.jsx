import React from 'react'
import carImg from '../../assets/images/lambo.webp';

import closeIcon from '../../assets/images/close.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const product = {
  image: carImg,
  description: 'Rand McNally TND 550 5-inch GPS Truck Navigator Easy-to-Read Display Custom Truck Routing and Rand Navigation 2.0  (Renewed).',
  name: 'GPS Truck Navigator',
  price: {
    old: 240,
    discount: 120,
    percent: 50
  },
}

const CartProduct = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='cart-product'>
      <img src={props.product?.photo || product.image} alt={product.name} className='cart-product__image' />
      <div className="cart-product__text">
        <h3>{props.product?.name?.en || product.name}</h3>
        <p>{props.product?.description?.en || product.description} </p>

        <div className="price">
          <span className="current" style={{
            textDecoration: props.product?.discount_price ? 'line-through' : 'none'
          }}>EGP {props.product?.price || product.price.old}</span>
          {props.product?.discount_percent && <span className="sale-percentage">
            -{props.product?.discount_percent}%
          </span>}
          {props.product?.discount_price && <span className="discount">EGP {props.product?.discount_price}</span>}
          {props.path === 'wishlist' && <div className="cta flex justify-center mx-auto">

            <button type='button' className='mx-auto px-[2rem] py-[.5rem] bg-[#087DA7] text-white text-[1.9rem] hovering-btn rounded-[1rem]'>Add To Shopping Cart</button>
          </div>}
        </div>
      </div>
      {
        props.deleteHandler && <span className="close" onClick={props.deleteHandler}>
          <img src={closeIcon} alt="close icon" data-product={props.product?.id} />
        </span>
      }

    </div>
  )
}

export default CartProduct