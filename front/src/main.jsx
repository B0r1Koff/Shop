import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createContext } from 'react'
import UserStore from './store/userStore.js'
import queryClient from './queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'

// export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>

      {/* <Context.Provider value={{
        user: new UserStore()
      }}> 
        
        <App />
      </Context.Provider> */}

      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      
    </React.StrictMode>
  </BrowserRouter>,
)
