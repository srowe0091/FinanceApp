import { useQuery, useMutation } from '@apollo/react-hooks'

import { GetPreferences, SavePreferemces } from 'modules/preferences'

export const usePreferences = () => {
  return useQuery(GetPreferences)
}

export const useUpdatePreferences = options => {
  return useMutation(SavePreferemces, options)
}