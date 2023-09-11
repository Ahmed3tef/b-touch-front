import React, { useRef, useState } from 'react'
import { HomeSectionLayout, ProductCard, ProductImages, SectionSplitter, ErrorCard, Spinner } from '../components'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/reducers/cart-server';
import { useEffect } from 'react';
import shareIcon from '../assets/images/share.svg'
import { loadProduct } from '../store/reducers/product';
import { loadRelated } from '../store/reducers/relatedToProduct';
import { postDataWithToast } from '../store/reducers/loadData';
const ProductDetails = () => {
  const navigate = useNavigate();
  const data = [...new Array(12)];
  const { id } = useParams();

  const dispatch = useDispatch()
  const { product, isLoading: ProductIsLoading, error: ProductError } = useSelector(state => state.product)

  const { RelatedProducts, isLoading: RelatedProductsIsLoading, error: RelatedProductsError } = useSelector(state => state.RelatedProducts)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadProduct({ id }));
    dispatch(loadRelated()); // takes products limit
  }, [id]);


  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({
      id,
      quantity: 1
    }))
  }


  const [isLiked, setIsLiked] = useState(false)
  useEffect(() => {
    setIsLiked(product?.wishlist ? true : false)
  }, [product])


  const toggleWishlist = (id) => {
    postDataWithToast(null, `customers/favorites/list`, null, {
      variant_color_id: id
    })
    setIsLiked(prev => !prev)
  }

  // console.log(product);
  return (
    <>
      {ProductIsLoading && <Spinner />}
      {!ProductIsLoading && !ProductError && product && <div className='product-details '>
        <div className=" head-section">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <ProductImages images={product?.photo} />
          </div>
          <div className="w-full lg:w-1/2 sm:px-[2rem] flex flex-col items-center gap-[2rem] lg:px-0">
            <div className="wrapper">
              <div className="head-text">
                <h2>{product.name?.en}</h2>
                <div className="head-icons">
                  <div className="like-icon">
                    <img src={shareIcon} alt="" />
                  </div>
                  <div className='like-icon' onClick={() => toggleWishlist(product.id)}>
                    {!isLiked && <span >
                      <BsHeart />
                    </span>}
                    {isLiked && <span className='text-[#A7111A]'>
                      <BsHeartFill />
                    </span>}
                  </div>
                </div>
              </div>
              <div className="price">
                {product.discount_price && <span className="discount text-[#CE1225]">EGP {product.discount_price}</span>}
                <span className="current" style={{
                  textDecoration: product.discount_price ? 'line-through' : 'none'
                }}>EGP {product.price}</span>
                <span className="sale-percentage">
                  On Sale -{product.discount_price}% Off
                </span>
              </div>
              <SectionSplitter classes='lg:my-[1.5rem]' />
              <div>
                {product.infos?.map(({ key, value }, i) =>
                  <div className='info' key={i}>
                    <span className="info-key">{key.en}</span>
                    <span className="w-[5%]">:</span>
                    <span className="info-value ">{value.en}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='product-details-cta'>
          <button type='button' className='add' onClick={addToCartHandler}>Add to Shopping Cart</button>
        </div>
        <div className="middle-section">
          <div className="wrapper">
            <SectionSplitter />
            <div className="desc">
              <h3>
                ABOUT THIS ITEM:
              </h3>
              <p >
                Maps Navigation Software: Rand Navigation 2.0 Coverage: USA & Canada Lifetime Maps Included: Yes
                Android OS Version 7
                Audio/Video Speakers: 2W AUX Out: 3.5 mm
                USB Connection Micro USB
                Wireless Connectivity Bluetooth: 4.0 Wi-Fi: 802.11 b/g/n
                Screen Size: 5” Screen Resolution (pixels): 480x854 Screen Type: TN panel Touch Panel: Capacitive Display Brightness: 250 Lux Battery Capacity (mAh): 1000 Mount: Suction cup
                Performance Processor Cores: Quad-core (4) Memory: 2GB Storage: 32GB Operating ambient temp.: +14° to +140°F (-10° to +60°C)
              </p>
            </div>
            <SectionSplitter />
            <div className="desc">
              <h3>
                NOTES:
              </h3>
              <p >
                Product with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.
              </p>
            </div>
            <SectionSplitter />
          </div>

        </div>
        <div className='flex-center justify-between sm:px-[5rem]'>
          <h3 className='font-Roboto font-bold md:text-[1.9rem]'>YOU MAY ALSO LIKE:</h3>
          <div
            className='btn-section-head btn-alt'
            onClick={() => navigate('/')}
          >
            View More
          </div>
        </div>
        {RelatedProductsIsLoading && <Spinner />}
        {!RelatedProductsIsLoading && !RelatedProductsError && RelatedProducts && <HomeSectionLayout>
          {RelatedProducts.map((e, i) => <ProductCard key={i} product={e} />)}
        </HomeSectionLayout>}
        {
          !ProductIsLoading && !product && ProductError &&
          <ErrorCard />
        }
      </div>}
      {
        !ProductIsLoading && !product && ProductError &&
        <ErrorCard />
      }
      {/* no Product data */}
      {!ProductIsLoading && !ProductError && product?.length === 0 && <h3>No data found.</h3>}
    </>
  )
}

export default ProductDetails