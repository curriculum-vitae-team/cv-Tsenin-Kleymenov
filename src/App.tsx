import React, { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useReactiveVar } from '@apollo/client'
import { ThemeProvider } from '@mui/material'

import { Loader } from '@/components/views/Loader/Loader'
import { authService } from '@/graphql/auth/authService'

import { Theme } from './constants/theme'
import { useThemeContext } from './context/ThemeContext'
import { BodyContainer } from './styles/App.styles'
import { darkTheme } from './theme/darkTheme'
import { lightTheme } from './theme/lightTheme'

const UnauthenticatedApp = React.lazy(async () => await import('@/router/UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('@/router/AuthenticatedApp'))

const App: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)

  const { theme: themeMode } = useThemeContext()

  const theme = themeMode !== Theme.DARK ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <BodyContainer>
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
      </BodyContainer>
    </ThemeProvider>
  )
}

export default App
