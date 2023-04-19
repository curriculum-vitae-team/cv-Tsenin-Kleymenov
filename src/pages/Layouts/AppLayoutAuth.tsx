import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Container } from '@mui/material'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { ContentWrapper } from '@/components/views/ContentWrapper/ContentWrapper'
import { useUser } from '@/hooks/useUser'

export const AppLayout: FC = () => {
  const { id } = useParams()
  const { user } = useUser()
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
