import * as yup from 'yup'
import { useQuery } from '@apollo/react-hooks'
import { createUseStyles } from 'react-jss'

import { GetWallet } from './wallet.gql'

export const useGetWallet = () => {
  return useQuery(GetWallet)
}

export const NewCardSchema = yup.object().shape({
  cardName: yup.string().required(),
  cardDueDate: yup.string().required(),
  cardType: yup.string().required()
})

export const initialNewCard = {
  cardName: '',
  cardDueDate: '',
  cardType: 'VISA'
}

export const useWalletStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    '& .swiper-container': {
      overflow: 'visible'
    }
  },
  add: {
    marginRight: theme.spacing(2)
  }
}))

export const useNewCardViewStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(6, 2, 2),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  card: {
    width: '300px',
    alignSelf: 'center',
    marginBottom: theme.spacing(8)
  },
  select: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: 'auto'
  },
  close: {
    top: theme.spacing(2),
    right: theme.spacing(2),
    position: 'absolute'
  }
}))
