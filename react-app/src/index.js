import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import TaskDetailProvider from './context/modalprovider' 

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TaskDetailProvider> 
      <App />
      </TaskDetailProvider>  
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
