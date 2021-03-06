import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './config/configurestore'
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>       
            <App />    
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
  