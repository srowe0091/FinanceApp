import { makeStyles } from '@material-ui/core/styles'
import bgd from 'media/logo_background.png'

export const useStyles = makeStyles(theme => ({
  logo: {
    width: '100px',
    alignSelf: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    borderRadius: '20px',
    boxShadow: theme.shadows[3]
  },
  actionButton: {
    left: theme.spacing(4),
    right: theme.spacing(4),
    bottom: theme.spacing(3),
    position: 'absolute'
  },
  wrapper: {
    padding: theme.spacing(0, 4),
    display: 'flex',
    flexDirection: 'column',
    height: '350px',
    background: `url(${bgd})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  errorStatus: {
    marginTop: theme.spacing(5),
    textTransform: 'uppercase'
  }
}))
