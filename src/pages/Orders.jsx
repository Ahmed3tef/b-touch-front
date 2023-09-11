import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOverlay, ErrorCard, OrderProduct, OrdersHistory, Spinner } from '../components';
import { cancelOrder, loadCurrentOrders } from '../store/reducers/orders/current';
import carImg from '../assets/images/lambo.webp'

import locationIcon from '../assets/images/location-icon.svg'
import phoneIcon from '../assets/images/phone-icon.svg'
import { useNavigate } from 'react-router-dom';

const product = {
  image: carImg,
  description: 'Rand McNally TND 550 5-inch GPS Truck Navigator Easy-to-Read Display Custom Truck Routing and Rand Navigation 2.0 (Renewed).',
  name: 'GPS Truck Navigator',
  price: {
    old: 240,
    discount: 120,
    percent: 50
  },
}


const Orders = (props) => {
  const dispatch = useDispatch()
  const { currentOrders, isLoading, error } = useSelector(state => state.currentOrders)
  const [orderIdToCancel, setOrderIdToCancel] = useState()
  const [deleteOverlay, setDeleteOverlay] = useState(false)
  const navigate = useNavigate()

  console.log(currentOrders);
  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(loadCurrentOrders())

  }, []);
  const cancelOrderHandler = () => {
    dispatch(cancelOrder({ id: orderIdToCancel }));
    setDeleteOverlay(false)
    navigate('/orders')
  }

  // console.log(currentOrders);
  return (
    <div className='flex flex-col container-mx'>
      {/* <PageNavigation title1='Home' path1='/' title2={'My Orders'} /> */}

      <h2 className='text-center text-[2.8rem] lg:text-[3.5rem] mb-[1.5rem] font-Orelega mt-[3rem]'>YOUR ORDERS</h2>
      {!isLoading && !error && currentOrders && currentOrders.length > 0 &&
        <div className="cart-page">
          <div className="cart-info">
            <div className="info-section">
              <div className="section-header bg-[#087DA7]">
                <h3>Current Orders</h3>
              </div>
              <div className="section-body flex flex-col gap-[3rem]">
                {currentOrders.map((e, i) =>
                  <div className="order" key={i}>
                    <div className="order-head">
                      <span>Order Receipted</span>

                      <span className='text-black '>Order Code:
                        <span className='text-[#055A78] ml-[1rem]'>#12345678</span>
                      </span>
                    </div>

                    <div className="order-body">
                      <div className="order-products">

                        {e.products?.map((p, i) => <OrderProduct product={p} key={i} />)
                        }
                      </div>
                      <div className="order-address">
                        <h3 className='text-[1.9rem] mb-[1rem] text-[#055A78]'>Shipping Address</h3>
                        <div className="option-text-container ml-[1rem]">
                          <div className="option-location">
                            <img src={locationIcon} className="option-icon" />
                            <span className="option-text">
                              {`${e.address?.city?.name?.ar} - ${e.address?.addressName} - ${e.address?.streetName} - ${e.address?.buildingNameOrNo} - ${e.address?.floorApartmentNo} - ${e.address?.nearestLandMark}`}

                            </span>

                          </div>

                          <div className="option-phone">
                            <img src={phoneIcon} className="option-icon" />
                            <span className="option-text">
                              {/* {userInfo.phoneNumber} */}
                              {e.phone_1}
                            </span>

                          </div>

                        </div>
                        <div className="cta flex justify-center">

                          <button type='button' className='mx-auto px-[2rem] py-[.5rem] bg-btnRed text-white text-[1.9rem] hovering-btn rounded-[1rem]'
                            onClick={() => {
                              setOrderIdToCancel(e.id)
                              console.log(e.id);
                              setDeleteOverlay(true)
                            }}>Cancel Order</button>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <OrdersHistory /> */}
          {deleteOverlay && <DeleteOverlay deleteTitle='Order' deleteHandler={cancelOrderHandler} setDeleteOverlay={setDeleteOverlay} />}
        </div>
      }


      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorCard />}
      {!isLoading && !error && !currentOrders || currentOrders?.length === 0 && <h1>No orders yet.</h1>}
    </div>
  )
}

export default Orders
