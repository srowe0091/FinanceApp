import { useQuery } from '@apollo/react-hooks'
import sortBy from 'lodash/fp/sortBy'

import { GetWallet } from './wallet.gql'
import { usePreferences } from 'modules/preferences'

export const useCards = () => {
  return useQuery(GetWallet)
}

export const useWallet = () => {
  const { data: walletData, loading: walletLoading } = useCards()
  const { data: prefData, loading: prefLoading } = usePreferences()

  const sortedCards = sortBy([item => (item._id === prefData?.preferences.defaultCard ? 0 : 1)])(walletData?.cards)

  return {
    cards: sortedCards,
    defaultCard: prefData?.preferences.defaultCard,
    loading: walletLoading || prefLoading
  }
}
