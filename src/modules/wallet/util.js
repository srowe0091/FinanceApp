import * as yup from 'yup'
import { createUseStyles } from 'react-jss'

export const cards = [
  { value: 'VISA', label: 'Visa' },
  { value: 'MASTERCARD', label: 'MasterCard' },
  { value: 'DISCOVER', label: 'Discover' },
  { value: 'AMERICAN_EXPRESS', label: 'American Express' },
  { value: 'OTHER', label: 'Other' }
]

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
    marginTop: theme.spacing(2.5),
    '& .swiper-container': {
      overflow: 'visible'
    }
  },
  icons: {
    fontSize: theme.spacing(3)
  },
  emptyWallet: {
    width: '100%',
    display: 'block'
  }
}))

export const useNewCardViewStyles = createUseStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '300px',
    alignSelf: 'center',
    marginBottom: theme.spacing(4)
  }
}))
