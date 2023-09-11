import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataWithParams } from './loadData';

const initialState = {
  product: {},
  isLoading: true,
  error: null,
};

// params:{page: number}, id from route.

export const loadProduct = createAsyncThunk(
  'product/loadProduct',
  (data, thunkAPI) => getDataWithParams(thunkAPI, `product/${data?.id}`)
);

// one product: {
//   "id": 5,
//   "category": {
//       "id": 1,
//       "name": {
//           "en": "Kristin Pagac",
//           "ar": "Reyes Johnson",
//           "fr": "fr_name"
//       }
//   },
//   "name": {
//       "en": "Mr. Vicente Harris",
//       "ar": "Mr. Duncan Gislason",
//       "fr": "fr_name"
//   },
//   "description": {
//       "en": "Kasey Huel",
//       "ar": "Lucie Heller",
//       "fr": "fr_description"
//   },
//   "photo": [
//       "http://192.168.1.25:7000/products/base-product.webp",
//       "http://192.168.1.25:7000/products/base-product.webp",
//       "http://192.168.1.25:7000/products/base-product.webp",
//       "http://192.168.1.25:7000/products/base-product.webp"
//   ],
//   "photoAlt": "alt",
//   "color": {
//       "id": 201,
//       "name": "Bo Weimann"
//   },
//   "price": 4,
//   "discount_price": 8,
//   "discount_date": "2002-03-01",
//   "tags": "enim natus eaque dignissimos minima eos quo voluptas est est",
//   "infos": [
//       {
//           "id": 297,
//           "key": {
//               "en": "Bryon Koch",
//               "ar": "Merlin Tillman",
//               "fr": "fr_name"
//           },
//           "value": {
//               "en": "Jeromy Bins",
//               "ar": "Lelah Renner",
//               "fr": "fr_value"
//           }
//       },
//       {
//           "id": 1297,
//           "key": {
//               "en": "Mrs. Paige Rohan Jr.",
//               "ar": "Prof. Natalia Mueller",
//               "fr": "fr_name"
//           },
//           "value": {
//               "en": "Danny Kirlin I",
//               "ar": "Ignatius Swaniawski",
//               "fr": "fr_value"
//           }
//       }
//   ],
//   "reviews": []
// }

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loadProduct.pending, (state, action) => {
        state.product = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProduct.fulfilled, (state, { payload }) => {
        if (payload) {
          // console.log(payload);
          if (payload.success === false) {
            state.product = null;
            state.isLoading = false;

            state.error = payload.message;
            return;
          }

          state.product = payload.data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
        state.error = action.payload;
      });
  },
});

export const getProduct = state => state.product;

export default productSlice.reducer;
