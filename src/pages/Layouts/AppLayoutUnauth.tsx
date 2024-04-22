import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { HeaderUnauthenticated } from '@/components/containers/HeaderUnauthenticated/HeaderUnauthenticated'

export const AppLayoutUnAuth: FC = () => {
  return (
    <>
      <HeaderUnauthenticated />
      <Outlet />
    </>
  )
}
