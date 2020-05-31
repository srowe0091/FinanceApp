import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { useCallback } from 'react'

import { toNumber } from 'utils'
import { SavePreferemces } from 'modules/preferences'
import { useAuthentication } from 'modules/authentication'

export const UserProfileSchema = yup.object().shape({
  income: yup.number().moreThan(0).required(),
  allowance: yup.number().moreThan(0).required()
})

export const useUpdateUser = () => {
  const { finishProfile } = useAuthentication()
  const [_updatePreferences, props] = useMutation(SavePreferemces, {
    onCompleted: data => {
      if (data?.saveUser) {
        finishProfile(data?.saveUser)
      }
    }
  })

  const handleUpdate = useCallback(
    ({ allowance, income }) =>
      _updatePreferences({
        variables: {
          input: {
            income: toNumber(income),
            allowance: toNumber(allowance)
          }
        }
      }),
    [_updatePreferences]
  )

  return [handleUpdate, props]
}
