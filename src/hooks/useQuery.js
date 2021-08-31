import { useMemo } from 'react'
import { useQuery as apolloQuery } from '@apollo/client'
import get from 'lodash/fp/get'
import identity from 'lodash/fp/identity'

export const useQuery = (query, { path, transform = identity, ...options }) => {
  const { data, ...rest } = apolloQuery(query, options)

  const _data = useMemo(() => transform(path ? get(path)(data) : data), [data, path, transform])

  return {
    data: _data,
    ...rest
  }
}
