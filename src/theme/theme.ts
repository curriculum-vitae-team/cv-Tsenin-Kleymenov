import { createTheme } from '@mui/material'

import { sizes } from '@/constants/sizes'

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,

    h5: {
      fontSize: '16px'
    }
  },
  palette: {
    primary: {
      main: '#c63031'
    },
    secondary: {
      main: '#2e2e2e'
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
        },
        text: {
          color: '#c63031'
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          height: '100%'
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
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    }
  }
})
