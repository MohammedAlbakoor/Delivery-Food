import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <App />
          <Toaster position="top-center" />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
