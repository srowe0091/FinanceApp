import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import replace from 'lodash/fp/replace'

import { UpdateUser } from './user.gql'
import { useAuthentication } from 'modules/authentication'

export const UserProfileSchema = yup.object().shape({
  allowance: yup.number().moreThan(0).required(),
  dueDate: yup
    .number()
    .required()
    .min(0)
    .max(31)
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
    ({ allowance, ...values }) => _updateProfile({
      variables: {
        input: {
          allowance: parseInt(replace(/\D/g)('')(allowance), '10'),
          ...values
        }
      }
    }),
    [_updateProfile]
  )

  return [handleUpdate, props]
}

export const useUserViewStyles = createUseStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    flex: 1,
    margin: theme.spacing(0, 2, 2),
    position: 'relative'
  },
  top: {
    height: '70px'
  },
  userInfo: {
    marginTop: '-15%',
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  userIcon: {
    fontSize: '112px',
    borderRadius: '50%',
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  edit: {
    marginRight: theme.spacing(1)
  }
}))