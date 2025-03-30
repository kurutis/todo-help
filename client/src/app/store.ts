import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice';
export let store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});