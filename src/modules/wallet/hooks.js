import { useQuery } from '@apollo/react-hooks'

import { GetWallet } from './wallet.gql'
import { usePreferences } from 'modules/preferences'

export const useCards = () => {
  return useQuery(GetWallet)
}

export const useWallet = () => {
  const { data: walletData, loading: walletLoading } = useCards()
  const { data: prefData, loading: prefLoading } = usePreferences()
  return {
    cards: walletData?.cards || [],
    defaultCard: prefData?.preferences.defaultCard,
    loading: walletLoading || prefLoading
  }
}
