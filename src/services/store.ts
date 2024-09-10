import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgersApi } from './burgersApi';

const rootReducer = combineReducers({
  [burgersApi.reducerPath]: burgersApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgersApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
