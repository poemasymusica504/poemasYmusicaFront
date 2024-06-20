import React from 'react'
import ReactDOM from 'react-dom/client'
import MyApp from './App.tsx'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './infrastructure/querys/queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyApp />
    </QueryClientProvider>
  </React.StrictMode>,
)
