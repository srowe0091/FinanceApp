import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'

import { GetBills } from './bills.gql'

export const useBills = () => {
  const { data, loading: billLoading, ...props } = useQuery(GetBills)

  const totalBills = useMemo(() => sumBy('amount')(data?.bills), [data])

  return {
    totalBills,
    bills: sortBy('dueDate')(data?.bills),
    loading: billLoading,
    ...props
  }
}
