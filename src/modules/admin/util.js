import { createUseStyles } from 'react-jss'

export const usePayTransactionStyles = createUseStyles(theme => ({
  transactions: {
    flex: 1,
    overflow: 'auto',
    paddingBottom: theme.spacing(8)
  },
  headers: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    backgroundColor: 'var(--ion-color-primary)',
    textShadow: '0 0 3px var(--alpha5), 0 0 3px var(--alpha5)',
    '&::before': {
      content: '""',
      float: 'left',
      paddingBottom: '100%'
    }
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
