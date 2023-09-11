import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getDataWithParams,
  loadDataWithParams,
  postDataWithToast,
} from './loadData';

const mainPath = 'customers/cart/';

const initialState = {
  cartItems: [],
  isLoading: true,
  error: null,
  totalPrice: null,
};

// params:{page: number}, id from route.

export const loadCartItems = createAsyncThunk('cart/loadCartItems', thunkAPI =>
  getDataWithParams(thunkAPI, `${mainPath}list`)
);

export const deleteOneItem = createAsyncThunk(
  'cart/deleteOneItem',
  (data, thunkAPI) =>
    postDataWithToast(thunkAPI, `${mainPath}delete-one`, null, {
      variant_color_id: data.id,
    })
);

export const updateOneItem = createAsyncThunk(
  'cart/updateOneItem',
  (data, thunkAPI) =>
    postDataWithToast(thunkAPI, `${mainPath}update`, null, {
      variant_color_id: data.id,
      quantity: data.quantity || 1,
    })
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      postDataWithToast(null, `${mainPath}add`, null, {
        variant_color_id: payload.id,
        quantity: payload.quantity || 1,
      });
    },
    // deleteOne(state, { payload }) {
    //   postDataWithToast(null, `${mainPath}delete-one`, null, {
    //     variant_color_id: payload.id,
    //   });
    // },
    clearCart(state) {
      postDataWithToast(null, `${mainPath}delete-all`);
    },
    updateOne(state, { payload }) {
      postDataWithToast(null, `${mainPath}update`, null, {
        variant_color_id: payload.id,
        quantity: payload.quantity || 1,
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCartItems.pending, (state, action) => {
        state.cartItems = null;
        state.isLoading = true;
        state.error = null;
        state.totalPrice = null;
      })
      .addCase(loadCartItems.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.cartItems = null;
            state.isLoading = false;
            state.error = payload.message;
            state.totalPrice = null;

            return;
          }

          state.cartItems = payload.data?.products;
          state.isLoading = false;
          state.error = null;
          state.totalPrice = payload.data?.total;
        }
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = null;
        state.totalPrice = null;

        state.error = action.payload;
      });

    builder
      .addCase(deleteOneItem.pending, (state, action) => {
        state.cartItems = null;
        state.isLoading = true;
        state.error = null;
        state.totalPrice = null;
      })
      .addCase(deleteOneItem.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.cartItems = null;
            state.isLoading = false;
            state.error = payload.message;
            state.totalPrice = null;

            return;
          }

          state.cartItems = payload.data?.products;
          state.isLoading = false;
          state.error = null;
          state.totalPrice = payload.data?.total;
        }
      })
      .addCase(deleteOneItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = null;
        state.totalPrice = null;

        state.error = action.payload;
      });

    builder
      .addCase(updateOneItem.pending, (state, action) => {
        state.cartItems = null;
        state.isLoading = true;
        state.error = null;
        state.totalPrice = null;
      })
      .addCase(updateOneItem.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.cartItems = null;
            state.isLoading = false;
            state.error = payload.message;
            state.totalPrice = null;

            return;
          }

          state.cartItems = payload.data?.products;
          state.isLoading = false;
          state.error = null;
          state.totalPrice = payload.data?.total;
        }
      })
      .addCase(updateOneItem.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = null;
        state.totalPrice = null;

        state.error = action.payload;
      });
  },
});

export const getCart = state => state.cart;
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
