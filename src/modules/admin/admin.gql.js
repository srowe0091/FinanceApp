import gql from 'graphql-tag'

import { CardFragment } from 'modules/wallet'
import { TransactionFragment } from 'modules/transaction'
import { PreferenceFragment } from 'modules/preferences'

export const GroupTransactions = gql`
  query GroupTransactions {
    admin {
      groupTransactions {
        user {
          email
        }
        ...TransactionFragment
      }
    }
  }
  ${TransactionFragment}
`

export const UsersInGroup = gql`
  query UsersInGroup {
    admin {
      usersInGroup {
        id
        email
        cards {
          ...CardFragment
        }
        preferences {
          ...PreferenceFragment
        }
      }
    }
  }
  ${PreferenceFragment}
  ${CardFragment}
`

export const PayTransactions = gql`
  mutation PayTransactions($transactionIds: [ID]!) {
    admin {
      payTransactions(transactionIds: $transactionIds) {
        id
      }
    }
  }
`
