import gql from 'graphql-tag'

import { TransactionFragment } from 'modules/transaction'
import { UserFragment } from 'modules/user'

export const GroupTransactions = gql`
  query GroupTransactions {
    admin {
      groupTransactions {
        owner
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
        ...UserFragment
      }
    }
  }
  ${UserFragment}
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
