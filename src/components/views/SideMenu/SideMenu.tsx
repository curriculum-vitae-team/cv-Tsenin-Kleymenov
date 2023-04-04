import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Divider, Drawer, List } from '@mui/material'

import { SideMenuItem } from '@/components/views/SideMenuItem/SideMenuItem'
import { SIDE_MENU_ITEMS } from '@/constants/sideMenuItems'

import { AppSideMenu, SideMenuBurgerButton, SideMenuCloseButton } from './SideMenu.styles'

export const SideMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  return (
    <>
      <SideMenuBurgerButton color="primary" onClick={handleOpen}>
        <MenuIcon />
      </SideMenuBurgerButton>
      <Drawer onClose={handleClose} anchor="left" open={open}>
        <AppSideMenu>
          <AppBar color="secondary" position="static">
            <SideMenuCloseButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </SideMenuCloseButton>
          </AppBar>
          <List>
            {Object.values(SIDE_MENU_ITEMS).map(({ text, route, icon: Icon }) => {
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
        </AppSideMenu>
      </Drawer>
    </>
  )
}
