import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NUIProvider, sendMessage } from './NUI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NUIProvider>
    <App />
  </NUIProvider>
);