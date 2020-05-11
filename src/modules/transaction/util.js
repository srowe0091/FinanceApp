import { createUseStyles } from 'react-jss'
import * as yup from 'yup'

export const TransactionSchema = yup.object().shape({
  amount: yup.number().moreThan(0).required(),
  card: yup.string().required()
})

export const useNewTransactionViewStyles = createUseStyles(theme => ({
  wrapper: {
    height: '100%',
    margin: theme.spacing(0, 2),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    left: 0,
    right: 0,
    bottom: theme.spacing(2),
    position: 'absolute'
  },
  moneyInput: {
    textAlign: 'center',
    fontSize: '70px'
  },
  close: {
    marginRight: theme.spacing(1)
  }
}))
