import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import AppRoutes from './routes/routes'
import { inject } from '@vercel/analytics'

import './services/firebase'
import './index.css'

inject()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
    <Toaster />
  </React.StrictMode>
)
