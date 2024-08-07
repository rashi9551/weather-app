import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "sonner";
import { ToastContainer } from 'react-toastify';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <Toaster position="top-center" expand={true} richColors/>
    <App />

  </React.StrictMode>,
)
