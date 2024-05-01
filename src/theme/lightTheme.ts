import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material'

import { SIZES } from '@/constants/sizes'

export const lightTheme: ThemeOptions = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 16,
      h2: {
        fontSize: '1.5rem'
      },
      h5: {
        fontSize: '1rem'
      }
    },
    palette: {
      primary: {
        main: '#c63031'
      },
      secondary: {
        main: '#2e2e2e'
      },
      info: {
        main: '#808080',
        light: '#808080'
      },
      background: {
        default: '#f5f5f7',
        paper: '#fff'
      },
      text: {
        primary: '#2e2e2e'
      },
      grey: {
        200: '#f5f5f7',
        300: '#fafafa',
        400: '#c3c3c3'
      },
      divider: '#e2e2e2'
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            width: '100%',
            height: `${SIZES.headerSize}px`
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
            fontSize: '1.125rem',
            fontWeight: 400,
            boxShadow: 'none',
            textTransform: 'none',

            '&:hover': {
              boxShadow: 'none'
            }
          },
          text: {
            color: '#c63031'
          }
        }
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            height: '100%',
            padding: '0',
            '@media (min-width:600px)': {
              padding: '0'
            }
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
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: '#fafafa',

            '&:nth-of-type(odd)': {
              backgroundColor: '#fff'
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            borderBottom: '1px solid rgba(224, 224, 224, 1)'
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '.MuiDialogContent-root': {
              padding: '25px'
            }
          }
        }
      }
    }
  })
)
