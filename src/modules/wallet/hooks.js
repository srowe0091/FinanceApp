import { useQuery } from '@apollo/client'
import sortBy from 'lodash/fp/sortBy'

import { GetWallet } from './wallet.gql'
import { usePreferences } from 'modules/preferences'

export const useCards = () => {
  return useQuery(GetWallet)
}

export const useWallet = () => {
  const { data: walletData, loading: walletLoading } = useCards()
  const { preferences, preferencesLoading } = usePreferences()

  const sortedCards = sortBy([item => (item.id === preferences?.defaultCard?.id ? 0 : 1)])(walletData?.cards)

  return {
    cards: sortedCards,
    defaultCard: preferences?.defaultCard?.id,
    loading: walletLoading || preferencesLoading
  }
}
