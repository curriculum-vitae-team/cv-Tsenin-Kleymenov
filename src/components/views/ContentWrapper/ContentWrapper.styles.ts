import { styled } from '@mui/material'

import { SIZES } from '@/constants/sizes'

export const Content = styled('div')(() => ({
  height: `calc(100vh - ${SIZES.headerSize}px)`,
  overflow: 'auto',

  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: '#e8e8e8'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    backgroundColor: '#2e2e2e'
  }
}))
