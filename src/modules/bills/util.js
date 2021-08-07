import * as yup from 'yup'
import { createUseStyles } from 'react-jss'

export const NewBillSchema = yup.object().shape({
  name: yup.string().required(),
  amount: yup.number().moreThan(0).required(),
  dueDate: yup.number().required(),
  type: yup.string(),
  notes: yup.string()
})

export const initialNewBill = {
  name: '',
  amount: 0,
  dueDate: '',
  type: '',
  notes: ''
}

export const useBillsStyles = createUseStyles(theme => ({
  panel: {
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: 'var(--ion-color-light)',
    borderRadius: 'var(--borderRadius)'
  },
  monthlyInfo: {
    marginLeft: theme.spacing(1)
  },
  icons: {
    fontSize: theme.spacing(3)
  }
}))

export const useNewBillsStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(7, 2, 2),
    display: 'flex',
    flexDirection: 'column'
  }
}))

export const useCalendarStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(7, 2, 2)
  }
}))
