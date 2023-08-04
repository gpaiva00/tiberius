import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import { inject } from '@vercel/analytics'
import AppRoutes from './routes/routes'

import './index.css'
import './services/firebase'

inject()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
    <Toaster
      toastOptions={{
        style: {
          borderRadius: '0.375rem',
        },
      }}
    />
  </React.StrictMode>
)
