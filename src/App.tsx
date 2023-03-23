import { FC, Suspense } from 'react'
import { useReactiveVar } from '@apollo/client'

import { Header } from '@/components/containers/Header/Header'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { Loader } from '@/components/views/Loader/Loader'
import { authService } from '@/graphql/auth/authService'
import { AppRouter } from '@/router/AppRouter'

const App: FC = () => {
  const isAuth = useReactiveVar(authService.access_token$)

  return (
    <>
      <Suspense fallback={<Loader color="primary" />}>
        <Header />
        {isAuth && <AppBreadcrumbs />}
        <AppRouter />
      </Suspense>
    </>
  )
}

export default App
