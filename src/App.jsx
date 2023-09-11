import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Footer, LoginForm, Navbar, SignUpForm } from './components';
import {
  Home,
  Categories,
  Brands,
  About,
  Privacy,
  ContactUs,
  Terms,
  Products,
  ProductDetails,
  Years,
  Models,
  Cart,
  Checkout,
  Orders,
  Account,
  Wishlist,
  Address
} from './pages';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PrivateRoutes = () => {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token')
  return (token ? <Outlet /> : <Navigate to='/login' />)
}

const App = () => {




  return (
    <>
      <Navbar />
      <main>
        <Routes>

          <Route element={<PrivateRoutes />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/account' element={<Account />} />
            <Route path="/address" element={<Address />} >
              <Route path="/address/:id" element={<Address />} />
            </Route>
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products/search/:searchText" element={<Products path='search' />} />
          <Route path="/products" element={<Products />} >
            <Route path=":id" element={<Products />} />
          </Route>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/years/:id" element={<Years />} />
          <Route path="/models/:id" element={<Models />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignUpForm />} />

          {/* route doesn't match */}
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>

        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          rtl={false}
          autoClose={5000}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
      <Footer />
    </>
  );
};

export default App;
