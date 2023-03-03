import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'

import { SIDE_MENU_ITEMS } from '../../../constants/sideMenuItems'
import { SideMenuItem } from '../SideMenuItem/SideMenuItem'

import { SideMenu, SideMenuBurgerButton, SideMenuCloseButton } from './SideMenu.styles'

export const AppDrawer: FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  return (
    <>
      <SideMenuBurgerButton>
        <MenuIcon onClick={handleOpen} />
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
              const { text, icon: Icon } = item
              return <SideMenuItem key={text} onClick={handleClose} text={text} Icon={Icon} />
            })}
          </List>
          <Divider />
        </SideMenu>
      </Drawer>
    </>
  )
}
