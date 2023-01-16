import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import uiReducer from '../features/uiSlice';
import foodReducer from '../features/foodSlice';
import orderReducer from '../features/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    food: foodReducer,
    order: orderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
