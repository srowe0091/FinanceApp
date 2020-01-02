import { createUseStyles } from 'react-jss'
import bgd from 'media/logo_background.png'

export const useStyles = createUseStyles({
  wrapper: {
    '--background': `url(${bgd}) top / 170% 159% no-repeat`
  },
  form: {
    padding: '0 2rem',
    margin: '2rem 3.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  logo: {
    width: '100px',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    borderRadius: '20px',
    // boxShadow: theme.shadows[3]
  },
  actionButton: {
    left: 32,
    right: 32,
    bottom: 24,
    position: 'absolute'
  },
  errorStatus: {
    textTransform: 'uppercase'
  }
})
