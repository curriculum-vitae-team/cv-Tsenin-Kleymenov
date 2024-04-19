import { LinearProgress as MuiLinearProgress, styled } from '@mui/material'

export const SkillCard = styled('div')(() => ({
  padding: '8px 16px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  margin: '10px 0',
  border: '1px solid #e0e0e0',
  gap: '12px'
}))

export const LinearProgress = styled(MuiLinearProgress)(() => ({
  minWidth: '150px'
}))

export const SkillName = styled('div')(() => ({
  fontSize: '1rem'
}))
export const SkillInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '30px'
}))
