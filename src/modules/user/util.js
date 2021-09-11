import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { createUseStyles } from 'react-jss'

import { toNumber } from 'utils'
import { SaveUser } from 'modules/user'

export const UserProfileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  income: yup.number().moreThan(0),
  allowance: yup.number().moreThan(0)
})

export const useUpdateUser = () => {
  const [_updatePreferences, props] = useMutation(SaveUser)

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

export const useFinishUserProfileStyles = createUseStyles(theme => ({
  container: {
    padding: theme.spacing(2)
  },
  divider: {
    marginBottom: theme.spacing(3)
  }
}))
