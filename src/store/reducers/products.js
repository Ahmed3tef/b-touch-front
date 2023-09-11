import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { APIBase } from './api';
import { getDataWithParams } from './loadData';

const initialState = {
  products: [],
  isLoading: true,
  error: null,
  last_page: 0,
};

// params:{page: number}, id from route.

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `products`, {
      page: data.page || 1,
      sort: data.sort || 'featured',
      catId: data.id || 1,
    })
);
export const loadSearchProducts = createAsyncThunk(
  'products/loadSearchProducts',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `products/search`, {
      search: data.search,
      // sort: data.sort || null,
      // sort: data.sort || 'featured',
      page: data.page,
    })
);

export const loadProductsHard = createAsyncThunk(
  'products/loadProductsHard',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `products-main-filter`, {
      page: data.page || 1,
      sort: data.sort || 'featured',
      category_id: data.id || null,
      vehicle_id: data.vehicle || null,
      vehicle_model_id: data.model || null,
      vehicle_year_id: data.year || null,
      vehicle_agency_id: data.agency || null,
    })
);

// one cat:{
// "id": 1,
// "category": {
//     "en": "Kristin Pagac",
//     "ar": "Reyes Johnson",
//     "fr": "fr_name"
// },
// "name": {
//     "en": "Enrique Ankunding",
//     "ar": "Destiney Runolfsson",
//     "fr": "fr_name"
// },
// "photo": "http://192.168.1.25:7000/products/base-product.webp",
// "photoAlt": "alt",
// "price": 2,
// "discount_price": 4,
// "discount_percent": -100,
// "discount_date": "1999-04-09",
// "tags": "unde dolorem et tempore soluta rerum quaerat sed qui eos"
// }

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        state.products = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
      })
      .addCase(loadProducts.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.products = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;

            return;
          }

          state.products = payload.data?.data;
          state.isLoading = false;
          state.error = null;
          state.last_page = payload.data?.last_page;
        }
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = null;
        state.last_page = 0;
        state.error = action.payload;
      })
      .addCase(loadProductsHard.pending, (state, action) => {
        state.products = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
      })
      .addCase(loadProductsHard.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.products = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;
            return;
          }

          state.products = payload.data?.data;
          state.isLoading = false;
          state.error = null;
          state.last_page = payload.data?.last_page;
          // console.log(payload.data);
        }
      })
      .addCase(loadProductsHard.rejected, (state, action) => {
        state.isLoading = false;
        state.products = null;
        state.last_page = 0;
        state.error = action.payload;
      });
    builder
      .addCase(loadSearchProducts.pending, (state, action) => {
        state.products = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
      })
      .addCase(loadSearchProducts.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.products = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;

            return;
          }

          state.products = payload.data?.data;
          state.isLoading = false;
          state.error = null;
          state.last_page = payload.data?.last_page;
        }
      })
      .addCase(loadSearchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = null;
        state.last_page = 0;
        state.error = action.payload;
      });
  },
});

export const getProducts = state => state.products;

export default productsSlice.reducer;
