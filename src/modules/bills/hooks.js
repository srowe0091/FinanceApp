import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'

import { GetBills } from './bills.gql'
import { useUser } from 'modules/authentication'

export const useBills = () => {
  const { income } = useUser()
  const { data, loading: billLoading, ...props } = useQuery(GetBills)

  const totalBills = useMemo(() => sumBy('amount')(data?.bills), [data])

  return {
    totalBills,
    bills: sortBy('dueDate')(data?.bills),
    loading: billLoading,
    income,
    ...props
  }
}
