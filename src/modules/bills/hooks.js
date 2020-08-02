import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import sumBy from 'lodash/fp/sumBy'
import sortBy from 'lodash/fp/sortBy'

import { GetBills } from './bills.gql'
import { usePreferences } from 'modules/preferences'

export const useBills = () => {
  const { data, loading: billLoading, ...props } = useQuery(GetBills)
  const { preferences, preferencesLoading } = usePreferences()

  const totalBills = useMemo(() => sumBy('amount')(data?.bills), [data])

  return {
    preferences,
    totalBills,
    bills: sortBy('dueDate')(data?.bills),
    loading: preferencesLoading || billLoading,
    ...props
  }
}
