import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionSummary, Box, Typography } from '@mui/material'

import { Button } from '@/components/views/Button/Button'
import { theme } from '@/theme/theme'

import { ICVsItemProps } from './CVItem.interfaces'
import { AccordionDetails, ButtonContainer } from './CVItem.styles'

export const CVItem: FC<ICVsItemProps> = ({ CV, handleSetCurrentCV }) => {
  const { t } = useTranslation()

  return (
    <Accordion key={CV.id} sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <Typography>{CV.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ color: 'inherit' }}>
          <Typography>{`${t('name')}: ${CV.name}`}</Typography>
          <Typography>{`${t('description')}: ${CV.description}`}</Typography>
          <Typography>{`${t('education')}: ${CV.education}`}</Typography>
        </Box>
        <ButtonContainer>
          <Button variant="contained" onClick={() => handleSetCurrentCV(CV)}>
            {t('edit')}
          </Button>
        </ButtonContainer>
      </AccordionDetails>
    </Accordion>
  )
}
