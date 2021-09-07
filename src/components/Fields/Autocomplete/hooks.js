import { useCallback, useMemo, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import debounce from 'lodash/fp/debounce'

import { usePreviousData } from 'hooks'

export const useAutocomplete = ({ query }) => {
  const [inputText, updateInputText] = useState('')
  const [typingLoading, updateLoading] = useState(false)
  const [focused, updateFocus] = useState(false)

  const [execute, { data }] = useLazyQuery(query, {
    onCompleted: () => updateLoading(false)
  })

  const { onFocus, onBlur } = useMemo(
    () => ({
      onFocus: () => updateFocus(true),
      onBlur: () => updateFocus(false)
    }),
    []
  )

  const debounced = useMemo(() => debounce(300)(query => query && execute({ variables: { query } })), [execute])

  const onInputChange = useCallback(
    (e, update) => {
      if (update !== false) {
        updateLoading(!!e.target.value)
        debounced(e.target.value)
      }
      updateInputText(e.target.value)
    },
    [debounced]
  )

  const suggestions = usePreviousData(data?.autocomplete?.company)

  return { suggestions, inputText, focused, onInputChange, onFocus, onBlur, loading: typingLoading }
}
