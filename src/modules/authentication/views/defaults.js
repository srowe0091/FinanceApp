import { createUseStyles } from 'react-jss'
import bgd from 'media/logo_background.png'

export const useStyles = createUseStyles(theme => ({
  wrapper: {
    '--background': `url(${bgd}) top / 170% 160% no-repeat`
  },
  form: {
    padding: theme.spacing(2.5),
    margin: theme.spacing(4, 4, 0),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '20px',
    backgroundColor: 'var(--alpha5)'
  },
  logo: {
    width: '85px',
    alignSelf: 'center',
    marginBottom: theme.spacing(6),
    borderRadius: '20px'
  },
  errorStatus: {
    textTransform: 'uppercase'
  },
  button: {
    marginTop: '2rem'
  }
}))
