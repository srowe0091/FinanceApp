
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { colors } from 'styles'

export const muiTheme = responsiveFontSizes(
  createMuiTheme(({
    palette: {
      finance: colors,
      primary: {
        main: colors.primary,
        contrastText: colors.white
      },
      secondary: {
        main: colors.secondary
      },
      text: {
        secondary: colors.white
      }
    },
    typography: {
      fontFamily: 'Ubuntu'
    }
  }))
)
