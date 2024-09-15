import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgersApi } from './burgersApi';
import burgerSlice from './slices/burgerSlice';
import userReducer from './slices/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  [burgersApi.reducerPath]: burgersApi.reducer,
  burger: burgerSlice,
  user: userReducer,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgersApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
