import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'

import { toNumber } from 'utils'
import { SaveUser } from 'modules/user'
import { useAuthentication } from 'modules/authentication'

export const UserProfileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  income: yup.number().moreThan(0),
  allowance: yup.number().moreThan(0)
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
    ({ allowance, income, defaultCard, firstName, lastName }) =>
      _updatePreferences({
        variables: {
          input: {
            ...(income && { income: toNumber(income) }),
            ...(allowance && { allowance: toNumber(allowance) }),
            ...(defaultCard && { defaultCard }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName })
          }
        }
      }),
    [_updatePreferences]
  )

  return [handleUpdate, props]
}
