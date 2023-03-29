import { FC } from 'react'
import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { ContentWrapper } from '@/components/views/ContentWrapper/ContentWrapper'

import { PRIVATE_ROUTES } from './paths'

const AuthenticatedApp: FC = () => {
  return (
    <>
      <HeaderAuthenticated />
      <ContentWrapper>
        <Container maxWidth="xl">
          <AppBreadcrumbs />
          <Routes>
            {PRIVATE_ROUTES.map(route => (
              <Route path={route.path} element={route.element} key={route.path} />
            ))}
          </Routes>
        </Container>
      </ContentWrapper>
    </>
  )
}

export default AuthenticatedApp
