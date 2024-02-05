import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookieProvider } from './Context/CookiesProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookieProvider>
      <App />
    </CookieProvider>
  </React.StrictMode>
);

