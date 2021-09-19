import sortBy from 'lodash/fp/sortBy'
import stubArray from 'lodash/fp/stubArray'

import { GetWallet } from './wallet.gql'
import { useQuery } from 'hooks'
import { useUser } from 'modules/authentication'

export const useWallet = props => {
  const { defaultCard } = useUser()
  const { data = stubArray, loading: walletLoading } = useQuery(GetWallet, { path: 'cards', ...props })

  const sortedCards = sortBy([item => (item.id === defaultCard?.id ? 0 : 1)])(data)

  return {
    cards: sortedCards,
    defaultCard: defaultCard?.id,
    loading: walletLoading
  }
}
