import { Children, FC } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu } from '@mui/material'

import { useMenu } from '@/hooks/useMenu'

import { IBasicMenuProps } from './BasicMenu.interfaces'

export const BasicMenu: FC<IBasicMenuProps> = ({ children }) => {
  const { anchorEl, handleClick, handleClose } = useMenu()

  return (
    <div>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
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
