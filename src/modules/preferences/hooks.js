import { useQuery, useMutation } from '@apollo/react-hooks'

import { GetPreferences, SavePreferemces } from 'modules/preferences'

export const usePreferences = () => {
  const { data, loading, ...rest } = useQuery(GetPreferences)
  return {
    preferences: data?.preferences,
    preferencesLoading: loading,
    ...rest
  }
}

export const useUpdatePreferences = options => {
  return useMutation(SavePreferemces, options)
}