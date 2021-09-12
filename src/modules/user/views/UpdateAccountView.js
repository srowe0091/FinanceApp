import React from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/fp/pick'

import { UserAccount } from '../components'
import { useUser } from 'modules/authentication'

const UpdateAccount = ({ history }) => {
  const user = pick(['firstName', 'lastName', 'income', 'allowance'])(useUser())
  return <UserAccount header="Update Your Account" history={history} defaultValues={user} />
}

UpdateAccount.propTypes = {
  history: PropTypes.object
}

export default UpdateAccount
