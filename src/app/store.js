import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/home/homeSlice';
import clientJobsReducer from '../features/jobs/clientJobsSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,        
        auth: authReducer, 
        home: homeReducer,
        clientJobs: clientJobsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, //for production switch to false
});
