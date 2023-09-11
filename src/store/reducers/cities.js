import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getDataWithParams } from './loadData';

const initialState = {
  cities: [],
  isLoading: true,
  error: null,
};

export const loadCities = createAsyncThunk(
  'cities/loadCities',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `customers/city/${data.id}`)
);

// one city:{
//     "id": 27,
//     "name": {
//         "en": "Pietro Durgan",
//         "ar": "Nora Roberts",
//         "name": "ehab"
//     }
// }

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCities.pending, (state, action) => {
        state.cities = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCities.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.cities = null;
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

          state.cities = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.isLoading = false;
        state.cities = null;
        state.error = action.payload;
      });
  },
});

export const getCities = state => state.cities;

export default citiesSlice.reducer;
