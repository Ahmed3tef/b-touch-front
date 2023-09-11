import React from 'react'

const OrderProduct = ({ product }) => {
  return (
    <div className="order-product" >
      <img src={product.photo} alt={product.name?.en} className='cart-product__image' />
      <div className="cart-product__text">
        <h3>{product.name?.en}</h3>
        <p>{product.description?.en} </p>

        <div className="price">
          <span className="current" style={{
            textDecoration: product.discount_price ? 'line-through' : 'none'
          }}>EGP {product.price}</span>
          {product.discount_percent > 0 && <span className="sale-percentage">
            -{product.discount_percent}%
          </span>}
          {product.discount_price > 0 && <span className="discount">EGP {product.discount_price}</span>}
        </div>
      </div>
    </div>
  )
}

export default OrderProduct