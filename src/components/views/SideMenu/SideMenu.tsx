import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Divider, Drawer, List } from '@mui/material'

import { SideMenuItem } from '@/components/views/SideMenuItem/SideMenuItem'
import { SIDE_MENU_ITEMS } from '@/constants/sideMenuItems'
import { useBooleanState } from '@/hooks/useBooleanState'

import { AppSideMenu, SideMenuBurgerButton, SideMenuCloseButton } from './SideMenu.styles'

export const SideMenu: FC = () => {
  const [isVisible, toggleVisibility] = useBooleanState()

  return (
    <>
      <SideMenuBurgerButton color="primary" onClick={toggleVisibility}>
        <MenuIcon />
      </SideMenuBurgerButton>
      <Drawer onClose={toggleVisibility} anchor="left" open={isVisible}>
        <AppSideMenu>
          <AppBar color="secondary" position="static">
            <SideMenuCloseButton color="primary" onClick={toggleVisibility}>
              <CloseIcon />
            </SideMenuCloseButton>
          </AppBar>
          <List>
            {Object.values(SIDE_MENU_ITEMS).map(({ text, route, icon: Icon }) => {
              return (
                <SideMenuItem
                  key={text}
                  onClick={toggleVisibility}
                  text={text}
                  route={route}
                  Icon={Icon}
                />
              )
            })}
          </List>
          <Divider />
        </AppSideMenu>
      </Drawer>
    </>
  )
}
