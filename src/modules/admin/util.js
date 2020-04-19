import { createUseStyles } from 'react-jss'

export const useAdminViewStyles = createUseStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: theme.spacing(0, 2)
  },
  transactions: {
    flex: 1,
    overflow: 'auto',
    paddingTop: theme.spacing(2)
  },
  headers: {
    marginBottom: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(2, 0)
  },
  emptyView: {
    marginTop: theme.spacing(8)
  }
}))

export const useUsersTabStyles = createUseStyles(theme => ({
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