import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';

import rootReducers from './redux/reducers';


//tao object store
// const store = createStore(rootReducers, composeWithDevTools());
const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)
ReactDOM.render(
  
  <Provider store ={store}>
  
       
           <App/>
       
        
  </Provider>
  ,
  document.getElementById('root')
);

