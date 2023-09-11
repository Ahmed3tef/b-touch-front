import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import i18next from "../../i18n";
import { APIBase } from './api';
import { toast } from 'react-toastify';

const initialState = {
  token: null,
  expiresInSeconds: null,
  rememberMe: false,
  isLoading: false,
  error: null,
  expirationDate: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    // const id = toast.loading(t("tWait"));
    const id = toast.loading('logging in please wait');

    return axios
      .post(`${APIBase}customers/login`, user, thunkAPI)
      .then(res => {
        if (res.data?.data?.token) {
          toast.update(id, {
            render: `Nice to see you again`,
            type: 'success',
            isLoading: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            autoClose: 5000,
          });
        }
        return res.data;
      })
      .catch(err => {
        // console.log(err);
        const errMsg = 'User name or Password incorrect.';
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          autoClose: 5000,
        });
        return err.response.data;
      });
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (user, thunkAPI) => {
    // const id = toast.loading(t("tWait"));
    const id = toast.loading('logging in please wait');

    return axios
      .post(`${APIBase}customers/register`, user, thunkAPI)
      .then(res => {
        if (res.data?.success === true) {
          toast.update(id, {
            render: `Nice to see you.`,
            type: 'success',
            isLoading: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            autoClose: 5000,
          });
        }
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
        const errMsg = err.response.data;
        toast.update(id, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          autoClose: 5000,
        });
        return err.response.data;
      });
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    logout(state) {
      //SESSION
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');

      //STORAGE
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');

      state.token = null;
      state.expiresAt = null;
    },
    tryLogin(state) {
      state.token =
        sessionStorage.getItem('token') ?? localStorage.getItem('token');

      if (!state.token) return;

      // const tokenExpiration =
      //   sessionStorage.getItem("tokenExpiration") ??
      //   localStorage.getItem("tokenExpiration");

      // const expiresInMSeconds = +tokenExpiration - new Date().getTime();

      // state.expiresInMSeconds = expiresInMSeconds;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        {
          if (payload && payload.status === false) {
            state.error = payload;
            state.isLoading = false;
            return;
          }
          state.token = payload.data?.token;
          state.expiresInSeconds = +payload.data?.expiration;

          const expirationDate = new Date().getTime() + state.expiresInSeconds;

          localStorage.clear();
          sessionStorage.clear();

          if (state.rememberMe) {
            localStorage.setItem('token', state.token);
            localStorage.setItem('tokenExpiration', expirationDate);
          } else {
            sessionStorage.setItem('token', state.token);
            sessionStorage.setItem('tokenExpiration', expirationDate);
          }

          state.isLoading = false;
          state.error = null;
          state.expirationDate = expirationDate;
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      });
  },
});

export const { logout, setRememberMe, tryLogin } = authSlice.actions;
export default authSlice.reducer;
