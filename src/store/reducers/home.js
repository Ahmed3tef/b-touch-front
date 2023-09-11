import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataWithParams } from './loadData';

const initialState = {
  mainAds: [],
  newArrivals: [],
  PopularCategories: [],
  sectionAds: [],
  bestOffers: [],
  brands: [],

  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadHome = createAsyncThunk(
  'catAllShops/loadHome',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `home`, {
      limit: data?.limit || 12,
    })
);

export const catAllShopsSlice = createSlice({
  name: 'catAllShops',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadHome.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.mainAds = null;
        state.newArrivals = null;
        state.PopularCategories = null;
        state.sectionAds = null;
        state.bestOffers = null;
        state.brands = null;
      })
      .addCase(loadHome.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.mainAds = null;
            state.newArrivals = null;
            state.PopularCategories = null;
            state.sectionAds = null;
            state.bestOffers = null;
            state.brands = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          const data = payload.data;

          state.mainAds = data.mainAds;
          state.newArrivals = data.newArrivals;
          state.PopularCategories = data.PopularCategories;
          state.sectionAds = data.sectionAds;
          state.bestOffers = data.bestOffers;
          state.brands = data.brands;

          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadHome.rejected, (state, action) => {
        state.isLoading = false;
        state.mainAds = null;
        state.newArrivals = null;
        state.PopularCategories = null;
        state.sectionAds = null;
        state.bestOffers = null;
        state.brands = null;
        state.error = action.payload;
        console.log(action);
      });
  },
});

export default catAllShopsSlice.reducer;
