import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'

import { IBaseChildrenProps } from '@/appTypes/IBaseChildrenProps.interfaces'
import { useBooleanState } from '@/hooks/useBooleanState'

export const EmployeeAvatarAlert: FC<IBaseChildrenProps> = ({ children }) => {
  const { isVisible, setInvisible } = useBooleanState(true)

  return (
    <Collapse in={isVisible}>
      <Alert
        action={
          <IconButton onClick={setInvisible}>
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
