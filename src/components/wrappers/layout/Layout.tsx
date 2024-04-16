import { FC } from 'react'

import { HeaderAuthenticated } from '@/components/containers/HeaderAuthenticated/HeaderAuthenticated'
import { SideMenu } from '@/components/views/SideMenu/SideMenu'

import { IProps } from './Layout.interfaces'
import { ApplicationContainer, ApplicationContent } from './Layout.styles'

const Layout: FC<IProps> = ({ children }) => {
  return (
    <ApplicationContainer>
      <HeaderAuthenticated />
      <ApplicationContent>
        <SideMenu />
        {children}
      </ApplicationContent>
    </ApplicationContainer>
  )
}

export default Layout
