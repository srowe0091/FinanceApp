import { createUseStyles } from 'react-jss'
import * as yup from 'yup'

export const TransactionSchema = yup.object({
  amount: yup.number().moreThan(0).required(),
  description: yup.string(),
  card: yup.string().required(),
  group: yup.bool()
})

export const useTransactionViewStyles = createUseStyles({
  moneyInput: {
    textAlign: 'center',
    fontSize: '70px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})
