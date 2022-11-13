import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App'
import './index.css'

// Rotas
import { RouterProvider } from 'react-router-dom'
// Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer autoClose={1500} />
    <RouterProvider router={router} />
  </React.StrictMode>
)
