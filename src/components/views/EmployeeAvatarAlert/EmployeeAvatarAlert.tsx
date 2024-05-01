import { FC } from 'react'
import { Alert, Collapse } from '@mui/material'

import { useBooleanState } from '@/hooks/useBooleanState'

import { CloseButton } from '../CloseButton/CloseButton'

import { IEmployeeAvatarAlertProps } from './EmployeeAvatarAlert.interfaces'

export const EmployeeAvatarAlert: FC<IEmployeeAvatarAlertProps> = ({ children }) => {
  const { isVisible, setInvisible } = useBooleanState(true)

  return (
    <Collapse in={isVisible}>
      <Alert action={<CloseButton onClick={setInvisible} />} variant="filled" severity="error">
        {children}
      </Alert>
    </Collapse>
  )
}
