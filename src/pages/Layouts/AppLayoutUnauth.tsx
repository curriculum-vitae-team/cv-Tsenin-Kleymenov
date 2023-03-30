import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { HeaderUnauthenticated } from '@/components/containers/HeaderUnauthenticated/HeaderUnauthenticated'

export const AppLayoutUnauth: FC = () => {
  return (
    <>
      <HeaderUnauthenticated />
      <Outlet />
    </>
  )
}
