import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./store"
import {Provider} from "react-redux"
import { CookiesProvider } from 'react-cookie' ;
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* グローバルで値を使用できるように */}
    <Provider store={store}>
      <CookiesProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
