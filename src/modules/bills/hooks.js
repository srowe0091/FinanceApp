import { useQuery } from '@apollo/react-hooks'

import { GetBills } from './bills.gql'

export const useBills = () => {
  return useQuery(GetBills)
}