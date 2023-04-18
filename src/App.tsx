import React, { FC, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useReactiveVar } from '@apollo/client'

import { Loader } from '@/components/views/Loader/Loader'
import { authService } from '@/graphql/auth/authService'

const UnauthenticatedApp = React.lazy(async () => await import('@/router/UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('@/router/AuthenticatedApp'))

const App: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)

  return (
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
  )
}

export default App
