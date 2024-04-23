import React, { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useReactiveVar } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'

import { Loader } from '@/components/views/Loader/Loader'
import { authService } from '@/graphql/auth/authService'

import { theme } from './theme/theme'

const UnauthenticatedApp = React.lazy(async () => await import('@/router/UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('@/router/AuthenticatedApp'))

const App: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loader color="primary" />}>
        <ToastContainer />
        <Routes>
          {isAuth ? (
            <Route path="*" element={<AuthenticatedApp />} />
          ) : (
            <Route path="*" element={<UnauthenticatedApp />} />
          )}
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
