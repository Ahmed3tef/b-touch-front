import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loadData from './loadData';

const initialState = {
  countries: null,
  isLoading: false,
  error: null,
};

export const loadCountries = createAsyncThunk(
  'countries/loadCountries',
  thunkAPI => loadData(thunkAPI, `customers/country`)
);

// one country:
// {
//     "id": 1,
//     "name": {
//         "en": "Phoebe Monahan",
//         "ar": "Allen Kreiger",
//         "fr": "fr_name"
//     }
// }

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.countries = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.countries = null;
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
          state.countries = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.countries = null;
        state.error = action.payload;
      });
  },
});

export const getCountries = state => state.countries;

export default countriesSlice.reducer;
