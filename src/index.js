import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./app/api/apiSlice";
//import store from "./redux/redux-store";
import { store } from  './app/store';
import './i18n';

const root = createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={apiSlice}>
        <Provider store={store}>
            <App />
        </Provider>
      </ApiProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
