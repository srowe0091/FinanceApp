import * as yup from 'yup'
import { createUseStyles } from 'react-jss'

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
    marginTop: theme.spacing(1),
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
  container: {
    padding: theme.spacing(6, 2, 2),
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: '300px',
    alignSelf: 'center',
    marginBottom: theme.spacing(8)
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
