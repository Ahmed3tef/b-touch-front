import { createSlice } from '@reduxjs/toolkit';

const localStorageCart = JSON.parse(localStorage.getItem('cart') || '[]');

const initialState = {
  items:
    localStorageCart && localStorageCart.products
      ? localStorageCart.products
      : [],
  totalQuantity:
    localStorageCart && localStorageCart.totalQuantity
      ? localStorageCart.totalQuantity
      : 0,
  totalPrice:
    localStorageCart && localStorageCart.totalPrice
      ? localStorageCart.totalPrice
      : 0,
};

const setLocalCart = cart => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const localCartSlice = createSlice({
  name: 'localCart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        item => item.id === newItem.product.id
      );
      state.totalQuantity = state.totalQuantity + newItem.quantity;

      state.totalPrice += newItem.price * newItem.quantity;

      if (!existingItem || existingItem.variant !== newItem.variant) {
        state.items.push({
          id: newItem.product?.id,
          name: newItem.product?.name,
          description: newItem.product?.description,
          notes: newItem.notes || '',
          price: newItem.price,
          totalPrice: newItem.quantity * newItem.price,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      setLocalCart({
        products: state.items,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
      });
    },
    removeProductFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.items = state.items.filter(item => item.id !== id);
      state.totalPrice -= existingItem.totalPrice;
      state.totalQuantity -= existingItem.quantity;

      setLocalCart({
        products: state.items,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
      });
    },
    increaseProductNumber(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      const newItems = state.items.map(item => {
        if (item.id === id) {
          item.quantity++;
          item.totalPrice = item.quantity * item.price;
        }
        return item;
      });
      state.items = newItems;
      state.totalQuantity++;
      state.totalPrice += existingItem.price;

      setLocalCart({
        products: state.items,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
      });
    },

    decreaseProductNumber(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem.quantity !== 1) {
        const newItems = state.items.map(item => {
          if (item.id === id) {
            item.quantity--;
            item.totalPrice = item.quantity * item.price;
          }
          return item;
        });
        state.items = newItems;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
      setLocalCart({
        products: state.items,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
      });
    },
  },
});

export const cartActions = localCartSlice.actions;

export default localCartSlice.reducer;
