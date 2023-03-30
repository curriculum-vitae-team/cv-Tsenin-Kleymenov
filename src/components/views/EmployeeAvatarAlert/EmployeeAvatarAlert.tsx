import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'

import { IEmployeeAvatarAlertProps } from './EmployeeAvatarAlert.interfaces'

export const EmployeeAvatarAlert: FC<IEmployeeAvatarAlertProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true)

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
