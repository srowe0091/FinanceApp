import { createUseStyles } from 'react-jss'

export const usePayTransactionStyles = createUseStyles(theme => ({
  transactions: {
    flex: 1,
    overflow: 'auto',
    margin: theme.spacing(0, 2, 8)
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
  container: {
    margin: theme.spacing(0, 2)
  }
}))
