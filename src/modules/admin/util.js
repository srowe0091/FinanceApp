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
  container: {
    margin: theme.spacing(0, 2)
  },
  card: {
    marginBottom: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  userCardsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  userCards: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 0),
    borderTop: '1px solid var(--gray7)',
    '& p': {
      flex: 1
    }
  }
}))
