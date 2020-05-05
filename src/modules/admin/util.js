import { createUseStyles } from 'react-jss'

export const usePayTransactionStyles = createUseStyles(theme => ({
  transactions: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(2, 2, 8)
  },
  headers: {
    marginBottom: theme.spacing(1)
  },
  emptyView: {
    marginTop: theme.spacing(8)
  }
}))

export const useGroupStyles = createUseStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(2, 2, 0)
  }
}))
