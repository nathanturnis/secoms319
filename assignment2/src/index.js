import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Test, Test2 } from './script.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test />
    <Test2 />
  </React.StrictMode>
);