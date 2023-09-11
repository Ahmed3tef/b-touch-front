import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataWithParams } from './loadData';

const initialState = {
  RelatedProducts: [],
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadRelated = createAsyncThunk(
  'RelatedProducts/loadRelated',
  (data, thunkAPI) =>
    getDataWithParams(thunkAPI, `products/rand`, {
      limit: data?.limit || 10,
    })
);

export const RelatedProductsSlice = createSlice({
  name: 'RelatedProducts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadRelated.pending, (state, action) => {
        state.RelatedProducts = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRelated.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.RelatedProducts = null;
            state.isLoading = false;

            state.error = payload.message;
            return;
          }

          state.RelatedProducts = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadRelated.rejected, (state, action) => {
        state.isLoading = false;
        state.RelatedProducts = null;
        state.error = action.payload;
      });
  },
});

export const getRelatedProducts = state => state.RelatedProducts;

export default RelatedProductsSlice.reducer;
