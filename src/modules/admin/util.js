import { createUseStyles } from 'react-jss'

export const usePayTransactionStyles = createUseStyles(theme => ({
  transactions: {
    flex: 1,
    overflow: 'auto',
    paddingBottom: theme.spacing(8)
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
    marginBottom: theme.spacing(2),
    borderRadius: 'var(--borderRadius)'
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
