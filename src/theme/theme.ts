import { createTheme } from '@mui/material'

import { sizes } from '../constants/sizes'

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
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
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontSize: '14px'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#fff',
          fontSize: '14px',
          minWidth: '150px',

          '&.Mui-selected': {
            fontWeight: '600'
          }
        },
        textColorInherit: {
          opacity: 0.9,
          color: 'rgb(46, 46, 46)'
        }
      }
    }
  }
})
