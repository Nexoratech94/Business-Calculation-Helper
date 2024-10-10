import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './slices/businessSlice';

export const store = configureStore({
  reducer: {
    business: businessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
