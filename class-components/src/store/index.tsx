import { configureStore } from '@reduxjs/toolkit';
import { marvelApi } from '../api/apiSlice';

const store = configureStore({
  reducer: { [marvelApi.reducerPath]: marvelApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
