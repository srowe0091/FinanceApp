import { useQuery } from '@apollo/client'
import sortBy from 'lodash/fp/sortBy'

import { GetWallet } from './wallet.gql'
import { useUser } from 'modules/authentication'

export const useWallet = () => {
  const { defaultCard } = useUser()
  const { data: walletData, loading: walletLoading } = useQuery(GetWallet)

  const sortedCards = sortBy([item => (item.id === defaultCard?.id ? 0 : 1)])(walletData?.cards)

  return {
    cards: sortedCards,
    defaultCard: defaultCard?.id,
    loading: walletLoading
  }
}
