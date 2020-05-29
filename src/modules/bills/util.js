import * as yup from 'yup'
import { createUseStyles } from 'react-jss'

export const NewBillSchema = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().moreThan(0).required(),
  dueDate: yup.number().required(),
  type: yup.string(),
  notes: yup.string(),
})

export const initialNewBill = {
  name: '',
  amount: 0,
  dueDate: '',
  type: '',
  notes: ''
}

export const useBillsStyles = createUseStyles(theme => ({
  icons: {
    fontSize: theme.spacing(3)
  }
}))

export const useNewBillsStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(6, 2, 2),
    display: 'flex',
    flexDirection: 'column'
  }
}))
