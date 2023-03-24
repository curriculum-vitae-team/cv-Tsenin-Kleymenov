import { FC } from 'react'
import { Route, Routes } from 'react-router'

import { HeaderUnauthenticated } from '@/components/containers/HeaderUnauthenticated/HeaderUnauthenticated'

import { PUBLIC_ROUTES } from './paths'

const UnauthenticatedApp: FC = () => {
  return (
    <>
      <HeaderUnauthenticated />
      <Routes>
        {PUBLIC_ROUTES.map(route => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </>
  )
}

export default UnauthenticatedApp
