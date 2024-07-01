import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css'

// Assuming 'root' is the ID of the root element in your HTML file
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);