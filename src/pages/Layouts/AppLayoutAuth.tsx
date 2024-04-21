import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import { AppBreadcrumbs } from '@/components/views/Breadcrumbs/Breadcrumbs'
import { useUser } from '@/hooks/useUser'

import { Content, ContentWrapper } from './AppLayoutAuth.styles'

const AppLayout: FC = () => {
  const { id } = useParams()
  const { user } = useUser()
  const currentId = id || user?.id

  return (
    <Content>
      <AppBreadcrumbs id={currentId} />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Content>
  )
}

export default AppLayout
