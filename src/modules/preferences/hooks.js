import { useQuery, useMutation } from '@apollo/client'

import { GetPreferences, SavePreferences } from 'modules/preferences'

export const usePreferences = () => {
  const { data, loading, ...rest } = useQuery(GetPreferences)
  return {
    preferences: data?.preferences,
    preferencesLoading: loading,
    ...rest
  }
}

export const useUpdatePreferences = options => {
  return useMutation(SavePreferences, options)
}