import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { APIBase } from './api';
import { getDataWithParams } from './loadData';

const initialState = {
  provinces: [],
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadProvinces = createAsyncThunk(
  'provinces/loadProvinces',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `customers/province/${data.id}`)
);

// one prov:{
//     "id": 27,
//     "name": {
//         "en": "Pietro Durgan",
//         "ar": "Nora Roberts",
//         "name": "ehab"
//     }
// }

export const provincesSlice = createSlice({
  name: 'provinces',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadProvinces.pending, (state, action) => {
        state.provinces = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProvinces.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.provinces = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          const data = payload.data?.map(e => {
            return {
              id: e.id,
              name: e.name.en,
            };
          });
          state.provinces = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadProvinces.rejected, (state, action) => {
        state.isLoading = false;
        state.provinces = null;
        state.error = action.payload;
      });
  },
});

export const getProvinces = state => state.provinces;

export default provincesSlice.reducer;
