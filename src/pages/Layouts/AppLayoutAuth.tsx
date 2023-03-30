import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { authService } from '@/graphql/auth/authService'

export const AppLayout: FC = () => {
  const { id } = useParams()
  const user = useReactiveVar(authService.user$)

  return (
    <>
      <HeaderAuthenticated />
      <AppBreadcrumbs userId={id || user?.id} />
      <Outlet />
    </>
  )
}
