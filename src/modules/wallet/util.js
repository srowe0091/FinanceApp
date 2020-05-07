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
    '& .swiper-container': {
      overflow: 'visible'
    }
  }
}))
