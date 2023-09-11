import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { APIBase } from './api';
import { getDataWithParams } from './loadData';

const initialState = {
  categories: [],
  isLoading: true,
  error: null,
  last_page: 0,
};

// params:{page: number}, id from route.

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `categories`, {
      page: data.page || 1,
    })
);

// one cat:{
//   "id": 31,
//   "name": {
//       "en": "Irving O'Hara",
//       "ar": "Mrs. Hope Bins II",
//       "fr": "fr_name"
//   },
//   "photo": "http://192.168.1.25:7000/sub-categories-lg/large-image.png",
//   "tags": "",
//   "photoAlt": ""
// },

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.categories = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
      })
      .addCase(loadCategories.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.categories = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;
            return;
          }

          state.categories = payload.data?.data;
          state.isLoading = false;
          state.error = null;
          state.last_page = payload.data?.last_page;
        }
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categories = null;
        state.last_page = 0;
        state.error = action.payload;
      });
  },
});

export const getCategories = state => state.categories;

export default categoriesSlice.reducer;
