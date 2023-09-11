

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './_verification.scss';
import { LargeText, MiniText, SectionSplitter, Selector } from '../components';

import { CartProduct } from '../components'
import { loadUserInfo } from '../store/reducers/user';

import locationIcon from '../assets/images/location-icon.svg'
import phoneIcon from '../assets/images/phone-icon.svg'
import { loadCartItems } from '../store/reducers/cart-server';
import { makeOrder } from '../store/reducers/orders/current';


const Checkout = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, isLoading, error } = useSelector(state => state.user)
  const { cartItems, totalPrice } = useSelector(state => state.cart)

  const [address, setAddress] = useState();

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const shippingFee = 21;

  const finalPrice = totalPrice + shippingFee;


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    dispatch(loadCartItems())
    dispatch(loadUserInfo())
  }, [])

  useEffect(() => {
    setAddress(userInfo && userInfo?.addresses ? userInfo?.addresses[0].addressId : null)
  }, [userInfo]);



  const submitHandler = e => {
    // what is required ??

    if (address) {
      dispatch(makeOrder({ address_id: address }))
      navigate('/orders')
    }

  }

  return (
    <div className='verification px-[4rem] lg:px-[5rem] py-[5rem] font-Orelega'>
      <h2 className='text-center text-[3.5rem] mb-[1.5rem]'>CHECK OUT</h2>
      <div className='flex flex-col lg:flex-row gap-[2rem]'>
        {/* <div className='verification__form w-full lg:w-[68%]'>
          <h2 className='verification__form-title'>
            Shipping & Billing
          </h2>
          <div className='verification__form-input'>
            <div className='flex mb-[1rem]'>
              <MiniText
                label={'First Name'}
                width='70%'
                labelWidth='30%'
                name={firstName}
                setName={setFirstName}
              />
              <MiniText
                label={'Last Name'}
                width='70%'
                labelWidth='30%'
                classes='ml-5'
                name={lastName}
                setName={setLastName}
              />
            </div>
            <div className='flex mb-[1rem]'>
              <MiniText
                label={'Phone'}
                name={phone}
                setName={setPhone}
                width='70%'
                labelWidth='30%'
              />
              <MiniText
                label={'E-mail'}
                name={email}
                setName={setEmail}
                width='70%'
                labelWidth='30%'
                classes='ml-5'
              />
            </div>
            <div className='flex mb-[1rem]'>
              <Selector
                label={'Country'}
                id={countryId}
                setId={setCountryId}
                data={countries}
                width='70%'
              />
              <Selector
                label={'Governorate'}
                id={governmentId}
                setId={setGovernmentId}
                data={governments}
                width='70%'
                classes='ml-5'
              />
            </div>

            <Selector
              label={'City'}
              id={cityId}
              setId={setCityId}
              data={cities}
              width='90%'
              classes='mb-5'
            />
            <LargeText
              label={'Address'}
              width='90%'
              desc={address}
              setDesc={setAddress}
            />
          </div>
          <h2 className='verification__form-title mt-5'>
            Additional Information
          </h2>
          <div className='verification__form-input'>
            <LargeText
              label={'Order Notes (Optional)'}
              height={'10rem'}
              width='90%'
              desc={additionalInfo}
              setDesc={setAdditionalInfo}
            />
          </div>
        </div> */}
        {/* {!isLoading && !error && userInfo && */}
        {/* <div className="cart-page"> */}
        <div className="cart-info">
          <div className="info-section">
            <div className="section-header">
              <h3>Add Address Choices</h3>
            </div>
            <div className="section-body">
              <h4>Select your shipping address</h4>
              <div className="addresses">
                {
                  userInfo?.addresses?.map((e, i) => {
                    return <div className='address' key={i}>
                      <label htmlFor={i} key={i} onClick={() => { setAddress(e.addressId) }}>
                        <input type="radio" value={i} name={'price'} id={i} defaultChecked={i === 0 && true} />
                        <div className="option-text-container">
                          <div className="option-location">
                            <img src={locationIcon} className="option-icon" />
                            <span className="option-text">
                              {`${e?.addressName} - ${e?.streetName} - ${e?.buildingNameOrNo}`}
                            </span>

                          </div>

                          <div className="option-phone">
                            <img src={phoneIcon} className="option-icon" />
                            <span className="option-text">
                              {userInfo?.phone_1}
                            </span>

                          </div>

                        </div>
                      </label>
                    </div>
                  })
                }


              </div>

            </div>
          </div>


          <div className="info-section">
            <div className="section-header">
              <h3>Payment Methods</h3>
            </div>
            <div className="section-body">
              <h4>How do you want to pay for your order?</h4>

              <div className='payment px-[2rem]'>
                <label htmlFor={'cash'}   >
                  <input type="radio" value={'cash'} name={'payment'} id={'cash'} defaultChecked />
                  <div className="option-text-container">
                    <span className="option-text">
                      Cash On Delivery.
                    </span>
                  </div>
                </label>
                <label htmlFor={'card'}   >
                  <input type="radio" value={'card'} name={'payment'} id={'card'} />
                  <div className="option-text-container">
                    <span className="option-text">
                      Credit Card.
                    </span>
                  </div>
                </label>
              </div>

            </div>
          </div>


          <div className="info-section">
            <div className="section-header">
              <h3>Delivery Instructions</h3>
            </div>
            <div className="section-body">
              <h4>Add your Delivery Instructions</h4>

              <div className=' px-[2rem]'>
                <textarea name="notes" id="notes" maxLength={500}></textarea>
              </div>

            </div>
          </div>


        </div>

        <div className='verification__info w-full lg:w-[25%]'>
          <h2 className='verification__info-title'>Your Order</h2>
          <div className='verification__info-container'>
            <div className='verification__info-products'>
              <h3 className='verification__info-products--title'>Products</h3>
              <div className='verification__info-products--wrapper'>
                {cartItems && cartItems.map((e, i) => {
                  return (
                    <CartProduct product={e} key={i} />

                  );
                })}
              </div>
              <div className="px-[2rem]">

                <div className='total '>
                  <h3 className='total-title'>Subtotal</h3>
                  <span className='total-price'>EGP {totalPrice}</span>
                </div>
                <div className='total '>
                  <h3 className='total-title'>Shipping Fee</h3>
                  <span className='total-price text-black'>EGP {shippingFee}</span>
                </div>
                <SectionSplitter />
                <div className='total '>
                  <h3 className='total-title'>Total (Taxes Included)</h3>
                  <span className='total-price'>EGP {finalPrice}</span>
                </div>
              </div>

              {/* <div className='payment'>
                <h3 className='payment-title'>Payment Methods</h3>
                <div className='flex px-[2rem] justify-between'>
                  <div className='payment-option'>
                    <label className='cursor-pointer text-[#4C4C4C] text-[1.7rem]'>
                      <input
                        type='radio'
                        value='cash'
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      Cach On Delivery
                    </label>
                  </div>
                  <div className='payment-option'>
                    <label className='cursor-pointer text-[#4C4C4C] text-[1.8rem]'>
                      <input
                        type='radio'
                        value='card'
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      Pay With VISA
                    </label>
                  </div>
                </div>
              </div> */}
            </div >
          </div >
          <p className='text-center text-[#4C4C4C]'>By clicking "Complete Order", you agree our <span className='text-[2rem] cursor-pointer text-black' onClick={() => navigate('/privacy')}>Privacy Policy</span> </p>
          <div className='form-btns'>
            <div className='form-btn' onClick={submitHandler}>
              Complete Order
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div >
  )
}

export default Checkout;








//   import axios from 'axios';
//  import React, { useEffect, useState } from 'react';
//  import { useDispatch, useSelector } from 'react-redux';
//  import { useNavigate, useParams } from 'react-router-dom';
//   import { toast } from 'react-toastify';
//  import { LargeText, MiniText, PageTitle, Selector } from '../components';
//   import { APIBase } from '../store/reducers/api';
//   import { loadCities } from '../store/reducers/cities';
//   import { loadCountries } from '../store/reducers/countries';
//   import { loadGovernments } from '../store/reducers/governments';
//  import './_verification.scss';
//  const Checkout = props => {


   // const countries = useSelector(state => state.countries.countries);
//   // const governments = useSelector(state => state.governments.governments);
//   // const cities = useSelector(state => state.cities.cities);




//   // useEffect(() => {
//   //   dispatch(loadCountries());
//   // }, [dispatch]);
//   // useEffect(() => {
//   //   dispatch(loadGovernments(countryId));
//   // }, [dispatch, countryId]);
//   // useEffect(() => {
//   //   dispatch(loadCities(governomentId));
//   // }, [dispatch, governomentId]);
//   // useEffect(() => {
//   //   window.scrollTo({ top: 0, behavior: 'smooth' });
//   // }, [params]);

//   // const cartItems = JSON.parse(localStorage.getItem('cart'))
//   //   ? JSON.parse(localStorage.getItem('cart'))
//   //   : null;
//   // const submitHandler = e => {
//   //   // what is required ??
//   //   const products = cartItems.map(item => {
//   //     return {
//   //       productId: item.product.id,
//   //       priceId: item.product.priceId,
//   //       quantity: item.count,
//   //     };
//   //   });
//   //   // console.log(products);

//   //   const data = {
//   //     firstName,
//   //     lastName,
//   //     phone,
//   //     email,
//   //     countryId,
//   //     governomentId,
//   //     cityId,
//   //     address,
//   //     products,
//   //     additionalInformation: additionalInfo ? additionalInfo : '',
//   //     couponId: '',
//   //   };
//   //   // console.log(data);



