import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'
import { Container } from '@mui/material'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { ContentWrapper } from '@/components/views/ContentWrapper/ContentWrapper'
import { authService } from '@/graphql/auth/authService'

export const AppLayout: FC = () => {
  const { id } = useParams()
  const user = useReactiveVar(authService.user$)
  const currentId = id || user?.id

  return (
    <>
      <HeaderAuthenticated />
      <ContentWrapper>
        <Container maxWidth="xl">
          <AppBreadcrumbs id={currentId} />
          <Outlet />
        </Container>
      </ContentWrapper>
    </>
  )
}
