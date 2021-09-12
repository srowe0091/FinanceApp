import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { UserAccount } from '../components'
import { Modal } from 'components'
import routes from 'routes'

const SetupAccount = ({ history }) => {
  if (!history.location.state?.updateAccount) {
    return <Redirect to={routes.home} />
  }

  return (
    <Modal isOpen disableClose>
      <UserAccount header="Setup Your Account" history={history} disableGoBack />
    </Modal>
  )
}

SetupAccount.propTypes = {
  history: PropTypes.object
}

export default SetupAccount
