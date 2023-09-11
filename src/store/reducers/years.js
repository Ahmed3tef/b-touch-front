import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getDataWithParams } from './loadData';

const initialState = {
  years: [],
  model: null,
  isLoading: true,
  error: null,
  last_page: 0,
  vehicle: null,
};

// params:{page: number}, id from route.

export const loadYears = createAsyncThunk('years/loadYears', (data, thunkAPI) =>
  getDataWithParams(thunkAPI, `years`, {
    page: data.page || 1,
    model_id: data.id || 1,
  })
);

// one model:{
//   "id": 129,
//   "name": {
//       "en": "Saul Towne",
//       "ar": "Mr. Colten McKenzie PhD"
//   },
//   "photo": ""
// }

export const yearsSlice = createSlice({
  name: 'years',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadYears.pending, (state, action) => {
        state.years = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
        state.vehicle = null;
        state.model = null;
      })
      .addCase(loadYears.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.years = null;
            state.vehicle = null;
            state.model = null;

            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;
            return;
          }

          state.years = payload.data?.years;
          state.isLoading = false;
          state.error = null;
          state.vehicle = payload.data?.vehicle;
          state.last_page = payload.data?.years?.last_page;
          state.model = payload.data?.model;
        }
      })
      .addCase(loadYears.rejected, (state, action) => {
        state.isLoading = false;
        state.years = null;
        state.last_page = 0;
        state.error = action.payload;
        state.vehicle = null;
        state.model = null;
      });
  },
});

export const getYears = state => state.years;

export default yearsSlice.reducer;
