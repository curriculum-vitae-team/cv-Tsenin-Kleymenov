import React, { FC, useState } from 'react'
import Logout from '@mui/icons-material/Logout'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import { USER_MENU_ITEMS } from '../../../constants/userMenuItems'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserMenuItem } from '../UserMenuItem/UserMenuItem'

import { PaperPropsUserMenu, UserMenuInfo } from './UserMenu.styles'

export const UserMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <UserMenuInfo onClick={handleOpen}>
        <Typography variant="h6">USER_EMAIL</Typography>
        <UserAvatar />
      </UserMenuInfo>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperPropsUserMenu
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.values(USER_MENU_ITEMS).map(item => {
          const { text, icon: Icon } = item
          return <UserMenuItem key={text} onClick={handleClose} text={text} Icon={Icon} />
        })}
        <Divider />
        <UserMenuItem onClick={handleClose} text="Logout" Icon={Logout} />
      </Menu>
    </>
  )
}
