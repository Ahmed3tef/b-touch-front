import React, { useRef, useState } from 'react'
import pImg_1 from '../../assets/images/hm.webp';
import pImg_2 from '../../assets/images/dark-brand.jpg';

const ProductImages = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const imagesList = images ? images : [
    pImg_1,
    pImg_2,
    pImg_1,
    pImg_2,
  ]
  const mainImg = useRef();
  const handleMainImage = (index) => {
    setImageIndex(index);
    // set image preview
    // if (product.images)
    //   mainImg.current.src = `${APIBase}${product.images[index]?.imageUrl}`;
  };
  return (
    <div className='images-container'>
      <div className="main-img">
        <img
          ref={mainImg}
          src={
            // product.mainImage ? `${APIBase}${product.mainImage}` : ""
            imagesList[imageIndex]
          }
          alt="product-img"
        />
      </div>

      <ul className="images-list">
        {imagesList.map((image, index) => (
          <li
            key={index}
            onClick={() => handleMainImage(index)}
            className="product__preview-item"
          >
            <img
              src={image}
              alt="product-img"
            />
          </li>
        ))}
      </ul>

    </div>
  )
}

export default ProductImages