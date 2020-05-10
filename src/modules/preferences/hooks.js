import { useQuery } from '@apollo/react-hooks'

import { GetPreferences } from 'modules/preferences'

export const usePreferences = () => {
  return useQuery(GetPreferences)
}
