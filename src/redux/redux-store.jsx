import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
import pathReducer from './pathReducer';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import siteInfoReducer from './siteInfoReducer';

let reducers = combineReducers({
    path: pathReducer,
    auth: authReducer,
    home: homeReducer,
    siteInfo: siteInfoReducer
});

// let store = configureStore({
//     reducer: reducers,
//     middleware: [thunk]
// });

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store.getState();

export default store;