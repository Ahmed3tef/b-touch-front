import axios from 'axios';
import { APIBase } from './api';
import { toast } from 'react-toastify';

const localToken = sessionStorage.getItem('token')
  ? 'Bearer ' + sessionStorage.getItem('token').toString()
  : null;

const config = {
  headers: {
    Authorization: localToken ? localToken : '',
  },
};

export default async function loadData(thunkAPI, path, token) {
  const authConfig = {
    headers: {
      Authorization: token ? token : localToken,
    },
  };

  return axios
    .get(`${APIBase}${path}`, token ? authConfig : config, thunkAPI)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
}

export async function getDataWithParams(thunkAPI, path, params, token) {
  const config = {
    headers: {
      Authorization: token ? token : localToken,
    },
    params,
  };
  return axios
    .get(`${APIBase}${path}`, config, thunkAPI)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
}

export async function loadDataWithParams(thunkAPI, path, params, data, token) {
  const config = {
    headers: {
      Authorization: token ? token : localToken,
    },
    params,
  };
  return axios
    .post(`${APIBase}${path}`, data, config, thunkAPI)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data;
    });
}

// this is made mainly for cart
export async function postDataWithToast(thunkAPI, path, params, data, token) {
  const ToastId = toast.loading('Loading...');
  const config = {
    headers: {
      Authorization: token ? token : localToken,
    },
    params,
  };
  return axios
    .post(`${APIBase}${path}`, data, config)
    .then(res => {
      if (res.data) {
        toast.update(ToastId, {
          render: `Done Successfully`,
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
      if (err) {
        console.log(err);
        const errMsg =
          err.response?.data?.message ||
          'something wrong happened, please try again.';
        toast.update(ToastId, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
      }
      return err.response.data;
    });
}
export async function deleteWithToast(thunkAPI, path, params, data, token) {
  const ToastId = toast.loading('Loading...');

  const config = {
    headers: {
      Authorization: token ? token : localToken,
    },
    params,
  };

  return axios
    .delete(`${APIBase}${path}`, config)
    .then(res => {
      if (res.data) {
        toast.update(ToastId, {
          render: `Done Successfully`,
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
      if (err) {
        const errMsg = 'something wrong happened, please try again.';
        toast.update(ToastId, {
          render: `${errMsg} ⛔`,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
      }
      return err.response.data;
    });
}

// export async function sendSubmitOrder(path, data) {
//   const config = {
//     headers: {
//       Authorization: token,
//     },
//   };
//   return axios
//     .post(`${APIBase}${path}`, data, config, thunkAPI)
//     .then(res => {
//       return res.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// }
