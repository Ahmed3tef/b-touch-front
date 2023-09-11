import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loadData, { postDataWithToast } from '../loadData';

const initialState = {
  currentOrders: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadCurrentOrders = createAsyncThunk(
  'currentOrders/loadCurrentOrders',
  thunkAPI => loadData(thunkAPI, `customers/auth/my-orders`)
);
export const makeOrder = createAsyncThunk(
  'currentOrders/makeOrder',
  (data, thunkAPI) => {
    console.log(data);
    postDataWithToast(thunkAPI, `customers/orders`, null, data);
  }
);
export const cancelOrder = createAsyncThunk(
  'currentOrders/makeOrder',
  (data, thunkAPI) => {
    console.log(data);
    postDataWithToast(thunkAPI, `customers/orders-cancel/${data.id}`);
  }
);

export const currentOrdersSlice = createSlice({
  name: 'currentOrders',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadCurrentOrders.pending, (state, action) => {
        state.currentOrders = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCurrentOrders.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.currentOrders = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.currentOrders = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCurrentOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.currentOrders = null;
        state.error = action.payload;
      });
  },
});

export const getCurrentOrders = state => state.currentOrders;

export default currentOrdersSlice.reducer;
