import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getDataWithParams, postDataWithToast } from './loadData';

const initialState = {
  wishlist: [],
  isLoading: true,
  error: null,
};

export const loadWishList = createAsyncThunk(
  'wishlist/loadWishList',
  thunkAPI => getDataWithParams(thunkAPI, `customers/favorites/list`)
);

export const deleteWishlistItem = createAsyncThunk(
  'wishlist/deleteWishlistItem',
  (data, thunkAPI) =>
    postDataWithToast(thunkAPI, `customers/favorites/list`, null, {
      variant_color_id: data.id,
    })
);

// one wishlist product: {
//     "id": 6,
//     "variant_id": 6,
//     "variant_color_id": 6,
//     "name": {
//         "en": "Maida Schuppe",
//         "ar": "Prof. Kayley Schumm III",
//         "fr": "fr_name"
//     },
//     "description": {
//         "en": "Ines Medhurst II",
//         "ar": "Anthony Schmitt",
//         "fr": "fr_description"
//     },
//     "price": 3,
//     "discount_price": 3,
//     "photo": "http://192.168.1.25:7000/products/base-product.webp",
//     "photoAlt": "alt"
// }

export const citiesSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadWishList.pending, (state, action) => {
        state.wishlist = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWishList.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.wishlist = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.wishlist = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.wishlist = null;
        state.error = action.payload;
      });
    builder
      .addCase(deleteWishlistItem.pending, (state, action) => {
        state.wishlist = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.wishlist = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.wishlist = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.isLoading = false;
        state.wishlist = null;
        state.error = action.payload;
      });
  },
});

export const getCities = state => state.wishlist;

export default citiesSlice.reducer;
