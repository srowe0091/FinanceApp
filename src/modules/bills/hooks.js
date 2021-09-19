import { useMemo } from 'react'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'

import { GetBills } from './bills.gql'
import { useQuery } from 'hooks'
import { useUser } from 'modules/authentication'

export const useBills = () => {
  const { income } = useUser()
  const { data = [], loading, ...props } = useQuery(GetBills, { path: 'bills' })

  const totalBills = useMemo(() => sumBy('amount')(data), [data])

  return {
    totalBills,
    bills: sortBy('dueDate')(data),
    loading,
    income,
    ...props
  }
}
