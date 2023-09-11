import React, { useState } from 'react'

import { IoMdCart } from 'react-icons/io'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/reducers/cart-server';

import { postDataWithToast } from '../../store/reducers/loadData';

const ProductCard = ({ product }) => {

  const [isLiked, setIsLiked] = useState(product?.wishlist ? true : false)
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({ id: product?.id }))
  }


  const toggleWishlist = (id) => {
    postDataWithToast(null, `customers/favorites/list`, null, {
      variant_color_id: id
    })
    setIsLiked(prev => !prev)
  }


  return (
    <div className='product-card'>
      <img src={product?.photo} alt={product?.photoAlt || ''} onClick={() => navigate(`/product/${product?.id}`)} />
      <h4 onClick={() => navigate(`/product/${product?.id}`)} >{product?.category?.en}</h4>
      <p className='desc'>{product?.name?.en}</p>
      <div className="price">
        <span className='old-price' style={{
          textDecoration: product?.discount_price !== 0 ? 'line-through' : 'none'
        }}>EGP {product?.price}</span>
        {product?.discount_percent !== 0 && <span>-{product?.discount_percent}x%</span>}
        {product?.discount_price !== 0 && <span>EGP {product?.discount_price !== 0 ? product?.discount_price : ''}</span>}
      </div>
      <div className="cta">
        <div className='cta-add' onClick={addToCartHandler}>
          <span className="cart-icon">
            <IoMdCart />

          </span>
          <span>Add To Cart</span>
        </div>
        <div className='like-icon' onClick={() => toggleWishlist(product.id)} >
          {!isLiked && <span >
            <BsHeart />

          </span>}
          {isLiked && <span className='text-[#A7111A]' >
            <BsHeartFill />
          </span>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard