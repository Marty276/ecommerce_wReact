import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { CartProvider } from './contexts/Cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
      <App />
    </CartProvider>
)
