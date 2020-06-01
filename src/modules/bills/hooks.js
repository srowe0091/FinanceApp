import { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'

import { GetBills } from './bills.gql'
import { usePreferences } from 'modules/preferences'

export const useBills = () => {
  const { data, loading: billLoading, ...props } = useQuery(GetBills)
  const { preferences, loading: prefLoading } = usePreferences()

  const totalBills = useMemo(() => sumBy('amount')(data?.bills), [data])

  return {
    preferences,
    totalBills,
    bills: sortBy('dueDate')(data?.bills),
    loading: prefLoading || billLoading,
    ...props
  }
}
