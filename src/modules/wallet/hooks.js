import sortBy from 'lodash/fp/sortBy'

import { GetWallet } from './wallet.gql'
import { useQuery } from 'hooks'
import { useUser } from 'modules/authentication'

export const useWallet = () => {
  const { defaultCard } = useUser()
  const { data = [], loading: walletLoading } = useQuery(GetWallet, { path: 'cards' })

  const sortedCards = sortBy([item => (item.id === defaultCard?.id ? 0 : 1)])(data)

  return {
    cards: sortedCards,
    defaultCard: defaultCard?.id,
    loading: walletLoading
  }
}
