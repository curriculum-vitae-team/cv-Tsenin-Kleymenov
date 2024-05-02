import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material'

import { SIZES } from '@/constants/sizes'

export const darkTheme: ThemeOptions = responsiveFontSizes(
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
        main: '#2c2c2c'
      },
      info: {
        main: '#b1b1b1',
        light: '#fff'
      },
      background: {
        default: '#313131',
        paper: '#383838'
      },
      text: {
        primary: '#fff',
        secondary: '#808080'
      },
      grey: {
        200: 'rgb(0, 0, 0, 0.15)',
        300: '#454545',
        400: '#c3c3c3'
      },
      divider: '#808080'
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
          },
          contained: {
            ':disabled': {
              color: 'rgba(255, 255, 255, 0.26)',
              backgroundColor: 'rgba(255, 255, 255, 0.12)'
            }
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
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: '#454545',

            '&:nth-of-type(odd)': {
              backgroundColor: '#565656'
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            borderBottom: '1px solid rgb(122 122 122)'
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
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: '#808080'
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              color: '#565656'
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderColor: '#808080',
            color: '#fff',

            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#808080'
            },
            '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: '#565656!important'
            },
            '& .Mui-disabled': {
              color: '#565656!important',
              WebkitTextFillColor: '#565656!important'
            }
          }
        }
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            '.MuiBreadcrumbs-separator ': {
              color: '#808080'
            }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: '#808080'
          }
        }
      }
    }
  })
)
