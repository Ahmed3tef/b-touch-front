import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loadData from "../loadData";

const initialState = {
  historyOrders: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

export const loadHistoryOrders = createAsyncThunk(
  "historyOrders/loadHistoryOrders",
  (thunkAPI) => loadData(thunkAPI, `api/orders/customers/history`)
);

export const historyOrdersSlice = createSlice({
  name: "historyOrders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadHistoryOrders.pending, (state, action) => {
        state.historyOrders = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadHistoryOrders.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.status === 0) {
            state.historyOrders = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          state.historyOrders = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadHistoryOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.historyOrders = null;
        state.error = action.payload;
      });
  },
});

export const getHistoryOrders = (state) => state.historyOrders;

export default historyOrdersSlice.reducer;
