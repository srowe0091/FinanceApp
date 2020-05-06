import * as yup from 'yup'
import { useQuery } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'

import { GetWallet } from './wallet.gql'

export const useGetWallet = () => {
  return useQuery(GetWallet)
}

export const NewCardSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  dueDate: yup.number().required().min(0).max(31)
})

export const initialNewCard = {
  name: '',
  cardDueDate: '',
  cardType: ''
}

export const useWalletStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .swiper-container': {
      overflow: 'visible'
    }
  },
  form: {
    flex: 1,
    margin: theme.spacing(0, 2, 2),
    position: 'relative'
  },
  userInfo: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  userIcon: {
    fontSize: '112px',
    borderRadius: '50%',
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  edit: {
    marginRight: theme.spacing(1)
  },
  cardContainer: {
    marginBottom: theme.spacing(4)
  }
}))
