import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'

import { IEmployeeAvatarAlert } from './EmployeeAvatarAlert.interfaces'

export const EmployeeAvatarAlert: FC<IEmployeeAvatarAlert> = ({ children }) => {
  const [open, setOpen] = useState(true)

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        variant="filled"
        severity="error"
      >
        {children}
      </Alert>
    </Collapse>
  )
}
