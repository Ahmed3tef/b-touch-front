import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataWithParams } from './loadData';

const initialState = {
  brands: [],
  last_page: 0,
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadBrands = createAsyncThunk(
  'brands/loadBrands',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `brands`, {
      page: data.page || 1,
    })
);

// one brand: {
//   "id": 1,
//   "name": "Reva Hills PhD",
//   "photo": "http://192.168.1.25:7000/brands-lg/large-image.png",
//   "photoAlt": "Reva Hills PhD"
// },

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadBrands.pending, (state, action) => {
        state.brands = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
      })
      .addCase(loadBrands.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.brands = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;
            return;
          }

          state.brands = payload.data?.data;
          state.last_page = payload.data?.last_page;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.brands = null;
        state.last_page = 0;
        state.error = action.payload;
      });
  },
});

export const getBrands = state => state.brands;

export default brandsSlice.reducer;
