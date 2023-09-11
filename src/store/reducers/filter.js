import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { APIBase } from './api';
import { getDataWithParams } from './loadData';

const initialState = {
  FilterData: {},
  v_model: null,
  v_agencies: null,
  v_years: null,
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadFilterData = createAsyncThunk(
  'FilterData/loadFilterData',
  thunkAPI => getDataWithParams(thunkAPI, `home/filter`)
);
export const loadV_Model = createAsyncThunk(
  'FilterData/loadV_Model',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `data/filter-list/${data?.id}`)
);

export const FilterDataSlice = createSlice({
  name: 'FilterData',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadFilterData.pending, (state, action) => {
        state.FilterData = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFilterData.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.FilterData = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.FilterData = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadFilterData.rejected, (state, action) => {
        state.isLoading = false;
        state.FilterData = null;
        state.error = action.payload;
      })
      .addCase(loadV_Model.pending, (state, action) => {
        state.v_model = null;
        state.v_agencies = null;
        state.v_years = null;
      })
      .addCase(loadV_Model.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.v_model = null;
            state.v_agencies = null;
            state.v_years = null;
            state.error = payload.message;
            return;
          }
          state.v_model = payload.data?.models;
          state.v_agencies = payload.data?.agencies;
          state.v_years = payload.data?.years;
          state.error = null;
        }
      })
      .addCase(loadV_Model.rejected, (state, action) => {
        state.v_model = null;
        state.v_agencies = null;
        state.v_years = null;
        state.error = action.payload;
      });
  },
});

export const getProducts = state => state.FilterData;

export default FilterDataSlice.reducer;
