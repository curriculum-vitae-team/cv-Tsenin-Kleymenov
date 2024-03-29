import { styled } from '@mui/material'
import { Box } from '@mui/material'

export const UserMenuInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  }
})

export const MenuContainer = styled('div')({
  display: 'flex'
})

export const PaperPropsUserMenu = {
  minWidth: 170,
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0
  }
}
