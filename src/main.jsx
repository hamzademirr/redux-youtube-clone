import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './reset.css';
import './styles/overrides.scss';
import './styles/global.scss';

import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
