import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loadData, { deleteWithToast, postDataWithToast } from './loadData';

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

// params:{page: number}, id from route.

const addressUrl = 'customers/profile/address';

export const createAddress = createAsyncThunk(
  'userInfo/createAddress',
  (data, thunkAPI) => postDataWithToast(thunkAPI, `${addressUrl}`, null, data)
);

export const deleteAddress = createAsyncThunk(
  'userInfo/deleteAddress',
  (data, thunkAPI) => deleteWithToast(thunkAPI, `${addressUrl}/${data.id}`)
);

export const updateAddress = createAsyncThunk(
  'userInfo/updateAddress',
  (data, thunkAPI) =>
    postDataWithToast(thunkAPI, `${addressUrl}/${data?.id || ''}`, null, {
      address: data.address,
    })
);

export const loadUserInfo = createAsyncThunk(
  'userInfo/loadUserInfo',
  thunkAPI => loadData(thunkAPI, `customers/auth/info`)
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadUserInfo.pending, (state, action) => {
        state.userInfo = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserInfo.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.userInfo = null;
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          state.userInfo = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.userInfo = null;
        state.error = action.payload;
      });
  },
});

export const getUserInfo = state => state.userInfo;

export default userInfoSlice.reducer;
