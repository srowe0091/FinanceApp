import { createUseStyles } from 'react-jss'
import * as yup from 'yup'

import bgd from 'media/background.jpg'

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Address').required(),
  password: yup.string().min(5).required()
})

export const useLoginViewStyle = createUseStyles(theme => ({
  container: {
    '--background': `url(${bgd}) top / 170% 130% no-repeat`
  },
  form: {
    padding: theme.spacing(2.5),
    margin: theme.spacing(4, 4, 0),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--borderRadius)',
    backgroundColor: 'var(--alpha50)'
  },
  logo: {
    width: '85px',
    alignSelf: 'center',
    marginBottom: theme.spacing(6),
    borderRadius: 'var(--borderRadius)'
  },
  errorStatus: {
    textTransform: 'uppercase'
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))
