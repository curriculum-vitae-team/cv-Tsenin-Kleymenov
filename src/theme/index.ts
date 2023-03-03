import { createTheme } from '@mui/material'

import { sizes } from '../constants/sizes'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16
  },
  palette: {
    primary: {
      main: '#2e2e2e'
    },
    secondary: {
      main: '#c63031'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          width: '100%',
          height: `${sizes.headerSize}px`
        }
      }
    }
  }
})
