import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CartItem, Grocery} from '../types';
interface GroceryState {
  groceries: Grocery[] | null;
  cartItems: CartItem[] | null;
}
const initialState: GroceryState = {
  groceries: [],
  cartItems: [],
};

const groceriesSlice = createSlice({
  name: 'groceries',
  initialState,
  reducers: {
    setGroceries: (state, action: PayloadAction<Grocery[]>) => {
      state.groceries = action.payload;
    },
    increaseItemQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const item = state.groceries!.find(i => i.id === action.payload.id);
      if (item) {
        item.amount += 1;
        if (item.amount === 1) {
          state.cartItems!.push({...item, amount: 1});
        } else {
          const cartItem = state.cartItems!.find(i => i.id === item.id);
          cartItem!.amount += 1;
        }
      }
    },
    decreaseItemQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const item = state.groceries!.find(i => i.id === action.payload.id);
      if (item && item.amount > 0) {
        item.amount -= 1;
        const cartItemIndex = state.cartItems!.findIndex(
          i => i.id === action.payload.id,
        );
        if (cartItemIndex !== -1) {
          state.cartItems![cartItemIndex].amount -= 1;
          if (state.cartItems![cartItemIndex].amount === 0) {
            state.cartItems!.splice(cartItemIndex, 1);
          }
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems!.filter(
        item => item.id !== action.payload,
      );
      const item = state.groceries!.find(i => i.id === action.payload);
      if (item) {
        item.amount = 0;
      }
    },
    renameItemInCart: (
      state,
      action: PayloadAction<{id: number; customName: string}>,
    ) => {
      const item = state.cartItems!.find(i => i.id === action.payload.id);
      if (item) {
        item.customName = action.payload.customName;
      }
    },
  },
});

export const {
  setGroceries,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  renameItemInCart,
} = groceriesSlice.actions;

export default groceriesSlice.reducer;
