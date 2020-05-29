import { createUseStyles } from 'react-jss'
import * as yup from 'yup'

export const TransactionSchema = yup.object().shape({
  amount: yup.number().moreThan(0).required(),
  card: yup.string().required()
})

export const useNewTransactionViewStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  moneyInput: {
    textAlign: 'center',
    fontSize: '70px'
  }
}))
