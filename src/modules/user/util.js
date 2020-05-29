import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { useCallback } from 'react'

import { toNumber } from 'utils'
import { UpdateUser } from 'modules/user'
import { useAuthentication } from 'modules/authentication'

export const UserProfileSchema = yup.object().shape({
  allowance: yup.number().moreThan(0).required(),
  dueDate: yup.number().required().min(0).max(31)
})

export const useUpdateUser = () => {
  const { finishProfile } = useAuthentication()
  const [_updateProfile, props] = useMutation(UpdateUser, {
    onCompleted: data => {
      if (data?.saveUser) {
        finishProfile(data?.saveUser)
      }
    }
  })

  const handleUpdate = useCallback(
    ({ allowance, ...values }) =>
      _updateProfile({
        variables: {
          input: {
            allowance: toNumber(allowance),
            ...values
          }
        }
      }),
    [_updateProfile]
  )

  return [handleUpdate, props]
}
