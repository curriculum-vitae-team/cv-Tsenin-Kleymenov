import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Divider, Drawer, List } from '@mui/material'

import { SideMenuItem } from '@/components/views/SideMenuItem/SideMenuItem'
import { SIDE_MENU_ITEMS } from '@/constants/sideMenuItems'

import { SideMenu, SideMenuBurgerButton, SideMenuCloseButton } from './SideMenu.styles'

export const AppSideMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  return (
    <>
      <SideMenuBurgerButton onClick={handleOpen}>
        <MenuIcon />
      </SideMenuBurgerButton>

      <Drawer anchor="left" open={open}>
        <SideMenu>
          <AppBar color="primary" position="static">
            <SideMenuCloseButton onClick={handleClose}>
              <CloseIcon />
            </SideMenuCloseButton>
          </AppBar>
          <List>
            {Object.values(SIDE_MENU_ITEMS).map(item => {
              const { text, route, icon: Icon } = item
              return (
                <SideMenuItem
                  key={text}
                  onClick={handleClose}
                  text={text}
                  route={route}
                  Icon={Icon}
                />
              )
            })}
          </List>
          <Divider />
        </SideMenu>
      </Drawer>
    </>
  )
}
