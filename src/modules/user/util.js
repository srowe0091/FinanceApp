import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'

import { toNumber } from 'utils'
import { SaveUser } from 'modules/user'
import { useAuthentication } from 'modules/authentication'

export const UserProfileSchema = yup.object().shape({
  income: yup.number().moreThan(0).required(),
  allowance: yup.number().moreThan(0).required()
})

export const useUpdateUser = () => {
  const { finishProfile } = useAuthentication()
  const [_updatePreferences, props] = useMutation(SaveUser, {
    onCompleted: data => {
      if (data?.updateUser) {
        finishProfile(data?.updateUser)
      }
    }
  })

  const handleUpdate = useCallback(
    ({ allowance, income, defaultCard }) =>
      _updatePreferences({
        variables: {
          input: {
            ...(income && { income: toNumber(income) }),
            ...(allowance && { allowance: toNumber(allowance) }),
            ...(defaultCard && { defaultCard })
          }
        }
      }),
    [_updatePreferences]
  )

  return [handleUpdate, props]
}
