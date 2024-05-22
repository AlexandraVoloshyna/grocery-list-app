import {configureStore} from '@reduxjs/toolkit';
import groceriesSlice from './groceries.slice';

export const store = configureStore({
  reducer: {
    groceries: groceriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
