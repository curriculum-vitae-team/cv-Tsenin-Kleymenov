import { AccordionDetails as MuiAccordionDetails, Box, styled } from '@mui/material'

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export const ButtonContainer = styled(Box)(() => ({
  width: '250px',
  display: 'flex',
  alignItems: 'center'
}))
