import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { APIBase } from './api';
import { getDataWithParams } from './loadData';

const initialState = {
  models: [],
  isLoading: true,
  error: null,
  last_page: 0,
  vehicle: null,
};

// params:{page: number}, id from route.

export const loadModels = createAsyncThunk(
  'models/loadModels',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `models`, {
      page: data.page || 1,
      vehicle_id: data.id || 1,
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

// vehicle :{
// "id": 7,
// "name": {
//     "en": "Volkswagen ",
//     "ar": " فولكسفاجن "
// }
// }

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadModels.pending, (state, action) => {
        state.models = null;
        state.isLoading = true;
        state.error = null;
        state.last_page = 0;
        state.vehicle = null;
      })
      .addCase(loadModels.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.models = null;
            state.vehicle = null;
            state.isLoading = false;
            state.last_page = 0;
            state.error = payload.message;
            return;
          }

          state.models = payload.data?.models?.data;
          state.isLoading = false;
          state.error = null;
          state.vehicle = payload.data?.vehicle;
          state.last_page = payload.data?.models?.last_page;
        }
      })
      .addCase(loadModels.rejected, (state, action) => {
        state.isLoading = false;
        state.models = null;
        state.last_page = 0;
        state.error = action.payload;
        state.vehicle = null;
      });
  },
});

export const getModels = state => state.models;

export default modelsSlice.reducer;
