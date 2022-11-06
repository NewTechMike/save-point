import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from './context/user'
import './fonts/press_start_2p/PressStart2P.ttf'
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <UserProvider>
    <BrowserRouter>  
      <App />
    </BrowserRouter>
  </UserProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
