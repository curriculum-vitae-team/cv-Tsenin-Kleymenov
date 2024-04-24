import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/graphql/auth/client'

import './i18n/i18n'

import { ThemeContextProvider } from './context/ThemeContext'
import App from './App'

import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
