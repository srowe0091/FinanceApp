import { useQuery as apolloQuery } from '@apollo/client'
import get from 'lodash/fp/get'

export const useQuery = (query, { path, ...options }) => {
  const { data, ...rest } = apolloQuery(query, options)
  return {
    data: path ? get(path)(data) : data,
    ...rest
  }
}
