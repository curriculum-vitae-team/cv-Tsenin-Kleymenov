import { Children, FC, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu } from '@mui/material'

import { IBasicMenuProps } from './BasicMenu.interfaces'

export const BasicMenu: FC<IBasicMenuProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {children && Children.map(children, child => <div onClick={handleClose}>{child}</div>)}
      </Menu>
    </div>
  )
}
