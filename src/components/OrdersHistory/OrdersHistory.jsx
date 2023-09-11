import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ErrorCard, Spinner } from '..';
import { loadHistoryOrders } from '../../store/reducers/orders/history';

import cartIcon from '../../assets/images/Shopping Cart Icon.svg';

const OrdersHistory = () => {

  const dispatch = useDispatch()
  const { historyOrders, isLoading, error } = useSelector(state => state.historyOrders)

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(loadHistoryOrders())

  }, []);

  return (
    <div className="cart ">
      <div className='cart-head'>Orders History</div>
      {!isLoading && !error && historyOrders?.length === 0 && <div className="cart-body h-full flex flex-col justify-center items-center gap-[2rem]">
        <img src={cartIcon} alt="cart icon" />
        <span>No Orders history yet.</span>
      </div>}
      {!isLoading && !error && historyOrders?.length > 0 && <div className="cart-body">
      </div>}
    </div>
  )
}

export default OrdersHistory
