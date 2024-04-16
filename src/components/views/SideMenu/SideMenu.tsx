import { FC } from 'react'
import { useLocation } from 'react-router'
import { List } from '@mui/material'

import { SideMenuItem } from '@/components/views/SideMenuItem/SideMenuItem'
import { SIDE_MENU_ITEMS } from '@/constants/sideMenuItems'

import { Sidebar } from './SideMenu.styles'

export const SideMenu: FC = () => {
  const { pathname } = useLocation()

  const pathnameArray = pathname.split('/').filter(item => item)

  return (
    <Sidebar>
      <div className="wrapper">
        <div className="list">
          <List sx={{ p: 0 }}>
            {Object.values(SIDE_MENU_ITEMS).map(({ text, route, icon: Icon }) => {
              return (
                <SideMenuItem
                  key={text}
                  text={text}
                  route={route}
                  Icon={Icon}
                  isActive={pathnameArray[0] === route}
                />
              )
            })}
          </List>
        </div>
      </div>
    </Sidebar>
  )
}
