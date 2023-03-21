import { FC, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'

import { IEmployeeAvatarAlert } from './EmployeeAvatarAlert.interfaces'

export const EmployeeAvatarAlert: FC<IEmployeeAvatarAlert> = ({ children }) => {
  const [open, setOpen] = useState(true)
  
  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton onClick={() => setOpen(false)}>
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
