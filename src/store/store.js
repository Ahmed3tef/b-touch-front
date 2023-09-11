import { configureStore } from '@reduxjs/toolkit';
import {
  cart,
  historyOrders,
  currentOrders,
  categories,
  brands,
  home,
  products,
  models,
  years,
  product,
  RelatedProducts,
  filter,
  auth,
  cities,
  countries,
  provinces,
  wishlist,
  user,
} from './reducers';

export const store = configureStore({
  reducer: {
    // home reducers
    home,
    // //category reducers
    categories,
    brands,
    products,
    models,
    // orders
    historyOrders,
    currentOrders,
    // cart
    cart,
    // //areas
    // areas,
    years,
    product,
    RelatedProducts,
    filter,
    auth,
    cities,
    countries,
    provinces,
    wishlist,
    user,
  },
});
