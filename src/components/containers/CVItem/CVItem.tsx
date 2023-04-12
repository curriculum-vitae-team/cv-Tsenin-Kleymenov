import React, { FC } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionSummary, Box, Typography } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { authService } from '@/graphql/auth/authService'
import { UNBIND_CV } from '@/graphql/cvs/unbindCVMutation'
import { USER } from '@/graphql/user/userQuery'
import { theme } from '@/theme/theme'

import { ICVsItemProps } from './CVItem.interfaces'
import { AccordionDetails, ButtonContainer } from './CVItem.styles'

export const CVItem: FC<ICVsItemProps> = ({ CV, handleSetCurrentCV }) => {
  const user = useReactiveVar(authService.user$)

  const [unbindCVMutation] = useMutation(UNBIND_CV, {
    refetchQueries: [{ query: USER, variables: { id: user?.id } }]
  })

  const unbindCV = async (CVId: string): Promise<void> => {
    await unbindCVMutation({
      variables: { id: CVId }
    })
  }

  return (
    <Accordion key={CV.id} sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <Typography>{CV.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ color: 'inherit' }}>
          <Typography>Name:{CV.name}</Typography>
          <Typography>Description:{CV.description}</Typography>
        </Box>
        <ButtonContainer>
          <Button variant="contained" onClick={() => handleSetCurrentCV(CV)}>
            Edit
          </Button>
          <Button variant="contained" onClick={() => unbindCV(CV.id)}>
            Unassign
          </Button>
        </ButtonContainer>
      </AccordionDetails>
    </Accordion>
  )
}
