import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'
import stockSearchReducer from './reducers/stock-search-reducer'
import headerReducer from './reducers/header-reducer'

const allReducers = combineReducers(
{
  stockSearch: stockSearchReducer,
  header: headerReducer
})
const store = createStore(allReducers,
  {
  header:{sideMenuIsActive:false},
  stockSearch:
  {
    currentCompany:
    {
      symbol:"TRTW",
      name:"Twitter Inc."
    },
    companiesLoaded:false
  }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
   
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
